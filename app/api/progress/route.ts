import { NextRequest, NextResponse } from 'next/server'
import { readProgress, writeProgress, type ProgressRecord } from '@/lib/progressStore'

const ALLOWED_SCOPES = new Set(['vocabulary', 'wfd'])
const MAX_RECORDS_PER_REQUEST = 500

export const dynamic = 'force-dynamic'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function isScope(value: unknown): value is string {
  return typeof value === 'string' && ALLOWED_SCOPES.has(value)
}

function isSyncId(value: unknown): value is string {
  return typeof value === 'string' && /^[a-zA-Z0-9_-]{8,80}$/.test(value)
}

function parseRecords(value: unknown): ProgressRecord[] | null {
  if (!Array.isArray(value) || value.length > MAX_RECORDS_PER_REQUEST) return null

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
      key.length > 160 ||
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
  const syncId = request.nextUrl.searchParams.get('syncId')
  if (!isScope(scope)) return badRequest('Invalid scope')
  if (!isSyncId(syncId)) return badRequest('Invalid syncId')

  try {
    const records = await readProgress(syncId, scope)
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
  const syncId = payload.syncId
  const records = parseRecords(payload.records)

  if (!isScope(scope)) return badRequest('Invalid scope')
  if (!isSyncId(syncId)) return badRequest('Invalid syncId')
  if (!records) return badRequest('Invalid records')

  try {
    await writeProgress(syncId, scope, records)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to write progress' }, { status: 500 })
  }
}
