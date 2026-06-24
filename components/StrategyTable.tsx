'use client'
import { Fragment } from 'react'
import { WE_STRATEGY, ESSAY_TYPE_META, EssayType } from '@/lib/data'
import { SlotBadge } from './SlotBadge'

function renderTemplate(text: string, slots: string[]) {
  if (!slots.length) return <span className="italic text-gray-500 text-sm">{text}</span>
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0
  for (const slot of slots) {
    const marker = `[${slot}]`
    const idx = remaining.indexOf(marker)
    if (idx === -1) continue
    if (idx > 0) parts.push(<span key={key++} className="italic text-gray-500 text-sm">{remaining.slice(0, idx)}</span>)
    parts.push(<SlotBadge key={key++} text={slot} />)
    remaining = remaining.slice(idx + marker.length)
  }
  if (remaining) parts.push(<span key={key++} className="italic text-gray-500 text-sm">{remaining}</span>)
  return <>{parts}</>
}

const ESSAY_TYPES: (EssayType | 'all')[] = ['agree', 'pros_cons', 'two_views', 'problem_solution', 'cause_effect']

export default function StrategyTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="text-left px-3 py-2 font-semibold w-10">句</th>
            <th className="text-left px-3 py-2 font-semibold min-w-64">模板句子</th>
            {ESSAY_TYPES.map(t => (
              <th key={t} className={`text-left px-3 py-2 font-semibold min-w-36 ${ESSAY_TYPE_META[t].text}`}>
                {ESSAY_TYPE_META[t].label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WE_STRATEGY.map(section => (
            <Fragment key={section.id}>
              <tr key={section.id} className="bg-gray-50">
                <td colSpan={7} className="px-3 py-2 font-bold text-gray-700 border-t-2 border-gray-200">
                  {section.title}
                </td>
              </tr>
              {section.sentences.map(sent => {
                const isAll = sent.guidance.length === 1 && sent.guidance[0].type === 'all'
                return (
                  <tr key={sent.label} className="border-t border-gray-100 hover:bg-gray-50 align-top">
                    <td className="px-3 py-3 font-mono text-gray-400 text-xs whitespace-nowrap">{sent.label}</td>
                    <td className="px-3 py-3 leading-relaxed">{renderTemplate(sent.template, sent.slots)}</td>
                    {isAll ? (
                      <td colSpan={5} className={`px-3 py-3 ${ESSAY_TYPE_META['all'].bg} ${ESSAY_TYPE_META['all'].text} text-xs rounded`}>
                        <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${ESSAY_TYPE_META['all'].bg} ${ESSAY_TYPE_META['all'].border} border ${ESSAY_TYPE_META['all'].text} mb-1`}>
                          所有题型相同
                        </span>
                        <p>{sent.guidance[0].text}</p>
                      </td>
                    ) : (
                      ESSAY_TYPES.map(t => {
                        const g = sent.guidance.find(gg => gg.type === t)
                        const meta = ESSAY_TYPE_META[t]
                        return (
                          <td key={t} className={`px-3 py-3 text-xs ${meta.bg}`}>
                            {g ? (
                              <div className={`${meta.text} leading-relaxed`}>{g.text}</div>
                            ) : (
                              <span className="text-gray-300">—</span>
                            )}
                          </td>
                        )
                      })
                    )}
                  </tr>
                )
              })}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}
