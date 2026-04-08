"use client";
import { useState } from "react";
import { StyledCard, StyledButton, StyledInput } from "./StyledComponents";
import Modal from "./Modal";

export default function AIExamAssistant() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAsk = () => {
    alert(`AI is answering: "${query}"`);
  };

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <div className="card-icon">🤖</div>
        <h3 className="card-title">AI Exam Assistant</h3>
        <p className="card-desc">Ask anything about your syllabus and get instant, accurate answers.</p>
      </StyledCard>

      <Modal isOpen={open} onClose={handleClose} title="AI Exam Assistant">
        <StyledInput 
          type="text" 
          placeholder="Type your question here..." 
          value={query} 
          onChange={(e) => setQuery(e.target.value)}
        />
        <StyledButton onClick={handleAsk}>Ask AI</StyledButton>
      </Modal>
    </>
  );
}