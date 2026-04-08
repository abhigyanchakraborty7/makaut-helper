"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });
  };

  const handleEmailAuth = async () => {
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? error.message : "Check your email to confirm!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else window.location.href = "/";
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#080808", padding: "1.5rem"
    }}>
      <div style={{
        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "24px", padding: "2.5rem", width: "100%", maxWidth: "400px"
      }}>
        <h1 style={{ color: "#fff", fontSize: "1.8rem", fontWeight: "800", marginBottom: "0.5rem" }}>
          {isSignUp ? "Create Account" : "Welcome Back"}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: "2rem", fontSize: "0.9rem" }}>
          {isSignUp ? "Join MAKAUT Helper" : "Sign in to MAKAUT Helper"}
        </p>

        {/* Google Button */}
        <button onClick={handleGoogle} style={{
          width: "100%", padding: "0.85rem", borderRadius: "12px",
          background: "#fff", color: "#080808", border: "none",
          fontWeight: "600", fontSize: "0.95rem", cursor: "pointer",
          marginBottom: "1.5rem", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "0.5rem"
        }}>
          <img src="https://www.google.com/favicon.ico" width="18" height="18" />
          Continue with Google
        </button>

        <div style={{ textAlign: "center", color: "rgba(255,255,255,0.2)", marginBottom: "1.5rem" }}>
          or
        </div>

        {/* Email Input */}
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)}
          style={{
            width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: "0.9rem", marginBottom: "0.75rem",
            outline: "none", boxSizing: "border-box"
          }}
        />

        {/* Password Input */}
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            width: "100%", padding: "0.75rem 1rem", borderRadius: "10px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#fff", fontSize: "0.9rem", marginBottom: "1rem",
            outline: "none", boxSizing: "border-box"
          }}
        />

        {message && (
          <p style={{ color: "#00e5ff", fontSize: "0.85rem", marginBottom: "1rem" }}>
            {message}
          </p>
        )}

        {/* Submit Button */}
        <button onClick={handleEmailAuth} disabled={loading} style={{
          width: "100%", padding: "0.85rem", borderRadius: "12px",
          background: "#00e5ff", color: "#080808", border: "none",
          fontWeight: "600", fontSize: "0.95rem", cursor: "pointer",
          marginBottom: "1rem", opacity: loading ? 0.5 : 1
        }}>
          {loading ? "Please wait..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        {/* Toggle */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", fontSize: "0.85rem" }}>
          {isSignUp ? "Already have an account? " : "Don't have an account? "}
          <span onClick={() => setIsSignUp(!isSignUp)}
            style={{ color: "#00e5ff", cursor: "pointer" }}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}