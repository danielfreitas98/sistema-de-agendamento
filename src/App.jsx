import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AppointmentsManager from './pages/AppointmentsManager'
import DatabaseConfig from './pages/DatabaseConfig'
import ProfessionalArea from './pages/ProfessionalArea'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<AppointmentsManager />} />
        <Route path="/config" element={<DatabaseConfig />} />
        <Route path="/professional" element={<ProfessionalArea />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

