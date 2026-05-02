import NavBar from '@/components/NavBar'
import ROPage from '@/components/ROPage'

export default function RORoutePage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-lime-600 text-white text-sm font-bold">RO</span>
            <h1 className="text-2xl font-bold text-gray-900">Re-order Paragraphs</h1>
            <span className="text-sm text-gray-400 font-mono">Reading · 9%</span>
          </div>
          <p className="text-gray-500 text-sm">找首句 · 找连接词 · 找指代词 — 点击题目展开顺序、顺口溜与对应词分析</p>
        </div>
        <ROPage />
      </main>
    </>
  )
}
