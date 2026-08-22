
                     import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useOnboarding } from "../../context/OnboardingContext";

const subjects = [
  {
    name: "Mathematics",
    short: "M",
    description: "Numbers, algebra, geometry & problem solving",
  },
  {
    name: "Science",
    short: "S",
    description: "Physics, chemistry, biology & experiments",
  },
  {
    name: "English",
    short: "E",
    description: "Grammar, literature & communication",
  },
  {
    name: "Social Science",
    short: "SS",
    description: "History, geography, civics & economics",
  },
  {
    name: "Computer Science",
    short: "CS",
    description: "Programming, technology & digital skills",
  },
  {
    name: "Kannada",
    short: "ಕ",
    description: "Language, literature & communication",
  },
];

function Subjects() {
  const navigate = useNavigate();
  const { data, toggleSubject } = useOnboarding();

  const selectedSubjects = Array.isArray(data.subjects)
    ? data.subjects
    : [];

  const canContinue = selectedSubjects.length > 0;

  function handleSubjectToggle(subjectName) {
    toggleSubject(subjectName);
  }

  function handleBack() {
    navigate("/onboarding/languages");
  }

  function handleContinue() {
    if (!canContinue) return;

    navigate("/onboarding/preferences");
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
            <strong>4</strong>
            <span>of 7</span>
          </div>
        </header>

        {/* Progress */}
        <div className="onboarding-progress">
          <div
            className="onboarding-progress-fill"
            style={{ width: "57.12%" }}
          />
        </div>

        {/* Main */}
        <section className="onboarding-form-section">

          <div className="onboarding-heading">
            <div className="welcome-icon">
              <BookOpen size={28} />
            </div>

            <h1>What do you want to learn?</h1>

            <p>
              Select all the subjects you want to study with
              Vidya AI. You can change these later from your
              profile.
            </p>
          </div>

          {/* Subjects */}
          <div className="subject-grid">
            {subjects.map((subject) => {
              const selected = selectedSubjects.includes(
                subject.name
              );

              return (
                <button
                  key={subject.name}
                  type="button"
                  className={`subject-card ${
                    selected ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleSubjectToggle(subject.name)
                  }
                  aria-pressed={selected}
                >
                  <div className="subject-icon">
                    {subject.short}
                  </div>

                  <div className="subject-content">
                    <h3>{subject.name}</h3>
                    <p>{subject.description}</p>
                  </div>

                  <div
                    className={`subject-checkbox ${
                      selected ? "checked" : ""
                    }`}
                  >
                    {selected && <Check size={14} />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected count */}
          <div className="selected-count">
            {selectedSubjects.length === 0
              ? "Select at least one subject"
              : `${selectedSubjects.length} ${
                  selectedSubjects.length === 1
                    ? "subject"
                    : "subjects"
                } selected`}
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

export default Subjects;     
