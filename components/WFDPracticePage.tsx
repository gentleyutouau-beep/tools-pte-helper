'use client'

import { useMemo, useState } from 'react'
import { WFD_SENTENCES } from '@/lib/wfd'
import { useSyncedProgress } from '@/lib/useSyncedProgress'

const LABELS = ['全部', '极高频', '极限预测', '重回', '新题', '降频区']
const DIFFICULTIES = ['全部', '简单', '普通', '困难']
const STATUS_FILTERS = ['全部', '不会', '会', '未标记']
const STORAGE_KEY = 'pte-wfd-status-v1'
const PROGRESS_SCOPE = 'wfd'

export default function WFDPracticePage() {
  const [query, setQuery] = useState('')
  const [label, setLabel] = useState('全部')
  const [difficulty, setDifficulty] = useState('全部')
  const [statusFilter, setStatusFilter] = useState('全部')
  const [showChinese, setShowChinese] = useState(true)
  const { statusMap, updateStatus } = useSyncedProgress(
    STORAGE_KEY,
    PROGRESS_SCOPE,
    'WFD'
  )
  const normalizedQuery = query.trim().toLowerCase()

  const sentences = useMemo(() => {
    return WFD_SENTENCES.filter((item) => {
      const matchesQuery =
        !normalizedQuery ||
        item.sentence.toLowerCase().includes(normalizedQuery) ||
        item.translation.includes(query.trim()) ||
        item.code.toLowerCase().includes(normalizedQuery)
      const matchesLabel = label === '全部' || item.labels.includes(label)
      const matchesDifficulty = difficulty === '全部' || item.difficulty === difficulty
      const status = statusMap[item.code]?.status
      const matchesStatus =
        statusFilter === '全部' ||
        (statusFilter === '会' && status === 'known') ||
        (statusFilter === '不会' && status === 'unknown') ||
        (statusFilter === '未标记' && !status)

      return matchesQuery && matchesLabel && matchesDifficulty && matchesStatus
    })
  }, [difficulty, label, normalizedQuery, query, statusFilter, statusMap])

  const statusCounts = useMemo(() => {
    return WFD_SENTENCES.reduce(
      (acc, item) => {
        const status = statusMap[item.code]
        if (status?.status === 'known') acc.known += 1
        if (status?.status === 'unknown') acc.unknown += 1
        if (!status) acc.unmarked += 1
        return acc
      },
      { known: 0, unknown: 0, unmarked: 0 }
    )
  }, [statusMap])

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <section className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-bold">WFD</span>
          <h1 className="text-2xl font-bold text-gray-900">Write From Dictation</h1>
          <span className="text-sm text-gray-400 font-mono">Listening · 高频213句</span>
        </div>
        <p className="text-gray-500 text-sm">听写句子，重点训练拼写、单复数、冠词和句子完整度。</p>
      </section>

      <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(220px,1fr)_auto_auto_auto] lg:items-center">
          <label>
            <span className="sr-only">搜索句子</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索英文 / 中文 / 编号"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </label>

          <select
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
          >
            {LABELS.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <select
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
          >
            {DIFFICULTIES.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => setShowChinese((current) => !current)}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            {showChinese ? '隐藏中文' : '显示中文'}
          </button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {STATUS_FILTERS.map((item) => {
            const count =
              item === '会'
                ? statusCounts.known
                : item === '不会'
                  ? statusCounts.unknown
                  : item === '未标记'
                    ? statusCounts.unmarked
                    : WFD_SENTENCES.length

            return (
              <button
                key={item}
                type="button"
                onClick={() => setStatusFilter(item)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  statusFilter === item
                    ? 'bg-indigo-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {item} {count}
              </button>
            )
          })}
        </div>
        <p className="mt-3 text-sm text-gray-500">当前显示 {sentences.length} / {WFD_SENTENCES.length} 句</p>
      </section>

      <section className="space-y-3">
        {sentences.map((item) => {
          const status = statusMap[item.code]?.status

          return (
            <article
              key={item.code}
              className={`rounded-xl border bg-white p-5 ${
                status === 'unknown'
                  ? 'border-rose-200'
                  : status === 'known'
                    ? 'border-emerald-200'
                    : 'border-gray-200'
              }`}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-mono text-gray-600">
                  #{item.number}
                </span>
                <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-mono text-indigo-700">
                  {item.code}
                </span>
                {item.labels.map((tag) => (
                  <span key={tag} className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
                    {tag}
                  </span>
                ))}
                {item.difficulty && (
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                    {item.difficulty}
                  </span>
                )}
              </div>
              <p className="text-lg font-semibold leading-8 text-gray-900">{item.sentence}</p>
              {showChinese && (
                <p className="mt-2 text-sm leading-6 text-gray-500">{item.translation}</p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => updateStatus(item.code, 'known')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    status === 'known'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                  }`}
                >
                  会
                </button>
                <button
                  type="button"
                  onClick={() => updateStatus(item.code, 'unknown')}
                  className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    status === 'unknown'
                      ? 'bg-rose-600 text-white'
                      : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                  }`}
                >
                  不会
                </button>
              </div>
            </article>
          )
        })}
      </section>

      {sentences.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white py-12 text-center text-gray-500">
          没有找到匹配的 WFD 句子
        </div>
      )}
    </main>
  )
}
