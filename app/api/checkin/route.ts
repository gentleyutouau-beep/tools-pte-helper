import { NextRequest, NextResponse } from 'next/server'
import { readCheckInRecords, writeCheckInRecords, type CheckInRecord } from '@/lib/checkInStore'

const PEOPLE = new Set(['Rick', 'Yana'])
const MAX_RECORDS_PER_REQUEST = 500

export const dynamic = 'force-dynamic'

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 })
}

function parseRecords(value: unknown): CheckInRecord[] | null {
  if (!Array.isArray(value) || value.length > MAX_RECORDS_PER_REQUEST) return null

  const records: CheckInRecord[] = []
  for (const item of value) {
    if (!item || typeof item !== 'object') return null
    const record = item as Record<string, unknown>
    const person = record.person
    const dateKey = record.dateKey
    const columnId = record.columnId
    const cellValue = record.value
    const updatedAt = record.updatedAt

    if (
      typeof person !== 'string' ||
      !PEOPLE.has(person) ||
      typeof dateKey !== 'string' ||
      !/^\d{4}-\d{2}-\d{2}$/.test(dateKey) ||
      typeof columnId !== 'string' ||
      columnId.length === 0 ||
      columnId.length > 80 ||
      typeof cellValue !== 'string' ||
      !/^\d*$/.test(cellValue) ||
      typeof updatedAt !== 'number' ||
      !Number.isFinite(updatedAt)
    ) {
      return null
    }

    records.push({ person, dateKey, columnId, value: cellValue, updatedAt })
  }

  return records
}

export async function GET() {
  try {
    const records = await readCheckInRecords()
    return NextResponse.json({ records })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to read check-in records' }, { status: 500 })
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
  const records = parseRecords(payload.records)

  if (!records) return badRequest('Invalid records')

  try {
    await writeCheckInRecords(records)
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Unable to write check-in records' }, { status: 500 })
  }
}
