"use client";

import { useState } from "react";
import Modal from "./Modal";
import CGPACalculator from "./CGPACalculator";
import NotesGenerator from "./NotesGenerator";
import PYQSection from "./PYQSection";
import SmartSuggestions from "./SmartSuggestions";
import AIExamAssistant from "./AIExamAssistant";

import {
  LowerContainer,
  LowerText,
  LowerCard,
  LowerCardTitle
} from "./StyledComponents";

export default function HomePage() {
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  return (
    <div style={{ padding: "40px 20px" }}>
      {/* Section Title */}
      <LowerText style={{ fontSize: "1.5rem", marginBottom: "20px" }}>
        Explore More Features
      </LowerText>

      {/* Lower Section with Cards */}
      <LowerContainer>
        <LowerCard onClick={() => openModal("CGPACalculator")}>
          <img src="/cgpa.png" alt="CGPA" style={{ width: "60px", marginBottom: "10px" }} />
          <LowerCardTitle>CGPA Calculator</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("NotesGenerator")}>
          <img src="/notes.png" alt="Notes" style={{ width: "60px", marginBottom: "10px" }} />
          <LowerCardTitle>Notes Generator</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("PYQ")}>
          <img src="/pyq.png" alt="PYQ" style={{ width: "60px", marginBottom: "10px" }} />
          <LowerCardTitle>PYQ Solver</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("SmartSuggestions")}>
          <img src="/suggestions.png" alt="Suggestions" style={{ width: "60px", marginBottom: "10px" }} />
          <LowerCardTitle>Important Questions</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("AIExamAssistant")}>
          <img src="/ai.png" alt="AI" style={{ width: "60px", marginBottom: "10px" }} />
          <LowerCardTitle>AI Exam Assistant</LowerCardTitle>
        </LowerCard>
      </LowerContainer>

      {/* Modals for Each Feature */}
      {activeModal === "CGPACalculator" && (
        <Modal onClose={closeModal}>
          <CGPACalculator />
        </Modal>
      )}
      {activeModal === "NotesGenerator" && (
        <Modal onClose={closeModal}>
          <NotesGenerator />
        </Modal>
      )}
      {activeModal === "PYQ" && (
        <Modal onClose={closeModal}>
          <PYQSection />
        </Modal>
      )}
      {activeModal === "SmartSuggestions" && (
        <Modal onClose={closeModal}>
          <SmartSuggestions />
        </Modal>
      )}
      {activeModal === "AIExamAssistant" && (
        <Modal onClose={closeModal}>
          <AIExamAssistant />
        </Modal>
      )}
    </div>
  );
}