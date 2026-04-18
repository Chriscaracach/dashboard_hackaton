import { Routes, Route } from 'react-router-dom'
import Scores from './pages/Scores'
import Announcements from './pages/Announcements'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Scores />} />
      <Route path="/announcements" element={<Announcements />} />
    </Routes>
  )
}

export default App
