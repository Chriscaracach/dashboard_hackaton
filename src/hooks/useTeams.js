import { useState, useEffect, useCallback } from 'react'
import { fetchData } from '../lib/github'

const DEFAULT_TEAMS = []

export function useTeams() {
  const [teams, setTeams] = useState(DEFAULT_TEAMS)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    try {
      const data = await fetchData()
      setTeams(data.teams ?? DEFAULT_TEAMS)
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const id = setInterval(load, 5_000)
    return () => clearInterval(id)
  }, [load])

  return { teams, loading, error }
}
