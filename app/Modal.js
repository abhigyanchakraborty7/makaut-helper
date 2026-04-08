"use client";
import { useState } from "react";

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      zIndex: 999,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "2rem"
    }}>
      <div style={{
        background: "#080808",
        padding: "2rem",
        borderRadius: "16px",
        maxWidth: "500px",
        width: "100%",
        boxShadow: "0 0 20px rgba(0,229,255,0.3)",
        position: "relative"
      }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "1rem", color: "#00e5ff" }}>
          {title}
        </h2>

        {/* Children will contain inputs/buttons */}
        {children}

        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}