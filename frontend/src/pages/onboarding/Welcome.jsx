import React from "react";
import { ArrowRight, BookOpen, Globe2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  function handleContinue() {
    navigate("/onboarding/class");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
        {/* Header */}
        <header className="onboarding-header">
          <div className="onboarding-logo">
            <div className="onboarding-logo-icon">
              <BookOpen size={20} />
            </div>

            <span>
              Vidya<span> AI</span>
            </span>
          </div>

          <div className="onboarding-step">
            <span>Step</span>
            <strong>1</strong>
            <span>of 7</span>
          </div>
        </header>

        {/* Progress */}
        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "14.28%" }}
          />
        </div>

        {/* Main */}
        <section className="welcome-content">
          <div className="welcome-icon">
            <Sparkles size={30} />
          </div>

          <div className="welcome-badge">
            <Globe2 size={15} />
            Personalized learning
          </div>

          <h1>
            Welcome to
            <span> Vidya AI</span>
          </h1>

          <p className="welcome-description">
            Let's personalize your learning experience. We'll ask you a few
            simple questions so Vidya AI can understand how you learn best.
          </p>

          {/* Feature cards */}
          <div className="welcome-features">
            <div className="welcome-feature">
              <div className="feature-number">01</div>

              <div>
                <h3>Your learning profile</h3>
                <p>
                  Tell us your class, board and preferred language.
                </p>
              </div>
            </div>

            <div className="welcome-feature">
              <div className="feature-number">02</div>

              <div>
                <h3>Your subjects</h3>
                <p>
                  Choose the subjects you want Vidya AI to focus on.
                </p>
              </div>
            </div>

            <div className="welcome-feature">
              <div className="feature-number">03</div>

              <div>
                <h3>Your learning style</h3>
                <p>
                  Customize how you want to learn and practice.
                </p>
              </div>
            </div>
          </div>

          {/* Action */}
          <div className="welcome-action">
            <button
              type="button"
              className="onboarding-primary-button"
              onClick={handleContinue}
            >
              Let's get started
              <ArrowRight size={19} />
            </button>

            <p>
              This will take about <strong>2 minutes</strong>.
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="onboarding-footer">
          <span>Vidya AI</span>
          <span>•</span>
          <span>Your learning. Your language. Your pace.</span>
        </footer>
      </div>
    </main>
  );
}

export default Welcome;
