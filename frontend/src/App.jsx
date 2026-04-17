import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import FacultyDashboardPage from './pages/FacultyDashboardPage'
import StudentDashboardPage from './pages/StudentDashboardPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'

function roleDest(role) {
  if (role === 'admin')   return '/dashboard'
  if (role === 'teacher') return '/faculty'
  if (role === 'student') return '/student'
  return '/login'
}

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={roleDest(user.role)} replace />
  }
  return children
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />

            {/* Admin dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Faculty dashboard */}
            <Route
              path="/faculty"
              element={
                <ProtectedRoute allowedRoles={['teacher']}>
                  <FacultyDashboardPage />
                </ProtectedRoute>
              }
            />

            {/* Student dashboard */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentDashboardPage />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
