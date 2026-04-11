import { useState, useEffect } from 'react'

const DEFAULT_TEAMS = [
  { id: 1, name: 'Alpha Ventures', ticker: 'ALPH', valuation: 1250000 },
  { id: 2, name: 'Beta Capital', ticker: 'BETA', valuation: 980000 },
  { id: 3, name: 'Gamma Squad', ticker: 'GMMA', valuation: 1540000 },
  { id: 4, name: 'Delta Force', ticker: 'DLTA', valuation: 720000 },
  { id: 5, name: 'Epsilon Group', ticker: 'EPSN', valuation: 1100000 },
]

const STORAGE_KEY = 'hackathon_teams'

export function useTeams() {
  const [teams, setTeams] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : DEFAULT_TEAMS
    } catch {
      return DEFAULT_TEAMS
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(teams))
  }, [teams])

  const updateTeams = (newTeams) => setTeams(newTeams)

  return { teams, updateTeams }
}
