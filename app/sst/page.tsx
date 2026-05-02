import NavBar from '@/components/NavBar'
import SimpleTemplatePage from '@/components/SimpleTemplatePage'
import MaterialsBank from '@/components/MaterialsBank'
import { SST_TEMPLATE } from '@/lib/data'

export default function SSTPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-sky-500 text-white text-sm font-bold">SST</span>
            <h1 className="text-2xl font-bold text-gray-900">Summarize Spoken Text</h1>
            <span className="text-sm text-gray-400 font-mono">Listening · 18%+10%</span>
          </div>
          <p className="text-gray-500 text-sm">听一段讲座（60-90秒），书面总结，50-70词，10分钟</p>
        </div>
        <SimpleTemplatePage template={SST_TEMPLATE} rules={SST_TEMPLATE.tips} />
        <MaterialsBank />
      </main>
    </>
  )
}
