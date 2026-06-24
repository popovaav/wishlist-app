# 🛍️ Wishlist App

A full-stack wishlist manager with JWT authentication and user-specific data ownership. Users register, log in, and manage their own wishlist items through a secure REST API backed by PostgreSQL.

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)
![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=white)
![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

## 🌐 Live Demo

**[Live Demo →](https://wishlist-app-liart.vercel.app)**

---

## ✨ Features

- User registration and login
- JWT authentication with protected routes
- User-specific wishlist items and ownership-based access control
- Create, edit, and delete wishlist items
- Search by title
- Filter by status and priority
- Server-side sorting
- Server-side pagination
- Form validation with React Hook Form and Zod
- Responsive UI with loading states and skeletons

---

## 🛠️ Tech Stack

| Frontend | Backend | Infrastructure |
|---|---|---|
| React, TypeScript, Vite | Node.js, Express, TypeScript | Neon PostgreSQL |
| React Hook Form, Zod | PostgreSQL, pg, Zod | Render (API) |
| TanStack Query, TanStack Table | bcrypt, jsonwebtoken (JWT) | Vercel (UI) |
| Axios, Tailwind CSS, shadcn/ui, Lucide React | Helmet, express-rate-limit, cors | GitHub |

---

## 🏗️ Architecture

```
wishlist-app/
├── frontend/     # React SPA and user interface
├── backend/      # Express REST API and database access
└── README.md
```

The frontend is a React SPA that handles authentication state and communicates with the backend via authenticated requests. The backend exposes a REST API with JWT-based authorization middleware protecting all wishlist endpoints. User passwords are hashed with bcrypt; tokens are signed with a secret and validated on every protected request. Wishlist data is scoped to the authenticated user at the database layer.

---

## 📡 API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Create a new account |
| `POST` | `/auth/login` | Authenticate user and return JWT |
| `GET` | `/wishlist` | List items (paginated, filtered, sorted) |
| `POST` | `/wishlist` | Create an item |
| `PUT` | `/wishlist/:id` | Update an item |
| `DELETE` | `/wishlist/:id` | Delete an item |

Wishlist endpoints require a valid JWT in the `Authorization` header. All data is scoped to the authenticated user.

**Supported query params:** `page` · `limit` · `search` · `status` · `priority` · `sortBy` · `sortOrder`

---

## ☁️ Deployment

```
GitHub → Vercel  (frontend)
       → Render  (backend) → Neon PostgreSQL
```

Deployments trigger automatically on push to `main`.

---

## 🎓 Key Learnings

- Building a full-stack application with React, Express, PostgreSQL, and JWT authentication
- Implementing secure authentication with bcrypt and JSON Web Tokens
- Designing REST APIs with filtering, sorting, and pagination
- Managing server state and API communication with TanStack Query and Axios
- Deploying production applications with Vercel, Render, and Neon

---

## 📄 License

[MIT](LICENSE)
