import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTeams } from '../hooks/useTeams'
import './Edit.css'

function generateTicker(name) {
  const words = name.trim().split(/\s+/)
  if (words.length === 1) return name.slice(0, 4).toUpperCase()
  return words.map(w => w[0]).join('').slice(0, 4).toUpperCase()
}

let nextId = Date.now()

export default function Edit() {
  const { teams, updateTeams } = useTeams()
  const navigate = useNavigate()

  const [rows, setRows] = useState(
    teams.map(t => ({ ...t, _valStr: String(t.valuation) }))
  )
  const [saved, setSaved] = useState(false)

  function handleNameChange(id, value) {
    setRows(prev =>
      prev.map(r => r.id === id ? { ...r, name: value, ticker: generateTicker(value) } : r)
    )
    setSaved(false)
  }

  function handleValChange(id, value) {
    setRows(prev =>
      prev.map(r => r.id === id ? { ...r, _valStr: value } : r)
    )
    setSaved(false)
  }

  function handleAddRow() {
    setRows(prev => [
      ...prev,
      { id: ++nextId, name: '', ticker: 'NEW', valuation: 0, _valStr: '' },
    ])
    setSaved(false)
  }

  function handleRemove(id) {
    setRows(prev => prev.filter(r => r.id !== id))
    setSaved(false)
  }

  function handleSave() {
    const cleaned = rows
      .filter(r => r.name.trim())
      .map(r => ({
        id: r.id,
        name: r.name.trim(),
        ticker: r.ticker || generateTicker(r.name),
        valuation: Math.max(0, Number(r._valStr.replace(/[^0-9.]/g, '')) || 0),
      }))
    updateTeams(cleaned)
    setSaved(true)
  }

  return (
    <div className="edit-page">
      {/* Header */}
      <header className="edit-header">
        <div className="edit-header-left">
          <span className="exchange-logo">HEX</span>
          <span className="exchange-name">HACKATHON EXCHANGE</span>
        </div>
        <span className="edit-title">EDITOR DE PUNTAJES</span>
        <button className="nav-btn" onClick={() => navigate('/scores')}>
          Ver Dashboard
        </button>
      </header>

      {/* Form */}
      <main className="edit-main">
        <div className="edit-card">
          {/* Column headers */}
          <div className="edit-col-headers">
            <span className="col-rank">#</span>
            <span className="col-name">NOMBRE DEL EQUIPO</span>
            <span className="col-ticker">TICKER</span>
            <span className="col-val">VALUACIÓN ($)</span>
            <span className="col-action" />
          </div>

          {/* Rows */}
          <div className="edit-rows">
            {rows.map((row, i) => (
              <div key={row.id} className="edit-row">
                <span className="col-rank row-num">{i + 1}</span>

                <div className="col-name">
                  <input
                    className="edit-input"
                    type="text"
                    placeholder="Nombre del equipo…"
                    value={row.name}
                    onChange={e => handleNameChange(row.id, e.target.value)}
                  />
                </div>

                <div className="col-ticker">
                  <span className="ticker-preview">{row.ticker}</span>
                </div>

                <div className="col-val">
                  <div className="val-input-wrap">
                    <span className="val-prefix">$</span>
                    <input
                      className="edit-input val-input"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="0"
                      value={row._valStr}
                      onChange={e => handleValChange(row.id, e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-action">
                  <button
                    className="remove-btn"
                    onClick={() => handleRemove(row.id)}
                    title="Eliminar equipo"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="edit-actions">
            <button className="add-btn" onClick={handleAddRow}>
              + Agregar Equipo
            </button>
            <button
              className={`save-btn ${saved ? 'save-btn--saved' : ''}`}
              onClick={handleSave}
            >
              {saved ? '✓ Guardado' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        <p className="edit-hint">
          Los símbolos ticker se generan automáticamente a partir del nombre del equipo.
          Las valuaciones representan montos de inversión en USD.
        </p>
      </main>

      <footer className="edit-footer">
        <span>HACKATHON EXCHANGE &copy; {new Date().getFullYear()}</span>
        <span>CAMBIOS GUARDADOS EN LOCAL STORAGE</span>
      </footer>
    </div>
  )
}
