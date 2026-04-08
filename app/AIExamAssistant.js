"use client";
import { useState } from "react";
import { StyledCard, StyledButton, StyledInput } from "./StyledComponents";
import Modal from "./Modal";

export default function AIExamAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <>
      <StyledCard onClick={() => setOpen(true)}>
        <div className="card-icon">🤖</div>
        <h3 className="card-title">AI Assistant</h3>
        <p className="card-desc">Ask anything</p>
      </StyledCard>

      {open && (
        <Modal onClose={() => setOpen(false)}>
          <StyledInput value={query} onChange={(e)=>setQuery(e.target.value)} />
          <StyledButton onClick={()=>alert(query)}>Ask</StyledButton>
        </Modal>
      )}
    </>
  );
}