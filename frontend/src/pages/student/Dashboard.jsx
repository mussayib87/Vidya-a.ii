import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Languages,
  Trophy,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Target,
  Flame,
  Clock3,
  User,
} from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const subjects = data?.subjects || [];
  const language = data?.language || "English";
  const className = data?.class || "Student";

  const displayName =
    data?.name ||
    data?.fullName ||
    "Student";

  const formatSubject = (subject) => {
    if (!subject) return "";

    return subject
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  return (
    <div className="vidya-dashboard">
      {/* ================= HEADER ================= */}

      <header className="dashboard-header">
        <div className="dashboard-brand">
          <div className="dashboard-logo">
            V
          </div>

          <div>
            <h2>VIDYA AI</h2>
            <span>
              Learn without language barriers
            </span>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-profile-button"
          onClick={() =>
            navigate("/onboarding/review")
          }
        >
          <User size={18} />
          <span>Profile</span>
        </button>
      </header>

      {/* ================= MAIN ================= */}

      <main className="dashboard-main">

        {/* ================= HERO ================= */}

        <section className="dashboard-hero">
          <div className="hero-content">
            <div className="hero-label">
              <Sparkles size={17} />
              <span>VIDYA AI</span>
            </div>

            <h1>
              Welcome back,{" "}
              {displayName} 👋
            </h1>

            <p>
              Your personalized AI-powered
              multilingual learning journey
              starts here.
            </p>

            <div className="hero-meta">
              <span>
                Class: {className}
              </span>

              <span>
                Language: {language}
              </span>
            </div>

            <button
              type="button"
              className="hero-button"
              onClick={() =>
                navigate("/learning")
              }
            >
              Continue Learning
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-decoration">
            <div className="hero-orbit hero-orbit-one" />
            <div className="hero-orbit hero-orbit-two" />

            <div className="hero-brain">
              <Brain size={54} />
            </div>
          </div>
        </section>

        {/* ================= QUICK STATS ================= */}

        <section className="dashboard-stats">

          <StatCard
            icon={<Target size={21} />}
            value="0%"
            label="Learning progress"
          />

          <StatCard
            icon={<Flame size={21} />}
            value="0"
            label="Day streak"
          />

          <StatCard
            icon={<Clock3 size={21} />}
            value="0h"
            label="Learning time"
          />

          <StatCard
            icon={<Trophy size={21} />}
            value="0"
            label="Achievements"
          />

        </section>

        {/* ================= QUICK ACTIONS ================= */}

        <section className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Quick actions</h2>

              <p>
                Choose how you want to learn today.
              </p>
            </div>
          </div>

          <div className="action-grid">

            <ActionCard
              icon={<Brain size={28} />}
              title="Ask Vidya AI"
              description="Ask questions and learn with your personal AI tutor."
              onClick={() =>
                navigate(
                  "/learning/general/ai-tutor"
                )
              }
            />

            <ActionCard
              icon={<BookOpen size={28} />}
              title="My Lessons"
              description="Continue your personalized lessons and explore topics."
              onClick={() =>
                navigate("/learning")
              }
            />

            <ActionCard
              icon={<Languages size={28} />}
              title="Language Learning"
              description="Choose or change the language you want to learn in."
              onClick={() =>
                navigate(
                  "/onboarding/languages"
                )
              }
            />

            <ActionCard
              icon={<Trophy size={28} />}
              title="My Progress"
              description="Track your learning progress, streaks and achievements."
              onClick={() =>
                navigate("/progress")
              }
            />

          </div>
        </section>

        {/* ================= SUBJECTS ================= */}

        <section className="dashboard-section">

          <div className="section-header">
            <div>
              <h2>Your subjects</h2>

              <p>
                Continue learning the subjects
                you selected during onboarding.
              </p>
            </div>

            {subjects.length > 0 && (
              <button
                type="button"
                className="view-all-button"
                onClick={() =>
                  navigate("/learning")
                }
              >
                View all
                <ChevronRight size={17} />
              </button>
            )}
          </div>

          {subjects.length > 0 ? (
            <div className="subject-grid">

              {subjects.map((subject) => (
                <button
                  type="button"
                  key={subject}
                  className="subject-card"
                  onClick={() =>
                    navigate(
                      `/learning/${encodeURIComponent(
                        subject
                      )}`
                    )
                  }
                >
                  <div className="subject-icon">
                    <BookOpen size={22} />
                  </div>

                  <div className="subject-info">
                    <h3>
                      {formatSubject(subject)}
                    </h3>

                    <span>
                      Continue learning
                    </span>
                  </div>

                  <ChevronRight size={19} />
                </button>
              ))}

            </div>
          ) : (
            <div className="dashboard-empty">

              <div className="empty-icon">
                <BookOpen size={28} />
              </div>

              <h3>
                No subjects selected yet
              </h3>

              <p>
                Complete your learning preferences
                to personalize your dashboard.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/onboarding/subjects"
                  )
                }
              >
                Choose subjects
                <ArrowRight size={17} />
              </button>

            </div>
          )}
        </section>

        {/* ================= AI CTA ================= */}

        <section className="dashboard-ai-card">

          <div className="ai-card-icon">
            <Sparkles size={26} />
          </div>

          <div className="ai-card-content">
            <h2>
              Need help understanding
              something?
            </h2>

            <p>
              Ask Vidya AI to explain difficult
              concepts in a simple way and in
              your preferred language.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              navigate(
                "/learning/general/ai-tutor"
              )
            }
          >
            Ask Vidya AI
            <ArrowRight size={18} />
          </button>

        </section>

      </main>

      {/* ================= MOBILE NAV ================= */}

      <nav className="dashboard-mobile-nav">

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <BookOpen size={19} />
          <span>Home</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/learning")
          }
        >
          <Brain size={19} />
          <span>Learn</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/progress")
          }
        >
          <Trophy size={19} />
          <span>Progress</span>
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/onboarding/review")
          }
        >
          <User size={19} />
          <span>Profile</span>
        </button>

      </nav>
    </div>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <div className="dashboard-stat-card">

      <div className="stat-icon">
        {icon}
      </div>

      <div className="stat-content">
        <strong>{value}</strong>
        <span>{label}</span>
      </div>

    </div>
  );
}

/* =========================================================
   ACTION CARD
========================================================= */

function ActionCard({
  icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      className="dashboard-action-card"
      onClick={onClick}
    >

      <div className="action-icon">
        {icon}
      </div>

      <div className="action-content">

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

      <ArrowRight
        className="action-arrow"
        size={19}
      />

    </button>
  );
    }
