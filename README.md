# 📸 SmartAttend — Smart Attendance System

> A next-generation attendance management solution powered by **QR Code scanning** and **AI Face Recognition**.

---

## ✨ System Highlights

| Feature | Technology |
|---|---|
| 🔐 **Authentication** | PBKDF2 Hashing + JWT Sessions |
| 👁️ **Face Recognition** | DeepFace (Facenet) + OpenCV |
| 🗄️ **Database** | Native MongoDB (NoSQL) |
| 🌐 **Frontend** | Astro + React (Node.js) |
| ⚙️ **Backend** | FastAPI (Python 3.9) |
| 🌓 **Theming** | Glassmorphism UI with Dark/Light Toggle |

---

## 🛠️ Hybrid Architecture

This project uses a **Dual-Engine** architecture to combine the best of two worlds:

### 1. Frontend Engine (Node.js)
*   **Role:** Powers the user interface and high-speed animations.
*   **Stack:** Astro, React, and Vanilla CSS.
*   **Responsibility:** Handling the camera stream, rendering the dashboard, and managing the "Theme" and "Auth" states using React Context.

### 2. AI & Data Engine (Python)
*   **Role:** Handles heavy data processing and artificial intelligence.
*   **Stack:** FastAPI, MongoDB, DeepFace.
*   **Responsibility:** Securely hashing passwords, generating encrypted QR tokens, and performing 1:1 facial verification using embeddings.

---

## 🔐 Security & AI Pipeline

### Authentication Flow
1.  **Secure Hashing:** Passwords are never stored as text. We use **PBKDF2-SHA256** to derive a cryptographically secure hash.
2.  **Tokenization:** Upon login, the server issues a **JWT (JSON Web Token)** that authorizes all subsequent AI requests.
3.  **RBAC:** The system enforces Role-Based Access Control (Admin, Teacher, Student).

### Face Recognition Flow
1.  **Capture:** The frontend captures a frame from the webcam.
2.  **Base64 Processing:** The image is converted to a Base64 string and sent to the backend.
3.  **DeepFace Verify:** The backend retrieves the student's registered face (stored as Base64 in MongoDB), reconstructs it, and uses **OpenCV** + **DeepFace (Facenet)** to compare the two faces.
4.  **Verification:** Attendance is only logged if the AI reports a "Match" with high confidence.

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.9+)
- **MongoDB** (Running locally on port 27017)

### 1. Backend (Python)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend (Node.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 🗄️ Database Management (MongoDB)

You can manage and view your data using **MongoDB Compass** or **mongosh**.

### View Registered Users
```javascript
use attendance_db
db.users.find().pretty()
```

### View AI Face Profiles
```javascript
db.face_profiles.find().pretty()
```

---

## 👨‍💻 Author
**Avinash K.**  
Mini Project — Smart Attendance System  
*Innovative attendance management using AI and Modern Web Technologies.*
