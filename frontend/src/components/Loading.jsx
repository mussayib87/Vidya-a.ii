import { Loader2 } from "lucide-react";

function Loading({ text = "Loading..." }) {
  return (
    <div className="loading-state">
      <Loader2 className="loading-spinner" size={24} />
      <span>{text}</span>
    </div>
  );
}

export default Loading;
