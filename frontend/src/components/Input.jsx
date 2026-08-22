import { AlertCircle } from "lucide-react";

function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
  autoComplete,
}) {
  return (
    <div className="form-field">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}
          {required && <span className="required-mark">*</span>}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={`form-input ${error ? "form-input-error" : ""}`}
      />

      {error && (
        <div className="input-error">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
    </div>
  );
}

export default Input;
