# 📸 SmartAttend — Smart Attendance System

> Next-generation attendance management powered by **QR Code scanning** and **Face Recognition**.

---

## ✨ Features

| Feature | Status |
|---|---|
| 🔐 Role-based login (Admin / Teacher / Student) | ✅ Done |
| 🎨 Animated login page with glassmorphism UI | ✅ Done |
| 🔲 QR Code attendance session (UI) | ✅ Done |
| 👁️ Face Recognition attendance (UI) | ✅ Done |
| 📊 Role-specific dashboard with stats | ✅ Done |
| 🔔 Real-time alerts & activity feed (UI) | ✅ Done |
| ⚡ Quick Actions panel | ✅ Done |
| 🔒 Protected routes with Auth Context | ✅ Done |
| 🗄️ Backend API integration | 🔜 Planned |
| 📑 Report export (PDF / CSV) | 🔜 Planned |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev) | 18.3 | UI library |
| [React Router DOM](https://reactrouter.com) | 6.x | Client-side routing |
| [Vite](https://vitejs.dev) | 5.x | Build tool & dev server |
| Vanilla CSS | — | Styling (glassmorphism, animations) |

### Planned Backend
| Technology | Purpose |
|---|---|
| Python / Flask or FastAPI | REST API server |
| OpenCV + DeepFace | Face recognition engine |
| QR Code libraries | QR session generation & scanning |
| PostgreSQL / MongoDB | User & attendance data storage |
| JWT | Authentication tokens |

---

## 📂 Project Structure

```
mini_project_smartAttendance/
├── frontend/                   # React + Vite frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global auth state (login, logout, user)
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx   # Animated login with role selector
│   │   │   ├── LoginPage.css
│   │   │   ├── DashboardPage.jsx # Role-aware dashboard
│   │   │   └── DashboardPage.css
│   │   ├── App.jsx             # Router + ProtectedRoute wrapper
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Global design tokens & resets
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### 1. Clone the repository
```bash
git clone https://github.com/avinash007kp-del/mini_project_smartAttendance.git
cd mini_project_smartAttendance
```

### 2. Install frontend dependencies
```bash
cd frontend
npm install
```

### 3. Start the development server
```bash
npm run dev
```

The app will be running at **http://localhost:5173**

---

## 🎮 Demo Credentials

Use the **"Fill demo credentials"** button on the login page, or enter manually:

| Role | Email | Password |
|---|---|---|
| 🛡️ Administrator | `admin@smartattend.com` | `admin123` |
| 👨‍🏫 Teacher / Faculty | `teacher@smartattend.com` | `teacher123` |
| 🎓 Student | `student@smartattend.com` | `student123` |

> **Note:** Authentication is currently mocked on the frontend. A real backend with JWT will be integrated in a future milestone.

---

## 🖥️ Pages & Routes

| Route | Page | Access |
|---|---|---|
| `/login` | Login page | Public |
| `/dashboard` | Role-specific dashboard | Protected (requires login) |
| `/*` | Redirects to `/login` | — |

---

## 🗺️ Roadmap

- [ ] **Backend API** — Flask/FastAPI server with JWT auth
- [ ] **Face Recognition module** — Live webcam capture + DeepFace matching
- [ ] **QR Code module** — Session-based QR generation & scanning
- [ ] **Attendance Reports** — Export to PDF / CSV
- [ ] **Email Notifications** — Alert absentees automatically
- [ ] **Mobile Responsive** — Improved layout for phones & tablets
- [ ] **Dark / Light Mode Toggle**

---

## 👨‍💻 Author

**Avinash K.**  
Mini Project — Smart Attendance System  
Built with React + Vite on the frontend, with Face Recognition & QR planned for the backend.
