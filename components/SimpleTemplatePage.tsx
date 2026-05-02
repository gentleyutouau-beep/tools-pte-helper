'use client'
import { useState } from 'react'
import { SimpleTemplate } from '@/lib/data'
import { renderWithSlots } from './SlotBadge'

interface Props {
  template: SimpleTemplate | SimpleTemplate[]
  rules?: string[]
  extra?: React.ReactNode
  plainText?: string
}

function TemplateCard({ t, plainText }: { t: SimpleTemplate; plainText?: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    const text = plainText ?? t.parts.map(p => `${p.label}: ${p.text}`).join('\n')
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">{t.label}</h3>
        {plainText !== undefined && (
          <button
            onClick={copy}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
          >
            {copied ? '已复制 ✓' : '复制'}
          </button>
        )}
      </div>
      <div className="space-y-3">
        {t.parts.map((part, i) => (
          <div key={i} className="flex gap-3">
            <span className="text-xs font-semibold text-gray-400 w-28 shrink-0 pt-0.5">{part.label}</span>
            <p className="text-gray-800 leading-relaxed flex-1">
              {renderWithSlots(part.text, part.slots)}
            </p>
          </div>
        ))}
      </div>
      {t.note && (
        <p className="mt-4 text-sm text-teal-700 bg-teal-50 rounded-lg px-3 py-2">{t.note}</p>
      )}
    </div>
  )
}

export default function SimpleTemplatePage({ template, rules, extra, plainText }: Props) {
  const templates = Array.isArray(template) ? template : [template]

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {templates.map((t) => (
        <TemplateCard key={t.id} t={t} plainText={templates.length === 1 ? plainText : undefined} />
      ))}

      {rules && rules.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-800 mb-3">重要规则</h3>
          <ul className="space-y-2">
            {rules.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-amber-700">
                <span className="font-bold shrink-0">✓</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {extra}
    </div>
  )
}
