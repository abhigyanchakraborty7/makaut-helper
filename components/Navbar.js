"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

const PROTECTED = ["/notes", "/predictor"];

export default function Navbar({ openLogin }) {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("login") === "required") setShowLogin(true);
    if (openLogin) setShowLogin(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [openLogin]);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDropdownOpen(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    setLoading(false);
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      setMessage(error ? error.message : "Check your email to confirm signup!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
      else { setShowLogin(false); setMessage(""); }
    }
    setLoading(false);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/pyq-solver", label: "PYQ Solver" },
    { href: "/predictor", label: "Predictor" },
    { href: "/notes", label: "Notes" },
    { href: "/cgpa", label: "CGPA" },
  ];

  const getInitials = (user) => {
    const name = user.user_metadata?.full_name || user.email || "";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatar = (user) => user.user_metadata?.avatar_url || null;

  const renderLink = (l, closeMobile = false) => {
    const isProtected = PROTECTED.includes(l.href) && !user;
    const className = path === l.href ? "active" : "";
    if (isProtected) {
      return (
        <a key={l.href} href="#" className={className}
          onClick={(e) => { e.preventDefault(); if (closeMobile) setOpen(false); setShowLogin(true); }}>
          {l.label}
        </a>
      );
    }
    return (
      <Link key={l.href} href={l.href} className={className}
        onClick={() => { if (closeMobile) setOpen(false); }}>
        {l.label}
      </Link>
    );
  };

  return (
    <>
      <style>{`
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          padding: 1.1rem 2rem;
          display: flex; justify-content: space-between; align-items: center;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(8,8,8,0.85);
          backdrop-filter: blur(14px);
        }
        .nav-logo {
          font-family: var(--font-syne), sans-serif;
          font-size: 1.15rem; font-weight: 800;
          letter-spacing: -0.02em; color: #fff; text-decoration: none;
        }
        .nav-logo span { color: #00e5ff; }
        .nav-links { display: flex; gap: 1.75rem; list-style: none; margin: 0; padding: 0; }
        .nav-links a {
          color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 0.875rem; font-weight: 400; transition: color 0.2s;
        }
        .nav-links a:hover, .nav-links a.active { color: #fff; }
        .nav-links a.active { color: #00e5ff; }
        .nav-dev { font-size: 0.7rem; color: rgba(255,255,255,0.28); font-weight: 300; text-align: right; }
        .nav-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
        .nav-cta {
          padding: 0.45rem 1.1rem;
          border: 1px solid rgba(0,229,255,0.35);
          border-radius: 100px; color: #00e5ff;
          font-size: 0.825rem; font-weight: 500;
          text-decoration: none; transition: all 0.2s; background: transparent; cursor: pointer;
        }
        .nav-cta:hover { background: rgba(0,229,255,0.08); border-color: #00e5ff; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.7); border-radius: 2px; }
        .mobile-menu {
          display: none; position: fixed; top: 60px; left: 0; right: 0; z-index: 99;
          background: rgba(8,8,8,0.97); border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1.5rem 2rem; flex-direction: column; gap: 1.25rem;
        }
        .mobile-menu.open { display: flex; }
        .mobile-menu a { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 1rem; }
        .mobile-menu a.active { color: #00e5ff; }
        @media (max-width: 680px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
        .avatar-wrap { position: relative; }
        .avatar-btn {
          width: 34px; height: 34px; border-radius: 50%;
          border: 2px solid rgba(0,229,255,0.4);
          cursor: pointer; overflow: hidden;
          background: rgba(0,229,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #00e5ff;
          transition: border-color 0.2s; padding: 0;
        }
        .avatar-btn:hover { border-color: #00e5ff; }
        .avatar-btn img { width: 100%; height: 100%; object-fit: cover; }
        .avatar-dropdown {
          position: absolute; top: calc(100% + 10px); right: 0;
          background: #111; border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; padding: 0.5rem;
          min-width: 210px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.5);
          animation: slideUp 0.15s ease;
        }
        .dropdown-user {
          padding: 0.6rem 0.75rem 0.75rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 0.4rem;
        }
        .dropdown-name { font-size: 0.875rem; font-weight: 600; color: #fff; }
        .dropdown-email { font-size: 0.72rem; color: rgba(255,255,255,0.35); margin-top: 2px; word-break: break-all; }
        .dropdown-btn {
          width: 100%; padding: 0.5rem 0.75rem;
          background: none; border: none;
          color: rgba(255,255,255,0.6); font-size: 0.825rem;
          text-align: left; cursor: pointer; border-radius: 8px;
          transition: all 0.15s; display: flex; align-items: center; gap: 0.5rem;
        }
        .dropdown-btn:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .dropdown-btn.logout { color: #ff6b6b; }
        .dropdown-btn.logout:hover { background: rgba(255,107,107,0.08); }
        .mobile-user-row {
          display: flex; align-items: center; gap: 0.75rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .mobile-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          border: 2px solid rgba(0,229,255,0.4); overflow: hidden;
          background: rgba(0,229,255,0.15);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: #00e5ff; flex-shrink: 0;
        }
        .mobile-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .mobile-user-name { font-size: 0.875rem; color: #fff; font-weight: 600; }
        .mobile-user-email { font-size: 0.72rem; color: rgba(255,255,255,0.35); }
        .mobile-profile-btn {
          background: none; border: none; color: rgba(255,255,255,0.6);
          font-size: 0.9rem; text-align: left; cursor: pointer; padding: 0;
          font-family: inherit;
        }
        .mobile-profile-btn:hover { color: #00e5ff; }
        .modal-overlay {
          position: fixed; inset: 0; z-index: 200;
          background: rgba(0,0,0,0.75); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .modal {
          background: #0e0e0e; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 2rem;
          width: 100%; max-width: 380px; position: relative;
          animation: slideUp 0.25s ease; box-shadow: 0 24px 80px rgba(0,0,0,0.6);
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .modal-close {
          position: absolute; top: 1rem; right: 1rem;
          background: none; border: none; color: rgba(255,255,255,0.35);
          font-size: 1.25rem; cursor: pointer; line-height: 1; transition: color 0.2s;
        }
        .modal-close:hover { color: #fff; }
        .modal-title { font-size: 1.2rem; font-weight: 700; color: #fff; margin: 0 0 0.25rem 0; }
        .modal-sub { font-size: 0.8rem; color: rgba(255,255,255,0.35); margin: 0 0 1.5rem 0; }
        .btn-google {
          width: 100%; padding: 0.65rem 1rem;
          display: flex; align-items: center; justify-content: center; gap: 0.6rem;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: #fff; font-size: 0.875rem; font-weight: 500;
          cursor: pointer; transition: all 0.2s;
        }
        .btn-google:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.2); }
        .divider { display: flex; align-items: center; gap: 0.75rem; margin: 1.25rem 0; }
        .divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.07); }
        .divider-text { font-size: 0.7rem; color: rgba(255,255,255,0.25); }
        .auth-form { display: flex; flex-direction: column; gap: 0.75rem; }
        .auth-input {
          width: 100%; padding: 0.65rem 0.9rem;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; color: #fff; font-size: 0.875rem; outline: none;
          transition: border-color 0.2s; box-sizing: border-box;
        }
        .auth-input::placeholder { color: rgba(255,255,255,0.25); }
        .auth-input:focus { border-color: rgba(0,229,255,0.4); }
        .btn-submit {
          width: 100%; padding: 0.65rem; background: #00e5ff; color: #000;
          border: none; border-radius: 8px; font-size: 0.875rem; font-weight: 600;
          cursor: pointer; transition: opacity 0.2s;
        }
        .btn-submit:hover { opacity: 0.88; }
        .btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
        .auth-message { font-size: 0.78rem; color: #00e5ff; text-align: center; }
        .auth-message.error { color: #ff6b6b; }
        .auth-toggle { text-align: center; font-size: 0.78rem; color: rgba(255,255,255,0.3); margin-top: 0.5rem; }
        .auth-toggle button { background: none; border: none; color: #00e5ff; cursor: pointer; font-size: 0.78rem; padding: 0; }
      `}</style>

      <nav className="nav">
        <Link href="/" className="nav-logo">makaut<span>.</span>helper</Link>
        <ul className="nav-links">
          {links.map(l => <li key={l.href}>{renderLink(l)}</li>)}
        </ul>
        <div className="nav-right">
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "4px" }}>
            {user ? (
              <div className="avatar-wrap" ref={dropdownRef}>
                <button className="avatar-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  {getAvatar(user)
                    ? <img src={getAvatar(user)} alt="avatar" referrerPolicy="no-referrer" />
                    : getInitials(user)
                  }
                </button>
                {dropdownOpen && (
                  <div className="avatar-dropdown">
                    <div className="dropdown-user">
                      <div className="dropdown-name">{user.user_metadata?.full_name || "User"}</div>
                      <div className="dropdown-email">{user.email}</div>
                    </div>
                    <button className="dropdown-btn" onClick={() => { router.push("/profile"); setDropdownOpen(false); }}>
                      👤 My Profile
                    </button>
                    <button className="dropdown-btn logout" onClick={handleLogout}>
                      🚪 Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="nav-cta" onClick={() => setShowLogin(true)}>Login</button>
            )}
            <span className="nav-dev">Developed by Abhigyan Chakraborty</span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {user && (
          <div className="mobile-user-row">
            <div className="mobile-avatar">
              {getAvatar(user)
                ? <img src={getAvatar(user)} alt="avatar" referrerPolicy="no-referrer" />
                : getInitials(user)
              }
            </div>
            <div>
              <div className="mobile-user-name">{user.user_metadata?.full_name || "User"}</div>
              <div className="mobile-user-email">{user.email}</div>
            </div>
          </div>
        )}
        {links.map(l => renderLink(l, true))}
        {user && (
          <button className="mobile-profile-btn" onClick={() => { setOpen(false); router.push("/profile"); }}>
            👤 My Profile
          </button>
        )}
        {user ? (
          <button className="nav-cta" style={{ width: "fit-content", color: "#ff6b6b", borderColor: "rgba(255,107,107,0.35)" }} onClick={handleLogout}>
            Sign out
          </button>
        ) : (
          <button className="nav-cta" style={{ width: "fit-content" }} onClick={() => { setOpen(false); setShowLogin(true); }}>
            Login
          </button>
        )}
      </div>

      {showLogin && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}>
          <div className="modal">
            <button className="modal-close" onClick={() => setShowLogin(false)}>✕</button>
            <p className="modal-title">{isSignUp ? "Create account" : "Welcome back"}</p>
            <p className="modal-sub">{isSignUp ? "Sign up to get started" : "Sign in to your account"}</p>
            <button className="btn-google" onClick={handleGoogleLogin} disabled={loading}>
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.1 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.5 29.1 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5c10.5 0 19.5-7.6 19.5-19.5 0-1.4-.1-2.7-.4-4z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3 0 5.7 1.1 7.8 2.9l5.7-5.7C33.8 6.5 29.1 4.5 24 4.5c-7.7 0-14.3 4.4-17.7 10.2z"/>
                <path fill="#4CAF50" d="M24 45.5c5 0 9.6-1.9 13.1-5l-6-5.2C29.2 37 26.7 38 24 38c-5.2 0-9.6-2.9-11.2-7l-6.5 5C9.8 41.2 16.4 45.5 24 45.5z"/>
                <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.3 4-4.2 5.2l6 5.2C40.7 35.2 43.5 30 43.5 25c0-1.4-.1-2.7-.4-4z"/>
              </svg>
              Continue with Google
            </button>
            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or</span>
              <div className="divider-line" />
            </div>
            <form className="auth-form" onSubmit={handleEmailAuth}>
              <input className="auth-input" type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input className="auth-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button className="btn-submit" type="submit" disabled={loading}>
                {loading ? "Please wait…" : isSignUp ? "Sign Up" : "Sign In"}
              </button>
            </form>
            {message && (
              <p className={`auth-message ${message.toLowerCase().includes("error") || message.toLowerCase().includes("invalid") ? "error" : ""}`}>
                {message}
              </p>
            )}
            <p className="auth-toggle">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <button onClick={() => { setIsSignUp(!isSignUp); setMessage(""); }}>
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}