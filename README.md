# Task Dashboard
A lightweight demo task management dashboard with a React + Vite frontend (MUI) and an Express + MongoDB backend. Includes task CRUD, audit logging, and a simple demo Basic Auth for API protection.

# Tech stack

- Frontend: React, Vite, Material UI (MUI)
- Backend: Node.js, Express, MongoDB (Mongoose)
- Utilities: Axios, date-fns, morgan, dotenv

# Quick summary (one-liner)
Task Dashboard — a simple React + Vite task management UI with an Express + MongoDB demo backend for logging and audit trails.
Dependencies (from package.json)

# Dependencies (from package.json)

## Frontend (root package.json):
- @emotion/react, @emotion/styled, @mui/material, @mui/icons-material, axios, date-fns, file-saver, react, react-dom, vite, @vitejs/plugin-react, eslint, etc.
## Backend (package.json):
- express, mongoose, cors, dotenv, morgan, body-parser; dev: nodemon

## Prerequisites
- Node.js (>= 18 recommended) and npm
- MongoDB (local or Atlas). If using Atlas, get a connection string.

# Essential Installations for MUI components 
- @mui/material — core components
- @mui/icons-material — icons
- @emotion/react and @emotion/styled — styling engine used by MUI

# API ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
|  GET	 | api/    | tasks	Fetch all tasks with pagination |
|  POST	 |api/tasks	| Create a new task
| PUT	   | api/tasks/:id |	Update an existing task |
| DELETE | api/tasks/:id | Delete a specific task |
|  GET	  | api/logs	| Retrieve audit logs of all actions |

## Run one of these from your project folder
- npm
```bash
npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
```
- yarn
```bash
yarn add @mui/material @mui/icons-material @emotion/react @emotion/styled
```
- pnpm
```bash
pnpm add @mui/material @mui/icons-material @emotion/react @emotion/styled
```

## Notes & tips

- Run these commands in the folder that contains your frontend package.json. In this repo the dependencies are in the root package.json, so running from the repo root is fine.
- If you use TypeScript, also install types for React:
```bash
npm install -D @types/react @types/react-dom
```
# Set Up 

- 1.Clone the repo
```bash
git clone <your-repo-url>
cd task-dashboard
```
- 2 Install frontend (root) dependencies
```bash
# from repository root
npm install
```
- 3 Install backend dependencies
```bash
cd backend
npm install
cd ..
```
- 4. Environment variables
- create env and add your mongo URI
```bash
MONGO_URI=<Your uri>
PORT=5000
```

# Running the app
## Open two terminals (or tabs):

-  Terminal A — start backend

```bash
cd backend
# development with automatic restart (requires nodemon)
npm run dev

# or run without nodemon
# npm start

# or 
node server.js
```
- Terminal B — start frontend (Vite)
```bash
cd frontend
npm run dev
```
- Now the project will run on port 








