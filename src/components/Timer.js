import React from "react";
import "./Timer.css";

const Timer = ({ time }) => (
  <div className="timer">
    <h1>{time}</h1>
  </div>
);

export default Timer;
