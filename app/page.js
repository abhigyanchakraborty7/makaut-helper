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

  return (
    <div>
      <LowerText>Explore Features</LowerText>

      <LowerContainer>
        <LowerCard onClick={()=>setActiveModal("cgpa")}>
          <LowerCardTitle>CGPA</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={()=>setActiveModal("notes")}>
          <LowerCardTitle>Notes</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={()=>setActiveModal("pyq")}>
          <LowerCardTitle>PYQ</LowerCardTitle>
        </LowerCard>

        <LowerCard onClick={()=>setActiveModal("ai")}>
          <LowerCardTitle>AI</LowerCardTitle>
        </LowerCard>
      </LowerContainer>

      {activeModal==="cgpa" && <Modal onClose={()=>setActiveModal(null)}><CGPACalculator/></Modal>}
      {activeModal==="notes" && <Modal onClose={()=>setActiveModal(null)}><NotesGenerator/></Modal>}
      {activeModal==="pyq" && <Modal onClose={()=>setActiveModal(null)}><PYQSection/></Modal>}
      {activeModal==="ai" && <Modal onClose={()=>setActiveModal(null)}><AIExamAssistant/></Modal>}
    </div>
  );
}