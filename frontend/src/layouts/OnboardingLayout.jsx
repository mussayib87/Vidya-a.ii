import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

function OnboardingLayout({
  children,
  currentStep = 1,
  totalSteps = 6,
  title = "Let's personalize your learning",
  subtitle,
}) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="onboarding-page">
      <header className="onboarding-header">
        <Link to="/" className="onboarding-brand">
          <div className="brand-icon">
            <GraduationCap size={21} />
          </div>

          <span>
            Vidya<span className="brand-ai"> AI</span>
          </span>
        </Link>

        <div className="onboarding-progress">
          <span>
            Step {currentStep} of {totalSteps}
          </span>

          <div className="onboarding-progress-track">
            <div
              className="onboarding-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <main className="onboarding-main">
        <div className="onboarding-container">
          <div className="onboarding-heading">
            <h1>{title}</h1>

            {subtitle && <p>{subtitle}</p>}
          </div>

          {children}
        </div>
      </main>
    </div>
  );
}

export default OnboardingLayout;
