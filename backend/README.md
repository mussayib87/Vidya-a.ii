# 🎓 VIDYA AI - Backend API Documentation

Production-ready backend API service for **VIDYA AI**, an educational platform featuring AI-personalized tutoring, multi-lingual Indian curriculum support (Karnataka State Board, CBSE, ICSE), Bhashini language translation, and Supabase (PostgreSQL, Auth, Storage) integrations.

---

## 🏗️ Tech Stack

- **Runtime**: Node.js (>= 18.0.0) with ES Modules
- **Framework**: Express.js
- **Database**: Supabase PostgreSQL with Row Level Security (RLS)
- **Auth**: Supabase Auth (JWT bearer tokens)
- **Storage**: Supabase Storage Buckets
- **Validation**: Zod
- **Translation Provider**: Bhashini (Government of India National Language Translation Mission)
- **AI Engine**: Modular AI Provider Layer (OpenAI GPT-4o-mini / Extensible LLMs)
- **Security & Utilities**: Helmet, CORS, Morgan, Multer, Dotenv

---

## 📁 Directory Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── env.js                # Validated environment loader
│   │   └── supabase.js           # Supabase Admin & User client instances
│   ├── controllers/
│   │   ├── aiController.js       # AI generation endpoints
│   │   ├── authController.js     # Auth, session, password reset
│   │   ├── classroomController.js# Classroom management & enrollment
│   │   ├── lessonController.js   # Lesson CRUD & student progress
│   │   ├── profileController.js  # Profile, onboarding & dashboard
│   │   ├── quizController.js     # Quizzes & auto-evaluated attempts
│   │   ├── storageController.js  # File upload & signed URLs
│   │   └── translationController.js # Bhashini translation endpoints
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & role authorization
│   │   ├── errorMiddleware.js    # 404 & Centralized error handler
│   │   └── validationMiddleware.js# Zod schema validation
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── authRoutes.js
│   │   ├── classroomRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── profileRoutes.js
│   │   ├── quizRoutes.js
│   │   ├── storageRoutes.js
│   │   └── translationRoutes.js
│   ├── services/
│   │   ├── aiService.js          # AI business logic & prompt handling
│   │   ├── authService.js        # Supabase auth interactions
│   │   ├── classroomService.js   # Classroom business logic
│   │   ├── lessonService.js      # Lesson & progress business logic
│   │   ├── profileService.js     # Profile & onboarding persistence
│   │   ├── quizService.js        # Quiz evaluation & scoring engine
│   │   ├── storageService.js     # Supabase Storage operations
│   │   └── translationService.js # Bhashini ULCA translation interface
│   ├── utils/
│   │   ├── constants.js          # Roles, languages, error codes
│   │   └── response.js           # Standard success/error responses & ApiError
│   ├── app.js                    # Express app configuration & middleware
│   └── server.js                 # Server startup & graceful shutdown
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## ⚙️ Environment Configuration

Create a `.env` file in `backend/` based on `.env.example`:

```env
# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Supabase PostgreSQL & Auth
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# AI Provider
AI_PROVIDER=openai
AI_API_KEY=sk-...
AI_MODEL=gpt-4o-mini

# Bhashini Translation API
BHASHINI_API_KEY=your_bhashini_api_key
BHASHINI_USER_ID=your_bhashini_user_id
BHASHINI_PIPELINE_ID=64392f96daac500b55c543d6
BHASHINI_BASE_URL=https://dhruva-api.bhashini.gov.in/services/inference/pipeline
```

---

## 🗄️ Database Setup & Migrations

Execute the SQL migration files located in `database/migrations/` sequentially in your Supabase SQL Editor:

1. `001_profiles.sql` - User profiles, triggers on auth.users, and RLS
2. `002_classrooms.sql` - Classroom management and access control
3. `003_classroom_students.sql` - Student enrollment junction table
4. `004_lessons.sql` - Curriculum lessons and publication flags
5. `005_worksheets.sql` - Practice worksheets
6. `006_flashcards.sql` - Revision flashcard decks
7. `007_quizzes.sql` - Assessments & MCQs
8. `008_quiz_attempts.sql` - Student quiz attempts and scoring
9. `009_progress.sql` - Curriculum & lesson progress tracking
10. `010_notifications.sql` - System notification queue
11. `011_storage.sql` - Storage bucket policies for `educational-files` and `avatars`
12. `database/seed.sql` - Starter Class 10 Karnataka State Board curriculum seeds

---

## 🚀 Quickstart & Local Execution

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run in development mode with live reloading:
   ```bash
   npm run dev
   ```

4. Run in production mode:
   ```bash
   npm start
   ```

---

## 📡 REST API Reference (`/api/v1`)

### Response Format Standard

#### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation description"
}
```

#### Error Response
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable explanation of error"
  }
}
```

---

### 1. Health Endpoint

- **`GET /api/v1/health`**
  - Public health check

---

### 2. Authentication (`/api/v1/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/signup` | Public | Register user (`email`, `password`, `fullName`, `role`) |
| `POST` | `/login` | Public | Login with email & password |
| `POST` | `/logout` | Authenticated | Invalidate session |
| `GET` | `/me` | Authenticated | Get current user profile |
| `POST` | `/refresh` | Public | Refresh JWT session using `refreshToken` |
| `POST` | `/forgot-password` | Public | Send password recovery email |
| `POST` | `/reset-password` | Authenticated | Set new password |

---

### 3. Profile & Onboarding (`/api/v1/profile`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Authenticated | Retrieve user profile |
| `PUT` | `/` | Authenticated | Update profile details (`fullName`, `avatarUrl`, `bio`) |
| `PUT` | `/onboarding` | Authenticated | Save onboarding data (`classLevel`, `board`, `preferredLanguage`, `subjects`, `learningGoal`, `learningStyle`, `learningPace`) |
| `GET` | `/dashboard` | Authenticated | Get aggregated dashboard metrics |

---

### 4. Lessons & Progress (`/api/v1/lessons`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public/Auth | List lessons (with filter query params) |
| `POST` | `/` | Teacher/Admin | Create a lesson |
| `GET` | `/:id` | Public/Auth | Get lesson by ID & student progress |
| `PUT` | `/:id` | Teacher/Admin | Update lesson details |
| `DELETE` | `/:id` | Teacher/Admin | Delete lesson |
| `POST` | `/:id/publish` | Teacher/Admin | Publish/Unpublish lesson |
| `POST` | `/:id/progress` | Authenticated | Update student completion & time spent |
| `GET` | `/:id/progress` | Authenticated | Get student's lesson progress |

---

### 5. Classrooms (`/api/v1/classrooms`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/` | Teacher/Admin | Create a new classroom with auto-generated code |
| `GET` | `/teacher` | Teacher/Admin | Get classrooms created by teacher |
| `GET` | `/student` | Student/Auth | Get classrooms student has joined |
| `POST` | `/join` | Student/Auth | Join classroom with 6-character code |
| `GET` | `/:id` | Enrolled/Teacher| Get classroom details & enrolled students |
| `POST` | `/:id/leave` | Student/Auth | Leave a classroom |
| `DELETE` | `/:id/students/:studentId` | Teacher/Admin | Remove a student from classroom |

---

### 6. Quizzes & Evaluation (`/api/v1/quizzes`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Public/Auth | List quizzes |
| `POST` | `/` | Teacher/Admin | Create quiz with questions & passing score |
| `GET` | `/attempts/my` | Student/Auth | Get student's quiz history & scores |
| `GET` | `/:id` | Public/Auth | Get quiz (correct answers hidden for students) |
| `PUT` | `/:id` | Teacher/Admin | Update quiz |
| `DELETE` | `/:id` | Teacher/Admin | Delete quiz |
| `POST` | `/:id/attempt` | Student/Auth | Submit attempt, auto-grade and record score |
| `GET` | `/:id/attempts` | Teacher/Admin | Get all student attempts for this quiz |

---

### 7. AI Tutor & Generation (`/api/v1/ai`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/lesson` | Generate comprehensive structured lesson |
| `POST` | `/explanation`| Generate personalized explanation with analogies |
| `POST` | `/quiz` | Generate MCQ quiz with pedagogical explanations |
| `POST` | `/worksheet` | Generate printable practice worksheet |
| `POST` | `/flashcards` | Generate revision flashcards |

---

### 8. Translation (`/api/v1/translation`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/` | Translate text via Bhashini (`text`, `sourceLanguage`, `targetLanguage`) |
| `GET` | `/languages` | List supported Indian languages & ISO codes |

---

### 9. Storage (`/api/v1/storage`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/upload` | Authenticated | Upload file (`multipart/form-data`) |
| `POST` | `/signed-url` | Authenticated | Create temporary signed download URL |
| `DELETE` | `/file` | Authenticated | Delete file from bucket |

---

## 🧪 Example cURL Requests

### 1. Health Check
```bash
curl -X GET http://localhost:5000/api/v1/health
```

### 2. User Signup
```bash
curl -X POST http://localhost:5000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@vidya.ai",
    "password": "Password123!",
    "fullName": "Aarav Sharma",
    "role": "student"
  }'
```

### 3. User Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "student@vidya.ai",
    "password": "Password123!"
  }'
```

### 4. Save Student Onboarding
```bash
curl -X PUT http://localhost:5000/api/v1/profile/onboarding \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "classLevel": "10",
    "board": "Karnataka State Board",
    "preferredLanguage": "Kannada",
    "subjects": ["Mathematics", "Science"],
    "learningGoal": "Score above 95% in Board Exams",
    "learningStyle": "visual",
    "learningPace": "medium"
  }'
```

### 5. Generate AI Personalized Explanation
```bash
curl -X POST http://localhost:5000/api/v1/ai/explanation \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -d '{
    "topic": "Euclids Division Lemma",
    "studentQuery": "How does remainder rule work in real life?",
    "classLevel": "10",
    "board": "Karnataka State Board",
    "language": "English",
    "learningStyle": "interactive"
  }'
```

### 6. Translate Text via Bhashini
```bash
curl -X POST http://localhost:5000/api/v1/translation \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The Fundamental Theorem of Arithmetic states that every composite number can be factored uniquely into primes.",
    "sourceLanguage": "en",
    "targetLanguage": "kn"
  }'
```

---

## 🔒 Security Best Practices Implemented

- **No Hardcoded Secrets**: All keys, URLs, and secrets are dynamically loaded from environment variables.
- **Service Role Isolation**: Supabase Service Role Key is used solely on the server and is never exposed to clients.
- **Strict Role-Based Access Control**: Sensitive operations (e.g. creating/updating lessons, classrooms, quizzes) are guarded with `requireRole(['teacher', 'admin'])`.
- **Row-Level Security (RLS)**: Enforced across all 11 PostgreSQL tables to ensure students cannot access or manipulate other students' submissions or private records.
- **Input Validation**: Every incoming payload is strictly validated using Zod schemas before reaching the controller.
- **Safe Error Responses**: Internal stack traces and system internals are masked in production.

---

## 🔄 Git Commands to Commit Backend Separately

```bash
# Stage backend, database, ai, and services files
git add backend/ database/ ai/ services/

# Commit changes
git commit -m "feat(backend): implement complete production-ready backend API, Supabase migrations, AI and Bhashini services"

# Push to GitHub repository
git push origin main
```
