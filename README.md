# TickDone

TickDone is a simple and modern **to-do web app** built using the **MERN stack** (MongoDB, Express, React, and Node.js).  
It was created as a practice project with a strong focus on **user authentication** (register, login, logout, and protected routes).  
The goal of this app is to manage daily tasks efficiently while exploring core MERN concepts like REST APIs, JWT-based authentication, and state management on the frontend.

---

## Features

- User authentication (sign up, login, logout)
- Secure protected routes
- Add, edit, and delete to-do items
- Real-time updates to your task list

---

## Tech Stack

- **Frontend:** React + Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)

---

## Getting Started

Follow these steps to run both the frontend and backend locally.

### 1. Clone the repository

#### This will download the project to your local machine:

```bash
git clone https://github.com/your-username/TickDone.git
```

#### (Move into the tickdone folder)

```bash
cd tickdone
```

### 2. Install and run the backend

#### (Move into the backend folder)

```bash
cd backend
```

#### Install all backend dependencies

```bash
npm install
```

#### Start the backend development server

```bash
npm run dev
```

npm run dev

#### Backend will start at http://localhost:3000 by default

### 3. In a new terminal window/tab, install and run the frontend

#### (Move into the frontend folder)

```bash
cd ../frontend
```

#### Install all frontend dependencies

```bash
npm install
```

#### Start the frontend development server

```bash
npm run dev
```

#### Frontend will start at http://localhost:5173 by default

#### Move into the backend folder (if not already there)

```bash
cd backend
```

#### Copy .env.example to a new .env file

```bash
cp .env.example .env
```

Now open the newly created .env file in your code editor and add your own values for each variable (such as MongoDB connection string and JWT secret).
This ensures the backend runs with your custom configuration.

#### Example of what your .env file should look like:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
...
```
