import React from "react";

function EmptyState({
  title = "Nothing here yet",
  message = "There is no content to display right now.",
  action,
}) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📚</div>

      <h3>{title}</h3>

      <p>{message}</p>

      {action && (
        <div className="empty-state-action">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
