'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { PAGE_META } from '@/lib/data'

export default function NavBar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4 flex-wrap">
        <Link href="/" className="font-bold text-gray-800 text-lg shrink-0">PTE 备考助手</Link>
        <div className="flex gap-2 flex-wrap">
          {PAGE_META.map(p => (
            <Link
              key={p.href}
              href={p.href}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                isActive(p.href)
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {p.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
