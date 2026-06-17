import Link from 'next/link'
import NavBar from '@/components/NavBar'
import { PAGE_META } from '@/lib/data'
import { VOCABULARY_BOOKS } from '@/lib/vocabulary'

const CATEGORY_ORDER = ['Tracker', 'Writing', 'Speaking', 'Listening', 'Reading', 'Vocabulary']

export default function HomePage() {
  const grouped: Record<string, typeof PAGE_META> = {}
  for (const p of PAGE_META) {
    if (!grouped[p.category]) grouped[p.category] = []
    grouped[p.category].push(p)
  }

  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">PTE 备考助手</h1>
          <p className="text-gray-500">高频题型模板 · 解题策略 · 万能素材库</p>
        </div>

        <div className="space-y-10">
          {CATEGORY_ORDER.filter(c => grouped[c]).map(category => (
            <div key={category}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-teal-400 rounded-full inline-block"></span>
                {category}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category === 'Vocabulary' ? VOCABULARY_BOOKS.map((book) => (
                  <Link
                    key={book.slug}
                    href={`/vocab/${book.slug}`}
                    className="group block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-1 rounded-full text-white text-sm font-bold bg-cyan-600">词汇</span>
                      <span className="text-xs text-gray-400 font-mono">{book.words.length}</span>
                    </div>
                    <p className="text-gray-700 font-medium mt-2 group-hover:text-gray-900">{book.title}</p>
                    <p className="text-xs text-gray-400 mt-1">点击查看单词列表 →</p>
                  </Link>
                )) : grouped[category].map(p => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="group block bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow hover:border-gray-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2.5 py-1 rounded-full text-white text-sm font-bold ${p.color}`}>{p.label}</span>
                      <span className="text-xs text-gray-400 font-mono">{p.weight}</span>
                    </div>
                    <p className="text-gray-700 font-medium mt-2 group-hover:text-gray-900">{p.fullLabel}</p>
                    <p className="text-xs text-gray-400 mt-1">点击查看模板与解题策略 →</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}
