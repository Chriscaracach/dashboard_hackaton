import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Announcements.css'

const STORAGE_KEY = 'hackathon_announcement'
const DEFAULT_TEXT = '¡Bienvenidos al Hackathon!'

export default function Announcements() {
  const navigate = useNavigate()
  const [text, setText] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_TEXT
  })

  useEffect(() => {
    const onStorage = () => setText(localStorage.getItem(STORAGE_KEY) || DEFAULT_TEXT)
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // Poll for changes (same-tab edits don't fire storage event)
  useEffect(() => {
    const id = setInterval(() => {
      setText(localStorage.getItem(STORAGE_KEY) || DEFAULT_TEXT)
    }, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="ann-page">
      <button className="ann-edit-btn" onClick={() => navigate('/announcements/edit')}>
        Editar
      </button>

      <div className="ann-content">
        <p className="ann-text" key={text}>{text}</p>
        <div className="ann-decoration">
          <span className="ann-dec-line" />
          <span className="ann-dec-line" />
        </div>
      </div>
    </div>
  )
}
