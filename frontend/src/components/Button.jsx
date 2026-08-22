import React from "react";
import { Loader2 } from "lucide-react";

function Button({
  children,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
  onClick,
}) {
  return (
    <button
      type={type}
      className={`app-button app-button-${variant} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="button-loader" size={17} />}
      {children}
    </button>
  );
}

export default Button;
