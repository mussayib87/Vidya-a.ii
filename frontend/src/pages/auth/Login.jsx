import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import AuthLayout from "../../layouts/AuthLayout";
import Button from "../../components/Button";
import Input from "../../components/Input";
import authService from "../../services/authService";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
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
      general: "",
    }));
  }

  function validate() {
    const nextErrors = {};

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!form.password) {
      nextErrors.password = "Password is required.";
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
    setErrors({});

    try {
      await authService.login({
        email: form.email.trim(),
        password: form.password,
      });

      navigate("/onboarding/welcome");
    } catch (error) {
      setErrors({
        general:
          error?.message ||
          "Unable to sign in. Please check your email and password.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue your learning journey."
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {errors.general && (
          <div className="input-error" role="alert">
            {errors.general}
          </div>
        )}

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
          <div className="password-label-row">
            <label htmlFor="password" className="form-label">
              Password<span className="required-mark">*</span>
            </label>

            <Link to="/forgot-password" className="forgot-link">
              Forgot password?
            </Link>
          </div>

          <PasswordInput
            name="password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        <Button
          type="submit"
          loading={loading}
          className="auth-submit"
        >
          Sign in
        </Button>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup">Create an account</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

function PasswordInput({ name, value, onChange, error }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div
        className={`password-input-wrapper ${
          error ? "has-error" : ""
        }`}
      >
        <input
          id={name}
          name={name}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder="Enter your password"
          className="form-input password-input"
          autoComplete="current-password"
        />

        <button
          type="button"
          className="password-toggle"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && (
        <div className="input-error">
          {error}
        </div>
      )}
    </>
  );
}

export default Login;
