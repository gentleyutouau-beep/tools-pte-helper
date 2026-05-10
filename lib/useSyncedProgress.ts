'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
  fetchRemoteProgress,
  getProgressSyncId,
  localDiff,
  loadLocalProgress,
  mergeProgress,
  newProgressSyncId,
  progressStorageKey,
  pushRemoteProgress,
  saveLocalProgress,
  saveProgressSyncId,
  type ProgressMap,
  type ProgressStatus,
} from '@/lib/progressClient'

const SYNC_DEBOUNCE_MS = 1500

function hasRecords(progress: ProgressMap) {
  return Object.keys(progress).length > 0
}

export function useSyncedProgress(baseStorageKey: string, scope: string, label: string) {
  const [syncId, setSyncIdState] = useState('')
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

      let localProgress = loadLocalProgress(storageKeyRef.current)
      if (migrateLegacyProgress && !hasRecords(localProgress)) {
        const legacyProgress = loadLocalProgress(baseStorageKey)
        if (hasRecords(legacyProgress)) {
          localProgress = legacyProgress
          saveLocalProgress(storageKeyRef.current, localProgress)
        }
      }

      setStatusMap(localProgress)

      async function syncRemote() {
        try {
          const remoteProgress = await fetchRemoteProgress(scope, nextSyncId)
          const merged = mergeProgress(localProgress, remoteProgress)
          saveLocalProgress(storageKeyRef.current, merged)

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
    setSyncIdState(initialSyncId)
    loadForSyncId(initialSyncId, true)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (hasRecords(pendingRef.current)) {
        pushRemoteProgress(scope, syncIdRef.current, pendingRef.current).catch((error) => {
          console.warn(`Unable to sync ${label} progress`, error)
        })
      }
    }
  }, [label, loadForSyncId, scope])

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

  const useSyncId = useCallback(
    (value: string) => {
      const nextSyncId = saveProgressSyncId(value)
      if (!nextSyncId) return false

      pendingRef.current = {}
      setSyncIdState(nextSyncId)
      loadForSyncId(nextSyncId, false)
      return true
    },
    [loadForSyncId]
  )

  const createNewSyncId = useCallback(() => {
    const nextSyncId = newProgressSyncId()
    pendingRef.current = {}
    setSyncIdState(nextSyncId)
    loadForSyncId(nextSyncId, false)
  }, [loadForSyncId])

  return {
    statusMap,
    syncId,
    updateStatus,
    useSyncId,
    createNewSyncId,
  }
}
