// app/StyledComponents.js
import styled from "styled-components";

/* Input Fields */
export const StyledInput = styled.input`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #fff;
  font-size: 0.95rem;
  width: 100%;
  margin-bottom: 1rem;
  transition: all 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }

  &:focus {
    outline: none;
    border-color: #00e5ff;
    background: rgba(0, 229, 255, 0.05);
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
  }
`;

/* Buttons */
export const StyledButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #00e5ff, #0070ff, #00e5ff);
  color: #080808;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: center;

  &:hover {
    background-position: 200% center;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 229, 255, 0.3);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`;

/* Secondary Button (Ghost / Outline) */
export const StyledGhostButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 100px;
  font-weight: 500;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #00e5ff;
    border-color: #00e5ff;
    background: rgba(0, 229, 255, 0.08);
  }

  &:active {
    transform: translateY(0);
  }
`;