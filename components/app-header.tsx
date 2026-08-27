import Link from "next/link";

export function AppHeader() {
  return (
    <header className="app-topbar">
      <div className="app-topbar-inner">
        <Link href="/" className="brand-logo">
          <span className="brand-badge">V</span>
          <span className="brand-text">V-SHAPE</span>
        </Link>
        <div className="topbar-status">
          <span className="program-badge">4-DAY DB PROGRAM</span>
        </div>
      </div>
    </header>
  );
}
