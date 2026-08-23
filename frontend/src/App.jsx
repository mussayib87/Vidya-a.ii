import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import { OnboardingProvider } from "./context/OnboardingContext";

// Authentication
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Onboarding
import Welcome from "./pages/onboarding/Welcome";
import ClassBoard from "./pages/onboarding/ClassBoard";
import Languages from "./pages/onboarding/Languages";
import Subjects from "./pages/onboarding/Subjects";
import Preferences from "./pages/onboarding/Preferences";
import Review from "./pages/onboarding/Review";
import Complete from "./pages/onboarding/Complete";

// Student
import Dashboard from "./pages/student/Dashboard";
import LearningHub from "./pages/student/LearningHub";

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
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          background: "#fff",
          borderRadius: 24,
          padding: "48px 32px",
          textAlign: "center",
          boxShadow: "0 20px 50px rgba(15,23,42,0.10)",
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
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 800,
          }}
        >
          V
        </div>

        <h1 style={{ margin: "0 0 12px", fontSize: 40 }}>
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
          AI-powered multilingual learning that helps students
          understand, practice and learn without language barriers.
        </p>

        <Link
          to="/login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            textDecoration: "none",
            background: "#2563eb",
            color: "#fff",
            padding: "14px 28px",
            borderRadius: 12,
            fontWeight: 700,
          }}
        >
          Get Started →
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <OnboardingProvider>
      <BrowserRouter>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/forgot-password"
            element={<ForgotPassword />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          {/* Onboarding */}
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

          {/* Student */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/learning"
            element={<LearningHub />}
          />

          {/* Unknown routes */}
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </BrowserRouter>
    </OnboardingProvider>
  );
}

export default App;
