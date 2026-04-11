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
  .field-label {
    font-size: 0.78rem; color: rgba(255,255,255,0.4);
    text-transform: uppercase; letter-spacing: 0.1em;
    margin-bottom: 0.5rem; display: block;
  }
  .field { margin-bottom: 1.1rem; }
  input, select {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px; padding: 0.65rem 0.9rem;
    color: #fff; font-size: 0.9rem; font-family: var(--font-dm), sans-serif;
    width: 100%; outline: none; transition: border-color 0.2s;
  }
  input:focus, select:focus { border-color: rgba(0,229,255,0.4); }
  input::placeholder { color: rgba(255,255,255,0.2); }
  select option { background: #1a1a1a; }

  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }

  .gen-btn {
    background: #00e5ff; color: #080808; border: none; border-radius: 100px;
    padding: 0.9rem 2.5rem; font-size: 0.95rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-dm), sans-serif;
    margin-top: 0.25rem; width: 100%;
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  }
  .gen-btn:hover:not(:disabled) { background: #33ecff; transform: translateY(-1px); }
  .gen-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  .spinner {
    width: 18px; height: 18px; border: 2px solid rgba(8,8,8,0.3);
    border-top-color: #080808; border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

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

  .disclaimer {
    margin-top: 1.5rem; padding: 1rem 1.25rem;
    background: rgba(255,165,0,0.06); border: 1px solid rgba(255,165,0,0.15);
    border-radius: 12px; font-size: 0.78rem; color: rgba(255,200,100,0.7); line-height: 1.6;
  }

  @media (max-width: 480px) {
    .input-card { padding: 1.25rem; }
    .two-col { grid-template-columns: 1fr; gap: 0; }
  }
`;

const STATES = [
  "West Bengal", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
  "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "Delhi", "Jammu & Kashmir"
];

const CASTES = ["General", "OBC", "SC", "ST", "EWS", "Minority"];

const COURSES = [
  "B.Tech / B.E.", "B.Sc", "B.Com", "B.A.", "BCA", "BBA",
  "M.Tech / M.E.", "M.Sc", "MBA", "MCA", "M.A.", "Diploma / Polytechnic", "Other"
];

export default function ScholarshipPage() {
  const [form, setForm] = useState({
    state: "", caste: "", income: "", course: "", marks: "", gender: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }));

  const isValid = form.state && form.caste && form.income && form.course && form.marks;

  const generate = async () => {
    if (!isValid) return;
    setLoading(true); setResult("");
    try {
      const prompt = `A student has the following profile:
- State: ${form.state}
- Caste/Category: ${form.caste}
- Gender: ${form.gender || "Not specified"}
- Annual Family Income: ₹${form.income}
- Course/Stream: ${form.course}
- Marks/Percentage: ${form.marks}%

Based on this profile, list ALL scholarships and government schemes this student is eligible for. Include:
1. All India / Central Government scholarships (like NSP, PM scholarships, etc.)
2. West Bengal state scholarships (if state is WB, like Swami Vivekananda, Aikyashree, etc.)
3. Other state-specific schemes if applicable

For each scholarship mention:
- Name of scholarship
- Eligibility criteria met
- Amount/benefit
- How to apply (portal/website)
- Application deadline (if known)

Be specific, accurate and comprehensive. Format it clearly with sections.`;

      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "scholarship", message: prompt }),
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
        <h1 className="page-title">Scholarship <span>Finder</span></h1>
        <p className="page-sub">Enter your details and find all scholarships & government schemes you're eligible for.</p>

        <div className="input-card">
          <div className="two-col">
            <div className="field">
              <label className="field-label">State</label>
              <select value={form.state} onChange={e => update("state", e.target.value)}>
                <option value="">Select your state</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Caste / Category</label>
              <select value={form.caste} onChange={e => update("caste", e.target.value)}>
                <option value="">Select category</option>
                {CASTES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="two-col">
            <div className="field">
              <label className="field-label">Annual Family Income (₹)</label>
              <input
                type="number" placeholder="e.g. 250000"
                value={form.income} onChange={e => update("income", e.target.value)}
              />
            </div>
            <div className="field">
              <label className="field-label">Gender (optional)</label>
              <select value={form.gender} onChange={e => update("gender", e.target.value)}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="two-col">
            <div className="field">
              <label className="field-label">Course / Stream</label>
              <select value={form.course} onChange={e => update("course", e.target.value)}>
                <option value="">Select course</option>
                {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="field">
              <label className="field-label">Last Exam Marks (%)</label>
              <input
                type="number" placeholder="e.g. 75" min="0" max="100"
                value={form.marks} onChange={e => update("marks", e.target.value)}
              />
            </div>
          </div>
        </div>

        <button className="gen-btn" onClick={generate} disabled={loading || !isValid}>
          {loading
            ? <><div className="spinner" /> Finding Scholarships...</>
            : "🎓 Find My Scholarships"
          }
        </button>

        {result && (
          <div className="result-card">
            <div className="result-header">
              <span className="result-tag">🎓 Eligible Scholarships</span>
            </div>
            <div className="result-body">{result}</div>
            <div className="action-row">
              <button className="action-btn" onClick={copy}>{copied ? "✓ Copied!" : "Copy Results"}</button>
              <button className="action-btn" onClick={() => window.print()}>Print / Save PDF</button>
            </div>
          </div>
        )}

        <div className="disclaimer">
          ⚠️ Disclaimer: This tool uses AI to suggest scholarships based on your profile. Always verify eligibility and details on official government portals like scholarships.gov.in before applying.
        </div>
      </div>
    </>
  );
}