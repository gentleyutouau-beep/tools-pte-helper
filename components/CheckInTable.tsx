'use client'

import { useEffect, useMemo, useState } from 'react'

const PEOPLE = ['Rick', 'Yana'] as const

type Person = typeof PEOPLE[number]
type Records = Record<string, Record<string, Record<string, string>>>

const START_DATE = new Date(Date.UTC(2026, 5, 17))
const END_DATE = new Date(Date.UTC(2026, 7, 31))
const STORAGE_KEY = 'pte-checkin-records-v1'

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

function readRecords(): Records {
  if (typeof window === 'undefined') return {}

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function getTodayKey() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function CheckInTable() {
  const dates = useMemo(() => buildDates(), [])
  const todayKey = useMemo(() => getTodayKey(), [])
  const [person, setPerson] = useState<Person>('Rick')
  const [records, setRecords] = useState<Records>({})
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setRecords(readRecords())
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
  }, [loaded, records])

  const updateCell = (dateKey: string, columnId: string, value: string) => {
    const cleanValue = value.replace(/[^\d]/g, '')

    setRecords(prev => ({
      ...prev,
      [person]: {
        ...(prev[person] || {}),
        [dateKey]: {
          ...(prev[person]?.[dateKey] || {}),
          [columnId]: cleanValue,
        },
      },
    }))
  }

  const personRecords = records[person] || {}
  const totalPractice = Object.values(personRecords).reduce((sum, row) => {
    return sum + Object.values(row).reduce((rowSum, value) => rowSum + (Number(value) || 0), 0)
  }, 0)
  const todayTotal = Object.values(personRecords[todayKey] || {}).reduce((sum, value) => {
    return sum + (Number(value) || 0)
  }, 0)

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">PTE 打卡表</h1>
          <p className="mt-2 text-sm text-gray-500">日期到 8 月 31 日，记录会保存在当前浏览器。</p>
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
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="border border-gray-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">当前</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{person}</p>
        </div>
        <div className="border border-gray-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">总练习题数</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{totalPractice}</p>
        </div>
        <div className="border border-gray-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">当日练习题数</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{todayTotal}</p>
        </div>
      </div>

      <div className="overflow-x-auto border border-gray-300 bg-white">
        <table className="min-w-[1320px] border-collapse text-sm">
          <caption className="sr-only">PTE study check-in table for {person}</caption>
          <thead>
            <tr>
              <th className="sticky left-0 z-20 w-20 border border-gray-300 bg-gray-300 px-3 py-2"></th>
              {GROUPS.map(group => (
                <th
                  key={group.label}
                  colSpan={group.items.length}
                  className="border border-gray-400 bg-gray-300 px-3 py-2 text-center text-base font-bold text-gray-900"
                >
                  {group.label}
                </th>
              ))}
            </tr>
            <tr>
              <th className="sticky left-0 z-20 w-20 border border-gray-300 bg-gray-300 px-3 py-2"></th>
              {COLUMNS.map(column => (
                <th
                  key={column.id}
                  className="w-16 border border-gray-300 bg-gray-300 px-2 py-2 text-center text-base font-bold text-gray-900"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dates.map(date => (
              <tr key={date.key} className="odd:bg-white even:bg-gray-50">
                <th className="sticky left-0 z-10 w-20 border border-gray-300 bg-gray-100 px-3 py-2 text-right text-base font-bold text-gray-900">
                  {date.label}
                </th>
                {COLUMNS.map(column => {
                  const value = personRecords[date.key]?.[column.id] || ''

                  return (
                    <td key={column.id} className="border border-gray-300 p-0">
                      <input
                        inputMode="numeric"
                        aria-label={`${person} ${date.label} ${column.group} ${column.label}`}
                        value={value}
                        onChange={event => updateCell(date.key, column.id, event.target.value)}
                        className="h-10 w-full bg-transparent px-1 text-center text-base font-semibold text-gray-900 outline-none focus:bg-amber-50 focus:ring-2 focus:ring-inset focus:ring-amber-300"
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
