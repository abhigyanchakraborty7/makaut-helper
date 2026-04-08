"use client";
import { useEffect, useState } from "react";
import NotesGeneratorCard from "./NotesGeneratorCard"; // Make sure path is correct

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #080808; color: #f0f0f0; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
  .noise::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; z-index: 0; opacity: 0.4;
  }
  /* Keyframes, nav, hero, cards, stats, cta, footer ... keep as before */
  /* (Omitted here for brevity, copy from your previous full styles) */
`;

export default function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let frame;
    const target = 1240;
    const duration = 1800;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.floor(t * t * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  const features = [
    { icon: "📄", title: "Previous Year Questions", desc: "Browse PYQs sorted by subject, semester & year. Never go in blind again." },
    { icon: "🧮", title: "CGPA Calculator", desc: "Calculate your CGPA instantly with our smart, MAKAUT-specific grading calculator." },
    { icon: "💡", title: "Smart Suggestions", desc: "AI-powered topic suggestions based on exam trends and syllabus weightage." },
    { icon: "🤖", title: "AI Exam Assistant", desc: "Ask anything about your syllabus and get instant, accurate answers." },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="noise">
        <div className="glow-orb orb1" />
        <div className="glow-orb orb2" />

        {/* Nav */}
        <nav className="nav">
          <div className="logo">makaut<span>.</span>helper</div>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#pyq">PYQs</a></li>
            <li><a href="#cgpa">CGPA</a></li>
          </ul>
          <div style={{display:"flex", flexDirection:"column", alignItems:"flex-end", gap:"2px"}}>
            <a href="#" className="nav-cta">Get Started</a>
            <span style={{fontSize:"0.7rem", color:"rgba(255,255,255,0.3)", fontWeight:300}}>
              Developed by Abhigyan Chakraborty
            </span>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero">
          <div className="hero-badge">
            <span className="badge-dot" />
            Your AI-Powered MAKAUT Companion
          </div>
          <h1 className="hero-title">
            Ace Your Exams<br />
            <span className="accent">Smarter, Faster.</span>
          </h1>
          <p className="hero-sub">
            PYQs, CGPA calculator, AI suggestions — everything a MAKAUT student needs, in one place.
          </p>
          <div className="hero-actions">
            <a href="#features" className="btn-primary">Explore Features</a>
            <a href="#" className="btn-ghost">View PYQs →</a>
          </div>
        </section>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat">
            <span className="stat-num">{count.toLocaleString()}<span>+</span></span>
            <span className="stat-label">PYQs Available</span>
          </div>
          <div className="stat">
            <span className="stat-num">40<span>+</span></span>
            <span className="stat-label">Subjects Covered</span>
          </div>
          <div className="stat">
            <span className="stat-num">5<span>k+</span></span>
            <span className="stat-label">Students Helped</span>
          </div>
        </div>

        {/* Features */}
        <section className="features" id="features">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Everything you need to succeed</h2>
          <div className="cards-grid">
            {features.map((f, i) => (
              <div className="card" key={i}>
                <div className="card-icon">{f.icon}</div>
                <h3 className="card-title">{f.title}</h3>
                <p className="card-desc">{f.desc}</p>
              </div>
            ))}
            {/* Notes Generator Card */}
            <NotesGeneratorCard />
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2 className="cta-title">Ready to study smarter?</h2>
          <p className="cta-sub">Join thousands of MAKAUT students already using the platform.</p>
          <a href="#" className="btn-primary">Start for Free</a>
        </section>

        <footer>
          © {new Date().getFullYear()} MAKAUT Helper · Built for students, by students
        </footer>
      </div>
    </>
  );
}