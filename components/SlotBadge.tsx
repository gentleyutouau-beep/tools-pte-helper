import React from 'react'

export function SlotBadge({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200 mx-0.5">
      [{text}]
    </span>
  )
}

export function renderWithSlots(text: string, slots: string[]): React.ReactNode {
  if (slots.length === 0) return text
  const parts: React.ReactNode[] = []
  let remaining = text
  let key = 0
  for (const slot of slots) {
    const marker = `[${slot}]`
    const idx = remaining.indexOf(marker)
    if (idx === -1) continue
    if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>)
    parts.push(<SlotBadge key={key++} text={slot} />)
    remaining = remaining.slice(idx + marker.length)
  }
  if (remaining) parts.push(<span key={key++}>{remaining}</span>)
  return <>{parts}</>
}
