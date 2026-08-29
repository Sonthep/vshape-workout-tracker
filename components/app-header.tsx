import Link from "next/link";

export function AppHeader() {
  return (
    <header className="app-topbar">
      <div className="app-topbar-inner">
        <Link href="/" className="brand-logo">
          <span className="brand-badge" aria-hidden="true">V</span>
          <span className="brand-lockup">
            <span className="brand-text">V/SHAPE</span>
            <span className="brand-subtitle">WORKOUT CLUB</span>
          </span>
        </Link>
        <div className="topbar-status">
          <span className="status-dot" aria-hidden="true" />
          <span className="program-badge">DUMBBELL ONLY</span>
        </div>
      </div>
    </header>
  );
}
