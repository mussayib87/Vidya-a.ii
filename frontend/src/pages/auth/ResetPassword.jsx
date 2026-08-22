import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = {};

    if (password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }

    if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSuccess(true);

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  }

  if (success) {
    return (
      <AuthLayout
        title="Password updated"
        subtitle="Your new password has been set successfully."
      >
        <div className="success-panel">
          <div className="success-icon">
            <CheckCircle2 size={28} />
          </div>

          <h3>You're all set</h3>

          <p>Redirecting you to the login page...</p>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create a new password"
      subtitle="Choose a strong password for your account."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="form-label">
            New password<span className="required-mark">*</span>
          </label>

          <div
            className={`password-input-wrapper ${
              errors.password ? "has-error" : ""
            }`}
          >
            <input
              id="password"
              type={visible ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setErrors((current) => ({
                  ...current,
                  password: "",
                }));
              }}
              placeholder="At least 8 characters"
              className="form-input password-input"
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() => setVisible((current) => !current)}
            >
              {visible ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <div className="input-error">{errors.password}</div>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="form-label">
            Confirm password<span className="required-mark">*</span>
          </label>

          <input
            id="confirmPassword"
            type={visible ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setErrors((current) => ({
                ...current,
                confirmPassword: "",
              }));
            }}
            placeholder="Enter password again"
            className={`form-input ${
              errors.confirmPassword ? "form-input-error" : ""
            }`}
          />

          {errors.confirmPassword && (
            <div className="input-error">{errors.confirmPassword}</div>
          )}
        </div>

        <Button type="submit" className="auth-submit">
          Update password
        </Button>

        <p className="auth-switch">
          <Link to="/login">Back to login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ResetPassword;
