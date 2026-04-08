"use client";
import { useState } from "react";
import Modal from "./Modal";

export default function CGPACalculator() {
  const [open,setOpen]=useState(false);
  const [cgpa,setCgpa]=useState("");

  return (
    <>
      <div onClick={()=>setOpen(true)} style={{cursor:"pointer"}}>
        🧮 CGPA Calculator
      </div>

      {open && (
        <Modal onClose={()=>setOpen(false)}>
          <input onChange={(e)=>setCgpa(e.target.value)} />
          <p>{cgpa}</p>
        </Modal>
      )}
    </>
  );
}