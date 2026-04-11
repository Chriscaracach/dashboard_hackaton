import { Routes, Route, Navigate } from 'react-router-dom'
import Scores from './pages/Scores'
import Edit from './pages/Edit'
import Announcements from './pages/Announcements'
import EditAnnouncement from './pages/EditAnnouncement'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/scores" replace />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/edit" element={<Edit />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/announcements/edit" element={<EditAnnouncement />} />
    </Routes>
  )
}

export default App
