# 📝 Mini Task Manager

A simple full-stack CRUD application to manage tasks. Add, view, edit, delete, and mark tasks as done — with a clean responsive UI and REST API.

---

## 🔗 Live Demo

- 🚀 Frontend: [https://mini-task-manager-henna.vercel.app/](https://mini-task-manager-henna.vercel.app/)
- 🛠️ Backend API: [https://mini-task-manager-px6h.onrender.com](https://mini-task-manager-px6h.onrender.com)


---

## ⚙️ Tech Stack

- **Frontend:** Next.js, Tailwind CSS
- **Backend:** Express.js, Prisma
- **Database:** PostgreSQL (hosted on Vercel)
- **Deployment:** Vercel (frontend), Render (backend)

---

## 📋 Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as `pending` or `done`
- All data stored in a persistent PostgreSQL database
- Responsive and clean user interface

---

## 📁 Folder Structure

mini-task-manager/
├── backend/ # Express backend with Prisma + PostgreSQL
│ ├── prisma/ # Prisma schema and DB client
│ └── src/ # Routes, server and app logic
├── frontend/ # Next.js frontend with Tailwind CSS
│ ├── pages/ # Index page (Task Manager UI)
│ └── lib/ # Axios config

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js v18+
- PostgreSQL DB (or use Vercel’s free one)

### 1. Clone the repository

```bash
git clone https://github.com/chiragmukheja/mini-task-manager
cd mini-task-manager
```

### 2. Set up backend

```bash
cd backend
npm install
# Add your PostgreSQL URL to .env
npx prisma db push
node src/server.js
```

### 3. Set up frontend

```bash
cd ../frontend
npm install
npm run dev
```
Open http://localhost:3000

### 📡 API Reference
Base URL (dev): http://localhost:5000
Base URL (prod): https://your-backend.onrender.com

GET /tasks
Returns all tasks (most recent first)

POST /tasks
Creates a task
Body:
{ "title": "Buy groceries" }

GET /tasks/:id
Returns a single task

PUT /tasks/:id
Updates a task
Body:
{ "title": "Updated title", "status": "done" }

DELETE /tasks/:id
Deletes a task

### 🤔 Why This Structure?
 - Frontend and backend are cleanly separated for better organization
 - Prisma handles DB schema in a typesafe way
 - Keeping everything minimal and modular helped avoid overengineering





