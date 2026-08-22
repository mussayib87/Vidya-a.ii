
             import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  Target,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

const goals = [
  "Understand concepts",
  "Prepare for exams",
  "Improve my grades",
  "Complete homework",
  "Build strong fundamentals",
];

const learningStyles = [
  "Visual explanations",
  "Simple step-by-step teaching",
  "Examples & real-world applications",
  "Practice questions",
];

const paces = [
  {
    value: "Relaxed",
    title: "Relaxed",
    description: "Learn slowly with more explanation",
  },
  {
    value: "Balanced",
    title: "Balanced",
    description: "A comfortable mix of learning and practice",
  },
  {
    value: "Fast",
    title: "Fast-paced",
    description: "Move quickly through concepts",
  },
];

function Preferences() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();

  const canContinue =
    Boolean(data.learningGoal) &&
    Boolean(data.learningStyle) &&
    Boolean(data.pace);

  function handleGoalSelect(goal) {
    updateData({
      learningGoal: goal,
    });
  }

  function handleLearningStyleSelect(style) {
    updateData({
      learningStyle: style,
    });
  }

  function handlePaceSelect(pace) {
    updateData({
      pace,
    });
  }

  function handleBack() {
    navigate("/onboarding/subjects");
  }

  function handleContinue() {
    if (!canContinue) return;

    navigate("/onboarding/review");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">

        {/* Header */}
        <header className="onboarding-header">
          <div className="onboarding-logo">
            <div className="onboarding-logo-icon">
              <Brain size={20} />
            </div>

            <span>
              Vidya<span> AI</span>
            </span>
          </div>

          <div className="onboarding-step">
            <span>Step</span>
            <strong>5</strong>
            <span>of 7</span>
          </div>
        </header>

        {/* Progress */}
        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "71.4%" }}
          />
        </div>

        {/* Main */}
        <section className="onboarding-form-section">

          <div className="onboarding-heading">
            <div className="welcome-icon">
              <Brain size={28} />
            </div>

            <h1>Make Vidya AI yours</h1>

            <p>
              Tell us how you prefer to learn. We'll use these
              preferences to personalize your learning experience.
            </p>
          </div>

          {/* Goal */}
          <div className="preference-section">
            <div className="preference-title">
              <Target size={18} />

              <div>
                <h3>What's your main goal?</h3>
                <p>
                  Choose the option that fits you best.
                </p>
              </div>
            </div>

            <div className="preference-options">
              {goals.map((goal) => {
                const selected =
                  data.learningGoal === goal;

                return (
                  <button
                    key={goal}
                    type="button"
                    className={`preference-option ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleGoalSelect(goal)
                    }
                    aria-pressed={selected}
                  >
                    <span>{goal}</span>

                    {selected && (
                      <span>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Learning style */}
          <div className="preference-section">
            <div className="preference-title">
              <Brain size={18} />

              <div>
                <h3>How do you learn best?</h3>
                <p>
                  Pick the style you'd like Vidya AI to use.
                </p>
              </div>
            </div>

            <div className="preference-options">
              {learningStyles.map((style) => {
                const selected =
                  data.learningStyle === style;

                return (
                  <button
                    key={style}
                    type="button"
                    className={`preference-option ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      handleLearningStyleSelect(style)
                    }
                    aria-pressed={selected}
                  >
                    <span>{style}</span>

                    {selected && (
                      <span>✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pace */}
          <div className="preference-section">
            <div className="preference-title">
              <Zap size={18} />

              <div>
                <h3>What's your preferred pace?</h3>
                <p>
                  You can change this anytime later.
                </p>
              </div>
            </div>

            <div className="pace-grid">
              {paces.map((pace) => {
                const selected =
                  data.pace === pace.value;

                return (
                  <button
                    key={pace.value}
                    type="button"
                    className={`pace-card ${
                      selected ? "selected" : ""
                    }`}
                    onClick={() =>
                      handlePaceSelect(pace.value)
                    }
                    aria-pressed={selected}
                  >
                    <strong>{pace.title}</strong>

                    <span>{pace.description}</span>

                    {selected && (
                      <div className="pace-check">
                        ✓
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="onboarding-navigation">

            <button
              type="button"
              className="onboarding-back-button"
              onClick={handleBack}
            >
              <ArrowLeft size={17} />
              Back
            </button>

            <button
              type="button"
              className="onboarding-primary-button"
              disabled={!canContinue}
              onClick={handleContinue}
            >
              Review
              <ArrowRight size={18} />
            </button>

          </div>

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

export default Preferences;       
