import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AppointmentsManager from './pages/AppointmentsManager'
import DatabaseConfig from './pages/DatabaseConfig'
import ProfessionalArea from './pages/ProfessionalArea'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/appointments" 
          element={
            <ProtectedRoute>
              <AppointmentsManager />
            </ProtectedRoute>
          } 
        />
        <Route path="/config" element={<DatabaseConfig />} />
        <Route path="/professional" element={<ProfessionalArea />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

