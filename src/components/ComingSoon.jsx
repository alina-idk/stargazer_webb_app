import React from "react";
import { useNavigate } from "react-router-dom";
import "./ComingSoon.css";

export function ComingSoon() {
  const navigate = useNavigate();

  return (
    <div className="coming-soon-container">
      <div className="stars"></div>
      <div className="content">
        <h1>Coming Soon 🌌</h1>
        <button onClick={() => navigate("/")} className="home-btn">
          Return Home
        </button>
      </div>
    </div>
  );
}
