import React from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

function Complete() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  function handleStartLearning() {
    // Dashboard will be connected later.
    // For now, go to the main home page.
    navigate("/");
  }

  return (
    <main className="onboarding-page complete-page">
      <div className="onboarding-shell">

        {/* Header */}
        <header className="onboarding-header">
          <div className="onboarding-logo">

            <div className="onboarding-logo-icon">
              <Sparkles size={20} />
            </div>

            <span>
              Vidya<span> AI</span>
            </span>

          </div>

          <div className="onboarding-step">
            <span>Step</span>
            <strong>7</strong>
            <span>of 7</span>
          </div>
        </header>

        {/* Progress */}
        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "100%" }}
          />
        </div>

        {/* Content */}
        <section className="complete-content">

          {/* Success icon */}
          <div className="complete-icon-wrapper">
            <div className="complete-icon">
              <Check
                size={42}
                strokeWidth={3}
              />
            </div>
          </div>

          {/* Heading */}
          <div className="complete-heading">

            <div className="complete-badge">
              <Sparkles size={14} />
              Setup complete
            </div>

            <h1>
              You're ready to
              <span> start learning!</span>
            </h1>

            <p>
              Your Vidya AI learning profile has been prepared
              according to your class, subjects and learning
              preferences.
            </p>

          </div>

          {/* Profile */}
          <div className="complete-profile-card">

            <div className="complete-profile-header">

              <div>
                <span>Your learning profile</span>

                <strong>
                  {data.classLevel || "Student"}
                </strong>
              </div>

              <CheckCircle2 size={22} />

            </div>

            <div className="complete-profile-grid">

              <div>
                <span>Language</span>

                <strong>
                  {data.language || "Not selected"}
                </strong>
              </div>

              <div>
                <span>Subjects</span>

                <strong>
                  {Array.isArray(data.subjects)
                    ? `${data.subjects.length} selected`
                    : "0 selected"}
                </strong>
              </div>

              <div>
                <span>Goal</span>

                <strong>
                  {data.learningGoal || "Not selected"}
                </strong>
              </div>

              <div>
                <span>Pace</span>

                <strong>
                  {data.pace || "Not selected"}
                </strong>
              </div>

            </div>
          </div>

          {/* Features */}
          <div className="complete-features">

            <div className="complete-feature">

              <div className="complete-feature-icon">
                <Check size={16} />
              </div>

              <div>
                <strong>
                  Personalized lessons
                </strong>

                <span>
                  Lessons adapted to your learning preferences
                </span>
              </div>

            </div>

            <div className="complete-feature">

              <div className="complete-feature-icon">
                <Check size={16} />
              </div>

              <div>
                <strong>
                  Learning in your language
                </strong>

                <span>
                  Understand concepts in the language you prefer
                </span>
              </div>

            </div>

            <div className="complete-feature">

              <div className="complete-feature-icon">
                <Check size={16} />
              </div>

              <div>
                <strong>
                  AI-powered assistance
                </strong>

                <span>
                  Ask questions and get explanations whenever
                  you need them
                </span>
              </div>

            </div>

          </div>

          {/* Start learning */}
          <button
            type="button"
            className="complete-start-button"
            onClick={handleStartLearning}
          >
            Start learning
            <ArrowRight size={19} />
          </button>

          <p className="complete-note">
            You can change your learning preferences anytime
            from your profile.
          </p>

        </section>

        {/* Footer */}
        <footer className="onboarding-footer">
          <span>Vidya AI</span>
          <span>•</span>
          <span>
            Your learning. Your language. Your pace.
          </span>
        </footer>

      </div>
    </main>
  );
}

export default Complete;
