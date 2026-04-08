import styled from "styled-components";

// Container for the lower section
export const LowerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

// Card wrapper in the lower section
export const LowerCard = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  max-width: 400px;
  width: 100%;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }
`;

// Title inside each card
export const LowerCardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
  text-align: center;
`;

// Text/content inside each card
export const LowerText = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  text-align: center;
`;