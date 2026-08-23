import React from "react";

function Logo({ showText = true, size = "medium" }) {
  const sizes = {
    small: 32,
    medium: 42,
    large: 56,
  };

  const iconSize = sizes[size] || sizes.medium;

  return (
    <div className="vidya-logo">
      <div
        className="vidya-logo-mark"
        style={{
          width: iconSize,
          height: iconSize,
        }}
      >
        <span>V</span>
      </div>

      {showText && (
        <div className="vidya-logo-text">
          <strong>Vidya</strong>
          <span>AI</span>
        </div>
      )}
    </div>
  );
}

export default Logo;
