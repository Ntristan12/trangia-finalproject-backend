# 📦 Node.js TypeScript MySQL Boilerplate API

## 📖 Overview  
This project is a fully functional backend API built using Node.js, Express.js, TypeScript, and Sequelize with a MySQL database. It implements authentication with JWT and refresh tokens, role-based access control, email verification, password recovery, and Swagger documentation.

## 🚀 Features  
- User Registration with Email Verification  
- JWT Authentication  
- Refresh Token Rotation  
- Role-Based Access Control (Admin & User)  
- Forgot & Reset Password  
- CRUD Operations for Accounts  
- Swagger API Docs  
- Ethereal Email for testing  

## ⚙️ Setup  
1. Install dependencies  
   npm install  

2. Configure config.json (DB, JWT, SMTP)  

3. Run server  
   npm start  

Server runs at: http://localhost:4000  

## 📘 API Docs  
http://localhost:4000/api-docs  

## 🧪 Testing Flow  
1. POST /accounts/register  
2. POST /accounts/verify-email  
3. POST /accounts/authenticate  
4. GET /accounts (Admin)  
5. POST /accounts/refresh-token  

## 🔐 Security  
- bcrypt password hashing  
- JWT + Refresh Tokens  
- HTTP-only cookies  
- Role-based authorization  

## ✨ Notes  
Use Ethereal Email to view verification and reset tokens during development.
