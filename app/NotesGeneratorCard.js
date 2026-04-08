"use client";
import { useState } from "react";

export default function NotesGeneratorCard() {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");

  const generateNotes = async () => {
    setLoading(true);
    try {
      // Placeholder: Replace with real API call
      await new Promise((r) => setTimeout(r, 1000));
      setNotes("Your AI-generated notes appear here.");
    } catch (err) {
      console.error(err);
      setNotes("Error generating notes.");
    }
    setLoading(false);
  };

  return (
    <div
      className="card"
      onContextMenu={(e) => e.preventDefault()}
      style={{ userSelect: "none" }}
    >
      <div className="card-icon">📝</div>
      <h3 className="card-title">Notes Generator</h3>
      <p className="card-desc">
        Generate quick, exam-ready notes instantly. Screenshots are disabled.
      </p>
      <button
        className="btn-primary"
        onClick={generateNotes}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Notes"}
      </button>
      {notes && <p style={{marginTop:"1rem"}}>{notes}</p>}
    </div>
  );
}