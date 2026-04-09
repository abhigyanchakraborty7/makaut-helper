"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .page { min-height: 100vh; padding: 7rem 1.5rem 4rem; max-width: 800px; margin: 0 auto; }
  @media (max-width: 680px) { .page { padding-top: 8.5rem; } }
  .page-title {
    font-family: var(--font-syne), sans-serif;
    font-size: clamp(2rem, 5vw, 3rem); font-weight: 800;
    color: #fff; letter-spacing: -0.03em; margin-bottom: 0.5rem;
  }
  .page-title span { color: #00e5ff; }
  .page-sub { color: rgba(255,255,255,0.4); font-size: 0.95rem; font-weight: 300; margin-bottom: 2.5rem; }
  .input-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 1.75rem; margin-bottom: 1rem;
  }
  .field-label { font-size: 0.8rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; display: block; }
  input, select {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 0.65rem 0.9rem;
    color: #fff; font-size: 0.9rem; font-family: var(--font-dm), sans-serif;
    width: 100%; outline: none; transition: border-color 0.2s; margin-bottom: 1rem;
  }
  input:focus, select:focus { border-color: rgba(0,229,255,0.4); }
  input::placeholder { color: rgba(255,255,255,0.2); }
  select option { background: #1a1a1a; }
  .pred-btn {
    background: #00e5ff; color: #080808; border: none; border-radius: 100px;
    padding: 0.9rem 2.5rem; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-dm), sans-serif;
    margin-top: 0.25rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .pred-btn:hover:not(:disabled) { background: #33ecff; transform: translateY(-1px); }
  .pred-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .result-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(0,229,255,0.15);
    border-radius: 20px; padding: 1.75rem; margin-top: 1.5rem;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .result-header {
    font-size: 0.8rem; color: #00e5ff; text-transform: uppercase;
    letter-spacing: 0.1em; margin-bottom: 1.25rem;
    padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; gap: 0.5rem;
  }
  .result-body {
    color: rgba(255,255,255,0.8); font-size: 0.95rem;
    line-height: 1.85; white-space: pre-wrap; font-weight: 300;
  }
  .copy-btn {
    margin-top: 1.25rem; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 10px;
    color: rgba(255,255,255,0.5); padding: 0.5rem 1.25rem;
    font-size: 0.8rem; cursor: pointer; transition: all 0.2s;
    font-family: var(--font-dm), sans-serif;
  }
  .copy-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .spinner {
    width: 18px; height: 18px; border: 2px solid rgba(8,8,8,0.3);
    border-top-color: #080808; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .quick-subjects { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem; }
  .chip {
    background: rgba(0,229,255,0.07); border: 1px solid rgba(0,229,255,0.2);
    border-radius: 100px; padding: 0.3rem 0.9rem; font-size: 0.8rem;
    color: rgba(0,229,255,0.8); cursor: pointer; transition: all 0.2s;
  }
  .chip:hover { background: rgba(0,229,255,0.15); color: #00e5ff; }
  .warning-banner {
    background: rgba(255,165,0,0.07); border: 1px solid rgba(255,165,0,0.2);
    border-radius: 12px; padding: 0.85rem 1.1rem; margin-bottom: 1.5rem;
    font-size: 0.85rem; color: rgba(255,165,0,0.8); line-height: 1.5;
  }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  @media (max-width: 500px) { .row2 { grid-template-columns: 1fr; } }
`;

const QUICK_SUBJECTS = ["Data Structures", "Operating System", "DBMS", "Computer Networks", "Software Engineering", "Digital Electronics", "Algorithms", "Compiler Design"];

export default function PredictorPage() {
  const [subject, setSubject] = useState("");
  const [semester, setSemester] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const predict = async () => {
    if (!subject.trim()) return;
    setLoading(true); setResult("");
    try {
      const prompt = `Subject: ${subject}\n${semester ? `Semester: ${semester}` : ""}\n\nPredict the most important questions likely to appear in the upcoming MAKAUT university exam based on historical exam patterns.`;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "predictor", message: prompt }),
      });
      const data = await res.json();
      setResult(data.result || data.error || "Something went wrong.");
    } catch {
      setResult("Network error. Please try again.");
    }
    setLoading(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">
        <h1 className="page-title">Question <span>Predictor</span></h1>
        <p className="page-sub">AI-powered predictions of the most likely questions for your upcoming MAKAUT exams.</p>

        <div className="warning-banner">
          ⚠️ Predictions are based on historical exam patterns and AI analysis. Use as a supplement to full preparation, not a replacement.
        </div>

        <div className="input-card">
          <label className="field-label">Quick Select Subject</label>
          <div className="quick-subjects">
            {QUICK_SUBJECTS.map(s => (
              <span key={s} className="chip" onClick={() => setSubject(s)}>{s}</span>
            ))}
          </div>
          <div className="row2">
            <div>
              <label className="field-label">Subject Name</label>
              <input
                placeholder="e.g. Computer Networks"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="field-label">Semester (optional)</label>
              <select value={semester} onChange={e => setSemester(e.target.value)}>
                <option value="">Select Semester</option>
                {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>{s}{["st","nd","rd","th","th","th","th","th"][s-1]} Semester</option>)}
              </select>
            </div>
          </div>
        </div>

        <button className="pred-btn" onClick={predict} disabled={loading || !subject.trim()}>
          {loading ? <><div className="spinner" /> Predicting Questions...</> : "✦ Predict Important Questions"}
        </button>

        {result && (
          <div className="result-card">
            <div className="result-header">🔮 Predicted Questions — {subject}</div>
            <div className="result-body">{result}</div>
            <button className="copy-btn" onClick={copy}>{copied ? "✓ Copied!" : "Copy Questions"}</button>
          </div>
        )}
      </div>
    </>
  );
}
