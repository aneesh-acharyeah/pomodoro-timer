import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import "./App.css";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 min
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState("Work"); // Work | Short Break | Long Break
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      if (session === "Work") {
        setCompleted((prev) => prev + 1);
        setSession(completed % 4 === 0 ? "Long Break" : "Short Break");
        setTimeLeft(completed % 4 === 0 ? 15 * 60 : 5 * 60);
      } else {
        setSession("Work");
        setTimeLeft(25 * 60);
      }
      setIsActive(false);
      alert("Session Complete!");
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, session, completed]);

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="app">
      <h1>🍅 Pomodoro Timer</h1>
      <h2>{session} Session</h2>
      <Timer time={formatTime(timeLeft)} />
      <Controls
        isActive={isActive}
        onStartPause={() => setIsActive(!isActive)}
        onReset={() => {
          setIsActive(false);
          setTimeLeft(session === "Work" ? 25 * 60 : session === "Short Break" ? 5 * 60 : 15 * 60);
        }}
      />
      <p>✅ Completed: {completed} / 4</p>
    </div>
  );
};

export default App;
