# EduForge AI — Secure AI-Powered Course Generation Platform

## Overview

EduForge AI is an advanced full-stack educational platform powered by artificial intelligence to generate customized, comprehensive learning courses on demand. Users input topics and receive structured curriculam with modules, lessons, quizzes, and videos..

The project also functions as a **security engineering lab**, demonstrating a real-world Insecure Direct Object Reference (IDOR) vulnerability and its secure fix using proper authorization controls.

---

## Key Features

### 🤖 AI Course Generation Core
- On-demand AI course creation from any topic input
- Automatic structuring into modules and lessons
- Dynamic curriculum mapping
- User progress tracking and course dashboards

### 🛡️ Security Lab Component
- Demonstration of IDOR (CWE-639)
- Broken access control simulation
- Secure JWT-based authorization model
- Side-by-side vulnerable vs secure branches

---

## Project Structure

```
EduForge-Project/
│
├── eduforge-backend/        # Express.js API (Node.js + Mongoose)
│   ├── src/controllers/     # Auth + AI course generation logic
│   ├── src/routes/          # API endpoints
│   └── src/models/          # MongoDB schemas
│
└── eduforge-frontend/       # React SPA (Vite + Bootstrap)
    ├── src/components/      # UI components
    └── src/pages/           # Pages (Generator, Dashboard, Profile)
```

---

## Security Branches

### ❌ vulnerable
- Trusts user-controlled URL parameters (`/api/auth/profile/:id`)
- No ownership validation
- Enables unauthorized access to user profiles and AI-generated courses
- CWE-639: Broken Access Control via IDOR

### 🛡️ unvulnerable
- Enforces strict ownership validation using `req.userId`
- Validates JWT identity before data access
- Blocks unauthorized requests with `403 Forbidden`

---

## IDOR Vulnerability Summary

IDOR happens when internal object references (like user IDs) are exposed without access checks. Attackers can manipulate IDs to access data belonging to other users.

---

## AI Course Generation Logic

When a user requests a course, the system generates structured learning content and stores it in the database under a predictable ID.

Weak authorization allows attackers to directly query other users' generated courses by modifying IDs.

---

## Exploitation Example (vulnerable branch)

```javascript
fetch("http://localhost:5000/api/auth/profile/3", {
  headers: {
    accept: "application/json",
    authorization: "Bearer <JWT_TOKEN>",
    content-type: "application/json"
  },
  method: "GET"
})
.then(res => res.json())
.then(data => console.log("Leaked Data:", data));
```

### Result
- HTTP 200 OK
- Returns another user's profile

---

## Secure Behavior (fixed branch)

- HTTP 403 Forbidden
- Response:
```json
{
  "message": "Access Denied: You do not have permission."
}
```

---

## Installation

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

## Tech Stack
- React (Frontend)
- Node.js + Express (Backend)
- MongoDB + Mongoose (Database)
- JWT Authentication
- AI-driven course generation engine

---

## Purpose

EduForge AI combines artificial intelligence with secure software engineering principles to demonstrate both:

- AI-powered personalized education systems
- Real-world security vulnerabilities and fixes (IDOR prevention)
