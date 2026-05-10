'use client'

import { useEffect, useState } from 'react'

interface Props {
  syncId: string
  onUseSyncId: (syncId: string) => boolean
  onCreateNewSyncId: () => void
}

export default function ProgressSyncPanel({ syncId, onUseSyncId, onCreateNewSyncId }: Props) {
  const [draftSyncId, setDraftSyncId] = useState(syncId)

  useEffect(() => {
    setDraftSyncId(syncId)
  }, [syncId])

  return (
    <section className="mb-6 rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-800">同步码</p>
          <p className="mt-1 text-sm text-gray-500">在另一台设备输入同一个同步码即可共享学习进度。</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="block">
            <span className="sr-only">同步码</span>
            <input
              value={draftSyncId}
              onChange={(event) => setDraftSyncId(event.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-mono text-gray-700 outline-none focus:border-gray-500 sm:w-80"
            />
          </label>
          <button
            type="button"
            onClick={() => onUseSyncId(draftSyncId)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            应用
          </button>
          <button
            type="button"
            onClick={onCreateNewSyncId}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            新建
          </button>
        </div>
      </div>
    </section>
  )
}
