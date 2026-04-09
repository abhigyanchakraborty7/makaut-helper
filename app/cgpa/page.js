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
  .card {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px; padding: 1.75rem; margin-bottom: 1rem;
  }
  .card-label {
    font-size: 0.75rem; color: rgba(255,255,255,0.35); font-weight: 400;
    text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.75rem;
    display: block;
  }
  .sem-selector {
    display: flex; flex-wrap: wrap; gap: 0.5rem; margin-bottom: 0.25rem;
  }
  .sem-btn {
    width: 44px; height: 44px; border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    color: rgba(255,255,255,0.5); font-size: 0.9rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .sem-btn:hover { border-color: rgba(0,229,255,0.3); color: #fff; }
  .sem-btn.active {
    background: rgba(0,229,255,0.12); border-color: rgba(0,229,255,0.5);
    color: #00e5ff;
  }
  .sgpa-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 0.75rem; margin-top: 0.25rem;
  }
  .sgpa-field { display: flex; flex-direction: column; gap: 0.4rem; }
  .sgpa-field label { font-size: 0.78rem; color: rgba(255,255,255,0.35); }
  input {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 0.6rem 0.9rem;
    color: #fff; font-size: 0.9rem; font-family: var(--font-dm), sans-serif;
    width: 100%; outline: none; transition: border-color 0.2s;
  }
  input:focus { border-color: rgba(0,229,255,0.4); }
  input::placeholder { color: rgba(255,255,255,0.2); }
  .calc-btn {
    background: #00e5ff; color: #080808; border: none; border-radius: 100px;
    padding: 0.85rem 2.5rem; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-dm), sans-serif;
    margin-top: 1.25rem; width: 100%;
  }
  .calc-btn:hover { background: #33ecff; transform: translateY(-1px); }
  .result-card {
    background: linear-gradient(135deg, rgba(0,113,255,0.12), rgba(0,229,255,0.06));
    border: 1px solid rgba(0,229,255,0.2); border-radius: 20px;
    padding: 2rem; text-align: center; margin-top: 1.5rem;
  }
  .result-num {
    font-family: var(--font-syne), sans-serif;
    font-size: 5rem; font-weight: 800; color: #00e5ff;
    letter-spacing: -0.04em; line-height: 1;
  }
  .result-label { color: rgba(255,255,255,0.45); font-size: 0.9rem; margin-top: 0.5rem; }
  .result-grade {
    display: inline-block; margin-top: 1rem;
    padding: 0.35rem 1.25rem; border-radius: 100px;
    font-size: 0.875rem; font-weight: 500;
  }
  .result-breakdown {
    display: flex; justify-content: center; gap: 1.5rem; flex-wrap: wrap;
    margin-top: 1.25rem; padding-top: 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.07);
  }
  .breakdown-item { text-align: center; }
  .breakdown-val { font-size: 1.1rem; font-weight: 700; color: #fff; }
  .breakdown-key { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 2px; }
  .error-msg { color: #ff6b6b; font-size: 0.82rem; margin-top: 0.75rem; text-align: center; }

  /* ── Mobile Fixes ── */
  @media (max-width: 480px) {
    .page { padding: 5.5rem 1rem 3rem; }
    .card { padding: 1.25rem; }
    .sem-selector { gap: 0.4rem; }
    .sem-btn { width: 40px; height: 40px; font-size: 0.85rem; }
    .sgpa-grid { grid-template-columns: 1fr 1fr; gap: 0.6rem; }
    .result-num { font-size: 3.5rem; }
    .result-card { padding: 1.5rem 1rem; }
    .result-breakdown { gap: 1rem; }
    .breakdown-val { font-size: 1rem; }
  }
`;

function getGradeColor(cgpa) {
  if (cgpa >= 9) return { bg: "rgba(0,200,100,0.15)", color: "#00c864", label: "Outstanding 🏆" };
  if (cgpa >= 8) return { bg: "rgba(0,180,255,0.15)", color: "#00b4ff", label: "Excellent ⭐" };
  if (cgpa >= 7) return { bg: "rgba(100,149,237,0.15)", color: "#6495ed", label: "Very Good 👍" };
  if (cgpa >= 6) return { bg: "rgba(255,165,0,0.15)", color: "#ffa500", label: "Good 👌" };
  if (cgpa >= 5) return { bg: "rgba(255,100,100,0.15)", color: "#ff6464", label: "Pass ✓" };
  return { bg: "rgba(255,50,50,0.15)", color: "#ff3232", label: "Fail ✗" };
}

export default function CGPAPage() {
  const [numSem, setNumSem] = useState(4);
  const [sgpas, setSgpas] = useState(Array(8).fill(""));
  const [cgpa, setCgpa] = useState(null);
  const [error, setError] = useState("");

  const updateSgpa = (i, val) => {
    const arr = [...sgpas];
    arr[i] = val;
    setSgpas(arr);
  };

  const calculate = () => {
    setError("");
    const values = sgpas.slice(0, numSem).map(v => parseFloat(v));
    for (let i = 0; i < values.length; i++) {
      if (isNaN(values[i])) {
        setError(`Please enter SGPA for Semester ${i + 1}.`);
        return;
      }
      if (values[i] < 0 || values[i] > 10) {
        setError(`SGPA for Semester ${i + 1} must be between 0 and 10.`);
        return;
      }
    }
    const total = values.reduce((a, b) => a + b, 0);
    setCgpa((total / numSem).toFixed(2));
  };

  const gradeInfo = cgpa ? getGradeColor(parseFloat(cgpa)) : null;

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">
        <h1 className="page-title">CGPA <span>Calculator</span></h1>
        <p className="page-sub">Enter your SGPAs semester-wise. CGPA = Average of all SGPAs.</p>

        <div className="card">
          <span className="card-label">Step 1 — How many semesters completed?</span>
          <div className="sem-selector">
            {[1,2,3,4,5,6,7,8].map(n => (
              <button
                key={n}
                className={`sem-btn ${numSem === n ? "active" : ""}`}
                onClick={() => { setNumSem(n); setCgpa(null); setError(""); }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="card">
          <span className="card-label">Step 2 — Enter your SGPA for each semester</span>
          <div className="sgpa-grid">
            {Array.from({ length: numSem }, (_, i) => (
              <div className="sgpa-field" key={i}>
                <label>Semester {i + 1}</label>
                <input
                  type="number"
                  placeholder="e.g. 8.5"
                  min="0"
                  max="10"
                  step="0.01"
                  value={sgpas[i]}
                  onChange={e => updateSgpa(i, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <button className="calc-btn" onClick={calculate}>Calculate CGPA</button>

        {error && <p className="error-msg">{error}</p>}

        {cgpa && !error && (
          <div className="result-card">
            <div className="result-num">{cgpa}</div>
            <div className="result-label">Your CGPA (out of 10)</div>
            <span className="result-grade" style={{ background: gradeInfo.bg, color: gradeInfo.color }}>
              {gradeInfo.label}
            </span>
            <div className="result-breakdown">
              <div className="breakdown-item">
                <div className="breakdown-val">{numSem}</div>
                <div className="breakdown-key">Semesters</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-val">
                  {sgpas.slice(0, numSem).reduce((a, b) => a + parseFloat(b || 0), 0).toFixed(2)}
                </div>
                <div className="breakdown-key">Total SGPAs</div>
              </div>
              <div className="breakdown-item">
                <div className="breakdown-val">{cgpa}</div>
                <div className="breakdown-key">CGPA</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}