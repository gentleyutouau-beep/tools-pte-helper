import { createClient, type Client } from '@libsql/client'

export interface CheckInRecord {
  person: string
  dateKey: string
  columnId: string
  value: string
  updatedAt: number
}

let client: Client | null = null
let initialized = false

function getClient() {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url || !authToken) {
    throw new Error('Missing TURSO_DATABASE_URL or TURSO_AUTH_TOKEN')
  }

  if (!client) {
    client = createClient({ url, authToken })
  }

  return client
}

async function ensureSchema() {
  if (initialized) return

  await getClient().execute(`
    CREATE TABLE IF NOT EXISTS checkin_records_v1 (
      person TEXT NOT NULL,
      date_key TEXT NOT NULL,
      column_id TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (person, date_key, column_id)
    )
  `)

  initialized = true
}

export async function readCheckInRecords(): Promise<CheckInRecord[]> {
  await ensureSchema()

  const result = await getClient().execute(`
    SELECT person, date_key, column_id, value, updated_at
    FROM checkin_records_v1
  `)

  return result.rows.map((row) => ({
    person: String(row.person),
    dateKey: String(row.date_key),
    columnId: String(row.column_id),
    value: String(row.value),
    updatedAt: Number(row.updated_at),
  }))
}

export async function writeCheckInRecords(records: CheckInRecord[]) {
  await ensureSchema()

  const validRecords = records.filter(
    (record) =>
      record.person &&
      record.dateKey &&
      record.columnId &&
      /^\d{4}-\d{2}-\d{2}$/.test(record.dateKey) &&
      /^\d*$/.test(record.value) &&
      Number.isFinite(record.updatedAt)
  )

  if (validRecords.length === 0) return

  await getClient().batch(
    validRecords.map((record) => {
      if (record.value === '') {
        return {
          sql: `
            DELETE FROM checkin_records_v1
            WHERE person = ? AND date_key = ? AND column_id = ? AND updated_at <= ?
          `,
          args: [record.person, record.dateKey, record.columnId, record.updatedAt],
        }
      }

      return {
        sql: `
          INSERT INTO checkin_records_v1 (person, date_key, column_id, value, updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(person, date_key, column_id) DO UPDATE SET
            value = CASE
              WHEN excluded.updated_at >= checkin_records_v1.updated_at THEN excluded.value
              ELSE checkin_records_v1.value
            END,
            updated_at = MAX(checkin_records_v1.updated_at, excluded.updated_at)
          WHERE excluded.updated_at >= checkin_records_v1.updated_at
        `,
        args: [record.person, record.dateKey, record.columnId, record.value, record.updatedAt],
      }
    }),
    'write'
  )
}
