import NavBar from '@/components/NavBar'
import SimpleTemplatePage from '@/components/SimpleTemplatePage'
import { RTS_TEMPLATE } from '@/lib/data'

export default function RTSPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-sm font-bold">RTS</span>
            <h1 className="text-2xl font-bold text-gray-900">Respond to a Situation</h1>
            <span className="text-sm text-gray-400 font-mono">Speaking · 13%</span>
          </div>
          <p className="text-gray-500 text-sm">读题目情境，口头回应，20秒准备，40秒录音，PTE Academic 新题型</p>
        </div>
        <SimpleTemplatePage template={RTS_TEMPLATE} rules={RTS_TEMPLATE.tips} />
      </main>
    </>
  )
}
