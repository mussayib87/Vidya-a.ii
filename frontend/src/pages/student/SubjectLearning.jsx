import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function SubjectLearning() {
  const navigate = useNavigate();
  const { subject } = useParams();

  const subjectName = subject
    ? decodeURIComponent(subject)
    : "Subject";

  const topics = {
    Mathematics: [
      {
        name: "Numbers & Operations",
        description:
          "Learn numbers, operations, fractions, decimals and calculations.",
      },
      {
        name: "Algebra",
        description:
          "Understand variables, expressions, equations and patterns.",
      },
      {
        name: "Geometry",
        description:
          "Learn shapes, angles, lines, areas and geometric concepts.",
      },
      {
        name: "Mensuration",
        description:
          "Practice perimeter, area, volume and measurement problems.",
      },
    ],

    Science: [
      {
        name: "Physics",
        description:
          "Understand motion, force, energy and everyday physical phenomena.",
      },
      {
        name: "Chemistry",
        description:
          "Learn matter, atoms, elements, reactions and chemical concepts.",
      },
      {
        name: "Biology",
        description:
          "Explore cells, organisms, life processes and the human body.",
      },
      {
        name: "Experiments",
        description:
          "Learn science through simple explanations and experiments.",
      },
    ],

    English: [
      {
        name: "Grammar",
        description:
          "Improve sentence structure, tenses, parts of speech and grammar.",
      },
      {
        name: "Vocabulary",
        description:
          "Build vocabulary and understand new words in context.",
      },
      {
        name: "Reading",
        description:
          "Improve reading comprehension and understand passages.",
      },
      {
        name: "Writing",
        description:
          "Practice essays, letters, paragraphs and creative writing.",
      },
    ],

    "Social Science": [
      {
        name: "History",
        description:
          "Explore important events, people, civilizations and timelines.",
      },
      {
        name: "Geography",
        description:
          "Learn about Earth, maps, climate, resources and places.",
      },
      {
        name: "Civics",
        description:
          "Understand government, democracy, rights and responsibilities.",
      },
      {
        name: "Economics",
        description:
          "Learn basic economic concepts, resources and markets.",
      },
    ],

    "Computer Science": [
      {
        name: "Computer Basics",
        description:
          "Understand computers, hardware, software and digital concepts.",
      },
      {
        name: "Programming",
        description:
          "Learn programming logic, variables, conditions and loops.",
      },
      {
        name: "Algorithms",
        description:
          "Understand problem solving, algorithms and logical thinking.",
      },
      {
        name: "Web Development",
        description:
          "Learn HTML, CSS, JavaScript and how websites work.",
      },
    ],

    Kannada: [
      {
        name: "Grammar",
        description:
          "Learn Kannada grammar and sentence structure.",
      },
      {
        name: "Literature",
        description:
          "Explore Kannada stories, poems and literary works.",
      },
      {
        name: "Reading",
        description:
          "Improve Kannada reading and comprehension skills.",
      },
      {
        name: "Writing",
        description:
          "Practice Kannada writing, vocabulary and communication.",
      },
    ],
  };

  const subjectTopics = topics[subjectName] || [
    {
      name: "Introduction",
      description:
        "Start with the basic concepts of this subject.",
    },
    {
      name: "Basic Concepts",
      description:
        "Understand the important fundamentals step by step.",
    },
    {
      name: "Important Topics",
      description:
        "Learn the key concepts you need to know.",
    },
    {
      name: "Practice",
      description:
        "Practice questions and test your understanding.",
    },
  ];

  function handleBack() {
    navigate("/learning");
  }

  function handleAskAI() {
    navigate(
      `/learning/${encodeURIComponent(subjectName)}/ai-tutor`
    );
  }

  function handleTopic(topicName) {
    navigate(
      `/learning/${encodeURIComponent(
        subjectName
      )}/${encodeURIComponent(topicName)}`
    );
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
            {subjectName} Learning
          </span>
        </div>

        <button
          type="button"
          onClick={handleBack}
          style={{
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            color: "#0f172a",
            borderRadius: 10,
            padding: "9px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontWeight: 600,
          }}
        >
          <ArrowLeft size={16} />
          Subjects
        </button>
      </header>

      {/* Main */}
      <section
        style={{
          maxWidth: 1050,
          margin: "0 auto",
          padding: "45px 20px",
        }}
      >
        {/* Hero */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#ffffff",
            borderRadius: 24,
            padding: "35px",
            marginBottom: 32,
            boxShadow:
              "0 15px 40px rgba(37,99,235,0.18)",
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

            <strong>VIDYA AI</strong>
          </div>

          <h1
            style={{
              margin: "18px 0 10px",
              fontSize: 34,
            }}
          >
            Let's learn {subjectName} 🚀
          </h1>

          <p
            style={{
              margin: 0,
              opacity: 0.9,
              fontSize: 16,
              lineHeight: 1.6,
              maxWidth: 700,
            }}
          >
            Learn {subjectName} step by step with
            personalized explanations, examples,
            practice questions and AI-powered guidance.
          </p>
        </div>

        {/* AI Tutor */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 25,
            marginBottom: 32,
            boxShadow:
              "0 8px 25px rgba(15,23,42,0.04)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 15,
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Brain size={26} />
            </div>

            <div>
              <h2
                style={{
                  margin: 0,
                }}
              >
                Ask Vidya AI
              </h2>

              <p
                style={{
                  margin: "5px 0 0",
                  color: "#64748b",
                }}
              >
                Have a question about {subjectName}?
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAskAI}
            style={{
              marginTop: 20,
              border: 0,
              background: "#2563eb",
              color: "#ffffff",
              padding: "13px 20px",
              borderRadius: 11,
              cursor: "pointer",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Ask a Question
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Topics */}
        <div>
          <h2
            style={{
              margin: "0 0 8px",
            }}
          >
            Choose a Topic
          </h2>

          <p
            style={{
              color: "#64748b",
              marginTop: 0,
              marginBottom: 22,
            }}
          >
            Select a topic to start learning {subjectName}.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(230px, 1fr))",
              gap: 18,
            }}
          >
            {subjectTopics.map((topic) => (
              <button
                key={topic.name}
                type="button"
                onClick={() => handleTopic(topic.name)}
                style={{
                  textAlign: "left",
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
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
                    marginBottom: 16,
                  }}
                >
                  <BookOpen size={23} />
                </div>

                <h3
                  style={{
                    margin: "0 0 8px",
                    fontSize: 18,
                  }}
                >
                  {topic.name}
                </h3>

                <p
                  style={{
                    margin: "0 0 18px",
                    color: "#64748b",
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {topic.description}
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
                  Start {topic.name}
                  <ArrowRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 25,
            marginTop: 32,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <CheckCircle2
              size={23}
              style={{
                color: "#2563eb",
              }}
            />

            <h3
              style={{
                margin: 0,
              }}
            >
              Your {subjectName} progress
            </h3>
          </div>

          <p
            style={{
              color: "#64748b",
              marginBottom: 12,
            }}
          >
            Start your first lesson to begin tracking
            your progress.
          </p>

          <div
            style={{
              height: 9,
              background: "#e2e8f0",
              borderRadius: 20,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "0%",
                height: "100%",
                background: "#2563eb",
              }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
