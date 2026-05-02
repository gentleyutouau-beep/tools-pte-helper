'use client'

import { useState } from 'react'
import VocabularyBookPage from '@/components/VocabularyBookPage'
import { VOCABULARY_BOOKS } from '@/lib/vocabulary'

export default function VocabularyZonePage() {
  const [activeSlug, setActiveSlug] = useState(VOCABULARY_BOOKS[0].slug)
  const activeBook = VOCABULARY_BOOKS.find((book) => book.slug === activeSlug) ?? VOCABULARY_BOOKS[0]

  return (
    <>
      <main className="max-w-6xl mx-auto px-4 pt-10">
        <section className="mb-6">
          <p className="text-sm font-semibold text-teal-700">Vocabulary</p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">词汇专区</h1>
          <p className="mt-2 text-gray-500">直接选择词汇本，标记会/不会后可按状态筛选。</p>
        </section>

        <section className="mb-2 flex gap-2 overflow-x-auto pb-1">
          {VOCABULARY_BOOKS.map((book) => (
            <button
              key={book.slug}
              type="button"
              onClick={() => setActiveSlug(book.slug)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                book.slug === activeSlug
                  ? 'bg-gray-900 text-white'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {book.title}
              <span className="ml-2 font-mono text-xs opacity-70">{book.words.length}</span>
            </button>
          ))}
        </section>
      </main>

      <VocabularyBookPage book={activeBook} showBackLink={false} />
    </>
  )
}
