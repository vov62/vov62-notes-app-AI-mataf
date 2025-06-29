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

- cd backend/NotesApiMongo
- dotnet restore
- dotnet run

\*\*\* notice

- you need gemini api key.
  I saved my Gemini APY Key in User Secrets in .NET environment so it wont work for you.
  you need to save your api key in User Secrets .NET environment, is the most secure way and you be able to make api call for Gemini api.
  To save your api key in User secrets run this commands:
  1. dotnet user-secrets init
  2. dotnet user-secrets set "Gemini:ApiKey" "your-api-key-here"

### 2. Run the Frontend (Angular)

- cd frontend/
- npm install
- ng serve
- npm run start

### Login Screen

![alt text](login.png)

### Home Page

![alt text](homepage.png)

### New Note Screen

![alt text](<new note.png>)

### Using AI for Rephrasing

When the user clicks the “Rephrase” (" ניסוח עם AI ") button, the note content is sent to Gemini API (GPT model) to receive a reworded version
