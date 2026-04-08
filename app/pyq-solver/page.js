"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .page { min-height: 100vh; padding: 7rem 1.5rem 4rem; max-width: 800px; margin: 0 auto; }
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
  textarea {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 1rem; color: #fff; font-size: 0.95rem;
    font-family: var(--font-dm), sans-serif; width: 100%; outline: none;
    transition: border-color 0.2s; resize: vertical; min-height: 130px; line-height: 1.6;
  }
  textarea:focus { border-color: rgba(0,229,255,0.4); }
  textarea::placeholder { color: rgba(255,255,255,0.2); }
  .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  input, select {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 0.65rem 0.9rem;
    color: #fff; font-size: 0.9rem; font-family: var(--font-dm), sans-serif;
    width: 100%; outline: none; transition: border-color 0.2s;
  }
  input:focus, select:focus { border-color: rgba(0,229,255,0.4); }
  select option { background: #1a1a1a; }
  .solve-btn {
    background: #00e5ff; color: #080808; border: none; border-radius: 100px;
    padding: 0.9rem 2.5rem; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-dm), sans-serif;
    margin-top: 1.25rem; width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .solve-btn:hover:not(:disabled) { background: #33ecff; transform: translateY(-1px); }
  .solve-btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .result-card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(0,229,255,0.15);
    border-radius: 20px; padding: 1.75rem; margin-top: 1.5rem; animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  .result-header {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.8rem; color: #00e5ff; text-transform: uppercase;
    letter-spacing: 0.1em; margin-bottom: 1.25rem;
    padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .result-body {
    color: rgba(255,255,255,0.8); font-size: 0.95rem; line-height: 1.85;
    white-space: pre-wrap; font-weight: 300;
  }
  .result-body strong { color: #fff; font-weight: 500; }
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
  .tips {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
    gap: 0.75rem; margin-top: 1.5rem;
  }
  .tip {
    background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 12px; padding: 1rem; font-size: 0.85rem;
    color: rgba(255,255,255,0.35); line-height: 1.5;
  }
  .tip strong { color: rgba(255,255,255,0.6); display: block; margin-bottom: 0.25rem; font-size: 0.8rem; }
  @media (max-width: 500px) { .row2 { grid-template-columns: 1fr; } }
`;

export default function PYQSolver() {
  const [question, setQuestion] = useState("");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("7");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const solve = async () => {
    if (!question.trim()) return;
    setLoading(true); setResult("");
    try {
      const prompt = `Subject: ${subject || "General"}\nMarks: ${marks}\n\nQuestion: ${question}`;
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "pyq", message: prompt }),
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
        <h1 className="page-title">PYQ <span>Solver</span></h1>
        <p className="page-sub">Paste any MAKAUT exam question and get a complete, marks-ready answer instantly.</p>

        <div className="input-card">
          <label className="field-label">Your Question</label>
          <textarea
            placeholder="e.g. Explain the concept of Virtual Memory with its advantages and disadvantages..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <div className="row2">
            <div>
              <label className="field-label" style={{ marginTop: "0.75rem" }}>Subject (optional)</label>
              <input
                placeholder="e.g. Operating System"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>
            <div>
              <label className="field-label" style={{ marginTop: "0.75rem" }}>Marks</label>
              <select value={marks} onChange={e => setMarks(e.target.value)}>
                <option value="2">2 Marks</option>
                <option value="5">5 Marks</option>
                <option value="7">7 Marks</option>
                <option value="10">10 Marks</option>
              </select>
            </div>
          </div>
        </div>

        <button className="solve-btn" onClick={solve} disabled={loading || !question.trim()}>
          {loading ? <><div className="spinner" /> Generating Answer...</> : "✦ Solve This Question"}
        </button>

        {result && (
          <div className="result-card">
            <div className="result-header">✦ AI Generated Answer</div>
            <div className="result-body">{result}</div>
            <button className="copy-btn" onClick={copy}>{copied ? "✓ Copied!" : "Copy Answer"}</button>
          </div>
        )}

        {!result && !loading && (
          <div className="tips">
            <div className="tip"><strong>💡 Pro Tip</strong>Paste the exact question from your PYQ paper for best results.</div>
            <div className="tip"><strong>📝 Format</strong>Answers are structured in university exam format with intro, body & conclusion.</div>
            <div className="tip"><strong>🎯 Accuracy</strong>Mention the subject name for more accurate, syllabus-specific answers.</div>
          </div>
        )}
      </div>
    </>
  );
}
