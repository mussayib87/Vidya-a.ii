import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useOnboarding } from "../../context/OnboardingContext";
import lessonService from "../../services/lessonService";

export default function LearningHub() {
  const navigate = useNavigate();
  const { data } = useOnboarding();

  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const subjects = Array.isArray(data?.subjects)
    ? data.subjects
    : [];

  useEffect(() => {
    let active = true;

    async function loadLessons() {
      try {
        const response =
          await lessonService.getLessons();

        const result =
          response?.data ||
          response?.lessons ||
          response;

        if (active && Array.isArray(result)) {
          setLessons(result);
        }
      } catch (error) {
        console.error(
          "Failed to load lessons:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadLessons();

    return () => {
      active = false;
    };
  }, []);

  function openSubject(subject) {
    navigate(
      `/learning/${encodeURIComponent(subject)}`
    );
  }

  function getSubjectLessonCount(subject) {
    return lessons.filter(
      (lesson) =>
        lesson?.subject?.toLowerCase() ===
        subject?.toLowerCase()
    ).length;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      <header
        style={{
          background: "#fff",
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
          <h2
            style={{
              margin: 0,
              color: "#2563eb",
            }}
          >
            VIDYA AI
          </h2>

          <span
            style={{
              fontSize: 13,
              color: "#64748b",
            }}
          >
            Learning Hub
          </span>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/dashboard")
          }
          style={{
            border: "1px solid #cbd5e1",
            background: "#fff",
            borderRadius: 10,
            padding: "9px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
          }}
        >
          <ArrowLeft size={16} />
          Dashboard
        </button>
      </header>

      <section
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          padding: "45px 20px",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#fff",
            borderRadius: 24,
            padding: "35px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Sparkles size={25} />
            <strong>
              VIDYA AI LEARNING HUB
            </strong>
          </div>

          <h1
            style={{
              margin: "18px 0 10px",
              fontSize: 34,
            }}
          >
            What do you want to learn today?
          </h1>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 650,
            }}
          >
            Choose one of your subjects and
            Vidya AI will help you learn
            concepts, understand difficult
            topics and practice questions.
          </p>
        </div>

        <div>
          <h2>Choose a Subject</h2>

          <p
            style={{
              marginTop: 0,
              marginBottom: 22,
              color: "#64748b",
            }}
          >
            Select a subject to begin your
            learning session.
          </p>

          {subjects.length === 0 ? (
            <div
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: 30,
                textAlign: "center",
              }}
            >
              <BookOpen
                size={40}
                style={{
                  color: "#2563eb",
                  marginBottom: 12,
                }}
              />

              <h3>
                No subjects selected
              </h3>

              <p
                style={{
                  color: "#64748b",
                }}
              >
                Please select at least one
                subject from your onboarding
                profile.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/onboarding/subjects"
                  )
                }
                style={{
                  border: 0,
                  background: "#2563eb",
                  color: "#fff",
                  padding: "12px 18px",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                Select Subjects
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(230px, 1fr))",
                gap: 18,
              }}
            >
              {subjects.map((subject) => {
                const count =
                  getSubjectLessonCount(subject);

                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() =>
                      openSubject(subject)
                    }
                    style={{
                      textAlign: "left",
                      background: "#fff",
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: 18,
                      padding: 22,
                      cursor: "pointer",
                      boxShadow:
                        "0 8px 25px rgba(15,23,42,0.05)",
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: "#eff6ff",
                        color: "#2563eb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                      }}
                    >
                      <BookOpen size={23} />
                    </div>

                    <h3
                      style={{
                        margin: "0 0 8px",
                        fontSize: 19,
                      }}
                    >
                      {subject}
                    </h3>

                    <p
                      style={{
                        margin: "0 0 18px",
                        color: "#64748b",
                        fontSize: 14,
                        lineHeight: 1.5,
                      }}
                    >
                      {loading
                        ? "Loading lessons..."
                        : `${count} lesson${
                            count === 1
                              ? ""
                              : "s"
                          } available`}
                    </p>

                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 7,
                        color: "#2563eb",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      Start {subject}
                      <ArrowRight size={16} />
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
    }
