'use client'
import { useState } from 'react'
import { WE_TEMPLATE, WE_TEMPLATE_PLAIN } from '@/lib/data'
import { renderWithSlots } from './SlotBadge'

export default function TemplatePage() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(WE_TEMPLATE_PLAIN)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800">完整模板</h2>
        <button
          onClick={copy}
          className="px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
        >
          {copied ? '已复制 ✓' : '复制模板'}
        </button>
      </div>
      <div className="space-y-6">
        {WE_TEMPLATE.map(para => (
          <div key={para.id} className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-700 mb-4 pb-2 border-b border-gray-100">{para.title}</h3>
            <div className="space-y-3">
              {para.sentences.map((sent, i) => (
                <p key={i} className="leading-relaxed text-gray-800">
                  {renderWithSlots(sent.text, sent.slots)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
