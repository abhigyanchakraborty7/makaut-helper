"use client";
import { useState } from "react";
import { StyledCard, StyledButton } from "./StyledComponents";
import Modal from "./Modal";

export default function SmartSuggestions() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <div className="card-icon">💡</div>
        <h3 className="card-title">Smart Suggestions</h3>
        <p className="card-desc">AI-powered topic suggestions based on exam trends and syllabus weightage.</p>
      </StyledCard>

      <Modal isOpen={open} onClose={handleClose} title="Smart Suggestions">
        <p>AI will suggest the most important topics for your upcoming exams.</p>
        <StyledButton onClick={() => alert("Generating suggestions...")}>Generate Suggestions</StyledButton>
      </Modal>
    </>
  );
}