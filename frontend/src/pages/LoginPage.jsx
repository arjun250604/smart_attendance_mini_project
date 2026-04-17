import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './LoginPage.css'

const ROLES = [
  { value: 'admin',   label: 'Administrator', icon: '🛡️' },
  { value: 'teacher', label: 'Teacher / Faculty', icon: '👨‍🏫' },
  { value: 'student', label: 'Student', icon: '🎓' },
]

const DEMO_CREDENTIALS = {
  admin:   { email: 'admin@smartattend.com',   password: 'admin123' },
  teacher: { email: 'teacher@smartattend.com', password: 'teacher123' },
  student: { email: 'student@smartattend.com', password: 'student123' },
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { login, loading, error, clearError, user } = useAuth()

  const [form, setForm] = useState({ email: '', password: '', role: 'student' })
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState({})
  const [mounted, setMounted] = useState(false)
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    // If already logged in, redirect
    if (user) navigate('/dashboard', { replace: true })
    setMounted(true)
  }, [user, navigate])

  const validate = () => {
    const errs = {}
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Enter a valid email'
    if (!form.password) errs.password = 'Password is required'
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: '' }))
    if (error) clearError()
  }

  const handleRoleChange = (role) => {
    setForm(prev => ({ ...prev, role }))
    if (error) clearError()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setFieldErrors(errs); return }

    try {
      const userData = await login(form.email, form.password, form.role)
      setLoginSuccess(true)
      const dest = userData?.role === 'teacher' ? '/faculty' : userData?.role === 'student' ? '/student' : '/dashboard'
      setTimeout(() => navigate(dest), 800)
    } catch {
      // error is handled by context
    }
  }

  const fillDemo = () => {
    const creds = DEMO_CREDENTIALS[form.role]
    setForm(prev => ({ ...prev, ...creds }))
    clearError()
    setFieldErrors({})
  }

  return (
    <div className={`login-root ${mounted ? 'mounted' : ''}`}>
      {/* Animated background */}
      <div className="login-bg">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
        <div className="bg-orb bg-orb-3" />
        <div className="bg-grid" />
      </div>

      {/* Left panel — branding */}
      <aside className="login-aside">
        <div className="aside-content">
          <div className="brand-logo">
            <div className="logo-ring">
              <span className="logo-icon">📸</span>
            </div>
          </div>
          <h1 className="aside-title">SmartAttend</h1>
          <p className="aside-subtitle">
            Next-generation attendance management powered by QR codes &amp; face recognition.
          </p>

          <div className="feature-list">
            {[
              { icon: '🔲', label: 'QR Code Scanning' },
              { icon: '👁️', label: 'Face Recognition' },
              { icon: '📊', label: 'Real-time Analytics' },
              { icon: '🔔', label: 'Instant Notifications' },
            ].map(f => (
              <div key={f.label} className="feature-item">
                <span className="feature-icon">{f.icon}</span>
                <span className="feature-label">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="aside-stats">
            <div className="stat">
              <span className="stat-value">99.8%</span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">&lt;1s</span>
              <span className="stat-label">Recognition</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-value">10K+</span>
              <span className="stat-label">Students</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Right panel — form */}
      <main className="login-main">
        <div className={`login-card ${loginSuccess ? 'success' : ''}`}>
          {/* Card header */}
          <div className="card-header">
            <div className="card-logo">SA</div>
            <h2 className="card-title">Welcome back</h2>
            <p className="card-description">Sign in to your SmartAttend account</p>
          </div>

          {/* Role selector */}
          <div className="role-selector" role="group" aria-label="Select your role">
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                id={`role-${r.value}`}
                className={`role-btn ${form.role === r.value ? 'active' : ''}`}
                onClick={() => handleRoleChange(r.value)}
                aria-pressed={form.role === r.value}
              >
                <span className="role-btn-icon">{r.icon}</span>
                <span className="role-btn-label">{r.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form id="login-form" className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Global error */}
            {error && (
              <div className="alert alert-error" role="alert">
                <span className="alert-icon">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className={`field ${fieldErrors.email ? 'field-error' : ''}`}>
              <label className="field-label" htmlFor="email">Email Address</label>
              <div className="field-input-wrap">
                <span className="field-prefix-icon">✉️</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="field-input"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                  aria-invalid={!!fieldErrors.email}
                />
              </div>
              {fieldErrors.email && (
                <span id="email-error" className="field-error-msg" role="alert">
                  {fieldErrors.email}
                </span>
              )}
            </div>

            {/* Password */}
            <div className={`field ${fieldErrors.password ? 'field-error' : ''}`}>
              <label className="field-label" htmlFor="password">Password</label>
              <div className="field-input-wrap">
                <span className="field-prefix-icon">🔑</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="field-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                  aria-invalid={!!fieldErrors.password}
                />
                <button
                  type="button"
                  id="toggle-password"
                  className="show-password-btn"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              {fieldErrors.password && (
                <span id="password-error" className="field-error-msg" role="alert">
                  {fieldErrors.password}
                </span>
              )}
            </div>

            {/* Forgot password */}
            <div className="form-actions-row">
              <a href="#" id="forgot-password-link" className="forgot-link" onClick={e => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              id="login-submit-btn"
              className={`login-btn ${loading ? 'loading' : ''} ${loginSuccess ? 'success' : ''}`}
              disabled={loading || loginSuccess}
            >
              {loginSuccess ? (
                <>
                  <span className="btn-icon">✅</span>
                  <span>Redirecting…</span>
                </>
              ) : loading ? (
                <>
                  <span className="btn-spinner" aria-hidden="true" />
                  <span>Signing in…</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <span className="btn-arrow">→</span>
                </>
              )}
            </button>
          </form>

          {/* Demo credentials hint */}
          <div className="demo-section">
            <p className="demo-label">
              🎮 Try a demo account
            </p>
            <button
              type="button"
              id="fill-demo-btn"
              className="demo-btn"
              onClick={fillDemo}
            >
              Fill demo credentials for <strong>{form.role}</strong>
            </button>
          </div>

          {/* Footer */}
          <p className="card-footer">
            Need an account?{' '}
            <a href="#" id="contact-admin-link" className="card-footer-link" onClick={e => e.preventDefault()}>
              Contact your administrator
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
