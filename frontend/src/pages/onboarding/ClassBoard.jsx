
import { ArrowLeft, ArrowRight, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

const classes = [
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10",
  "Class 11",
  "Class 12",
];

const boards = [
  "CBSE",
  "ICSE",
  "Karnataka State Board",
  "Other State Board",
];

function ClassBoard() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();

  const canContinue = data.classLevel && data.board;

  function handleContinue() {
    if (!canContinue) return;

    navigate("/onboarding/language");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
        <header className="onboarding-header">
          <div className="onboarding-logo">
            <div className="onboarding-logo-icon">
              <GraduationCap size={20} />
            </div>

            <span>
              Vidya<span> AI</span>
            </span>
          </div>

          <div className="onboarding-step">
            <span>Step</span>
            <strong>2</strong>
            <span>of 7</span>
          </div>
        </header>

        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "28.56%" }}
          />
        </div>

        <section className="onboarding-form-section">
          <div className="onboarding-heading">
            <div className="welcome-icon">
              <GraduationCap size={28} />
            </div>

            <h1>Tell us about your class</h1>

            <p>
              This helps Vidya AI personalize lessons, examples and practice
              questions for your academic level.
            </p>
          </div>

          <div className="selection-section">
            <label>Which class are you studying in?</label>

            <div className="selection-grid">
              {classes.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`selection-card ${
                    data.classLevel === item ? "selected" : ""
                  }`}
                  onClick={() =>
                    updateData({
                      classLevel: item,
                    })
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="selection-section">
            <label>Which board do you follow?</label>

            <div className="selection-grid">
              {boards.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`selection-card ${
                    data.board === item ? "selected" : ""
                  }`}
                  onClick={() =>
                    updateData({
                      board: item,
                    })
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="onboarding-navigation">
            <button
              type="button"
              className="onboarding-back-button"
              onClick={() => navigate("/onboarding/welcome")}
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
              Continue
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

export default ClassBoard;
