# 🏋️ Exercise Tracker Fullstack App

A full-stack fitness tracking application built with **React**, **Express**, and **MongoDB**.  
Users can log exercises, edit entries, and delete workouts — all through a clean, responsive interface backed by a robust REST API.



## 🧩 Tech Stack

| Layer     | Technology            |
|-----------|-----------------------|
| Frontend  | React + React Router  |
| Backend   | Express.js + Mongoose |
| Database  | MongoDB               |
| Styling   | CSS                   |
| Icons     | react-icons           |
| Dev Tools | Vite, dotenv          |



## 🚀 Features

### 🖥️ Frontend
- 📋 View all logged exercises in a table
- ➕ Add new exercises with name, reps, weight, unit, and date
- ✏️ Edit existing exercises
- 🗑️ Delete exercises
- 🔗 Navigate between pages using React Router
- 🎨 Responsive UI with icon-based actions

### 🌐 Backend
- ✅ RESTful API with full CRUD support
- 📦 MongoDB schema for exercise documents
- 🔒 Input validation for all fields
- 📁 Modular controller/model structure



## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/exercise-tracker-fullstack.git
cd exercise-tracker-fullstack
```

### 2. Setup Backend
```bash
cd exercises_rest
npm install
```

Create a `.env` file with:
```bash
MONGODB_CONNECT_STRING=your_mongodb_connection_string
PORT=3000
```

Start the server:
```bash
node exercises_controller.mjs
```

### 3. Setup Frontend

```bash
cd ../exercises_react
npm install
npm run dev
```



## 📊 Example Exercise Entry

```json
{
  "name": "Pushups",
  "reps": 20,
  "weight": 0,
  "unit": "reps",
  "date": "11-29-25"
}
```



## 🔧 API Endpoints

| Method | Endpoint         | Description           |
|--------|------------------|-----------------------|
| GET    | `/exercises`     | Get all exercises     | 
| GET    | `/exercises/:id` | Get exercise by ID    | 
| POST   | `/exercises`     | Create new exercise   |
| PUT    | `/exercises/:id` | Update exercise by ID | 
| DELETE | `/exercises/:id` | Delete exercise by ID |

