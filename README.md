# 🛍️ Wishlist App

A full-stack wishlist manager built with React and Express. Users can create, edit, delete, search, filter, sort, and paginate wishlist items through a modern UI backed by a REST API and PostgreSQL database.

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

- Create, edit, and delete wishlist items
- Search by title
- Filter by status and priority
- Server-side sorting
- Server-side pagination
- Form validation with React Hook Form and Zod
- Responsive UI
- Loading states and skeletons

---

## 🛠️ Tech Stack

| Frontend | Backend | Infrastructure |
|---|---|---|
| React, TypeScript, Vite | Node.js, Express, TypeScript | Neon PostgreSQL |
| React Hook Form, Zod | PostgreSQL, pg, Zod | Render (API) |
| TanStack Query, TanStack Table | Helmet, express-rate-limit, cors | Vercel (UI) |
| Axios, Tailwind CSS, shadcn/ui, Lucide React | | GitHub |

---

## 🏗️ Architecture

```
wishlist-app/
├── frontend/     # React SPA and user interface
├── backend/      # Express REST API and database access
└── README.md
```

Frontend provides the user interface, while the backend exposes a REST API and handles all database operations. Data is stored in Neon PostgreSQL.

---

## 📡 API

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/wishlist` | List items (paginated, filtered, sorted) |
| `POST` | `/wishlist` | Create an item |
| `PUT` | `/wishlist/:id` | Update an item |
| `DELETE` | `/wishlist/:id` | Delete an item |

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

- Building and deploying a full-stack application with React, Express, and PostgreSQL
- Designing REST APIs with filtering, sorting, and pagination
- Writing secure PostgreSQL queries using parameterized statements
- Configuring production deployments with Vercel, Render, and Neon
- Applying production-ready practices — environment configuration, CORS, rate limiting, and error handling

---

## 📄 License

[MIT](LICENSE)
