"use client";
import { useState } from "react";
import { StyledCard, StyledButton } from "./StyledComponents";
import Modal from "./Modal";

export default function PYQSection() {
  const [open,setOpen]=useState(false);

  return (
    <>
      <StyledCard onClick={()=>setOpen(true)}>
        <div className="card-icon">📄</div>
        <h3 className="card-title">PYQ</h3>
      </StyledCard>

      {open && (
        <Modal onClose={()=>setOpen(false)}>
          <StyledButton>View PYQ</StyledButton>
        </Modal>
      )}
    </>
  );
}