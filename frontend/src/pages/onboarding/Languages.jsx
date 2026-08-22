
          import React from "react";
import { ArrowLeft, ArrowRight, Globe2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

const languages = [
  { name: "English", native: "English" },
  { name: "Hindi", native: "हिन्दी" },
  { name: "Kannada", native: "ಕನ್ನಡ" },
  { name: "Tamil", native: "தமிழ்" },
  { name: "Telugu", native: "తెలుగు" },
  { name: "Malayalam", native: "മലയാളം" },
  { name: "Marathi", native: "मराठी" },
  { name: "Bengali", native: "বাংলা" },
  { name: "Gujarati", native: "ગુજરાતી" },
  { name: "Odia", native: "ଓଡ଼ିଆ" },
];

function Languages() {
  const navigate = useNavigate();
  const { data, updateData } = useOnboarding();

  const canContinue = Boolean(data.language);

  function handleLanguageSelect(language) {
    updateData({
      language,
    });
  }

  function handleBack() {
    navigate("/onboarding/class-board");
  }

  function handleContinue() {
    if (!canContinue) return;

    navigate("/onboarding/subjects");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">

        {/* Header */}
        <header className="onboarding-header">
          <div className="onboarding-logo">
            <div className="onboarding-logo-icon">
              <Globe2 size={20} />
            </div>

            <span>
              Vidya<span> AI</span>
            </span>
          </div>

          <div className="onboarding-step">
            <span>Step</span>
            <strong>3</strong>
            <span>of 7</span>
          </div>
        </header>

        {/* Progress */}
        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "42.84%" }}
          />
        </div>

        {/* Main */}
        <section className="onboarding-form-section">

          <div className="onboarding-heading">
            <div className="welcome-icon">
              <Globe2 size={28} />
            </div>

            <h1>Choose your learning language</h1>

            <p>
              Vidya AI can explain concepts and learning material
              in a language that feels natural to you.
            </p>
          </div>

          {/* Language selection */}
          <div className="language-grid">
            {languages.map((language) => {
              const selected =
                data.language === language.name;

              return (
                <button
                  key={language.name}
                  type="button"
                  className={`language-card ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleLanguageSelect(language.name)
                  }
                  aria-pressed={selected}
                >
                  <span className="language-native">
                    {language.native}
                  </span>

                  <span className="language-name">
                    {language.name}
                  </span>

                  {selected && (
                    <span className="language-check">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
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
              Continue
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

export default Languages;
