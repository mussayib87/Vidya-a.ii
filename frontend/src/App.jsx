          import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import Dashboard from "./pages/student/Dashboard";
function App() {
  return (
    <OnboardingProvider>
      <BrowserRouter>
        <Routes>

          {/* Home */}
          <Route
            path="/"
            element={
              <div
                style={{
                  minHeight: "100vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1>VIDYA AI</h1>
                  <p>AI-powered multilingual learning</p>

                  <a href="/login">
                    Get Started
                  </a>
                </div>
              </div>
            }
          />

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
