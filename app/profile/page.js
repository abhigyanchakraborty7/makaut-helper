"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import { supabase } from "@/lib/supabaseClient";

const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .page { min-height: 100vh; padding: 7rem 1.5rem 4rem; max-width: 700px; margin: 0 auto; }
  .page-title {
    font-family: var(--font-syne), sans-serif;
    font-size: clamp(1.75rem, 4vw, 2.5rem); font-weight: 800;
    color: #fff; letter-spacing: -0.03em; margin-bottom: 0.4rem;
  }
  .page-title span { color: #00e5ff; }
  .page-sub { color: rgba(255,255,255,0.4); font-size: 0.9rem; font-weight: 300; margin-bottom: 2.5rem; }

  /* Profile Card */
  .profile-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px; padding: 2rem;
    display: flex; align-items: center; gap: 1.75rem;
    margin-bottom: 1.25rem; position: relative; overflow: hidden;
  }
  .profile-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #00e5ff, #0070ff);
  }
  .avatar-circle {
    width: 80px; height: 80px; border-radius: 50%; flex-shrink: 0;
    border: 2px solid rgba(0,229,255,0.4);
    background: rgba(0,229,255,0.12);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.75rem; font-weight: 800; color: #00e5ff;
    overflow: hidden;
  }
  .avatar-circle img { width: 100%; height: 100%; object-fit: cover; }
  .profile-info { flex: 1; min-width: 0; }
  .profile-name {
    font-family: var(--font-syne), sans-serif;
    font-size: 1.35rem; font-weight: 800; color: #fff;
    letter-spacing: -0.02em; margin-bottom: 0.25rem;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .profile-email {
    font-size: 0.85rem; color: rgba(255,255,255,0.4);
    margin-bottom: 0.75rem;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
  }
  .profile-badge {
    display: inline-flex; align-items: center; gap: 0.4rem;
    padding: 0.25rem 0.75rem;
    background: rgba(0,229,255,0.08); border: 1px solid rgba(0,229,255,0.2);
    border-radius: 100px; font-size: 0.72rem; color: #00e5ff;
  }
  .badge-dot { width: 5px; height: 5px; border-radius: 50%; background: #00e5ff; }

  /* Info Grid */
  .info-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1rem; margin-bottom: 1.25rem;
  }
  .info-tile {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px; padding: 1.25rem;
  }
  .info-tile-label {
    font-size: 0.72rem; color: rgba(255,255,255,0.3);
    text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.4rem;
  }
  .info-tile-value { font-size: 0.95rem; color: #fff; font-weight: 500; }

  /* Sign out */
  .signout-btn {
    width: 100%; padding: 0.8rem;
    background: rgba(255,60,60,0.07);
    border: 1px solid rgba(255,60,60,0.2);
    border-radius: 12px; color: #ff6b6b;
    font-size: 0.875rem; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    font-family: var(--font-dm), sans-serif;
  }
  .signout-btn:hover { background: rgba(255,60,60,0.12); border-color: rgba(255,60,60,0.35); }

  /* Loading */
  .loading { text-align: center; color: rgba(255,255,255,0.3); padding: 4rem 0; font-size: 0.9rem; }

  @media (max-width: 480px) {
    .profile-card { flex-direction: column; text-align: center; }
    .profile-email { white-space: normal; }
    .info-grid { grid-template-columns: 1fr; }
  }
`;

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric"
  });
}

function getInitials(user) {
  const name = user.user_metadata?.full_name || user.email || "";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/?login=required");
      } else {
        setUser(session.user);
        setLoading(false);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const provider = user?.app_metadata?.provider;
  const providerLabel = provider === "google" ? "Google" : provider === "email" ? "Email" : provider || "—";

  return (
    <>
      <style>{css}</style>
      <Navbar />
      <div className="page">
        <h1 className="page-title">My <span>Profile</span></h1>
        <p className="page-sub">Your account details and information.</p>

        {loading ? (
          <p className="loading">Loading your profile…</p>
        ) : user ? (
          <>
            {/* Profile Card */}
            <div className="profile-card">
              <div className="avatar-circle">
                {user.user_metadata?.avatar_url
                  ? <img src={user.user_metadata.avatar_url} alt="avatar" referrerPolicy="no-referrer" />
                  : getInitials(user)
                }
              </div>
              <div className="profile-info">
                <div className="profile-name">{user.user_metadata?.full_name || "Student"}</div>
                <div className="profile-email">{user.email}</div>
                <span className="profile-badge">
                  <span className="badge-dot" />
                  Active Student
                </span>
              </div>
            </div>

            {/* Info Tiles */}
            <div className="info-grid">
              <div className="info-tile">
                <div className="info-tile-label">Joined On</div>
                <div className="info-tile-value">{formatDate(user.created_at)}</div>
              </div>
              <div className="info-tile">
                <div className="info-tile-label">Signed In Via</div>
                <div className="info-tile-value">{providerLabel}</div>
              </div>
              <div className="info-tile">
                <div className="info-tile-label">Last Sign In</div>
                <div className="info-tile-value">{formatDate(user.last_sign_in_at)}</div>
              </div>
              <div className="info-tile">
                <div className="info-tile-label">User ID</div>
                <div className="info-tile-value" style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.4)", wordBreak: "break-all" }}>
                  {user.id?.slice(0, 18)}…
                </div>
              </div>
            </div>

            <button className="signout-btn" onClick={handleSignOut}>
              🚪 Sign out of your account
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}