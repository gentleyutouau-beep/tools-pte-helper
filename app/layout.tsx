import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PTE 备考助手',
  description: 'PTE Academic 解题模板与策略参考',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-gray-50 min-h-screen font-sans">{children}</body>
    </html>
  )
}
