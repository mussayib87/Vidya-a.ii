import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import Input from "../../components/Input";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
    } else if (form.password.length < 8) {
      nextErrors.password = "Password must contain at least 8 characters.";
    }

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/onboarding/welcome");
    }, 500);
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your personalized learning journey."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
          error={errors.name}
          autoComplete="name"
        />

        <Input
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
          required
          error={errors.email}
          autoComplete="email"
        />

        <div>
          <label className="form-label">
            I am a<span className="required-mark">*</span>
          </label>

          <div className="role-options">
            <RoleOption
              value="student"
              selected={form.role === "student"}
              title="Student"
              description="I want to learn"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  role: "student",
                }))
              }
            />

            <RoleOption
              value="teacher"
              selected={form.role === "teacher"}
              title="Teacher"
              description="I want to teach"
              onClick={() =>
                setForm((current) => ({
                  ...current,
                  role: "teacher",
                }))
              }
            />
          </div>
        </div>

        <PasswordField
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          autoComplete="new-password"
        />

        <PasswordField
          label="Confirm password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <Button type="submit" loading={loading} className="auth-submit">
          Create account
        </Button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function RoleOption({ selected, title, description, onClick }) {
  return (
    <button
      type="button"
      className={`role-option ${selected ? "role-option-selected" : ""}`}
      onClick={onClick}
    >
      <span className="role-radio">
        <span />
      </span>

      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </button>
  );
}

function PasswordField({
  label,
  name,
  value,
  onChange,
  error,
  autoComplete,
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={name} className="form-label">
        {label}<span className="required-mark">*</span>
      </label>

      <div className={`password-input-wrapper ${error ? "has-error" : ""}`}>
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="At least 8 characters"
          className="form-input password-input"
          autoComplete={autoComplete}
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <div className="input-error">{error}</div>}
    </div>
  );
}

export default Signup;
