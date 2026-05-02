import NavBar from '@/components/NavBar'
import DITypePage from '@/components/DITypePage'

export default function DIPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-violet-500 text-white text-sm font-bold">DI</span>
            <h1 className="text-2xl font-bold text-gray-900">Describe Image</h1>
            <span className="text-sm text-gray-400 font-mono">Speaking · 31%</span>
          </div>
          <p className="text-gray-500 text-sm">看图说话，25秒准备，40秒录音 — 选择图表类型查看专属模板与范例</p>
        </div>
        <DITypePage />
      </main>
    </>
  )
}
