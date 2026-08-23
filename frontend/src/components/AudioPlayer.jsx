import React, { useRef, useState } from "react";

function AudioPlayer({ src, title = "Audio lesson" }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  async function togglePlayback() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setPlaying(true);
    } catch (error) {
      console.error("Audio playback failed:", error);
    }
  }

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={src}
        onEnded={() => setPlaying(false)}
      />

      <button
        type="button"
        onClick={togglePlayback}
        disabled={!src}
      >
        {playing ? "Pause" : "Play"}
      </button>

      <span>{title}</span>
    </div>
  );
}

export default AudioPlayer;
