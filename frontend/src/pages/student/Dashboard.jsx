import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Brain,
  Languages,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { useOnboarding } from "../../context/OnboardingContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const subjects = data?.subjects || [];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* Header */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div>
          <h2 style={{ margin: 0, color: "#2563eb" }}>VIDYA AI</h2>
          <span style={{ fontSize: 13, color: "#64748b" }}>
            Learn without language barriers
          </span>
        </div>

        <button
          onClick={() => navigate("/onboarding/review")}
          style={{
            border: "1px solid #cbd5e1",
            background: "#fff",
            borderRadius: 10,
            padding: "9px 14px",
            cursor: "pointer",
          }}
        >
          Profile
        </button>
      </header>

      {/* Main */}
      <main
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Welcome */}
        <section
          style={{
            background: "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#fff",
            borderRadius: 24,
            padding: "35px",
            marginBottom: 30,
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Sparkles size={28} />
            <span>VIDYA AI</span>
          </div>

          <h1 style={{ fontSize: 34, margin: "18px 0 10px" }}>
            Welcome to your learning space 👋
          </h1>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Your personalized AI-powered multilingual learning journey starts
            here.
          </p>
        </section>

        {/* Quick actions */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 18,
            marginBottom: 35,
          }}
        >
          <ActionCard
            icon={<Brain size={28} />}
            title="Ask Vidya AI"
            description="Ask questions and learn with your AI tutor."
          />

          <ActionCard
            icon={<BookOpen size={28} />}
            title="My Lessons"
            description="Continue your personalized learning."
          />

          <ActionCard
            icon={<Languages size={28} />}
            title="Language Learning"
            description="Learn concepts in your preferred language."
          />

          <ActionCard
            icon={<Trophy size={28} />}
            title="My Progress"
            description="Track your learning journey and achievements."
          />
        </section>

        {/* Subjects */}
        <section
          style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 25,
          }}
        >
          <h2 style={{ marginTop: 0 }}>Your Subjects</h2>

          {subjects.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 14,
              }}
            >
              {subjects.map((subject) => (
                <div
                  key={subject}
                  style={{
                    padding: 18,
                    borderRadius: 14,
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    fontWeight: 600,
                  }}
                >
                  {subject}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: "#64748b" }}>
              Your selected subjects will appear here.
            </p>
          )}

          <button
            onClick={() => alert("AI Tutor will be connected next.")}
            style={{
              marginTop: 24,
              border: 0,
              background: "#2563eb",
              color: "#fff",
              padding: "13px 18px",
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Start Learning
            <ArrowRight size={18} />
          </button>
        </section>
      </main>
    </div>
  );
}

function ActionCard({ icon, title, description }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        padding: 22,
      }}
    >
      <div style={{ color: "#2563eb", marginBottom: 12 }}>{icon}</div>

      <h3 style={{ margin: "0 0 8px" }}>{title}</h3>

      <p
        style={{
          margin: 0,
          color: "#64748b",
          lineHeight: 1.5,
          fontSize: 14,
        }}
      >
        {description}
      </p>
    </div>
  );
      }
