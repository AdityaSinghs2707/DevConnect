# 🚀 DevConnect

A full-stack developer social platform where developers can register, login, and share posts with the community.

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Templating:** EJS
- **Authentication:** JWT (JSON Web Tokens) + bcryptjs
- **Other:** Cookie-Parser, dotenv

---

## 📁 Project Structure

```
devconnect/
├── controllers/
│   └── authController.js      # Register, Login, Logout logic
├── models/
│   ├── User.js                # User schema
│   └── Post.js                # Post schema
├── routes/
│   ├── authRoutes.js          # /api/auth/*
│   ├── postRoutes.js          # /api/posts/*
│   └── viewRoutes.js          # Page rendering routes
├── views/
│   ├── pages/
│   │   ├── login.ejs
│   │   ├── register.ejs
│   │   ├── dashboard.ejs
│   │   ├── createPost.ejs
│   │   └── post.ejs
│   └── partials/
│       └── navbar.ejs
├── public/                    # Static files (CSS, JS)
├── .env                       # Environment variables
├── server.js                  # Entry point
└── app.js                     # Express app setup
```

---

## ⚙️ Setup & Installation

### 1. Clone the repo

```bash
git clone https://github.com/AditiyaSinghs2707/devconnect.git
cd devconnect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/devconnect
JWT_SECRET=your_secret_key_here
```

### 4. Run the server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

### 5. Open in browser

```
http://localhost:5000
```

---

## 🔐 Features

- ✅ User Registration with hashed password (bcrypt)
- ✅ User Login with JWT authentication
- ✅ Cookie-based session management
- ✅ Create & Delete posts
- ✅ Dashboard with all posts
- ✅ Protected routes (auth required)
- ✅ Responsive dark UI

---

## 📌 API Routes

### Auth Routes (`/api/auth`)

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |

### Post Routes (`/api/posts`)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/posts` | Get all posts |
| POST | `/api/posts` | Create new post |
| DELETE | `/api/posts/:id` | Delete a post |

### View Routes

| Route | Description |
|-------|-------------|
| `/` | Redirects to dashboard |
| `/register` | Register page |
| `/login` | Login page |
| `/dashboard` | Main dashboard |
| `/create-post` | Create post page |
| `/posts/:id` | Single post page |

---

## 🌱 Environment Variables

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |

---

## 👨‍💻 Author

**Aditya Singh**
- GitHub: [@AditiyaSinghs2707](https://github.com/AditiyaSinghs2707)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
