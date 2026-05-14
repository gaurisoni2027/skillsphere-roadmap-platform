import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { LoginPage } from './pages/auth/LoginPage'
import { SignupPage } from './pages/auth/SignupPage'
import { DashboardPage } from './pages/DashboardPage'
import { ProtectedRoute } from './routes/ProtectedRoute'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
