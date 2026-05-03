import { createClient, type Client } from '@libsql/client'

type ProgressStatus = 'known' | 'unknown'

export interface ProgressRecord {
  key: string
  status: ProgressStatus
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
    CREATE TABLE IF NOT EXISTS progress_statuses (
      scope TEXT NOT NULL,
      item_key TEXT NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('known', 'unknown')),
      updated_at INTEGER NOT NULL,
      PRIMARY KEY (scope, item_key)
    )
  `)

  initialized = true
}

export async function readProgress(scope: string): Promise<ProgressRecord[]> {
  await ensureSchema()

  const result = await getClient().execute({
    sql: 'SELECT item_key, status, updated_at FROM progress_statuses WHERE scope = ?',
    args: [scope],
  })

  return result.rows.map((row) => ({
    key: String(row.item_key),
    status: row.status === 'known' ? 'known' : 'unknown',
    updatedAt: Number(row.updated_at),
  }))
}

export async function writeProgress(scope: string, records: ProgressRecord[]) {
  await ensureSchema()

  const validRecords = records.filter(
    (record) =>
      record.key &&
      (record.status === 'known' || record.status === 'unknown') &&
      Number.isFinite(record.updatedAt)
  )

  if (validRecords.length === 0) return

  const db = getClient()
  await db.batch(
    validRecords.map((record) => ({
      sql: `
        INSERT INTO progress_statuses (scope, item_key, status, updated_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(scope, item_key) DO UPDATE SET
          status = CASE
            WHEN excluded.updated_at >= progress_statuses.updated_at THEN excluded.status
            ELSE progress_statuses.status
          END,
          updated_at = MAX(progress_statuses.updated_at, excluded.updated_at)
      `,
      args: [scope, record.key, record.status, record.updatedAt],
    })),
    'write'
  )
}
