import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Controls from "./components/Controls";
import "./App.css";

const App = () => {
  const [workTime, setWorkTime] = useState(25); // minutes
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [timeLeft, setTimeLeft] = useState(0); // seconds
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState("Work");
  const [completed, setCompleted] = useState(0);
  const [settingsLocked, setSettingsLocked] = useState(false);

  useEffect(() => {
    let timer = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      alert(`${session} Session Complete!`);
      handleSessionSwitch();
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft]);

  const handleSessionSwitch = () => {
    if (session === "Work") {
      setCompleted((prev) => prev + 1);
      const nextSession = completed % 4 === 0 ? "Long Break" : "Short Break";
      setSession(nextSession);
      setTimeLeft(
        (nextSession === "Short Break" ? shortBreakTime : longBreakTime) * 60
      );
    } else {
      setSession("Work");
      setTimeLeft(workTime * 60);
    }
    setIsActive(false);
  };

  const startTimer = () => {
    setTimeLeft(workTime * 60);
    setSettingsLocked(true);
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSettingsLocked(false);
    setSession("Work");
    setTimeLeft(0);
    setCompleted(0);
  };

  const formatTime = (seconds) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="app">
      <h1>🍅 Customizable Pomodoro Timer</h1>
      {!settingsLocked && (
        <div className="settings">
          <label>
            Work (mins):
            <input
              type="number"
              value={workTime}
              onChange={(e) => setWorkTime(Number(e.target.value))}
              min="1"
            />
          </label>
          <label>
            Short Break (mins):
            <input
              type="number"
              value={shortBreakTime}
              onChange={(e) => setShortBreakTime(Number(e.target.value))}
              min="1"
            />
          </label>
          <label>
            Long Break (mins):
            <input
              type="number"
              value={longBreakTime}
              onChange={(e) => setLongBreakTime(Number(e.target.value))}
              min="1"
            />
          </label>
        </div>
      )}
      <h2>{session} Session</h2>
      <Timer time={formatTime(timeLeft)} />
      <Controls
        isActive={isActive}
        onStartPause={() =>
          settingsLocked ? setIsActive(!isActive) : startTimer()
        }
        onReset={resetTimer}
      />
      <p>✅ Completed Work Sessions: {completed} / 4</p>
    </div>
  );
};

export default App;
