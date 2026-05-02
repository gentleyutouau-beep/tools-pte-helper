'use client'
import { useState } from 'react'
import { MATERIALS } from '@/lib/data'

export default function MaterialsBank() {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden mt-8">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
      >
        <span className="font-semibold text-gray-800">万能素材库 Materials Bank</span>
        <span className="text-gray-400 text-xl">{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-white">
          {MATERIALS.map(card => (
            <div key={card.domain} className="border border-gray-100 rounded-lg p-4">
              <div className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal-400 inline-block"></span>
                {card.domain}
              </div>
              <ul className="space-y-1">
                {card.examples.map(ex => (
                  <li key={ex} className="text-sm text-gray-600 flex items-start gap-1.5">
                    <span className="text-gray-300 mt-0.5">•</span>
                    {ex}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
