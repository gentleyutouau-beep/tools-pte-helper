import NavBar from '@/components/NavBar'
import SimpleTemplatePage from '@/components/SimpleTemplatePage'
import { RL_TEMPLATE } from '@/lib/data'

export default function RLPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-orange-500 text-white text-sm font-bold">RL</span>
            <h1 className="text-2xl font-bold text-gray-900">Retell Lecture</h1>
            <span className="text-sm text-gray-400 font-mono">Speaking · 13%+13%</span>
          </div>
          <p className="text-gray-500 text-sm">听讲座（60-90秒），口头复述，10秒准备，40秒录音</p>
        </div>
        <SimpleTemplatePage template={RL_TEMPLATE} rules={RL_TEMPLATE.tips} />
      </main>
    </>
  )
}
