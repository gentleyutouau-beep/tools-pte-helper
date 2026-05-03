import { NextRequest, NextResponse } from 'next/server'
import { readProgress, writeProgress, type ProgressRecord } from '@/lib/progressStore'

const ALLOWED_SCOPES = new Set(['vocabulary', 'wfd'])

export const dynamic = 'force-dynamic'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function isScope(value: unknown): value is string {
  return typeof value === 'string' && ALLOWED_SCOPES.has(value)
}

function parseRecords(value: unknown): ProgressRecord[] | null {
  if (!Array.isArray(value)) return null

  const records: ProgressRecord[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') return null
    const record = item as Record<string, unknown>
    const key = record.key
    const status = record.status
    const updatedAt = record.updatedAt

    if (
      typeof key !== 'string' ||
      key.length === 0 ||
      (status !== 'known' && status !== 'unknown') ||
      typeof updatedAt !== 'number' ||
      !Number.isFinite(updatedAt)
    ) {
      return null
    }

    records.push({ key, status, updatedAt })
  }

  return records
}

export async function GET(request: NextRequest) {
  const scope = request.nextUrl.searchParams.get('scope')
  if (!isScope(scope)) return badRequest('Invalid scope')

  try {
    const records = await readProgress(scope)
    return NextResponse.json({ records })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to read progress' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return badRequest('Invalid JSON')
  }

  const payload = body as Record<string, unknown>
  const scope = payload.scope
  const records = parseRecords(payload.records)

  if (!isScope(scope)) return badRequest('Invalid scope')
  if (!records) return badRequest('Invalid records')

  try {
    await writeProgress(scope, records)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to write progress' }, { status: 500 })
  }
}
