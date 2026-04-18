import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../lib/github'

const DEFAULT_TEXT = ''

export function useAnnouncement() {
  const [announcement, setAnnouncement] = useState(DEFAULT_TEXT)
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const data = await fetchData()
      setAnnouncement(data.announcement ?? DEFAULT_TEXT)
    } catch {
      // keep current value on error
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, 5_000)
    return () => clearInterval(id)
  }, [load])

  return { announcement, loading }
}
