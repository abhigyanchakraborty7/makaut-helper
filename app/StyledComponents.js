import styled from "styled-components";

/* ---------- LOWER SECTION ---------- */

export const LowerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 25px;
  padding: 50px 20px;
  background: #080808;
`;

export const LowerCard = styled.div`
  background: #0f172a;
  border-radius: 16px;
  padding: 20px;
  max-width: 180px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid rgba(0, 229, 255, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(0, 229, 255, 0.4);
  }

  img {
    width: 60px;
    margin-bottom: 10px;
  }
`;

export const LowerCardTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #ffffff;
`;

export const LowerText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #00e5ff;
  text-align: center;
  margin-bottom: 25px;
`;

/* ---------- TOP FEATURE CARDS ---------- */

export const StyledCard = styled.div`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  cursor: pointer;
  text-align: center;
  transition: 0.3s;
  border: 1px solid rgba(0, 229, 255, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 0 25px rgba(0, 229, 255, 0.5);
  }

  .card-icon {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .card-title {
    font-size: 1.2rem;
    font-weight: 600;
    color: #fff;
  }

  .card-desc {
    font-size: 0.9rem;
    color: #aaa;
    margin-top: 5px;
  }
`;

/* ---------- BUTTON ---------- */

export const StyledButton = styled.button`
  padding: 0.7rem 1.5rem;
  border-radius: 50px;
  border: none;
  background: linear-gradient(90deg, #00e5ff, #0070ff);
  color: #080808;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 229, 255, 0.6);
  }
`;

/* ---------- INPUT ---------- */

export const StyledInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 229, 255, 0.4);
  background: #080808;
  color: #fff;
  outline: none;
  margin-bottom: 10px;

  &:focus {
    box-shadow: 0 0 15px rgba(0, 229, 255, 0.6);
  }
`;