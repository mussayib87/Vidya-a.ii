import React from "react";
import { GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="auth-page">
      <div className="auth-brand-panel">
        <Link to="/" className="auth-brand">
          <div className="brand-icon">
            <GraduationCap size={23} />
          </div>

          <span>
            Vidya<span className="brand-ai"> AI</span>
          </span>
        </Link>

        <div className="auth-brand-content">
          <div className="auth-badge">
            <Sparkles size={15} />
            AI-powered education
          </div>

          <h1>
            Learn without
            <span> language barriers.</span>
          </h1>

          <p>
            Personalized learning designed around your class, language and
            learning needs.
          </p>

          <div className="auth-benefits">
            <div>
              <ShieldCheck size={18} />
              <span>Designed for secure learning</span>
            </div>

            <div>
              <GraduationCap size={18} />
              <span>Built for students and teachers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-form-panel">
        <div className="auth-form-container">
          <div className="auth-mobile-brand">
            <Link to="/" className="auth-brand">
              <div className="brand-icon">
                <GraduationCap size={20} />
              </div>

              <span>
                Vidya<span className="brand-ai"> AI</span>
              </span>
            </Link>
          </div>

          <div className="auth-heading">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
