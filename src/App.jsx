import { Routes, Route, Navigate } from 'react-router-dom'
import Scores from './pages/Scores'
import Announcements from './pages/Announcements'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/scores" replace />} />
      <Route path="/scores" element={<Scores />} />
      <Route path="/announcements" element={<Announcements />} />
    </Routes>
  )
}

export default App
