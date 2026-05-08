export type ProgressStatus = 'known' | 'unknown'

export interface ProgressEntry {
  status: ProgressStatus
  updatedAt: number
}

export type ProgressMap = Record<string, ProgressEntry>

type LegacyProgressMap = Record<string, ProgressStatus | ProgressEntry>

function isProgressStatus(value: unknown): value is ProgressStatus {
  return value === 'known' || value === 'unknown'
}

function normalizeEntry(value: unknown, fallbackUpdatedAt: number): ProgressEntry | null {
  if (isProgressStatus(value)) {
    return { status: value, updatedAt: fallbackUpdatedAt }
  }

  if (value && typeof value === 'object') {
    const entry = value as Partial<ProgressEntry>
    if (isProgressStatus(entry.status) && typeof entry.updatedAt === 'number' && Number.isFinite(entry.updatedAt)) {
      return { status: entry.status, updatedAt: entry.updatedAt }
    }
  }

  return null
}

export function loadLocalProgress(storageKey: string): ProgressMap {
  try {
    const saved = window.localStorage.getItem(storageKey)
    if (!saved) return {}

    const parsed = JSON.parse(saved) as LegacyProgressMap
    const fallbackUpdatedAt = Date.now()
    const progress: ProgressMap = {}

    for (const [key, value] of Object.entries(parsed)) {
      const entry = normalizeEntry(value, fallbackUpdatedAt)
      if (entry) progress[key] = entry
    }

    window.localStorage.setItem(storageKey, JSON.stringify(progress))
    return progress
  } catch {
    return {}
  }
}

export function saveLocalProgress(storageKey: string, progress: ProgressMap) {
  window.localStorage.setItem(storageKey, JSON.stringify(progress))
}

export function mergeProgress(primary: ProgressMap, secondary: ProgressMap): ProgressMap {
  const merged: ProgressMap = { ...secondary }

  for (const [key, entry] of Object.entries(primary)) {
    const existing = merged[key]
    if (!existing || entry.updatedAt >= existing.updatedAt) {
      merged[key] = entry
    }
  }

  return merged
}

// Returns only entries in local that are newer than (or absent from) remote.
export function localDiff(local: ProgressMap, remote: ProgressMap): ProgressMap {
  const diff: ProgressMap = {}
  for (const [key, entry] of Object.entries(local)) {
    const remoteEntry = remote[key]
    if (!remoteEntry || entry.updatedAt > remoteEntry.updatedAt) {
      diff[key] = entry
    }
  }
  return diff
}

export async function fetchRemoteProgress(scope: string): Promise<ProgressMap> {
  const response = await fetch(`/api/progress?scope=${encodeURIComponent(scope)}`, {
    cache: 'no-store',
  })

  if (!response.ok) throw new Error('Unable to fetch progress')

  const data = (await response.json()) as {
    records?: Array<{ key: string; status: ProgressStatus; updatedAt: number }>
  }

  const progress: ProgressMap = {}
  for (const record of data.records ?? []) {
    const entry = normalizeEntry({ status: record.status, updatedAt: record.updatedAt }, Date.now())
    if (entry) progress[record.key] = entry
  }

  return progress
}

export async function pushRemoteProgress(scope: string, progress: ProgressMap) {
  const response = await fetch('/api/progress', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      scope,
      records: Object.entries(progress).map(([key, entry]) => ({
        key,
        status: entry.status,
        updatedAt: entry.updatedAt,
      })),
    }),
  })

  if (!response.ok) throw new Error('Unable to push progress')
}
