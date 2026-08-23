import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
} from "react-router-dom";

import { OnboardingProvider } from "./context/OnboardingContext";

// =========================
// Layouts
// =========================
import AuthLayout from "./layouts/AuthLayout";
import StudentLayout from "./layouts/StudentLayout";

// =========================
// Authentication
// =========================
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// =========================
// Onboarding
// =========================
import Welcome from "./pages/onboarding/Welcome";
import ClassBoard from "./pages/onboarding/ClassBoard";
import Languages from "./pages/onboarding/Languages";
import Subjects from "./pages/onboarding/Subjects";
import Preferences from "./pages/onboarding/Preferences";
import Review from "./pages/onboarding/Review";
import Complete from "./pages/onboarding/Complete";

// =========================
// Student
// =========================
import Dashboard from "./pages/student/Dashboard";
import LearningHub from "./pages/student/LearningHub";
import SubjectLearning from "./pages/student/SubjectLearning";
import AITutor from "./pages/student/AITutor";
import Progress from "./pages/student/Progress";

// =========================
// Home
// =========================
function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(135deg, #eff6ff, #eef2ff, #f8fafc)",
        fontFamily: "Arial, sans-serif",
        padding: 24,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#ffffff",
          borderRadius: 24,
          padding: "48px 32px",
          textAlign: "center",
          boxShadow:
            "0 20px 50px rgba(15,23,42,0.10)",
          border: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            margin: "0 auto 20px",
            borderRadius: 20,
            background: "#2563eb",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          V
        </div>

        <h1
          style={{
            margin: "0 0 12px",
            fontSize: 40,
            color: "#0f172a",
          }}
        >
          VIDYA AI
        </h1>

        <p
          style={{
            margin: "0 auto 28px",
            maxWidth: 480,
            color: "#64748b",
            fontSize: 17,
            lineHeight: 1.6,
          }}
        >
          AI-powered multilingual learning that
          helps students understand, practice and
          learn without language barriers.
        </p>

        <Link
          to="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            background: "#2563eb",
            color: "#ffffff",
            padding: "14px 28px",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 16,
          }}
        >
          Get Started →
        </Link>

        <p
          style={{
            marginTop: 22,
            marginBottom: 0,
            color: "#94a3b8",
            fontSize: 13,
          }}
        >
          Your learning. Your language. Your pace.
        </p>
      </div>
    </div>
  );
}

// =========================
// Auth page wrapper
// =========================
function AuthPage({ children }) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}

// =========================
// Student layout route
// =========================
function StudentRouteLayout() {
  return (
    <StudentLayout>
      <Outlet />
    </StudentLayout>
  );
}

// =========================
// App
// =========================
function App() {
  return (
    <BrowserRouter>
      <OnboardingProvider>
        <Routes>

          {/* =========================
              HOME
          ========================= */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* =========================
              AUTH
          ========================= */}

          <Route
            path="/login"
            element={
              <AuthPage>
                <Login />
              </AuthPage>
            }
          />

          <Route
            path="/signup"
            element={
              <AuthPage>
                <Signup />
              </AuthPage>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <AuthPage>
                <ForgotPassword />
              </AuthPage>
            }
          />

          <Route
            path="/reset-password"
            element={
              <AuthPage>
                <ResetPassword />
              </AuthPage>
            }
          />

          {/* =========================
              ONBOARDING
          ========================= */}

          <Route
            path="/onboarding/welcome"
            element={<Welcome />}
          />

          <Route
            path="/onboarding/class-board"
            element={<ClassBoard />}
          />

          <Route
            path="/onboarding/languages"
            element={<Languages />}
          />

          <Route
            path="/onboarding/subjects"
            element={<Subjects />}
          />

          <Route
            path="/onboarding/preferences"
            element={<Preferences />}
          />

          <Route
            path="/onboarding/review"
            element={<Review />}
          />

          <Route
            path="/onboarding/complete"
            element={<Complete />}
          />

          {/* =========================
              STUDENT
          ========================= */}

          <Route element={<StudentRouteLayout />}>

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/learning"
              element={<LearningHub />}
            />

            <Route
              path="/learning/:subject"
              element={<SubjectLearning />}
            />

            {/* Must be BEFORE :topic */}
            <Route
              path="/learning/:subject/ai-tutor"
              element={<AITutor />}
            />

            <Route
              path="/learning/:subject/:topic"
              element={<SubjectLearning />}
            />

            <Route
              path="/progress"
              element={<Progress />}
            />

          </Route>

          {/* =========================
              UNKNOWN ROUTES
          ========================= */}

          <Route
            path="*"
            element={
              <Navigate
                to="/"
                replace
              />
            }
          />

        </Routes>
      </OnboardingProvider>
    </BrowserRouter>
  );
}

export default App;
