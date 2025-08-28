# 🎓 Course Selling Website Backend

A secure and scalable backend for a course-selling platform built with **Node.js**, **Express**, and **MongoDB**.  
This backend handles authentication, course management, and user enrollment, with modern security and validation practices.

---

## 🚀 Tech Stack

- **Language:** Node.js (JavaScript)
- **Framework:** Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Validation:** Zod
- **Authentication & Security:**
  - JWT (JSON Web Tokens) for authentication
  - Bcrypt for password hashing
- **Environment Variables:** Configured with `.env`

---

## 🔐 Security Features

- **JWT Authentication** → protects routes with token-based access control.  
- **Bcrypt Password Hashing** → stores passwords securely using hashing + salting.  
- **Zod Validation** → ensures request bodies are validated before hitting controllers.  
- **Environment Variables** → sensitive data (DB URI, JWT secret, etc.) are never hardcoded.  

--------------------------------------------------------------------------------------------------

