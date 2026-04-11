import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'
import './Scores.css'

function formatValuation(val) {
  if (val >= 1_000_000) return `$${(val / 1_000_000).toFixed(2)}M`
  if (val >= 1_000) return `$${(val / 1_000).toFixed(1)}K`
  return `$${val.toLocaleString()}`
}

function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const timeStr = time.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  const dateStr = time.toLocaleDateString('es-ES', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })

  return (
    <div className="clock">
      <span className="clock-time">{timeStr}</span>
      <span className="clock-date">{dateStr}</span>
    </div>
  )
}

function Ticker({ teams }) {
  const sorted = [...teams].sort((a, b) => b.valuation - a.valuation)
  const items = [...sorted, ...sorted]

  return (
    <div className="ticker-wrap">
      <div className="ticker-label">EN VIVO</div>
      <div className="ticker-track">
        <div className="ticker-content">
          {items.map((team, i) => (
            <span key={i} className="ticker-item">
              <span className="ticker-symbol">{team.ticker}</span>
              <span className="ticker-val">{formatValuation(team.valuation)}</span>
              <span className="ticker-sep">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function RankBadge({ rank }) {
  if (rank === 1) return <span className="rank-badge rank-gold">#{rank}</span>
  if (rank === 2) return <span className="rank-badge rank-silver">#{rank}</span>
  if (rank === 3) return <span className="rank-badge rank-bronze">#{rank}</span>
  return <span className="rank-badge rank-plain">#{rank}</span>
}

function TeamCard({ team, rank, maxVal }) {
  const pct = maxVal > 0 ? (team.valuation / maxVal) * 100 : 0

  return (
    <div className={`team-card ${rank === 1 ? 'team-card--leader' : ''}`}>
      <div className="card-header">
        <div className="card-left">
          <RankBadge rank={rank} />
          <div className="card-identity">
            <span className="card-ticker">{team.ticker}</span>
            <span className="card-name">{team.name}</span>
          </div>
        </div>
        <div className="card-right">
          <span className="card-valuation">{formatValuation(team.valuation)}</span>
        </div>
      </div>
      <div className="card-bar-track">
        <div
          className={`card-bar-fill ${rank === 1 ? 'bar-gold' : ''}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function Scores() {
  const { teams } = useTeams()
  const navigate = useNavigate()

  const sorted = [...teams].sort((a, b) => b.valuation - a.valuation)
  const maxVal = sorted[0]?.valuation ?? 1

  const total = teams.reduce((sum, t) => sum + t.valuation, 0)
  const leader = sorted[0]

  return (
    <div className="scores-page">
      {/* Top bar */}
      <header className="top-bar">
        <div className="top-bar-left">
        </div>
        <Clock />
        <button className="nav-btn" onClick={() => navigate('/edit')}>
          Editar Puntajes
        </button>
      </header>

      {/* Ticker */}
      <Ticker teams={teams} />

      {/* Stats strip */}
      <div className="stats-strip">
        <div className="stat-block">
          <span className="stat-label">EQUIPOS</span>
          <span className="stat-value">{teams.length}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-block">
          <span className="stat-label">CAPITAL TOTAL</span>
          <span className="stat-value green">{formatValuation(total)}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-block">
          <span className="stat-label">LÍDER DEL MERCADO</span>
          <span className="stat-value gold">{leader?.ticker ?? '—'}</span>
        </div>
        <div className="stat-divider" />
        <div className="stat-block">
          <span className="stat-label">MAYOR VALUACIÓN</span>
          <span className="stat-value green">{leader ? formatValuation(leader.valuation) : '—'}</span>
        </div>
      </div>

      {/* Board title */}
      <div className="board-header">
        <span>TABLA DE LÍDERES</span>
        <span className="board-subtitle">ordenado por valuación</span>
      </div>

      {/* Cards */}
      <main className="board">
        {sorted.length === 0 ? (
          <div className="empty-state">
            Aún no hay equipos. <button className="link-btn" onClick={() => navigate('/edit')}>Agregar equipos</button>
          </div>
        ) : (
          sorted.map((team, i) => (
            <TeamCard key={team.id} team={team} rank={i + 1} maxVal={maxVal} />
          ))
        )}
      </main>

    </div>
  )
}
