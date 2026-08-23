import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  User,
} from "lucide-react";

function AITutor() {
  const navigate = useNavigate();
  const { subject } = useParams();

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "ai",
      text: `Hi! I'm Vidya AI. I'm ready to help you learn ${
        subject || "this subject"
      }. Ask me anything!`,
    },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  function sendMessage(event) {
    event.preventDefault();

    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || isTyping) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmedQuestion,
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
    ]);

    setQuestion("");
    setIsTyping(true);

    // Temporary frontend response.
    // This will later be replaced with the real AI API.
    setTimeout(() => {
      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text:
          "I'm ready to explain this topic step by step. The real Vidya AI response engine will be connected here through the backend.",
      };

      setMessages((previous) => [
        ...previous,
        aiMessage,
      ]);

      setIsTyping(false);
    }, 800);
  }

  return (
    <div className="ai-tutor-page">
      <header className="ai-tutor-header">
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="ai-tutor-title">
          <div className="ai-tutor-icon">
            <Bot size={22} />
          </div>

          <div>
            <h1>Vidya AI Tutor</h1>

            <p>
              {subject
                ? subject.charAt(0).toUpperCase() +
                  subject.slice(1)
                : "Personal learning assistant"}
            </p>
          </div>
        </div>

        <div className="ai-status">
          <span className="ai-status-dot" />
          Online
        </div>
      </header>

      <main className="ai-tutor-content">
        <div className="ai-tutor-intro">
          <div className="intro-icon">
            <Sparkles size={28} />
          </div>

          <h2>Ask Vidya AI</h2>

          <p>
            Ask questions, get simple explanations,
            and learn at your own pace.
          </p>
        </div>

        <section className="chat-container">
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${
                  message.role === "user"
                    ? "user-message"
                    : "ai-message"
                }`}
              >
                <div className="message-avatar">
                  {message.role === "user" ? (
                    <User size={17} />
                  ) : (
                    <Bot size={17} />
                  )}
                </div>

                <div className="message-bubble">
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message ai-message">
                <div className="message-avatar">
                  <Bot size={17} />
                </div>

                <div className="message-bubble typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
          </div>

          <form
            className="chat-input-area"
            onSubmit={sendMessage}
          >
            <input
              type="text"
              value={question}
              onChange={(event) =>
                setQuestion(event.target.value)
              }
              placeholder="Ask Vidya AI anything..."
              aria-label="Ask Vidya AI"
              disabled={isTyping}
            />

            <button
              type="submit"
              disabled={
                !question.trim() || isTyping
              }
              aria-label="Send message"
            >
              <Send size={19} />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}

export default AITutor;
