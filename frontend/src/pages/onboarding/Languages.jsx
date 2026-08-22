
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

  function handleContinue() {
    if (!canContinue) return;

    navigate("/onboarding/subjects");
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
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

        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "42.84%" }}
          />
        </div>

        <section className="onboarding-form-section">
          <div className="onboarding-heading">
            <div className="welcome-icon">
              <Globe2 size={28} />
            </div>

            <h1>Choose your learning language</h1>

            <p>
              Vidya AI can explain concepts and learning material in a
              language that feels natural to you.
            </p>
          </div>

          <div className="language-grid">
            {languages.map((language) => (
              <button
                key={language.name}
                type="button"
                className={`language-card ${
                  data.language === language.name ? "selected" : ""
                }`}
                onClick={() =>
                  updateData({
                    language: language.name,
                  })
                }
              >
                <span className="language-native">
                  {language.native}
                </span>

                <span className="language-name">
                  {language.name}
                </span>

                {data.language === language.name && (
                  <span className="language-check">✓</span>
                )}
              </button>
            ))}
          </div>

          <div className="onboarding-navigation">
            <button
              type="button"
              className="onboarding-back-button"
              onClick={() => navigate("/onboarding/class")}
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

export default Languages;
