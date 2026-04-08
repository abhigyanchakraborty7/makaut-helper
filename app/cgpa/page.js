"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";

const GRADE_POINTS = { O: 10, E: 9, A: 8, B: 7, C: 6, D: 5, F: 0 };
const GRADES = ["O", "E", "A", "B", "C", "D", "F"];

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
  .row {
    display: grid; grid-template-columns: 1fr 120px 120px 40px;
    gap: 0.75rem; align-items: center; margin-bottom: 0.75rem;
  }
  .row-header {
    display: grid; grid-template-columns: 1fr 120px 120px 40px;
    gap: 0.75rem; margin-bottom: 0.5rem;
  }
  .row-header span { font-size: 0.75rem; color: rgba(255,255,255,0.35); font-weight: 400; text-transform: uppercase; letter-spacing: 0.08em; }
  input, select {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 0.6rem 0.9rem;
    color: #fff; font-size: 0.9rem; font-family: var(--font-dm), sans-serif;
    width: 100%; outline: none; transition: border-color 0.2s;
  }
  input:focus, select:focus { border-color: rgba(0,229,255,0.4); }
  select option { background: #1a1a1a; }
  .del-btn {
    background: rgba(255,60,60,0.1); border: 1px solid rgba(255,60,60,0.2);
    border-radius: 8px; color: rgba(255,100,100,0.7); cursor: pointer;
    font-size: 1rem; padding: 0.5rem; transition: all 0.2s; width: 36px; height: 36px;
    display: flex; align-items: center; justify-content: center;
  }
  .del-btn:hover { background: rgba(255,60,60,0.2); color: #ff6b6b; }
  .add-btn {
    background: rgba(0,229,255,0.07); border: 1px dashed rgba(0,229,255,0.25);
    border-radius: 12px; color: #00e5ff; cursor: pointer;
    font-size: 0.875rem; padding: 0.7rem; width: 100%;
    transition: all 0.2s; font-family: var(--font-dm), sans-serif; margin-top: 0.5rem;
  }
  .add-btn:hover { background: rgba(0,229,255,0.12); border-color: rgba(0,229,255,0.4); }
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
  .grade-ref {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 0.5rem; margin-top: 1.5rem;
  }
  .grade-pill {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px; padding: 0.5rem; text-align: center;
  }
  .grade-pill .g { font-size: 1rem; font-weight: 700; color: #00e5ff; }
  .grade-pill .p { font-size: 0.75rem; color: rgba(255,255,255,0.35); margin-top: 2px; }
  .calc-btn {
    background: #00e5ff; color: #080808; border: none; border-radius: 100px;
    padding: 0.85rem 2.5rem; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-dm), sans-serif;
    margin-top: 1.25rem; width: 100%;
  }
  .calc-btn:hover { background: #33ecff; transform: translateY(-1px); }
  @media (max-width: 560px) {
    .row, .row-header { grid-template-columns: 1fr 90px 90px 36px; gap: 0.5rem; }
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
  const [subjects, setSubjects] = useState([
    { name: "", credit: "", grade: "O" },
    { name: "", credit: "", grade: "O" },
    { name: "", credit: "", grade: "O" },
  ]);
  const [cgpa, setCgpa] = useState(null);

  const add = () => setSubjects([...subjects, { name: "", credit: "", grade: "O" }]);

  const remove = (i) => setSubjects(subjects.filter((_, idx) => idx !== i));

  const update = (i, field, val) => {
    const s = [...subjects];
    s[i][field] = val;
    setSubjects(s);
  };

  const calculate = () => {
    let totalPoints = 0, totalCredits = 0;
    for (const s of subjects) {
      const c = parseFloat(s.credit);
      if (!isNaN(c) && c > 0) {
        totalPoints += c * GRADE_POINTS[s.grade];
        totalCredits += c;
      }
    }
    if (totalCredits === 0) return;
    setCgpa((totalPoints / totalCredits).toFixed(2));
  };

  const gradeInfo = cgpa ? getGradeColor(parseFloat(cgpa)) : null;

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">
        <h1 className="page-title">CGPA <span>Calculator</span></h1>
        <p className="page-sub">Based on MAKAUT's official grading system. Enter your subjects, credits and grades.</p>

        <div className="card">
          <div className="row-header">
            <span>Subject Name</span>
            <span>Credits</span>
            <span>Grade</span>
            <span></span>
          </div>
          {subjects.map((s, i) => (
            <div className="row" key={i}>
              <input
                placeholder={`Subject ${i + 1}`}
                value={s.name}
                onChange={e => update(i, "name", e.target.value)}
              />
              <input
                type="number" placeholder="e.g. 4" min="1" max="6"
                value={s.credit}
                onChange={e => update(i, "credit", e.target.value)}
              />
              <select value={s.grade} onChange={e => update(i, "grade", e.target.value)}>
                {GRADES.map(g => (
                  <option key={g} value={g}>{g} ({GRADE_POINTS[g]})</option>
                ))}
              </select>
              <button className="del-btn" onClick={() => remove(i)} disabled={subjects.length === 1}>×</button>
            </div>
          ))}
          <button className="add-btn" onClick={add}>+ Add Subject</button>
        </div>

        <button className="calc-btn" onClick={calculate}>Calculate CGPA</button>

        {cgpa && (
          <div className="result-card">
            <div className="result-num">{cgpa}</div>
            <div className="result-label">Your CGPA (out of 10)</div>
            <span className="result-grade" style={{ background: gradeInfo.bg, color: gradeInfo.color }}>
              {gradeInfo.label}
            </span>
          </div>
        )}

        <div className="card" style={{ marginTop: "1.5rem" }}>
          <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>MAKAUT Grade Reference</p>
          <div className="grade-ref">
            {GRADES.map(g => (
              <div className="grade-pill" key={g}>
                <div className="g">{g}</div>
                <div className="p">{GRADE_POINTS[g]} pts</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
