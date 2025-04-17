# Gotham Blog Frontend 🦇📰

> A single-page React application connected to the **Gotham Blog API**.  
> Explore Gotham's digital newspaper — where stories of heroes, villains,  
> and citizens collide. Users can post, comment, like... or manage the mayhem (if you're an Admin).

---

## 🚀 Features

- **Responsive SPA** (mobile & desktop) using React Router & Bootstrap
- **JWT Authentication** (Register / Login)
- **CRUD** on Blog Posts (create, edit, delete)
- **Commenting** & **Liking** per post (per-user state)
- **Admin Dashboard** for listing & removing users
- **Context API** for global auth & like-state
- **Loading** and **Error** states on all API calls
- Gotham-themed UI with **Bangers** comic font

---

## 📖 App Overview

**Gotham Blog** is a dark-themed citywide blogging platform set in the heart of Gotham.  
From anonymous vigilantes to curious citizens, everyone has a voice.

Create posts, debate in comments, and uncover the latest tales of corruption, justice, or chaos.  
Admins patrol the system — keeping order by managing users.

---

## 🧭 Pages & Navigation

| Path             | Page                        | Access         |
| ---------------- | --------------------------- | -------------- |
| `/`              | Home                        | Public         |
| `/login`         | Login                       | Public         |
| `/register`      | Register                    | Public         |
| `/posts`         | All Blog Posts              | Public         |
| `/post/:id`      | View Single Post            | Public         |
| `/create-post`   | Create Post                 | Logged-in only |
| `/edit-post/:id` | Edit Post                   | Author only    |
| `/admin`         | Admin Dashboard (User List) | Admin only     |
| `/error`         | Error/Fallback Page         | All users      |

---

## 🛠️ Tech Stack

- **React** 18 + **Vite**
- **React Router** for client-side routing
- **Bootstrap 5** for layout & components
- **Axios** for HTTP requests
- **Context API** for global state
- **date-fns** for formatting
- **Bangers** Google Font for headings

---

## 📦 Prerequisites

- **Node.js** ≥ 16 & **npm**
- A running **Gotham Blog API** on `http://localhost:5113`  
  (see [backend README](../backend/README.md))

---

## ⚙️ Installation & Development

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/GothamBlog.git
   cd GothamBlog/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:5173` by default.

---

## 🔨 Building for Production

```bash
npm run build
```

This will output the production-ready files into the `dist/` directory.

---

## 🚢 Deployment

You can deploy the contents of `dist/` to any static hosting (Netlify, Vercel, GitHub Pages, etc.).  
For GitHub Pages, see [`frontend-ci-cd.yml`](.github/workflows/frontend-ci-cd.yml) for an example GitHub Actions workflow.

---

## ⚙️ Configuration

If your API URL differs, update the base URL in `src/services/axios.js`:

```js
// src/services/axios.js
import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5113/api",
  withCredentials: true,
});
```

---

## 📂 Project Structure

```
frontend/
├─ public/           # Static assets & index.html
├─ src/
│  ├─ assets/        # Images & fonts
│  ├─ components/    # Reusable UI components
│  ├─ context/       # React Context providers (AuthContext)
│  ├─ pages/         # Route-level components
│  ├─ services/      # API service modules (Axios wrappers)
│  ├─ styles/        # Shared CSS
│  ├─ App.jsx
│  └─ main.jsx
├─ .github/          # CI/CD workflows
├─ package.json
└─ vite.config.js
```

---

## 📑 Scripts

- `npm run dev` — start development server
- `npm run build` — build for production
- `npm run preview` — locally preview production build

---

## 📝 License & Academic Integrity

This project is submitted for academic assessment.  
All code is my own work and adheres to academic integrity standards.

