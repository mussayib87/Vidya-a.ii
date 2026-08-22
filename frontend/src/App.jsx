import {
  ArrowRight,
  BookOpen,
  Globe2,
  GraduationCap,
  Languages,
  Sparkles,
  Users,
} from "lucide-react";

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <header className="navbar">
        <div className="container nav-content">
          <a href="/" className="brand">
            <div className="brand-icon">
              <GraduationCap size={23} />
            </div>

            <span>
              Vidya<span className="brand-ai"> AI</span>
            </span>
          </a>

          <nav className="nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How it works</a>
            <a href="#about">About</a>
          </nav>

          <div className="nav-actions">
            <button className="btn btn-ghost">Log in</button>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="hero">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />

          <div className="container hero-grid">
            <div className="hero-content">
              <div className="eyebrow">
                <Sparkles size={16} />
                AI-powered education
              </div>

              <h1>
                Learn in the language
                <span className="gradient-text"> you understand.</span>
              </h1>

              <p className="hero-description">
                Vidya AI helps students learn difficult concepts through
                personalized lessons, multilingual explanations, quizzes,
                voice learning and intelligent study support.
              </p>

              <div className="hero-actions">
                <button className="btn btn-primary btn-large">
                  Start Learning
                  <ArrowRight size={18} />
                </button>

                <button className="btn btn-outline btn-large">
                  I'm a Teacher
                </button>
              </div>

              <div className="hero-trust">
                <div className="trust-item">
                  <Languages size={18} />
                  <span>Multilingual</span>
                </div>

                <div className="trust-item">
                  <Sparkles size={18} />
                  <span>AI Powered</span>
                </div>

                <div className="trust-item">
                  <BookOpen size={18} />
                  <span>Student First</span>
                </div>
              </div>
            </div>

            {/* Learning card */}
            <div className="hero-visual">
              <div className="learning-card">
                <div className="card-top">
                  <div>
                    <span className="small-label">TODAY'S LEARNING</span>
                    <h3>Photosynthesis</h3>
                  </div>

                  <div className="status-pill">
                    <span className="status-dot" />
                    Learning
                  </div>
                </div>

                <div className="lesson-illustration">
                  <div className="sun">
                    <span>☀</span>
                  </div>

                  <div className="plant">
                    <div className="leaf leaf-left" />
                    <div className="leaf leaf-right" />
                    <div className="stem" />
                  </div>

                  <div className="ground" />
                </div>

                <div className="lesson-info">
                  <div>
                    <span className="small-label">EXPLANATION</span>
                    <p>
                      Plants use sunlight, water and carbon dioxide to make
                      their own food.
                    </p>
                  </div>

                  <div className="language-badge">
                    <Globe2 size={15} />
                    ಕನ್ನಡ
                  </div>
                </div>

                <div className="progress-section">
                  <div className="progress-header">
                    <span>Lesson progress</span>
                    <strong>72%</strong>
                  </div>

                  <div className="progress-track">
                    <div className="progress-fill" />
                  </div>
                </div>
              </div>

              <div className="floating-card floating-card-one">
                <Languages size={20} />
                <div>
                  <strong>Multiple languages</strong>
                  <span>Learn your way</span>
                </div>
              </div>

              <div className="floating-card floating-card-two">
                <Sparkles size={20} />
                <div>
                  <strong>AI Tutor</strong>
                  <span>Ask anything</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features-section" id="features">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">WHY VIDYA AI</span>

              <h2>
                Education that adapts
                <span className="gradient-text"> to you.</span>
              </h2>

              <p>
                Powerful learning tools designed to make education accessible,
                personalized and easier to understand.
              </p>
            </div>

            <div className="feature-grid">
              <FeatureCard
                icon={<Languages />}
                title="Learn in your language"
                text="Understand concepts in the language you are most comfortable with."
              />

              <FeatureCard
                icon={<Sparkles />}
                title="AI-powered learning"
                text="Get personalized explanations and intelligent study assistance."
              />

              <FeatureCard
                icon={<BookOpen />}
                title="Interactive lessons"
                text="Learn with lessons, worksheets, flashcards and quizzes."
              />

              <FeatureCard
                icon={<Users />}
                title="Teacher & student"
                text="A connected learning environment for classrooms and individual study."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="how-section" id="how-it-works">
          <div className="container">
            <div className="section-heading">
              <span className="section-label">HOW IT WORKS</span>

              <h2>
                Your learning journey,
                <span className="gradient-text"> simplified.</span>
              </h2>
            </div>

            <div className="steps">
              <Step
                number="01"
                title="Choose your class"
                text="Tell Vidya AI what you are studying."
              />

              <Step
                number="02"
                title="Choose your language"
                text="Select the language you understand best."
              />

              <Step
                number="03"
                title="Start learning"
                text="Learn through AI-powered lessons and activities."
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section" id="about">
          <div className="container">
            <div className="cta-card">
              <div className="cta-icon">
                <GraduationCap size={30} />
              </div>

              <h2>Learning should have no language barrier.</h2>

              <p>
                Vidya AI brings personalized and multilingual education to
                every learner.
              </p>

              <button className="btn btn-light btn-large">
                Get Started
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="brand footer-brand">
            <div className="brand-icon">
              <GraduationCap size={21} />
            </div>

            <span>
              Vidya<span className="brand-ai"> AI</span>
            </span>
          </div>

          <p>© 2026 Vidya AI. Built for accessible education.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>

      <button className="feature-link">
        Explore
        <ArrowRight size={15} />
      </button>
    </div>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="step">
      <span className="step-number">{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default App;
