'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { VocabularyBook, VOCABULARY_BOOKS } from '@/lib/vocabulary'
import { getVocabularyEntry } from '@/lib/vocabularyDetails'
import { useSyncedProgress } from '@/lib/useSyncedProgress'

interface Props {
  book: VocabularyBook
  showBackLink?: boolean
  showBookTabs?: boolean
}

type WordStatus = 'known' | 'unknown'
type FilterStatus = 'all' | WordStatus | 'unmarked'

const STORAGE_KEY = 'pte-vocabulary-status-v1'
const PROGRESS_SCOPE = 'vocabulary'

export default function VocabularyBookPage({ book, showBackLink = true, showBookTabs = false }: Props) {
  const [query, setQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const { statusMap, updateStatus } = useSyncedProgress(
    STORAGE_KEY,
    PROGRESS_SCOPE,
    'vocabulary'
  )
  const normalizedQuery = query.trim().toLowerCase()

  const words = useMemo(() => {
    return book.words.filter((word) => {
      const wordKey = word.toLowerCase()
      const matchesQuery = !normalizedQuery || wordKey.includes(normalizedQuery)
      const status = statusMap[wordKey]?.status
      const matchesStatus =
        filterStatus === 'all' ||
        (filterStatus === 'unmarked' && !status) ||
        status === filterStatus

      return matchesQuery && matchesStatus
    })
  }, [book.words, filterStatus, normalizedQuery, statusMap])

  const counts = useMemo(() => {
    return book.words.reduce(
      (acc, word) => {
        const status = statusMap[word.toLowerCase()]
        if (status?.status === 'known') acc.known += 1
        if (status?.status === 'unknown') acc.unknown += 1
        if (!status) acc.unmarked += 1
        return acc
      },
      { known: 0, unknown: 0, unmarked: 0 }
    )
  }, [book.words, statusMap])

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {showBackLink && (
        <div className="mb-6">
          <Link href="/vocab" className="text-sm text-teal-700 hover:text-teal-900">← 返回词汇专区</Link>
        </div>
      )}

      <section className="mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">{book.category}</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="mt-2 text-gray-500">共 {book.words.length} 个词，按原词表顺序整理。</p>
          </div>
          <Link
            href={`/vocab/${book.slug}/spelling`}
            className="inline-flex items-center justify-center rounded-lg bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-800"
          >
            开始拼写练习
          </Link>
        </div>
      </section>

      {showBookTabs && (
        <section className="mb-6 flex gap-2 overflow-x-auto pb-1">
          {VOCABULARY_BOOKS.map((item) => (
            <Link
              key={item.slug}
              href={`/vocab/${item.slug}`}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                item.slug === book.slug
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {item.title}
            </Link>
          ))}
        </section>
      )}

      <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <label className="block w-full lg:w-80">
            <span className="sr-only">搜索单词</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索单词"
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {[
              ['all', `全部 ${book.words.length}`],
              ['unknown', `不会 ${counts.unknown}`],
              ['known', `会 ${counts.known}`],
              ['unmarked', `未标记 ${counts.unmarked}`],
            ].map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilterStatus(value as FilterStatus)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  filterStatus === value
                    ? 'bg-teal-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {words.map((word, index) => {
          const entry = getVocabularyEntry(word)
          const status = statusMap[word.toLowerCase()]?.status
          return (
            <article
              key={`${word}-${index}`}
              className={`rounded-lg border p-4 transition-colors ${
                status === 'unknown'
                  ? 'bg-rose-50 border-rose-300'
                  : status === 'known'
                    ? 'bg-emerald-50 border-emerald-300'
                    : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-gray-900">{word}</h2>
                  <p className="mt-1.5 text-sm text-gray-600">
                    {entry.senses.map((sense, i) => (
                      <span key={`${word}-${sense.partOfSpeech}-${sense.translation}`}>
                        {i > 0 && <span className="mx-2 text-gray-300">|</span>}
                        <span className="font-semibold text-gray-500">{sense.partOfSpeech}</span>
                        <span className="mx-1">·</span>
                        {sense.translation}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    title="会"
                    onClick={() => updateStatus(word, 'known')}
                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                      status === 'known'
                        ? 'bg-emerald-500 text-white'
                        : 'text-gray-300 hover:bg-emerald-100 hover:text-emerald-600'
                    }`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
                      <polyline points="2.5,8.5 6,12 13.5,4.5" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    title="不会"
                    onClick={() => updateStatus(word, 'unknown')}
                    className={`flex items-center justify-center w-7 h-7 rounded-full transition-colors ${
                      status === 'unknown'
                        ? 'bg-rose-500 text-white'
                        : 'text-gray-300 hover:bg-rose-100 hover:text-rose-600'
                    }`}
                  >
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-3.5 h-3.5">
                      <line x1="4" y1="4" x2="12" y2="12" />
                      <line x1="12" y1="4" x2="4" y2="12" />
                    </svg>
                  </button>
                  <span className="ml-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-mono text-gray-400">
                    {book.words.indexOf(word) + 1}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-700">{entry.example}</p>
            </article>
          )
        })}
      </section>

      {words.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-white py-12 text-center text-gray-500">
          没有找到匹配的单词
        </div>
      )}
    </main>
  )
}
