import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

import { useOnboarding } from "../../context/OnboardingContext";
import { getCurriculum } from "../../data/curriculum";

export default function SubjectLearning() {
  const navigate = useNavigate();
  const { subject: subjectParam, topic: topicParam } = useParams();

  const { data } = useOnboarding();

  /*
   * Decode the subject coming from the URL.
   *
   * Example:
   * /learning/Mathematics
   *
   * becomes:
   * Mathematics
   */
  const subjectName = subjectParam
    ? decodeURIComponent(subjectParam)
    : "";

  /*
   * Get the student's onboarding information.
   */
  const classLevel = data?.classLevel || "";
  const board = data?.board || "";
  const language = data?.language || "";

  /*
   * Get the curriculum matching:
   *
   * Class
   * +
   * Board
   * +
   * Subject
   * +
   * Language
   */
  const chapters = getCurriculum({
    classLevel,
    board,
    subject: subjectName,
    language,
  });

  /*
   * If a user directly opens a topic URL,
   * find the selected topic.
   */
  let selectedTopic = null;
  let selectedChapter = null;

  if (topicParam) {
    const decodedTopic = decodeURIComponent(topicParam);

    for (const chapter of chapters) {
      const topic = chapter.topics?.find(
        (item) =>
          item.id === decodedTopic ||
          item.title === decodedTopic ||
          item.englishTitle === decodedTopic
      );

      if (topic) {
        selectedTopic = topic;
        selectedChapter = chapter;
        break;
      }
    }
  }

  function handleBack() {
    navigate("/learning");
  }

  function handleAskAI() {
    navigate(
      `/learning/${encodeURIComponent(
        subjectName
      )}/ai-tutor`
    );
  }

  function handleTopic(chapter, topic) {
    navigate(
      `/learning/${encodeURIComponent(
        subjectName
      )}/${encodeURIComponent(topic.id)}`
    );
  }

  /*
   * If a topic is selected, show the topic learning screen.
   */
  if (selectedTopic) {
    return (
      <TopicLesson
        subjectName={subjectName}
        chapter={selectedChapter}
        topic={selectedTopic}
        classLevel={classLevel}
        board={board}
        language={language}
        onBack={() =>
          navigate(
            `/learning/${encodeURIComponent(
              subjectName
            )}`
          )
        }
        onAskAI={handleAskAI}
      />
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
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
          zIndex: 20,
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
            Learn without language barriers
          </span>
        </div>

        <button
          type="button"
          onClick={handleBack}
          style={{
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            borderRadius: 10,
            padding: "9px 14px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 7,
            fontWeight: 600,
            color: "#0f172a",
          }}
        >
          <ArrowLeft size={16} />
          Subjects
        </button>
      </header>

      {/* MAIN */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "40px 20px 60px",
        }}
      >
        {/* HERO */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#ffffff",
            borderRadius: 24,
            padding: "35px",
            marginBottom: 30,
            boxShadow:
              "0 15px 40px rgba(37,99,235,0.18)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 12,
            }}
          >
            <Sparkles size={24} />

            <strong>PERSONALIZED LEARNING</strong>
          </div>

          <h1
            style={{
              margin: "8px 0",
              fontSize: 34,
            }}
          >
            {subjectName || "Your Subject"}
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              opacity: 0.92,
              lineHeight: 1.6,
              fontSize: 16,
            }}
          >
            Your personalized {subjectName} learning
            path based on your class, board and language.
          </p>

          {/* STUDENT INFO */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 22,
            }}
          >
            {classLevel && (
              <InfoBadge>
                Class {classLevel}
              </InfoBadge>
            )}

            {board && (
              <InfoBadge>
                {board}
              </InfoBadge>
            )}

            {language && (
              <InfoBadge>
                {language}
              </InfoBadge>
            )}
          </div>
        </div>

        {/* AI TUTOR */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 24,
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
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
                  fontSize: 19,
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
                Stuck on something? Ask your AI tutor.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleAskAI}
            style={{
              border: 0,
              background: "#2563eb",
              color: "#ffffff",
              padding: "12px 18px",
              borderRadius: 11,
              cursor: "pointer",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Ask Vidya AI
            <ArrowRight size={17} />
          </button>
        </div>

        {/* CURRICULUM */}
        <div>
          <div
            style={{
              marginBottom: 22,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 25,
              }}
            >
              Chapters
            </h2>

            <p
              style={{
                margin: "7px 0 0",
                color: "#64748b",
              }}
            >
              Choose a chapter to explore its topics.
            </p>
          </div>

          {chapters.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {chapters.map((chapter, index) => (
                <ChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  index={index}
                  onTopic={handleTopic}
                />
              ))}
            </div>
          ) : (
            <EmptyCurriculum
              subjectName={subjectName}
              classLevel={classLevel}
              board={board}
              language={language}
            />
          )}
        </div>
      </section>
    </main>
  );
}

/* =====================================================
   CHAPTER CARD
===================================================== */

function ChapterCard({
  chapter,
  index,
  onTopic,
}) {
  const [open, setOpen] = React.useState(
    index === 0
  );

  const topics = chapter.topics || [];

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 18,
        overflow: "hidden",
        boxShadow:
          "0 5px 18px rgba(15,23,42,0.04)",
      }}
    >
      {/* Chapter header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          border: 0,
          background: "#ffffff",
          padding: "20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 15,
          textAlign: "left",
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            minWidth: 48,
            borderRadius: 14,
            background: "#eff6ff",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
          }}
        >
          {index + 1}
        </div>

        <div
          style={{
            flex: 1,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
            }}
          >
            {chapter.title}
          </h3>

          {chapter.englishTitle && (
            <p
              style={{
                margin: "5px 0 0",
                color: "#64748b",
                fontSize: 13,
              }}
            >
              {chapter.englishTitle}
            </p>
          )}

          <span
            style={{
              display: "inline-block",
              marginTop: 7,
              color: "#2563eb",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {topics.length} topics
          </span>
        </div>

        {open ? (
          <ChevronUp size={21} />
        ) : (
          <ChevronDown size={21} />
        )}
      </button>

      {/* Topics */}
      {open && (
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: 16,
            background: "#f8fafc",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {topics.map((topic, topicIndex) => (
            <button
              key={topic.id}
              type="button"
              onClick={() =>
                onTopic(chapter, topic)
              }
              style={{
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                borderRadius: 14,
                padding: "15px 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 14,
                textAlign: "left",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  minWidth: 34,
                  borderRadius: 10,
                  background: "#eef2ff",
                  color: "#4f46e5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                {topicIndex + 1}
              </div>

              <div
                style={{
                  flex: 1,
                }}
              >
                <strong
                  style={{
                    display: "block",
                    color: "#0f172a",
                  }}
                >
                  {topic.title}
                </strong>

                {topic.englishTitle && (
                  <span
                    style={{
                      display: "block",
                      marginTop: 3,
                      color: "#64748b",
                      fontSize: 12,
                    }}
                  >
                    {topic.englishTitle}
                  </span>
                )}
              </div>

              <ArrowRight
                size={18}
                style={{
                  color: "#2563eb",
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* =====================================================
   TOPIC LESSON
===================================================== */

function TopicLesson({
  subjectName,
  chapter,
  topic,
  classLevel,
  board,
  language,
  onBack,
  onAskAI,
}) {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
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
          zIndex: 20,
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
            AI Learning
          </span>
        </div>

        <button
          type="button"
          onClick={onBack}
          style={{
            border: "1px solid #cbd5e1",
            background: "#ffffff",
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
          Back
        </button>
      </header>

      <section
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "40px 20px 70px",
        }}
      >
        {/* Breadcrumb */}
        <div
          style={{
            color: "#64748b",
            fontSize: 14,
            marginBottom: 20,
          }}
        >
          {subjectName} / {chapter.title}
        </div>

        {/* Lesson hero */}
        <div
          style={{
            background:
              "linear-gradient(135deg, #2563eb, #4f46e5)",
            color: "#ffffff",
            borderRadius: 24,
            padding: 35,
            marginBottom: 25,
          }}
        >
          <Sparkles size={25} />

          <h1
            style={{
              margin: "18px 0 8px",
              fontSize: 32,
            }}
          >
            {topic.title}
          </h1>

          {topic.englishTitle && (
            <p
              style={{
                margin: 0,
                opacity: 0.85,
              }}
            >
              {topic.englishTitle}
            </p>
          )}

          <p
            style={{
              margin: "20px 0 0",
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            {chapter.title}
          </p>
        </div>

        {/* Student information */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 25,
          }}
        >
          {classLevel && (
            <InfoBadge>
              Class {classLevel}
            </InfoBadge>
          )}

          {board && (
            <InfoBadge>
              {board}
            </InfoBadge>
          )}

          {language && (
            <InfoBadge>
              {language}
            </InfoBadge>
          )}
        </div>

        {/* AI lesson */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 20,
            padding: 28,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 20,
            }}
          >
            <BookOpen
              size={25}
              style={{
                color: "#2563eb",
              }}
            />

            <h2
              style={{
                margin: 0,
              }}
            >
              Your AI Lesson
            </h2>
          </div>

          <p
            style={{
              color: "#475569",
              lineHeight: 1.7,
            }}
          >
            Vidya AI will explain{" "}
            <strong>{topic.title}</strong> in{" "}
            <strong>{language || "your preferred language"}</strong>,
            using examples suitable for Class{" "}
            <strong>{classLevel || "your level"}</strong>.
          </p>

          <div
            style={{
              marginTop: 22,
              padding: 18,
              background: "#eff6ff",
              borderRadius: 14,
              color: "#1e3a8a",
              lineHeight: 1.6,
            }}
          >
            <strong>AI lesson engine</strong>

            <p
              style={{
                margin: "8px 0 0",
              }}
            >
              The actual AI-generated explanation,
              examples, diagrams and questions will be
              connected here next.
            </p>
          </div>
        </div>

        {/* Actions */}
<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(200px, 1fr))",
    gap: 14,
  }}
>
  <button
    type="button"
    onClick={onAskAI}
    style={{
      border: 0,
      background: "#2563eb",
      color: "#ffffff",
      borderRadius: 13,
      padding: "14px 18px",
      cursor: "pointer",
      fontWeight: 700,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    }}
  >
    <Brain size={18} />
    Ask Vidya AI
  </button>

  <button
    type="button"
    onClick={onBack}
    style={{
      border: "1px solid #cbd5e1",
      background: "#ffffff",
      color: "#0f172a",
      borderRadius: 13,
      padding: "14px 18px",
      cursor: "pointer",
      fontWeight: 700,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    }}
  >
    <ArrowLeft size={18} />
    More Topics
  </button>
</div>
</section>
</main>
  );
}

/*

  SMALL COMPONENTS

*/

function InfoBadge({ children }) {
  return (
    <span
      style={{
        background: "rgba(255,255,255,0.16)",
        border: "1px solid rgba(255,255,255,0.25)",
        borderRadius: 999,
        padding: "7px 12px",
        fontSize: 13,
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function EmptyCurriculum({
  subjectName,
  classLevel,
  board,
  language,
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 20,
        padding: 30,
        textAlign: "center",
      }}
    >
      <BookOpen
        size={42}
        style={{
          color: "#2563eb",
          marginBottom: 12,
        }}
      />

      <h2
        style={{
          margin: "0 0 10px",
        }}
      >
        Curriculum coming soon
      </h2>

      <p
        style={{
          color: "#64748b",
          lineHeight: 1.6,
          maxWidth: 600,
          margin: "0 auto",
        }}
      >
        We don't currently have curriculum data for{" "}
        <strong>{subjectName}</strong> with Class{" "}
        <strong>{classLevel || "-"}</strong>,{" "}
        <strong>{board || "-"}</strong> and{" "}
        <strong>{language || "-"}</strong>.
      </p>
    </div>
  );
                  }
