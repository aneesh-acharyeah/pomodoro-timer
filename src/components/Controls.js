import React from "react";
import "./Controls.css";

const Controls = ({ isActive, onStartPause, onReset }) => (
  <div className="controls">
    <button onClick={onStartPause}>
      {isActive ? "⏸ Pause" : "▶️ Start"}
    </button>
    <button onClick={onReset}>🔄 Reset</button>
  </div>
);

export default Controls;
