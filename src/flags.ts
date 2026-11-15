import { useCallback, useMemo, useState } from 'react'

const STORAGE_KEY = 'varkala-flagged-reviews'

function readIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item) => typeof item === 'string')
  } catch {
    return []
  }
}

function writeIds(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
}

export function useFlaggedReviews() {
  const [ids, setIds] = useState<string[]>(readIds)
  const flagged = useMemo(() => new Set(ids), [ids])

  const flag = useCallback((id: string) => {
    setIds((current) => {
      if (current.includes(id)) return current
      const next = [...current, id]
      writeIds(next)
      return next
    })
  }, [])

  const unflag = useCallback((id: string) => {
    setIds((current) => {
      const next = current.filter((item) => item !== id)
      writeIds(next)
      return next
    })
  }, [])

  return { flagged, flag, unflag }
}
