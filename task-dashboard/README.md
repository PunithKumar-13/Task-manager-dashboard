# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:


## Project layout note (frontend moved)

The frontend source was moved from the repository-root `src/` folder into `frontend/src/` to keep the frontend and backend clearly separated.

- Frontend entry: `frontend/src/main.jsx`
- Frontend source: `frontend/src/` (components, pages, utils, etc.)
- Backend: `backend/` (server.js, controllers, models)

How to run locally

1. Install dependencies at project root (frontend tooling) and backend:

```powershell
npm install
cd backend
npm install
cd ..
```

2. Start backend (set your MongoDB URI first):

```powershell
$env:MONGO_URI = 'your-mongodb-uri'
cd backend
npm run dev
```

3. Start the frontend (from project root):

```powershell
npm run dev
```

Vite will serve the frontend entry at `frontend/src/main.jsx` (the project `index.html` is updated to load that entry).

If you prefer to restore the old layout, let me know and I can move files back or adjust scripts.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
