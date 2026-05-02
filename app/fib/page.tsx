import NavBar from '@/components/NavBar'
import FIBPage from '@/components/FIBPage'

export default function FIBRoutePage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-cyan-500 text-white text-sm font-bold">FIB</span>
            <h1 className="text-2xl font-bold text-gray-900">Fill in the Blanks</h1>
            <span className="text-sm text-gray-400 font-mono">Reading · FIB-RW 25% + FIB-R 20%</span>
          </div>
          <p className="text-gray-500 text-sm">28秒语法秒选法则 + 机经固定搭配合集 — 快速判断词性、锁定答案</p>
        </div>
        <FIBPage />
      </main>
    </>
  )
}
