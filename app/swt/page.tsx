import NavBar from '@/components/NavBar'
import SimpleTemplatePage from '@/components/SimpleTemplatePage'
import MaterialsBank from '@/components/MaterialsBank'
import { SWT_TEMPLATES, SWT_RULES } from '@/lib/data'

export default function SWTPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="px-3 py-1 rounded-full bg-teal-500 text-white text-sm font-bold">SWT</span>
            <h1 className="text-2xl font-bold text-gray-900">Summarize Written Text</h1>
            <span className="text-sm text-gray-400 font-mono">Writing · 28%+23%</span>
          </div>
          <p className="text-gray-500 text-sm">读一篇文章，用一句话总结，5-75词，10分钟</p>
        </div>
        <SimpleTemplatePage template={SWT_TEMPLATES} rules={SWT_RULES} />
        <MaterialsBank />
      </main>
    </>
  )
}
