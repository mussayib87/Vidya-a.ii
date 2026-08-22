import { Navigate, Route, Routes } from "react-router-dom";

import { OnboardingProvider } from "./context/OnboardingContext";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Welcome from "./pages/onboarding/Welcome";
import ClassBoard from "./pages/onboarding/ClassBoard";
import Languages from "./pages/onboarding/Languages";
import Subjects from "./pages/onboarding/Subjects";
import Preferences from "./pages/onboarding/Preferences";
import Review from "./pages/onboarding/Review";
import Complete from "./pages/onboarding/Complete";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div>
        <h1>Vidya AI</h1>

        <p>
          AI-powered multilingual learning platform.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
            marginTop: "24px",
          }}
        >
          <a href="/login" className="btn btn-primary">
            Login
          </a>

          <a href="/signup" className="btn btn-outline">
            Create account
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <OnboardingProvider>
      <Routes>
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
          path="/onboarding/class"
          element={<ClassBoard />}
        />

        <Route
          path="/onboarding/language"
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

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </OnboardingProvider>
  );
}

export default App;
