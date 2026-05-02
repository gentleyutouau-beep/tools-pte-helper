'use client'
import { useState } from 'react'
import NavBar from '@/components/NavBar'
import StrategyTable from '@/components/StrategyTable'
import TemplatePage from '@/components/TemplatePage'
import MaterialsBank from '@/components/MaterialsBank'

export default function WEPage() {
  const [tab, setTab] = useState<'strategy' | 'template'>('strategy')

  return (
    <>
      <NavBar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-white text-sm font-bold">WE</span>
            <h1 className="text-2xl font-bold text-gray-900">Write Essay</h1>
            <span className="text-sm text-gray-400 font-mono">Writing · 31%</span>
          </div>
          <p className="text-gray-500 text-sm">250字作文，30分钟，考察写作流畅度、词汇、语法、内容</p>
        </div>

        <div className="flex gap-1 mb-6 border-b border-gray-200">
          {([['strategy', '解题方案'], ['template', '完整模板']] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
                tab === key
                  ? 'border-gray-800 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="transition-opacity duration-150">
          {tab === 'strategy' ? <StrategyTable /> : <TemplatePage />}
        </div>

        <MaterialsBank />
      </main>
    </>
  )
}
