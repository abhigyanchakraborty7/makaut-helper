import styled from "styled-components";

/* ---------- LOWER SECTION ---------- */

export const LowerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 40px 20px;
  background-color: #f5f5f5;
`;

export const LowerCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 20px;
  max-width: 180px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }

  img {
    width: 60px;
    margin-bottom: 10px;
  }
`;

export const LowerCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
`;

export const LowerText = styled.p`
  font-size: 1.4rem;
  text-align: center;
  margin-bottom: 20px;
`;

/* ---------- COMMON CARD ---------- */

export const StyledCard = styled.div`
  background: #0f172a;
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 20px rgba(0,229,255,0.3);
  }

  .card-icon {
    font-size: 2rem;
  }

  .card-title {
    color: white;
    font-weight: 600;
  }

  .card-desc {
    color: #aaa;
    font-size: 0.9rem;
  }
`;

/* ---------- BUTTON ---------- */

export const StyledButton = styled.button`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  background: linear-gradient(90deg,#00e5ff,#0070ff);
  cursor: pointer;
  font-weight: 600;
  margin-top: 10px;
`;

/* ---------- INPUT ---------- */

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #00e5ff;
  margin-bottom: 10px;
  background: #080808;
  color: white;
`;