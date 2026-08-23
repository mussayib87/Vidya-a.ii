import React from "react";

function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  error,
  required = false,
}) {
  return (
    <div className="form-group">
      {label && (
        <label htmlFor={name} className="form-label">
          {label}

          {required && (
            <span className="required-mark">*</span>
          )}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-select ${error ? "has-error" : ""}`}
      >
        <option value="">
          {placeholder}
        </option>

        {options.map((option) => {
          const item =
            typeof option === "string"
              ? {
                  value: option,
                  label: option,
                }
              : option;

          return (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          );
        })}
      </select>

      {error && (
        <div className="input-error">
          {error}
        </div>
      )}
    </div>
  );
}

export default Select;
