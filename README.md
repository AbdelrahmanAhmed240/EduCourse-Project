# 🚀 EduForge AI: AI-Powered Learning 

EduForge AI is an AI-powered learning platform that transforms any topic into a structured learning path. It also includes a separate cybersecurity lab branch for demonstrating IDOR vulnerabilities.

---

## ⚙️ Overview

EduForge helps learners go from curiosity to mastery by using AI to organize topics into modules, lessons, quizzes, and curated resources — like a personal university for any subject.

---

## 🎓 AI Learning Engine

- 🧠 Generates structured learning paths using LLMs  
- 📚 Breaks topics into modules and lessons  
- 🎥 Integrates curated YouTube resources  
- 🧪 Adds quizzes for active learning  

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


## 🛡️ Cybersecurity Lab (Separate Vulnerable Branch)

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

----

## 🎯 Purpose

Help learners master AI-powered self-learning first, then optionally explore real-world backend vulnerabilities in a separate branch.

---

## ⚠️ Disclaimer
The main AI learning branch is production-ready.
The vulnerable branch is included strictly for security demonstration (IDOR/CWE-639) and is not part of the main AI learning platform.
