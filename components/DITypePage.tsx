'use client'
import { useState } from 'react'
import Image from 'next/image'
import { DI_TYPE_TEMPLATES } from '@/lib/data'
import { renderWithSlots } from './SlotBadge'

export default function DITypePage() {
  const [activeId, setActiveId] = useState(DI_TYPE_TEMPLATES[0].id)
  const active = DI_TYPE_TEMPLATES.find(t => t.id === activeId)!

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-6 pb-5 border-b border-gray-100">
        {DI_TYPE_TEMPLATES.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              activeId === t.id
                ? `${t.color} text-white shadow-sm`
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span>{t.emoji}</span>
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-5 flex items-center gap-2">
            <span className="text-xl">{active.emoji}</span>
            {active.label} — 模板结构
          </h3>
          <div className="space-y-3.5">
            {active.parts.map((part, i) => (
              <div key={i} className="flex gap-3 items-start">
                <span className="text-xs font-semibold text-gray-400 w-36 shrink-0 pt-0.5 leading-relaxed">{part.label}</span>
                <div className="flex-1">
                  <p className={`text-gray-800 leading-relaxed text-sm ${part.strikethrough ? 'line-through decoration-2 decoration-gray-500' : ''}`}>
                    {renderWithSlots(part.template, part.slots)}
                  </p>
                  {part.note && <p className="text-xs text-gray-400 mt-0.5 italic">{part.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h3 className="font-bold text-blue-800 mb-4">范例答案</h3>
          {active.imageSrc && (
            <div className="mb-5 flex justify-center">
              <Image
                src={active.imageSrc}
                alt={`${active.label} example`}
                width={600}
                height={360}
                className="rounded-lg border border-blue-100 shadow-sm object-contain max-h-72 w-auto"
              />
            </div>
          )}
          <div className="space-y-3">
            {active.example.map((line, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-xs font-semibold text-blue-400 w-36 shrink-0 pt-0.5 leading-relaxed">{line.label}</span>
                <p className="text-blue-900 leading-relaxed text-sm flex-1">{line.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-semibold text-amber-800 mb-2.5">答题技巧</h3>
          <ul className="space-y-1.5">
            {active.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                <span className="font-bold shrink-0 mt-px">✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
