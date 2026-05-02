import NavBar from '@/components/NavBar'
import SimpleTemplatePage from '@/components/SimpleTemplatePage'
import { SGD_TEMPLATE } from '@/lib/data'

export default function SGDPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-pink-500 text-white text-sm font-bold">SGD</span>
            <h1 className="text-2xl font-bold text-gray-900">Summarize Group Discussion</h1>
            <span className="text-sm text-gray-400 font-mono">Speaking · 20%+19%</span>
          </div>
          <p className="text-gray-500 text-sm">听多人讨论，总结各方观点，10秒准备，90秒录音</p>
        </div>
        <SimpleTemplatePage template={SGD_TEMPLATE} rules={SGD_TEMPLATE.tips} />
      </main>
    </>
  )
}
