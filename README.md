# 🗒️ Sticky Notes App with AI

A smart digital sticky notes app with AI-powered text rewriting.

---

## Stack

- **Frontend:** Angular
- **Backend:** ASP.NET Core Web API
- **Database:** MongoDB
- **Authentication:** JWT
- **AI Integration:** GEMINI API

---

## Main Features

- User registration and login with JWT-based authentication
- Each user sees only their own notes
- Full CRUD on notes (create, edit, delete)
- AI button to rephrase note content using Gemini API
- Clean and responsive UI

---

## How to Run the Project

### Prerequisites

- Node.js + Angular CLI
- .NET 7.0 / 8.0 SDK
- MongoDB (locally or MongoDB Atlas)
- Gemini API key

---

### 1. Run the Backend (.NET Core API)

cd backend/NotesApiMongo
dotnet restore
dotnet run

### 2. Run the Frontend (Angular)

cd frontend/
npm install
ng serve
npm run start
