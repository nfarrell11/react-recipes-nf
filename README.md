# 🧠 Code Editor CMS

A full-stack CRUD application built with **Next.js App Router**, featuring a live code editor, user authentication, and content management capabilities.

This project was developed as part of a course assignment, using a custom authentication system provided by the instructor. It demonstrates core concepts of modern web development including:

- Server Actions
- Auth-protected routes
- Prisma ORM
- PostgreSQL (via Neon)
- Session handling with Redis
- Tailwind + ShadCN UI components

---

## 🚀 Features

- ✅ Create, edit, and delete code blocks
- 🔒 Secure authentication using bcrypt + session cookies
- 🎨 Live code editing with Monaco Editor
- 🧩 Modular file structure with server actions and validation
- 🗂 Filtered block list with search support
- 🧪 Input validation with Zod
- 💽 PostgreSQL + Prisma for data persistence
- ☁️ Deployed on Vercel

---

## 📸 Preview

> 🖼️ _(Add screenshot here of your app UI — dashboard, block editor, etc.)_

---

## 🌐 Live Demo

**[🔗 Visit the app on Vercel](https://your-app.vercel.app)**  
_(Replace the URL with your deployed instance)_

---

## 🛠 Tech Stack

| Tech | Description |
|------|-------------|
| **Next.js (App Router)** | React-based framework with hybrid SSR/CSR support |
| **Prisma** | Type-safe ORM for PostgreSQL |
| **Zod** | Schema validation for form input |
| **Tailwind CSS** | Utility-first styling framework |
| **ShadCN UI** | Headless UI components with Tailwind |
| **Redis** | Session storage |
| **Monaco Editor** | Embedded code editor (same as VS Code) |
| **Neon** | Serverless PostgreSQL database |

---

## 🧪 Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Push schema to your database
npx prisma db push

# Run dev server
npm run dev