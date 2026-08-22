import { Link, useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      return;
    }

    // Real password-reset API will be connected to the backend later.
    setMessage(
      "If an account exists with this email, password reset instructions will be sent."
    );
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          Vidya<span> AI</span>
        </div>

        <h1>Forgot your password?</h1>

        <p className="auth-description">
          Enter your email address and we'll help you reset your password.
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email address</label>

          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          {message && (
            <p className="auth-message">{message}</p>
          )}

          <button type="submit" className="btn btn-primary">
            Send reset link
          </button>
        </form>

        <button
          type="button"
          className="auth-back-button"
          onClick={() => navigate("/login")}
        >
          Back to login
        </button>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">Create account</Link>
        </p>
      </div>
    </main>
  );
}

export default ForgotPassword;
