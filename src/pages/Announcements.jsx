import { useAnnouncement } from '../hooks/useAnnouncement'
import './Announcements.css'

export default function Announcements() {
  const { announcement, loading } = useAnnouncement()

  return (
    <div className="ann-page">
      <div className="ann-content">
        {loading ? (
          <p className="ann-text">…</p>
        ) : (
          <p className="ann-text" key={announcement}>{announcement}</p>
        )}
        <div className="ann-decoration">
          <span className="ann-dec-line" />
          <span className="ann-dec-line" />
        </div>
      </div>
    </div>
  )
}
