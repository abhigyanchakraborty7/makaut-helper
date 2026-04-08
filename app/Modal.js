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
    <div>
      {/* Heading text */}
      <LowerText>Explore More Features</LowerText>

      {/* Lower section with cards */}
      <LowerContainer>
        <LowerCard onClick={() => openModal("CGPACalculator")}>
          <img src="/cgpa.png" alt="CGPA" />
          <LowerCardTitle>CGPA Calculator</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("NotesGenerator")}>
          <img src="/notes.png" alt="Notes" />
          <LowerCardTitle>Notes Generator</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("PYQ")}>
          <img src="/pyq.png" alt="PYQ" />
          <LowerCardTitle>PYQ Solver</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("SmartSuggestions")}>
          <img src="/suggestions.png" alt="Suggestions" />
          <LowerCardTitle>Important Questions</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={() => openModal("AIExamAssistant")}>
          <img src="/ai.png" alt="AI" />
          <LowerCardTitle>AI Exam Assistant</LowerCardTitle>
        </LowerCard>
      </LowerContainer>

      {/* Conditional Modals */}
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