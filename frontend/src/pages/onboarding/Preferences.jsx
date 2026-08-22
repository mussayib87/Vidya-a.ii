
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
    data.learningGoal &&
    data.learningStyle &&
    data.pace;

  function handleContinue() {
    if (!canContinue) return;

    navigate("/onboarding/review");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
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

        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "71.4%" }}
          />
        </div>

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
                <p>Choose the option that fits you best.</p>
              </div>
            </div>

            <div className="preference-options">
              {goals.map((goal) => (
                <button
                  key={goal}
                  type="button"
                  className={`preference-option ${
                    data.learningGoal === goal ? "selected" : ""
                  }`}
                  onClick={() =>
                    updateData({
                      learningGoal: goal,
                    })
                  }
                >
                  {goal}

                  {data.learningGoal === goal && (
                    <span>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Learning style */}
          <div className="preference-section">
            <div className="preference-title">
              <Brain size={18} />
              <div>
                <h3>How do you learn best?</h3>
                <p>Pick the style you'd like Vidya AI to use.</p>
              </div>
            </div>

            <div className="preference-options">
              {learningStyles.map((style) => (
                <button
                  key={style}
                  type="button"
                  className={`preference-option ${
                    data.learningStyle === style
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    updateData({
                      learningStyle: style,
                    })
                  }
                >
                  {style}

                  {data.learningStyle === style && (
                    <span>✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Pace */}
          <div className="preference-section">
            <div className="preference-title">
              <Zap size={18} />
              <div>
                <h3>What's your preferred pace?</h3>
                <p>You can change this anytime later.</p>
              </div>
            </div>

            <div className="pace-grid">
              {paces.map((pace) => (
                <button
                  key={pace.value}
                  type="button"
                  className={`pace-card ${
                    data.pace === pace.value ? "selected" : ""
                  }`}
                  onClick={() =>
                    updateData({
                      pace: pace.value,
                    })
                  }
                >
                  <strong>{pace.title}</strong>

                  <span>{pace.description}</span>

                  {data.pace === pace.value && (
                    <div className="pace-check">✓</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="onboarding-navigation">
            <button
              type="button"
              className="onboarding-back-button"
              onClick={() => navigate("/onboarding/subjects")}
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

        <footer className="onboarding-footer">
          <span>Vidya AI</span>
          <span>•</span>
          <span>Your learning. Your language. Your pace.</span>
        </footer>
      </div>
    </main>
  );
}

export default Preferences;
