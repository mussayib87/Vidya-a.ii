import React, { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useOnboarding } from "../../context/OnboardingContext";
import profileService from "../../services/profileService";

function Complete() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleFinish() {
    if (loading) return;

    setLoading(true);
    setError("");

    const payload = {
      classLevel: data.classLevel,
      board: data.board,
      preferredLanguage: data.language,
      subjects: Array.isArray(data.subjects)
        ? data.subjects
        : [],
      learningGoal: data.learningGoal,
      learningStyle: data.learningStyle,
      learningPace: data.pace,
    };

    if (
      !payload.classLevel ||
      !payload.board ||
      !payload.preferredLanguage ||
      payload.subjects.length === 0 ||
      !payload.learningGoal ||
      !payload.learningStyle ||
      !payload.learningPace
    ) {
      setError(
        "Please complete all learning preferences before continuing."
      );
      setLoading(false);
      return;
    }

    try {
      await profileService.saveOnboarding(payload);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.message ||
          "We couldn't save your learning profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="onboarding-page">
      <div className="onboarding-shell">
        <section className="onboarding-form-section">
          <div className="onboarding-heading">
            <div className="welcome-icon">
              <CheckCircle2 size={30} />
            </div>

            <h1>Your learning profile is ready</h1>

            <p>
              Vidya AI has everything it needs to
              personalize your learning experience.
            </p>
          </div>

          {error && (
            <div
              className="input-error"
              role="alert"
              style={{ marginBottom: 20 }}
            >
              {error}
            </div>
          )}

          <div className="selection-section">
            <label>Your preferences</label>

            <div className="selection-grid">
              <div className="selection-card selected">
                {data.classLevel || "Class not selected"}
              </div>

              <div className="selection-card selected">
                {data.board || "Board not selected"}
              </div>

              <div className="selection-card selected">
                {data.language || "Language not selected"}
              </div>

              <div className="selection-card selected">
                {data.subjects?.length || 0} subject(s)
              </div>

              <div className="selection-card selected">
                {data.learningGoal || "Learning goal not selected"}
              </div>

              <div className="selection-card selected">
                {data.learningStyle || "Learning style not selected"}
              </div>

              <div className="selection-card selected">
                {data.pace || "Learning pace not selected"}
              </div>
            </div>
          </div>

          <div className="onboarding-navigation">
            <button
              type="button"
              className="onboarding-primary-button"
              disabled={loading}
              onClick={handleFinish}
            >
              {loading
                ? "Saving..."
                : "Start learning"}

              {!loading && <ArrowRight size={18} />}
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Complete;
