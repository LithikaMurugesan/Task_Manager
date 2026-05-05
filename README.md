#  Team Task Manager (Full-Stack)

## Overview

Team Task Manager is a full-stack web application that allows teams to manage projects and tasks efficiently with **role-based access control**.

Users can create projects, assign tasks, and track progress through a clean dashboard interface.

---

##  Features

###  Authentication

* User Signup & Login
* Secure password hashing using bcrypt
* JWT-based authentication

###  Role-Based Access

* **Admin**

  * Create projects
  * Assign tasks to members
  * Manage team members
* **Member**

  * View assigned tasks
  * Update task status

###  Project Management

* Create and manage projects
* Add members to projects
* View project details

###  Task Management

* Create tasks
* Assign tasks to users
* Update task status:

  * To Do
  * In Progress
  * Done

###  Dashboard

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks (based on deadline)

---

##  Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js

### Database

* MongoDB (Mongoose)

---

##  Live Demo

 **Frontend (Vercel):**
[Add your deployed frontend link]

 **Backend (Railway):**
[Add your backend API link]

---

##  GitHub Repository

 [Add your GitHub repo link]

---

##  Installation & Setup

### 1️ Clone the repository

```
git clone https://github.com/your-username/task-manager.git
cd task-manager
```

---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create a `.env` file:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

Run backend:

```
npm start
```

---

###  Frontend Setup

```
cd frontend
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```
npm run dev
```

---

##  API Endpoints

### Auth

* POST `/api/auth/register`
* POST `/api/auth/login`

### Projects

* GET `/api/projects`
* POST `/api/projects` (Admin only)

### Tasks

* GET `/api/tasks`
* POST `/api/tasks` (Admin only)
* PUT `/api/tasks/:id` (Update status)

---

##  Key Concepts Implemented

* REST API design
* JWT Authentication
* Role-Based Authorization
* CRUD Operations
* State Management (React)
* Responsive UI with Tailwind CSS

---

##  Demo Video

 [Add your demo video link]

---

##  Future Improvements

* Add task deadlines in UI
* Notifications for task updates
* Drag-and-drop task board (Kanban)
* Email alerts

---

##  Author

**Lithika Murugesan**
B.E Computer Science and Engineering

---


