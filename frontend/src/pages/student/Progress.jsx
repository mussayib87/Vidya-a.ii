import React from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Clock3,
  Flame,
  Target,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Progress() {
  const navigate = useNavigate();

  const stats = [
    {
      label: "Lessons completed",
      value: "0",
      icon: CheckCircle2,
    },
    {
      label: "Learning hours",
      value: "0h",
      icon: Clock3,
    },
    {
      label: "Current streak",
      value: "0 days",
      icon: Flame,
    },
    {
      label: "Topics mastered",
      value: "0",
      icon: Trophy,
    },
  ];

  return (
    <div className="progress-page">
      <header className="progress-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate("/dashboard")}
          aria-label="Back to dashboard"
        >
          <ArrowLeft size={20} />
        </button>

        <div>
          <h1>My Progress</h1>
          <p>Track your learning journey with Vidya AI.</p>
        </div>
      </header>

      <main className="progress-content">
        <section className="progress-stats">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="progress-stat-card"
              >
                <div className="progress-stat-icon">
                  <Icon size={21} />
                </div>

                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
            );
          })}
        </section>

        <section className="progress-overview">
          <div className="section-heading">
            <div>
              <h2>Learning overview</h2>
              <p>
                Your detailed progress will appear here
                as you complete lessons and quizzes.
              </p>
            </div>

            <Target size={25} />
          </div>

          <div className="progress-empty">
            <div className="progress-empty-icon">
              <BookOpen size={28} />
            </div>

            <h3>Start learning to see your progress</h3>

            <p>
              Complete your first lesson and your
              learning statistics will appear here.
            </p>

            <button
              type="button"
              onClick={() => navigate("/learning")}
            >
              Start Learning
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Progress;
