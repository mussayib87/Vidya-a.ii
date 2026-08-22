
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Target,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

function Review() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  function handleComplete() {
    navigate("/onboarding/complete");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
        {/* Header */}
        <header className="onboarding-header">
          <div className="onboarding-logo">
            <div className="onboarding-logo-icon">
              <CheckCircle2 size={20} />
            </div>

            <span>
              Vidya<span> AI</span>
            </span>
          </div>

          <div className="onboarding-step">
            <span>Step</span>
            <strong>6</strong>
            <span>of 7</span>
          </div>
        </header>

        {/* Progress */}
        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "85.68%" }}
          />
        </div>

        {/* Content */}
        <section className="onboarding-form-section review-section">
          <div className="onboarding-heading">
            <div className="welcome-icon">
              <CheckCircle2 size={28} />
            </div>

            <h1>Let's review your profile</h1>

            <p>
              Everything looks good? You can go back and change anything
              before finishing your setup.
            </p>
          </div>

          {/* Academic information */}
          <div className="review-card">
            <div className="review-card-header">
              <div className="review-card-title">
                <GraduationCap size={18} />

                <div>
                  <h3>Academic profile</h3>
                  <p>Your class and board</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/onboarding/class")}
              >
                Edit
              </button>
            </div>

            <div className="review-details">
              <div>
                <span>Class</span>
                <strong>
                  {data.classLevel || "Not selected"}
                </strong>
              </div>

              <div>
                <span>Board</span>
                <strong>
                  {data.board || "Not selected"}
                </strong>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="review-card">
            <div className="review-card-header">
              <div className="review-card-title">
                <Globe2 size={18} />

                <div>
                  <h3>Learning language</h3>
                  <p>Your preferred language</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/onboarding/language")}
              >
                Edit
              </button>
            </div>

            <div className="review-language">
              <span className="review-language-icon">
                {data.language
                  ? data.language.charAt(0)
                  : "?"}
              </span>

              <strong>
                {data.language || "Not selected"}
              </strong>
            </div>
          </div>

          {/* Subjects */}
          <div className="review-card">
            <div className="review-card-header">
              <div className="review-card-title">
                <BookOpen size={18} />

                <div>
                  <h3>Subjects</h3>
                  <p>Your selected subjects</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/onboarding/subjects")}
              >
                Edit
              </button>
            </div>

            <div className="review-tags">
              {data.subjects.length > 0 ? (
                data.subjects.map((subject) => (
                  <span key={subject}>{subject}</span>
                ))
              ) : (
                <span>None selected</span>
              )}
            </div>
          </div>

          {/* Preferences */}
          <div className="review-card">
            <div className="review-card-header">
              <div className="review-card-title">
                <Brain size={18} />

                <div>
                  <h3>Learning preferences</h3>
                  <p>How Vidya AI should teach you</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  navigate("/onboarding/preferences")
                }
              >
                Edit
              </button>
            </div>

            <div className="review-preferences">
              <div className="review-preference">
                <Target size={16} />

                <div>
                  <span>Goal</span>
                  <strong>
                    {data.learningGoal || "Not selected"}
                  </strong>
                </div>
              </div>

              <div className="review-preference">
                <Brain size={16} />

                <div>
                  <span>Learning style</span>
                  <strong>
                    {data.learningStyle || "Not selected"}
                  </strong>
                </div>
              </div>

              <div className="review-preference">
                <Zap size={16} />

                <div>
                  <span>Learning pace</span>
                  <strong>
                    {data.pace || "Not selected"}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="review-summary">
            <CheckCircle2 size={18} />

            <div>
              <strong>Your learning profile is ready.</strong>

              <p>
                Vidya AI will use these preferences to personalize
                your lessons, explanations and practice.
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="onboarding-navigation">
            <button
              type="button"
              className="onboarding-back-button"
              onClick={() =>
                navigate("/onboarding/preferences")
              }
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <button
              type="button"
              className="onboarding-primary-button"
              onClick={handleComplete}
            >
              Complete setup
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        <footer className="onboarding-footer">
          <span>Vidya AI</span>
          <span>•</span>
          <span>Your learning. Your language. Your pace.</span>
        </footer>
      </div>
    </main>
  );
}

export default Review;
