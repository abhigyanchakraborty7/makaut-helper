import styled from "styled-components";

// Lower section container
export const LowerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

// Individual card
export const LowerCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 20px;
  max-width: 180px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  }

  img {
    width: 60px;
    margin-bottom: 10px;
  }
`;

// Card title
export const LowerCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 10px;
`;

// Text above the lower cards
export const LowerText = styled.p`
  font-size: 1.2rem;
  font-weight: 500;
  color: #555;
  text-align: center;
  margin-bottom: 20px;
`;