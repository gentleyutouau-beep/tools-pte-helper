'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

const PEOPLE = ['Rick', 'Yana'] as const

type Person = typeof PEOPLE[number]
type Records = Record<string, Record<string, Record<string, string>>>
type SyncStatus = 'loading' | 'saving' | 'synced' | 'error'

interface ApiCheckInRecord {
  person: Person
  dateKey: string
  columnId: string
  value: string
  updatedAt: number
}

const START_DATE = new Date(Date.UTC(2026, 5, 17))
const END_DATE = new Date(Date.UTC(2026, 7, 31))
const STORAGE_KEY = 'pte-checkin-records-v1'
const MIGRATION_KEY = 'pte-checkin-local-migrated-v1'
const SYNC_DEBOUNCE_MS = 3000

const GROUPS = [
  {
    label: 'Speaking',
    items: ['RA', 'RS', 'DI', 'RL', 'SGD', 'RTS', 'ASQ'],
  },
  {
    label: 'Reading',
    items: ['FIB-R', 'FIB-RW', 'RO', 'MCM', 'MCS'],
  },
  {
    label: 'Writing',
    items: ['SWT', 'WE'],
  },
  {
    label: 'Listening',
    items: ['WFD', 'SST', 'FIB', 'HCS', 'MCS', 'SMW', 'HIW', 'MCM'],
  },
]

const COLUMNS = GROUPS.flatMap(group =>
  group.items.map(item => ({
    id: `${group.label}-${item}`,
    label: item,
    group: group.label,
  }))
)

function buildDates() {
  const dates: { key: string; label: string }[] = []
  const current = new Date(START_DATE)

  while (current <= END_DATE) {
    const month = current.getUTCMonth() + 1
    const day = current.getUTCDate()
    dates.push({
      key: current.toISOString().slice(0, 10),
      label: `${month}.${day}`,
    })
    current.setUTCDate(current.getUTCDate() + 1)
  }

  return dates
}

function readCachedRecords(): Records {
  if (typeof window === 'undefined') return {}

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveCachedRecords(records: Records) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

function recordsFromApi(apiRecords: ApiCheckInRecord[]): Records {
  const records: Records = {}

  for (const record of apiRecords) {
    if (!PEOPLE.includes(record.person) || !record.value) continue

    records[record.person] = records[record.person] || {}
    records[record.person][record.dateKey] = records[record.person][record.dateKey] || {}
    records[record.person][record.dateKey][record.columnId] = record.value
  }

  return records
}

function recordsToApi(records: Records, updatedAt: number): ApiCheckInRecord[] {
  const apiRecords: ApiCheckInRecord[] = []

  for (const personName of PEOPLE) {
    const personRecords = records[personName] || {}
    for (const [dateKey, row] of Object.entries(personRecords)) {
      for (const [columnId, value] of Object.entries(row)) {
        if (!value) continue
        apiRecords.push({
          person: personName,
          dateKey,
          columnId,
          value,
          updatedAt,
        })
      }
    }
  }

  return apiRecords
}

function getTodayKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

function formatDateLabel(dateKey: string) {
  const date = new Date(`${dateKey}T00:00:00`)
  return `${date.getMonth() + 1}.${date.getDate()}`
}

function sumRow(row: Record<string, string> = {}) {
  return Object.values(row).reduce((sum, value) => sum + (Number(value) || 0), 0)
}

function getColumnLabel(columnId: string) {
  return COLUMNS.find(column => column.id === columnId)?.label || columnId
}

function getGroupTotals(row: Record<string, string> = {}) {
  return GROUPS.map(group => {
    const total = group.items.reduce((sum, item) => {
      return sum + (Number(row[`${group.label}-${item}`]) || 0)
    }, 0)

    return { label: group.label, total }
  })
}

function getPracticedItems(row: Record<string, string> = {}) {
  return COLUMNS
    .map(column => ({
      label: getColumnLabel(column.id),
      group: column.group,
      count: Number(row[column.id]) || 0,
    }))
    .filter(item => item.count > 0)
}

export default function CheckInTable() {
  const dates = useMemo(() => buildDates(), [])
  const todayKey = useMemo(() => getTodayKey(), [])
  const [person, setPerson] = useState<Person>('Rick')
  const [records, setRecords] = useState<Records>({})
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('loading')
  const [shareImageUrl, setShareImageUrl] = useState<string | null>(null)
  const pendingRef = useRef<Record<string, ApiCheckInRecord>>({})
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const pushRecords = useCallback(async (apiRecords: ApiCheckInRecord[]) => {
    if (apiRecords.length === 0) return

    for (let index = 0; index < apiRecords.length; index += 500) {
      const response = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ records: apiRecords.slice(index, index + 500) }),
      })

      if (!response.ok) throw new Error('Unable to save check-in records')
    }
  }, [])

  const flushPending = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }

    const pending = Object.values(pendingRef.current)
    pendingRef.current = {}
    if (pending.length === 0) return

    try {
      setSyncStatus('saving')
      await pushRecords(pending)
      setSyncStatus('synced')
    } catch (error) {
      pendingRef.current = Object.fromEntries(
        [...pending, ...Object.values(pendingRef.current)].map((record) => [
          `${record.person}:${record.dateKey}:${record.columnId}`,
          record,
        ])
      )
      setSyncStatus('error')
      console.warn('Unable to sync check-in records', error)
    }
  }, [pushRecords])

  const queueRecord = useCallback(
    (record: ApiCheckInRecord) => {
      pendingRef.current[`${record.person}:${record.dateKey}:${record.columnId}`] = record
      setSyncStatus('saving')

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        flushPending()
      }, SYNC_DEBOUNCE_MS)
    },
    [flushPending]
  )

  useEffect(() => {
    const cachedRecords = readCachedRecords()
    if (Object.keys(cachedRecords).length > 0) {
      setRecords(cachedRecords)
    }

    async function loadRemoteRecords() {
      try {
        const response = await fetch('/api/checkin', { cache: 'no-store' })
        if (!response.ok) throw new Error('Unable to fetch check-in records')

        const payload = (await response.json()) as { records?: ApiCheckInRecord[] }
        const remoteRecords = recordsFromApi(payload.records || [])
        setRecords(remoteRecords)
        saveCachedRecords(remoteRecords)
        setSyncStatus('synced')

        const shouldMigrate = window.localStorage.getItem(MIGRATION_KEY) !== 'true'
        if (shouldMigrate) {
          const legacyRecords = recordsToApi(cachedRecords, Date.now())
          window.localStorage.setItem(MIGRATION_KEY, 'true')

          if (legacyRecords.length > 0) {
            setSyncStatus('saving')
            await pushRecords(legacyRecords)

            const migratedResponse = await fetch('/api/checkin', { cache: 'no-store' })
            if (migratedResponse.ok) {
              const migratedPayload = (await migratedResponse.json()) as { records?: ApiCheckInRecord[] }
              const migratedRecords = recordsFromApi(migratedPayload.records || [])
              setRecords(migratedRecords)
              saveCachedRecords(migratedRecords)
            }

            setSyncStatus('synced')
          }
        }
      } catch (error) {
        setSyncStatus('error')
        console.warn('Unable to load check-in records', error)
      }
    }

    loadRemoteRecords()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      const pending = Object.values(pendingRef.current)
      if (pending.length > 0) {
        pushRecords(pending).catch((error) => {
          console.warn('Unable to sync check-in records', error)
        })
      }
    }
  }, [pushRecords])

  const updateCell = (dateKey: string, columnId: string, value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '')
    const updatedAt = Date.now()

    setRecords(prev => {
      const next = {
        ...prev,
        [person]: {
          ...(prev[person] || {}),
          [dateKey]: {
            ...(prev[person]?.[dateKey] || {}),
            [columnId]: cleanValue,
          },
        },
      }
      saveCachedRecords(next)
      return next
    })

    queueRecord({
      person,
      dateKey,
      columnId,
      value: cleanValue,
      updatedAt,
    })
  }

  const personRecords = records[person] || {}
  const totalPractice = Object.values(personRecords).reduce((sum, row) => {
    return sum + Object.values(row).reduce((rowSum, value) => rowSum + (Number(value) || 0), 0)
  }, 0)
  const todayRow = personRecords[todayKey] || {}
  const todayTotal = sumRow(todayRow)
  const todayItems = getPracticedItems(todayRow)
  const groupTotals = getGroupTotals(todayRow)

  const generateShareImage = () => {
    const width = 1080
    const height = 1080
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, width, height)

    const gradient = ctx.createLinearGradient(0, 0, width, 340)
    gradient.addColorStop(0, '#111827')
    gradient.addColorStop(1, '#10b981')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, 340)

    ctx.fillStyle = '#ffffff'
    ctx.font = '700 58px Arial'
    ctx.fillText('PTE Daily Check-in', 64, 112)
    ctx.font = '500 28px Arial'
    ctx.fillText(`${person} · ${formatDateLabel(todayKey)}`, 64, 162)

    ctx.fillStyle = 'rgba(255,255,255,0.18)'
    ctx.beginPath()
    ctx.roundRect(64, 210, 952, 100, 28)
    ctx.fill()
    ctx.fillStyle = '#ffffff'
    ctx.font = '800 52px Arial'
    ctx.fillText(`${todayTotal}`, 96, 272)
    ctx.font = '600 26px Arial'
    ctx.fillText('questions today', 205, 270)

    ctx.fillStyle = '#0f172a'
    ctx.font = '800 36px Arial'
    ctx.fillText('Today\'s Practice', 64, 420)

    if (todayItems.length === 0) {
      ctx.fillStyle = '#64748b'
      ctx.font = '600 30px Arial'
      ctx.fillText('No records yet today.', 64, 490)
    } else {
      let x = 64
      let y = 464
      ctx.font = '700 28px Arial'
      for (const item of todayItems) {
        const text = `${item.label} ${item.count}`
        const pillWidth = Math.min(270, ctx.measureText(text).width + 48)
        if (x + pillWidth > 1016) {
          x = 64
          y += 72
        }
        ctx.fillStyle = '#e0f2fe'
        ctx.beginPath()
        ctx.roundRect(x, y, pillWidth, 52, 18)
        ctx.fill()
        ctx.fillStyle = '#075985'
        ctx.fillText(text, x + 24, y + 36)
        x += pillWidth + 16
      }
    }

    ctx.fillStyle = '#0f172a'
    ctx.font = '800 36px Arial'
    ctx.fillText('Skill Totals', 64, 760)

    groupTotals.forEach((group, index) => {
      const x = 64 + (index % 2) * 486
      const y = 804 + Math.floor(index / 2) * 100
      ctx.fillStyle = '#ffffff'
      ctx.beginPath()
      ctx.roundRect(x, y, 444, 72, 22)
      ctx.fill()
      ctx.fillStyle = '#475569'
      ctx.font = '700 24px Arial'
      ctx.fillText(group.label, x + 24, y + 44)
      ctx.fillStyle = '#059669'
      ctx.font = '800 32px Arial'
      ctx.fillText(String(group.total), x + 360, y + 46)
    })

    ctx.fillStyle = '#94a3b8'
    ctx.font = '500 20px Arial'
    ctx.fillText('Generated by PTE 备考助手', 64, 1016)

    setShareImageUrl(canvas.toDataURL('image/png'))
  }

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-gray-900 px-3 py-1 text-sm font-bold text-white">Check-in</span>
            <h1 className="text-3xl font-bold text-gray-900">PTE 打卡表</h1>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            日期到 8 月 31 日，记录会自动同步到数据库。
            <span className="ml-2 text-gray-400">
              {syncStatus === 'loading' && '加载中'}
              {syncStatus === 'saving' && '保存中'}
              {syncStatus === 'synced' && '已同步'}
              {syncStatus === 'error' && '同步失败，稍后会重试'}
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-full bg-gray-100 p-1">
            {PEOPLE.map(name => (
              <button
                key={name}
                type="button"
                aria-pressed={person === name}
                onClick={() => setPerson(name)}
                className={`h-9 min-w-20 rounded-full px-4 text-sm font-semibold transition-colors ${
                  person === name
                    ? 'bg-gray-900 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-white'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={generateShareImage}
            className="h-10 rounded-full bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-700"
          >
            预览今日分享图
          </button>
        </div>
      </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">当前</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{person}</p>
          </div>
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">总练习题数</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{totalPractice}</p>
          </div>
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700">当日练习题数</p>
            <p className="mt-1 text-2xl font-bold text-emerald-900">{todayTotal}</p>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
        <table className="min-w-[1320px] border-collapse text-sm">
          <caption className="sr-only">PTE study check-in table for {person}</caption>
          <thead>
            <tr>
              <th className="sticky left-0 z-20 w-20 border border-gray-200 bg-slate-200 px-3 py-3"></th>
              {GROUPS.map(group => (
                <th
                  key={group.label}
                  colSpan={group.items.length}
                  className="border border-slate-300 bg-slate-200 px-3 py-3 text-center text-base font-bold text-slate-900"
                >
                  {group.label}
                </th>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-20 w-20 border border-gray-200 bg-slate-100 px-3 py-2"></th>
              {COLUMNS.map(column => (
                <th
                  key={column.id}
                  className="w-16 border border-gray-200 bg-slate-100 px-2 py-2 text-center text-sm font-bold text-slate-700"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map(date => (
              <tr
                key={date.key}
                className={`${date.key === todayKey ? 'bg-emerald-50' : 'odd:bg-white even:bg-gray-50'} hover:bg-amber-50/60`}
              >
                <th className={`sticky left-0 z-10 w-20 border border-gray-200 px-3 py-2 text-right text-base font-bold ${date.key === todayKey ? 'bg-emerald-100 text-emerald-900' : 'bg-gray-100 text-gray-900'}`}>
                  {date.label}
                </th>
                {COLUMNS.map(column => {
                  const value = personRecords[date.key]?.[column.id] || ''

                  return (
                    <td key={column.id} className="border border-gray-200 p-0">
                      <input
                        inputMode="numeric"
                        aria-label={`${person} ${date.label} ${column.group} ${column.label}`}
                        value={value}
                        onChange={event => updateCell(date.key, column.id, event.target.value)}
                        className="h-10 w-full bg-transparent px-1 text-center text-base font-semibold text-gray-900 outline-none transition-colors focus:bg-amber-100 focus:ring-2 focus:ring-inset focus:ring-amber-300"
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {shareImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/70 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <h2 className="text-base font-bold text-gray-900">今日分享图</h2>
                <p className="text-xs text-gray-500">右键或长按图片即可复制/保存。</p>
              </div>
              <button
                type="button"
                onClick={() => setShareImageUrl(null)}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
              >
                关闭
              </button>
            </div>
            <div className="max-h-[78vh] overflow-auto bg-gray-100 p-4">
              <img
                src={shareImageUrl}
                alt={`${person} ${formatDateLabel(todayKey)} PTE daily check-in`}
                className="mx-auto w-full max-w-lg rounded-xl border border-gray-200 bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
