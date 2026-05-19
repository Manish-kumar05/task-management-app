# MERN Task Management App

A full-stack Task Management web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

---

## Features

- User Authentication (Register/Login)
- JWT Authorization
- Create Tasks
- Update Task Status
- Delete Tasks
- Search Tasks
- Protected Dashboard
- Responsive UI using Tailwind CSS
- REST API Integration
- MongoDB Database

---

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

## Project Structure

```bash
frontend/
backend/
```

---

# Backend Setup

```bash
cd backend
npm install
npm run dev
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
JWT_SECRET=YOUR_SECRET_KEY
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# API Endpoints

## Authentication

### Register User
```http
POST /api/auth/register
```

### Login User
```http
POST /api/auth/login
```

---

## Tasks

### Get All Tasks
```http
GET /api/tasks
```

### Create Task
```http
POST /api/tasks
```

### Update Task
```http
PUT /api/tasks/:id
```

### Delete Task
```http
DELETE /api/tasks/:id
```

---

# Author

Manish Kumar

GitHub:
https://github.com/Manish-kumar05