"use client";
import { useEffect, useState } from "react";
import NotesGeneratorCard from "./NotesGenerator"; 
import ImportantQuestionsCard from "./ImportantQuestionsCard";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #080808;
    color: #f0f0f0;
    font-family: 'DM Sans', sans-serif;
    overflow-x: hidden;
  }

  .noise::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.4;
  }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes pulse-ring { 0% { transform: scale(0.95); opacity: 0.6; } 70% { transform: scale(1.1); opacity: 0; } 100% { transform: scale(0.95); opacity: 0; } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

  .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 1.25rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.06); background: rgba(8,8,8,0.8); backdrop-filter: blur(12px); }
  .logo { font-family: 'Syne', sans-serif; font-size: 1.2rem; font-weight: 800; letter-spacing: -0.02em; color: #fff; }
  .logo span { color: #00e5ff; }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 0.9rem; font-weight: 400; transition: color 0.2s; }
  .nav-links a:hover { color: #fff; }
  .nav-cta { padding: 0.5rem 1.25rem; border: 1px solid rgba(0,229,255,0.4); border-radius: 100px; color: #00e5ff; font-size: 0.875rem; font-weight: 500; text-decoration: none; transition: all 0.2s; background: transparent; }
  .nav-cta:hover { background: rgba(0,229,255,0.08); border-color: #00e5ff; }

  .hero { min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 8rem 2rem 4rem; position: relative; z-index: 1; }
  .hero-badge { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.35rem 1rem; border: 1px solid rgba(0,229,255,0.25); border-radius: 100px; font-size: 0.8rem; color: #00e5ff; margin-bottom: 2rem; animation: fadeUp 0.6s ease both; background: rgba(0,229,255,0.05); }
  .badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #00e5ff; position: relative; }
  .badge-dot::after { content: ''; position: absolute; inset: -3px; border-radius: 50%; border: 1px solid #00e5ff; animation: pulse-ring 2s ease infinite; }
  .hero-title { font-family: 'Syne', sans-serif; font-size: clamp(3rem, 8vw, 6rem); font-weight: 800; line-height: 1.0; letter-spacing: -0.03em; color: #fff; animation: fadeUp 0.6s ease 0.1s both; max-width: 900px; }
  .hero-title .accent { background: linear-gradient(90deg, #00e5ff, #0070ff, #00e5ff); background-size: 200% auto; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 4s linear infinite; }
  .hero-sub { margin-top: 1.5rem; font-size: 1.1rem; font-weight: 300; color: rgba(255,255,255,0.5); max-width: 520px; line-height: 1.7; animation: fadeUp 0.6s ease 0.2s both; }
  .hero-actions { margin-top: 2.5rem; display: flex; gap: 1rem; flex-wrap: wrap; justify-content: center; animation: fadeUp 0.6s ease 0.3s both; }
  .btn-primary { padding: 0.85rem 2rem; background: #00e5ff; color: #080808; border-radius: 100px; font-weight: 500; font-size: 0.95rem; text-decoration: none; transition: all 0.2s; border: none; cursor: pointer; }
  .btn-primary:hover { background: #33ecff; transform: translateY(-1px); }
  .btn-ghost { padding: 0.85rem 2rem; background: transparent; color: rgba(255,255,255,0.7); border-radius: 100px; font-weight: 400; font-size: 0.95rem; text-decoration: none; border: 1px solid rgba(255,255,255,0.15); transition: all 0.2s; }
  .btn-ghost:hover { border-color: rgba(255,255,255,0.35); color: #fff; }

  .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1.5rem; margin-top: 3rem; }
  .card { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 1.5rem; animation: fadeUp 0.6s ease both; text-align: center; }
  .card-icon { font-size: 2rem; margin-bottom: 0.75rem; }
  .card-title { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem; }
  .card-desc { font-weight: 300; font-size: 0.875rem; color: rgba(255,255,255,0.7); }

  .stats-row { display: flex; justify-content: center; gap: 4rem; padding: 4rem 2rem 2rem; }
  .stat { text-align: center; }
  .stat-num { font-size: 2.5rem; font-weight: 700; color: #00e5ff; }
  .stat-label { display: block; font-size: 0.9rem; color: rgba(255,255,255,0.7); }

  .cta-section { background: rgba(0,229,255,0.05); text-align: center; padding: 5rem 2rem; border-radius: 24px; margin: 3rem auto; max-width: 900px; }
  .cta-title { font-size: 2rem; font-weight: 800; margin-bottom: 1rem; }
  .cta-sub { font-size: 1rem; font-weight: 300; margin-bottom: 2rem; }

  footer { text-align: center; padding: 2rem 1rem; font-size: 0.875rem; color: rgba(255,255,255,0.5); }
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

        <section className="features" id="features">
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Everything you need to succeed</h2>
          <div className="cards-grid">
            {features.map((f,i)=>(
              <div className="card" key={i}>
                <div className="card-icon">{f.icon}</div>
                <h3 className="card-title">{f.title}</h3>
                <p className="card-desc">{f.desc}</p>
              </div>
            ))}
            <NotesGeneratorCard />
            <ImportantQuestionsCard />
          </div>
        </section>

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