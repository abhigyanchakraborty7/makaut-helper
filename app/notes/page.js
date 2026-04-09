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
  .gen-btn {
    background: #00e5ff; color: #080808; border: none; border-radius: 100px;
    padding: 0.9rem 2.5rem; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-dm), sans-serif;
    margin-top: 0.25rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .gen-btn:hover:not(:disabled) { background: #33ecff; transform: translateY(-1px); }
  .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .result-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(0,229,255,0.15);
    border-radius: 20px; padding: 1.75rem; margin-top: 1.5rem;
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .result-header {
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 1.25rem; padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .result-tag { font-size: 0.8rem; color: #00e5ff; text-transform: uppercase; letter-spacing: 0.1em; }
  .result-body {
    color: rgba(255,255,255,0.8); font-size: 0.95rem;
    line-height: 1.85; white-space: pre-wrap; font-weight: 300;
  }
  .action-row { display: flex; gap: 0.75rem; margin-top: 1.25rem; flex-wrap: wrap; }
  .action-btn {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; color: rgba(255,255,255,0.5); padding: 0.5rem 1.25rem;
    font-size: 0.8rem; cursor: pointer; transition: all 0.2s;
    font-family: var(--font-dm), sans-serif;
  }
  .action-btn:hover { background: rgba(255,255,255,0.08); color: #fff; }
  .spinner {
    width: 18px; height: 18px; border: 2px solid rgba(8,8,8,0.3);
    border-top-color: #080808; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .quick-subjects {
    display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 1rem;
  }
  .chip {
    background: rgba(0,229,255,0.07); border: 1px solid rgba(0,229,255,0.2);
    border-radius: 100px; padding: 0.3rem 0.9rem; font-size: 0.8rem;
    color: rgba(0,229,255,0.8); cursor: pointer; transition: all 0.2s;
  }
  .chip:hover { background: rgba(0,229,255,0.15); color: #00e5ff; }
`;

const QUICK_SUBJECTS = ["Data Structures", "Operating System", "DBMS", "Computer Networks", "Software Engineering", "Digital Electronics"];

export default function NotesPage() {
  const [subject, setSubject] = useState("");
  const [unit, setUnit] = useState("");
  const [type, setType] = useState("short");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = async () => {
    if (!subject.trim()) return;
    setLoading(true); setResult("");
    try {
      const prompt = `Subject: ${subject}\nUnit/Topic: ${unit || "All important topics"}\nNote Type: ${type === "short" ? "Short exam notes" : "Detailed notes"}\n\nGenerate comprehensive MAKAUT exam-ready notes.`;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "notes", message: prompt }),
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
        <h1 className="page-title">Notes <span>Generator</span></h1>
        <p className="page-sub">Get concise, exam-ready notes for any MAKAUT subject or unit in seconds.</p>

        <div className="input-card">
          <label className="field-label">Quick Select Subject</label>
          <div className="quick-subjects">
            {QUICK_SUBJECTS.map(s => (
              <span key={s} className="chip" onClick={() => setSubject(s)}>{s}</span>
            ))}
          </div>
          <label className="field-label">Subject Name</label>
          <input
            placeholder="e.g. Data Structures and Algorithms"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <label className="field-label">Unit / Topic (optional)</label>
          <input
            placeholder="e.g. Unit 3 - Trees and Graphs"
            value={unit}
            onChange={e => setUnit(e.target.value)}
          />
          <label className="field-label">Notes Type</label>
          <select value={type} onChange={e => setType(e.target.value)}>
            <option value="short">Short Notes (Quick Revision)</option>
            <option value="detailed">Detailed Notes (Deep Study)</option>
          </select>
        </div>

        <button className="gen-btn" onClick={generate} disabled={loading || !subject.trim()}>
          {loading ? <><div className="spinner" /> Generating Notes...</> : "✦ Generate Notes"}
        </button>

        {result && (
          <div className="result-card">
            <div className="result-header">
              <span className="result-tag">✦ {subject} Notes</span>
            </div>
            <div className="result-body">{result}</div>
            <div className="action-row">
              <button className="action-btn" onClick={copy}>{copied ? "✓ Copied!" : "Copy Notes"}</button>
              <button className="action-btn" onClick={() => window.print()}>Print / Save PDF</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
