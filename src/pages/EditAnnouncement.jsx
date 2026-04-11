import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditAnnouncement.css'

const STORAGE_KEY = 'hackathon_announcement'
const DEFAULT_TEXT = '¡Bienvenidos al Hackathon!'

export default function EditAnnouncement() {
  const navigate = useNavigate()
  const [text, setText] = useState(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_TEXT
  )
  const [saved, setSaved] = useState(false)

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, text)
    setSaved(true)
  }

  function handleChange(e) {
    setText(e.target.value)
    setSaved(false)
  }

  return (
    <div className="edit-ann-page">
      <header className="edit-header">
        <div className="edit-header-left">
          <span className="exchange-logo">HEX</span>
          <span className="exchange-name">HACKATHON EXCHANGE</span>
        </div>
        <span className="edit-title">EDITOR DE ANUNCIOS</span>
        <button className="nav-btn" onClick={() => navigate('/announcements')}>
          Ver Anuncio
        </button>
      </header>

      <main className="edit-ann-main">
        <div className="edit-ann-card">
          <label className="edit-ann-label" htmlFor="ann-input">
            TEXTO DEL ANUNCIO
          </label>
          <textarea
            id="ann-input"
            className="edit-ann-textarea"
            value={text}
            onChange={handleChange}
            placeholder="Escribe el anuncio aquí…"
            rows={6}
          />
          <div className="edit-ann-actions">
            <span className="edit-ann-hint">
              El texto se mostrará centrado a pantalla completa.
            </span>
            <button
              className={`save-btn ${saved ? 'save-btn--saved' : ''}`}
              onClick={handleSave}
            >
              {saved ? '✓ Guardado' : 'Guardar Cambios'}
            </button>
          </div>
        </div>

        <div className="edit-ann-preview-label">VISTA PREVIA</div>
        <div className="edit-ann-preview">
          <p className="preview-text">{text || '…'}</p>
        </div>
      </main>

      <footer className="edit-footer">
        <span>HACKATHON EXCHANGE &copy; {new Date().getFullYear()}</span>
        <span>CAMBIOS GUARDADOS EN LOCAL STORAGE</span>
      </footer>
    </div>
  )
}
