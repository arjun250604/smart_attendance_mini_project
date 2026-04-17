import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './DashboardPage.css'

const ROLE_WELCOME = {
  admin:   'System Overview',
  teacher: "Today's Classes",
  student: 'My Attendance',
}

const STATS = {
  admin: [
    { label: 'Total Students', value: '1,248', icon: '🎓', trend: '+12 this week' },
    { label: 'Active Sessions', value: '14', icon: '📡', trend: 'Live now' },
    { label: 'Attendance Rate', value: '94.2%', icon: '📊', trend: '+2.1% vs last week' },
    { label: 'Alerts', value: '3', icon: '🔔', trend: 'Requires attention' },
  ],
  teacher: [
    { label: "Today's Classes", value: '3', icon: '📚', trend: '2 remaining' },
    { label: 'Students Present', value: '38 / 42', icon: '✅', trend: '90.5% today' },
    { label: 'QR Sessions', value: '2', icon: '🔲', trend: 'Active' },
    { label: 'Absentees', value: '4', icon: '❌', trend: 'Notified' },
  ],
  student: [
    { label: 'Attendance %', value: '88%', icon: '📊', trend: 'This semester' },
    { label: 'Classes Attended', value: '44 / 50', icon: '✅', trend: 'Last 30 days' },
    { label: 'Remaining', value: '6 absent', icon: '⚠️', trend: 'Allowed: 10' },
    { label: "Today's Status", value: 'Present', icon: '🟢', trend: 'Marked 9:05 AM' },
  ],
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const stats = STATS[user?.role] || STATS.student
  const section = ROLE_WELCOME[user?.role] || 'Dashboard'

  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'U'

  return (
    <div className="dashboard-root">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="sidebar-logo">SA</div>
          <span className="sidebar-brand-name">SmartAttend</span>
        </div>

        <nav className="sidebar-nav">
          {[
            { icon: '🏠', label: 'Dashboard', active: true },
            { icon: '📅', label: 'Attendance' },
            { icon: '🔲', label: 'QR Code' },
            { icon: '👤', label: 'Profile' },
            { icon: '📊', label: 'Reports' },
            { icon: '⚙️', label: 'Settings' },
          ].map(item => (
            <button
              key={item.label}
              id={`nav-${item.label.toLowerCase().replace(/\s/g, '-')}`}
              className={`nav-item ${item.active ? 'active' : ''}`}
              onClick={() => {}}
              aria-current={item.active ? 'page' : undefined}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {item.active && <span className="nav-indicator" />}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-chip-avatar">{initials}</div>
            <div className="user-chip-info">
              <span className="user-chip-name">{user?.name}</span>
              <span className="user-chip-role">{user?.role}</span>
            </div>
          </div>
          <button id="logout-btn" className="logout-btn" onClick={handleLogout} title="Sign out">
            ↩
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="dashboard-main">
        {/* Topbar */}
        <header className="topbar">
          <div>
            <h1 className="topbar-title">{section}</h1>
            <p className="topbar-subtitle">
              Welcome back, <strong>{user?.name}</strong> 👋
            </p>
          </div>
          <div className="topbar-actions">
            <div className="topbar-date">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <div className="topbar-badge">{user?.role}</div>
          </div>
        </header>

        {/* Stats grid */}
        <section className="stats-grid">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="stat-card"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="stat-card-top">
                <div className="stat-card-icon">{s.icon}</div>
                <span className="stat-card-label">{s.label}</span>
              </div>
              <div className="stat-card-value">{s.value}</div>
              <div className="stat-card-trend">{s.trend}</div>
            </div>
          ))}
        </section>

        {/* Placeholder content */}
        <section className="dashboard-content">
          <div className="content-card">
            <h2 className="content-card-title">📋 Recent Activity</h2>
            <div className="activity-list">
              {[
                { time: '9:05 AM', msg: 'Attendance marked via Face Recognition', type: 'success' },
                { time: '8:50 AM', msg: 'QR Session started for CS101', type: 'info' },
                { time: 'Yesterday', msg: 'Report generated for November', type: 'neutral' },
                { time: 'Yesterday', msg: 'New student enrolled: Rahul Verma', type: 'info' },
              ].map((a, i) => (
                <div key={i} className={`activity-item activity-${a.type}`}>
                  <span className="activity-time">{a.time}</span>
                  <span className="activity-msg">{a.msg}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="content-card quick-actions-card">
            <h2 className="content-card-title">⚡ Quick Actions</h2>
            <div className="quick-actions">
              {[
                { icon: '🔲', label: 'Generate QR', id: 'action-qr' },
                { icon: '📸', label: 'Scan Face', id: 'action-face' },
                { icon: '📤', label: 'Export Report', id: 'action-export' },
                { icon: '➕', label: 'Add Student', id: 'action-add' },
              ].map(a => (
                <button key={a.id} id={a.id} className="quick-action-btn">
                  <span className="qa-icon">{a.icon}</span>
                  <span className="qa-label">{a.label}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
