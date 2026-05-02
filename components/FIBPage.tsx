'use client'
import { useState } from 'react'
import { FIB_CATEGORIES, FIB_COLLOC_GROUPS } from '@/lib/data'

type Tab = 'rules' | 'colloc'

export default function FIBPage() {
  const [tab, setTab] = useState<Tab>('rules')
  const [activeCategory, setActiveCategory] = useState(FIB_CATEGORIES[0].id)
  const [activeGroup, setActiveGroup] = useState(FIB_COLLOC_GROUPS[0].id)
  const [search, setSearch] = useState('')

  const category = FIB_CATEGORIES.find(c => c.id === activeCategory)!
  const group = FIB_COLLOC_GROUPS.find(g => g.id === activeGroup)!

  const filteredItems = search.trim()
    ? group.items.filter(
        item =>
          item.phrase.toLowerCase().includes(search.toLowerCase()) ||
          item.meaning.includes(search)
      )
    : group.items

  return (
    <div>
      {/* Tab Bar */}
      <div className="flex gap-2 mb-6 pb-5 border-b border-gray-100">
        <button
          onClick={() => setTab('rules')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === 'rules' ? 'bg-cyan-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📐 28 秒选法则
        </button>
        <button
          onClick={() => setTab('colloc')}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            tab === 'colloc' ? 'bg-cyan-500 text-white shadow-sm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          📚 机经固定搭配
        </button>
      </div>

      {tab === 'rules' && (
        <div>
          {/* Category Tab Bar */}
          <div className="flex gap-2 flex-wrap mb-5">
            {FIB_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat.id
                    ? `${cat.color} text-white shadow-sm`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.label}</span>
                <span className="text-xs opacity-75">({cat.rules.length})</span>
              </button>
            ))}
          </div>

          {/* Rules List */}
          <div className={`rounded-xl border ${category.border} ${category.bg} p-5`}>
            <h3 className={`font-bold ${category.text} mb-4 text-base flex items-center gap-2`}>
              <span>{category.emoji}</span>
              {category.label} — {category.rules.length} 条规则
            </h3>
            <div className="space-y-4">
              {category.rules.map((rule, i) => (
                <div key={rule.id} className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${category.color} text-white shrink-0 mt-0.5`}>
                      规则 {i + 1}
                    </span>
                    <code className="text-sm font-mono font-semibold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                      {rule.pattern}
                    </code>
                  </div>
                  <p className="text-sm text-gray-700 mb-2 ml-1">{rule.explanation}</p>
                  <div className="bg-gray-50 rounded-lg p-3 ml-1">
                    <p className="text-xs text-gray-500 font-semibold mb-1">例句</p>
                    <p className="text-sm text-gray-800 leading-relaxed">
                      {rule.example.split(rule.fill).map((part, idx, arr) =>
                        idx < arr.length - 1 ? (
                          <span key={idx}>
                            {part}
                            <span className="inline-block bg-yellow-200 text-yellow-900 font-semibold px-1.5 py-0.5 rounded text-xs mx-0.5">
                              {rule.fill}
                            </span>
                          </span>
                        ) : (
                          <span key={idx}>{part}</span>
                        )
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Card */}
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-amber-800 mb-2">💡 核心答题策略</p>
            <ul className="space-y-1">
              <li className="text-sm text-amber-700">① 先看空格前后各 2–3 个词，判断词性（名词/动词/形容词/副词）</li>
              <li className="text-sm text-amber-700">② 看有无冠词（a/an/the）、介词、情态动词、be动词等"钩子词"</li>
              <li className="text-sm text-amber-700">③ 看句子整体逻辑——正向/转折/因果，判断连词或副词</li>
              <li className="text-sm text-amber-700">④ 排除语法明显不符的选项，剩余2个时优先选更"学术"的词汇</li>
            </ul>
          </div>
        </div>
      )}

      {tab === 'colloc' && (
        <div>
          {/* Group Tab Bar */}
          <div className="flex gap-2 flex-wrap mb-5">
            {FIB_COLLOC_GROUPS.map(grp => (
              <button
                key={grp.id}
                onClick={() => { setActiveGroup(grp.id); setSearch('') }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeGroup === grp.id
                    ? `${grp.color} text-white shadow-sm`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {grp.label}
                <span className="text-xs opacity-75">({grp.items.length})</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="搜索短语或中文释义…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
            />
          </div>

          {/* Collocation Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredItems.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-lg px-4 py-3 shadow-sm">
                <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${group.color} text-white shrink-0`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">{item.phrase}</span>
                  <span className="text-gray-400 mx-1.5 text-xs">→</span>
                  <span className="text-gray-500 text-sm">{item.meaning}</span>
                </div>
              </div>
            ))}
            {filteredItems.length === 0 && (
              <div className="col-span-2 text-center py-8 text-gray-400 text-sm">
                没有找到匹配的搭配
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 text-xs text-gray-400 text-right">
            共 {FIB_COLLOC_GROUPS.reduce((s, g) => s + g.items.length, 0)} 条搭配 · 当前分类 {group.items.length} 条
            {search && ` · 搜索结果 ${filteredItems.length} 条`}
          </div>
        </div>
      )}
    </div>
  )
}
