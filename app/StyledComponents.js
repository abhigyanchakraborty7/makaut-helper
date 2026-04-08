// app/StyledComponents.js
import styled from "styled-components";

/* ===== Cards ===== */
export const StyledCard = styled.div`
  background: #1f1f2e;
  color: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.25);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0,0,0,0.35);
  }
`;

/* ===== Buttons ===== */
export const StyledButton = styled.button`
  background: #5c6bc0;
  color: #fff;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;

  &:hover {
    background: #3f51b5;
    transform: scale(1.05);
  }
`;

/* ===== Input Fields ===== */
export const StyledInput = styled.input`
  background: #2b2b3c;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #555;
  outline: none;
  width: 100%;
  margin-bottom: 1rem;
  font-size: 1rem;

  &:focus {
    border-color: #3f51b5;
  }

  &::placeholder {
    color: #aaa;
  }
`;

/* ===== Modal Wrapper ===== */
export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

/* ===== Modal Content ===== */
export const ModalContent = styled.div`
  background: #1f1f2e;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  color: #fff;
  box-shadow: 0 12px 24px rgba(0,0,0,0.4);
`;