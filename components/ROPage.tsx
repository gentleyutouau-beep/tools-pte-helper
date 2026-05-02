'use client'
import { useState } from 'react'
import { RO_STRATEGY_TIPS, RO_EXAMPLES } from '@/lib/data'

type Tag = '全部' | '预测' | '解析' | '不完整'

const TAG_COLORS: Record<string, string> = {
  预测: 'bg-blue-100 text-blue-700',
  解析: 'bg-green-100 text-green-700',
  不完整: 'bg-amber-100 text-amber-700',
}

export default function ROPage() {
  const [activeTag, setActiveTag] = useState<Tag>('全部')
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered = activeTag === '全部'
    ? RO_EXAMPLES
    : RO_EXAMPLES.filter(item => item.tag === activeTag)

  const counts = {
    全部: RO_EXAMPLES.length,
    预测: RO_EXAMPLES.filter(i => i.tag === '预测').length,
    解析: RO_EXAMPLES.filter(i => i.tag === '解析').length,
    不完整: RO_EXAMPLES.filter(i => i.tag === '不完整').length,
  }

  return (
    <div>
      {/* Strategy Tips */}
      <div className="bg-lime-50 border border-lime-200 rounded-xl p-5 mb-6">
        <h3 className="font-bold text-lime-800 mb-3 text-sm">🧠 核心答题策略</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {RO_STRATEGY_TIPS.map((tip, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="text-lg leading-none mt-0.5">{tip.icon}</span>
              <div>
                <span className="font-semibold text-lime-800 text-sm">{tip.title}：</span>
                <span className="text-lime-700 text-sm">{tip.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tags */}
      <div className="flex gap-2 flex-wrap mb-5">
        {(['全部', '预测', '解析', '不完整'] as Tag[]).map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeTag === tag
                ? 'bg-lime-600 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tag}
            <span className="ml-1 text-xs opacity-75">({counts[tag]})</span>
          </button>
        ))}
      </div>

      {/* Example List */}
      <div className="space-y-3">
        {filtered.map(item => {
          const isOpen = openId === item.id
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
            >
              {/* Header (always visible) */}
              <button
                className="w-full text-left px-5 py-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="text-xs font-bold text-gray-400 w-6 shrink-0">#{item.id}</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${TAG_COLORS[item.tag]}`}>
                  {item.tag}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-800 text-sm">{item.title}</span>
                  <span className="text-gray-400 text-xs ml-2">{item.titleEn}</span>
                </div>
                {/* Correct order preview */}
                <div className="hidden sm:flex gap-1 shrink-0">
                  {item.order.map((k, i) => (
                    <span key={i} className="w-6 h-6 rounded-full bg-lime-100 text-lime-700 text-xs font-bold flex items-center justify-center">
                      {k}
                    </span>
                  ))}
                </div>
                <span className="text-gray-400 text-sm ml-2">{isOpen ? '▲' : '▼'}</span>
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 space-y-4">
                  {/* Correct Order */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">正确顺序</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.order.map((k, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="w-7 h-7 rounded-full bg-lime-500 text-white text-sm font-bold flex items-center justify-center">
                            {k}
                          </span>
                          {i < item.order.length - 1 && <span className="text-gray-300">→</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sentences */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">句子对照</p>
                    <div className="space-y-2">
                      {item.sentences.map(s => (
                        <div key={s.key} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                          <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {s.key}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800 leading-relaxed">{s.text}</p>
                            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{s.zh}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rhyme / 顺口溜 */}
                  {item.rhyme && (
                    <div className="bg-violet-50 border border-violet-200 rounded-lg p-3">
                      <p className="text-xs font-semibold text-violet-700 mb-1">🎵 顺口溜</p>
                      <p className="text-sm text-violet-800">{item.rhyme}</p>
                    </div>
                  )}

                  {/* Keywords */}
                  {item.keywords.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">找对应词</p>
                      <div className="space-y-1.5">
                        {item.keywords.map((kw, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="w-5 h-5 rounded-full bg-lime-100 text-lime-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {kw.from}
                            </span>
                            <span className="text-gray-400 shrink-0 mt-0.5">→</span>
                            <span className="w-5 h-5 rounded-full bg-lime-100 text-lime-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {kw.to}
                            </span>
                            <span className="text-gray-700 text-xs leading-relaxed">{kw.word}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Note */}
                  {item.note && (
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-blue-700 mb-1">📝 机经点评</p>
                      <p className="text-sm text-blue-800">{item.note}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400 text-sm">该分类暂无题目</div>
      )}
    </div>
  )
}
