import { createClient, type Client } from '@libsql/client'

type ProgressStatus = 'known' | 'unknown'

export interface ProgressRecord {
  key: string
  status: ProgressStatus
  updatedAt: number
}

let client: Client | null = null

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

export async function readProgress(syncId: string, scope: string): Promise<ProgressRecord[]> {
  const result = await getClient().execute({
    sql: 'SELECT item_key, status, updated_at FROM progress_statuses_v2 WHERE sync_id = ? AND scope = ?',
    args: [syncId, scope],
  })

  return result.rows.map((row) => ({
    key: String(row.item_key),
    status: row.status === 'known' ? 'known' : 'unknown',
    updatedAt: Number(row.updated_at),
  }))
}

export async function writeProgress(syncId: string, scope: string, records: ProgressRecord[]) {
  const validRecords = records.filter(
    (record) =>
      record.key &&
      (record.status === 'known' || record.status === 'unknown') &&
      Number.isFinite(record.updatedAt)
  )

  if (validRecords.length === 0) return

  await getClient().batch(
    validRecords.map((record) => ({
      sql: `
        INSERT INTO progress_statuses_v2 (sync_id, scope, item_key, status, updated_at)
        VALUES (?, ?, ?, ?, ?)
        ON CONFLICT(sync_id, scope, item_key) DO UPDATE SET
          status = CASE
            WHEN excluded.updated_at >= progress_statuses_v2.updated_at THEN excluded.status
            ELSE progress_statuses_v2.status
          END,
          updated_at = MAX(progress_statuses_v2.updated_at, excluded.updated_at)
        WHERE
          excluded.updated_at > progress_statuses_v2.updated_at OR
          (
            excluded.updated_at = progress_statuses_v2.updated_at AND
            excluded.status <> progress_statuses_v2.status
          )
      `,
      args: [syncId, scope, record.key, record.status, record.updatedAt],
    })),
    'write'
  )
}
