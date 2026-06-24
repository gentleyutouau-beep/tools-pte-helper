'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  fetchRemoteProgress,
  getProgressSyncId,
  localDiff,
  loadLocalProgress,
  mergeProgress,
  progressStorageKey,
  pushRemoteProgress,
  saveLocalProgress,
  type ProgressMap,
  type ProgressStatus,
} from '@/lib/progressClient'

const SYNC_DEBOUNCE_MS = 5000
const REMOTE_CACHE_TTL_MS = 10 * 60 * 1000

function hasRecords(progress: ProgressMap) {
  return Object.keys(progress).length > 0
}

function loadProgressFromOtherLocalIds(baseStorageKey: string, currentStorageKey: string) {
  let progress: ProgressMap = {}
  const prefix = `${baseStorageKey}:`

  for (let index = 0; index < window.localStorage.length; index += 1) {
    const storageKey = window.localStorage.key(index)
    if (!storageKey || storageKey === currentStorageKey || !storageKey.startsWith(prefix)) continue

    progress = mergeProgress(loadLocalProgress(storageKey), progress)
  }

  return progress
}

function remoteSyncTimestampKey(storageKey: string) {
  return `${storageKey}:remote-synced-at`
}

function isRemoteCacheFresh(storageKey: string) {
  const syncedAt = Number(window.localStorage.getItem(remoteSyncTimestampKey(storageKey)))
  return Number.isFinite(syncedAt) && Date.now() - syncedAt < REMOTE_CACHE_TTL_MS
}

function markRemoteCacheSynced(storageKey: string) {
  window.localStorage.setItem(remoteSyncTimestampKey(storageKey), String(Date.now()))
}

export function useSyncedProgress(
  baseStorageKey: string,
  scope: string,
  label: string,
  migrateOtherLocalIds = false
) {
  const [statusMap, setStatusMap] = useState<ProgressMap>({})
  const syncIdRef = useRef('')
  const storageKeyRef = useRef(baseStorageKey)
  const pendingRef = useRef<ProgressMap>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const flushPending = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const pending = pendingRef.current
    pendingRef.current = {}

    if (!syncIdRef.current || !hasRecords(pending)) return

    try {
      await pushRemoteProgress(scope, syncIdRef.current, pending)
    } catch (error) {
      pendingRef.current = mergeProgress(pendingRef.current, pending)
      console.warn(`Unable to sync ${label} progress`, error)
    }
  }, [label, scope])

  const queueRemoteProgress = useCallback(
    (progress: ProgressMap) => {
      if (!hasRecords(progress)) return

      pendingRef.current = mergeProgress(progress, pendingRef.current)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        flushPending()
      }, SYNC_DEBOUNCE_MS)
    },
    [flushPending]
  )

  const loadForSyncId = useCallback(
    (nextSyncId: string, migrateLegacyProgress: boolean) => {
      syncIdRef.current = nextSyncId
      storageKeyRef.current = progressStorageKey(baseStorageKey, nextSyncId)
      let migratedLocalProgress = false

      let localProgress = loadLocalProgress(storageKeyRef.current)
      if (migrateLegacyProgress && !hasRecords(localProgress)) {
        const legacyProgress = loadLocalProgress(baseStorageKey)
        if (hasRecords(legacyProgress)) {
          localProgress = legacyProgress
          saveLocalProgress(storageKeyRef.current, localProgress)
          migratedLocalProgress = true
        }
      }

      if (migrateLegacyProgress && migrateOtherLocalIds) {
        const otherLocalProgress = loadProgressFromOtherLocalIds(baseStorageKey, storageKeyRef.current)
        if (hasRecords(otherLocalProgress)) {
          localProgress = mergeProgress(otherLocalProgress, localProgress)
          saveLocalProgress(storageKeyRef.current, localProgress)
          migratedLocalProgress = true
        }
      }

      setStatusMap(localProgress)

      if (!migratedLocalProgress && isRemoteCacheFresh(storageKeyRef.current)) {
        return
      }

      async function syncRemote() {
        try {
          const remoteProgress = await fetchRemoteProgress(scope, nextSyncId)
          const merged = mergeProgress(localProgress, remoteProgress)
          saveLocalProgress(storageKeyRef.current, merged)
          markRemoteCacheSynced(storageKeyRef.current)

          if (syncIdRef.current === nextSyncId) {
            setStatusMap(merged)
          }

          queueRemoteProgress(localDiff(localProgress, remoteProgress))
        } catch (error) {
          console.warn(`Unable to sync ${label} progress`, error)
        }
      }

      syncRemote()
    },
    [baseStorageKey, label, queueRemoteProgress, scope]
  )

  useEffect(() => {
    const initialSyncId = getProgressSyncId()
    loadForSyncId(initialSyncId, true)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (hasRecords(pendingRef.current)) {
        pushRemoteProgress(scope, syncIdRef.current, pendingRef.current).catch((error) => {
          console.warn(`Unable to sync ${label} progress`, error)
        })
      }
    }
  }, [label, loadForSyncId, migrateOtherLocalIds, scope])

  const updateStatus = useCallback(
    (key: string, status: ProgressStatus) => {
      setStatusMap((current) => {
        if (current[key]?.status === status) return current

        const entry = { status, updatedAt: Date.now() }
        const next = { ...current, [key]: entry }
        saveLocalProgress(storageKeyRef.current, next)
        queueRemoteProgress({ [key]: entry })
        return next
      })
    },
    [queueRemoteProgress]
  )

  return {
    statusMap,
    updateStatus,
  }
}
