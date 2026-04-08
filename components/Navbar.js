"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/pyq-solver", label: "PYQ Solver" },
    { href: "/predictor", label: "Predictor" },
    { href: "/notes", label: "Notes" },
    { href: "/cgpa", label: "CGPA" },
  ];

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
        .nav-dev {
          font-size: 0.7rem; color: rgba(255,255,255,0.28);
          font-weight: 300; text-align: right;
        }
        .nav-right { display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
        .nav-cta {
          padding: 0.45rem 1.1rem;
          border: 1px solid rgba(0,229,255,0.35);
          border-radius: 100px; color: #00e5ff;
          font-size: 0.825rem; font-weight: 500;
          text-decoration: none; transition: all 0.2s; background: transparent;
        }
        .nav-cta:hover { background: rgba(0,229,255,0.08); border-color: #00e5ff; }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; }
        .hamburger span { display: block; width: 22px; height: 2px; background: rgba(255,255,255,0.7); border-radius: 2px; transition: all 0.2s; }
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
      `}</style>

      <nav className="nav">
        <Link href="/" className="nav-logo">makaut<span>.</span>helper</Link>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={path === l.href ? "active" : ""}>{l.label}</Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <button className="hamburger" onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
          <div className="desktop-only" style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
            <a href="#" className="nav-cta">Get Started</a>
            <span className="nav-dev">Developed by Abhigyan Chakraborty</span>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {links.map(l => (
          <Link key={l.href} href={l.href} className={path === l.href ? "active" : ""} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
