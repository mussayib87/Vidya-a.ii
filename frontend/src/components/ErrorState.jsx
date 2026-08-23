import React from "react";

function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-state">
      <div className="error-state-icon">!</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          className="error-retry-button"
          onClick={onRetry}
        >
          Try again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
