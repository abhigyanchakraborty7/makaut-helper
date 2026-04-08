// ImportantQuestionsCard.js
"use client";
import React from "react";

export default function ImportantQuestionsCard() {
  return (
    <div className="card">
      <div className="card-icon">📝</div>
      <h3 className="card-title">Important Questions Predictor</h3>
      <p className="card-desc">
        AI-powered predictions for the most expected questions based on your syllabus and past exam trends.
      </p>
      <button
        className="btn-primary"
        onClick={() => alert("AI prediction feature coming soon!")}
      >
        Predict Questions
      </button>
    </div>
  );
}