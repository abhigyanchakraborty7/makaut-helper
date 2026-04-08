"use client";
import { useState } from "react";
import Modal from "./Modal";

export default function CGPACalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [sgpas, setSgpas] = useState([""]);
  const [cgpa, setCgpa] = useState(null);

  const addSemester = () => setSgpas([...sgpas, ""]);
  const handleChange = (index, value) => {
    const newSgpas = [...sgpas];
    newSgpas[index] = value;
    setSgpas(newSgpas);
  };

  const calculateCGPA = () => {
    const nums = sgpas.map(n => parseFloat(n) || 0);
    const result = nums.reduce((a,b)=>a+b,0)/nums.length;
    setCgpa(result.toFixed(2));
  };

  return (
    <>
      <div 
        className="card" 
        onClick={()=>setIsOpen(true)}
        style={{cursor:"pointer"}}
      >
        <div className="card-icon">🧮</div>
        <h3 className="card-title">CGPA Calculator</h3>
        <p className="card-desc">Calculate your CGPA instantly by entering SGPA of each semester.</p>
      </div>

      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} title="CGPA Calculator">
        {sgpas.map((val, i) => (
          <input
            key={i}
            type="number"
            placeholder={`Enter SGPA for Sem ${i+1}`}
            value={val}
            onChange={e=>handleChange(i, e.target.value)}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "12px",
              border: "1px solid rgba(0,229,255,0.4)",
              background: "#080808",
              color: "#fff",
              outline: "none",
              fontSize: "0.95rem",
              width: "100%",
              marginBottom:"0.75rem",
              boxShadow: "0 0 10px rgba(0,229,255,0.1)",
              transition: "all 0.2s"
            }}
            onFocus={e => e.currentTarget.style.boxShadow = "0 0 12px rgba(0,229,255,0.5)"}
            onBlur={e => e.currentTarget.style.boxShadow = "0 0 10px rgba(0,229,255,0.1)"}
          />
        ))}

        <button 
          onClick={addSemester} 
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "12px",
            border: "1px solid #00e5ff",
            background: "transparent",
            color:"#00e5ff",
            fontWeight:500,
            marginRight:"0.5rem",
            cursor:"pointer"
          }}
        >
          + Add Semester
        </button>

        <button
          onClick={calculateCGPA}
          style={{
            padding: "0.75rem 1.5rem",
            borderRadius: "50px",
            border: "1px solid #00e5ff",
            background: "linear-gradient(90deg, #00e5ff, #0070ff)",
            color: "#080808",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: "pointer",
            marginTop:"1rem",
            boxShadow: "0 0 12px rgba(0,229,255,0.3)"
          }}
        >
          Calculate
        </button>

        {cgpa && <p style={{marginTop:"1rem", fontWeight:600, color:"#00e5ff"}}>Your CGPA: {cgpa}</p>}
      </Modal>
    </>
  );
}