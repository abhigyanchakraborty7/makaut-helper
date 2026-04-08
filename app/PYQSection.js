"use client";
import { useState } from "react";
import { StyledCard, StyledButton } from "./StyledComponents";
import Modal from "./Modal";

export default function PYQSection() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledCard onClick={handleOpen}>
        <div className="card-icon">📄</div>
        <h3 className="card-title">Previous Year Questions</h3>
        <p className="card-desc">Browse PYQs sorted by subject, semester & year. Never go in blind again.</p>
      </StyledCard>

      <Modal isOpen={open} onClose={handleClose} title="Previous Year Questions">
        <p>Select your subject, semester & year to view questions.</p>
        <StyledButton onClick={() => alert("PYQs loading...")}>View PYQs</StyledButton>
      </Modal>
    </>
  );
}