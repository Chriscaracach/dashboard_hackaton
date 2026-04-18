import { Routes, Route } from 'react-router-dom'
import Scores from './pages/Scores'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Scores />} />
    </Routes>
  )
}

export default App
