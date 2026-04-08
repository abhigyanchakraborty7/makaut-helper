"use client";

import styled from "styled-components";

export default function Modal({ children, onClose }) {
  return (
    <Overlay onClick={onClose}>
      <Box onClick={(e) => e.stopPropagation()}>
        <Close onClick={onClose}>×</Close>
        {children}
      </Box>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top:0; left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.6);
  display:flex;
  justify-content:center;
  align-items:center;
`;

const Box = styled.div`
  background:#0f172a;
  padding:20px;
  border-radius:12px;
  width:90%;
  max-width:500px;
`;

const Close = styled.button`
  position:absolute;
  right:15px;
  top:10px;
  background:none;
  border:none;
  color:white;
  font-size:20px;
  cursor:pointer;
`;