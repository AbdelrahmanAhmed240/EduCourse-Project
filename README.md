# 🚀 EduForge AI: AI-Powered Learning & Security Engineering Lab

EduForge AI is a dual-purpose platform that combines an AI learning system with a cybersecurity education lab focused on demonstrating and mitigating IDOR (Insecure Direct Object Reference) vulnerabilities.

---

## ⚙️ Overview

EduForge transforms any topic into a structured, academic-style learning path using AI while also teaching real-world backend security principles.

---

## 🎓 AI Learning Engine

- 🧠 Generates structured learning paths using LLMs  
- 📚 Breaks topics into modules and lessons  
- 🎥 Integrates curated YouTube resources  
- 🧪 Adds quizzes for active learning  

---

## 🛡️ Security Engineering Lab (IDOR Focus)

EduForge demonstrates insecure vs secure backend design.

| Feature | Vulnerable | Secure |
|--------|------------|--------|
| Data Access | Client-side ID trust | JWT-based validation |
| Authorization | Missing checks | Strict ownership rules |
| Security State | IDOR exposed | Fully mitigated |

---

## 🔐 IDOR Concept

### Vulnerable Example
GET /user/:id

Attack:
/1 → /2 → /3

Impact:
- Data leakage
- Unauthorized access

### Secure Fix
- JWT identity verification
- No trust in URL parameters
- Backend enforces req.userId checks

---

## 🏗️ Project Structure

EduForge-Project/
├── eduforge-backend/
│   ├── controllers/
│   ├── routes/
│   └── models/
└── eduforge-frontend/

---

## 💻 Setup

### Backend
```bash
cd eduforge-backend
npm install
npm run dev
```

### Frontend
```bash
cd eduforge-frontend
npm install
npm run dev
```

---

## 🛠 Tech Stack

Frontend: React, Vite, Bootstrap  
Backend: Node.js, Express, Mongoose  
Database: MongoDB Atlas  
Security: JWT Authentication  
AI: Hugging Face API + YouTube API  

---

## 🎯 Purpose

Bridge the gap between building features and securing real-world applications.

---

## ⚠️ Disclaimer
This project is production-ready in its main branch.
The vulnerable branch is included strictly for educational and security demonstration purposes (IDOR/CWE-639).
