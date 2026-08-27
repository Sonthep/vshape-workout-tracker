import React from "react";

type IconProps = {
  className?: string;
  style?: React.CSSProperties;
};

export function DumbbellIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6.5 6.5 11 11" />
      <path d="m21 21-1-1a2 2 0 0 0-2.83 0l-1.34 1.34a2 2 0 0 1-2.83 0l-4.5-4.5a2 2 0 0 1 0-2.83l1.34-1.34a2 2 0 0 0 0-2.83L9.5 8.5" />
      <path d="m3 3 1 1a2 2 0 0 0 2.83 0l1.34-1.34a2 2 0 0 1 2.83 0l4.5 4.5a2 2 0 0 1 0 2.83l-1.34 1.34a2 2 0 0 0 0 2.83l1.34 1.34" />
      <path d="m18 15 3 3" />
      <path d="m6 9-3-3" />
    </svg>
  );
}

export function FireIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

export function CalendarIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

export function HistoryIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}

export function ChartIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3v18h18" />
      <path d="m19 9-5 5-4-4-3 3" />
    </svg>
  );
}

export function CameraIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}

export function CheckCircleIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export function ChevronRightIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function PlayIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function TimerIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="10" x2="14" y1="2" y2="2" />
      <line x1="12" x2="15" y1="14" y2="11" />
      <circle cx="12" cy="14" r="8" />
    </svg>
  );
}

export function TrophyIcon({ className = "w-5 h-5", style }: IconProps) {
  return (
    <svg style={style} className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.45 1-1 1H7v4h10v-4h-2c-.55 0-1-.45-1-1v-2.34" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

export function MuscleTagIcon({ name }: { name: string }) {
  const lower = name.toLowerCase();
  if (lower.includes("lat") || lower.includes("back")) {
    return <span className="muscle-emoji" aria-hidden="true">🦅</span>;
  }
  if (lower.includes("delt") || lower.includes("shoulder")) {
    return <span className="muscle-emoji" aria-hidden="true">⚡</span>;
  }
  if (lower.includes("chest")) {
    return <span className="muscle-emoji" aria-hidden="true">🛡️</span>;
  }
  if (lower.includes("arm") || lower.includes("bicep") || lower.includes("tricep") || lower.includes("curl")) {
    return <span className="muscle-emoji" aria-hidden="true">💪</span>;
  }
  if (lower.includes("leg") || lower.includes("squat") || lower.includes("lunge") || lower.includes("glute")) {
    return <span className="muscle-emoji" aria-hidden="true">🦵</span>;
  }
  if (lower.includes("core") || lower.includes("abs") || lower.includes("crunch") || lower.includes("plank")) {
    return <span className="muscle-emoji" aria-hidden="true">🔥</span>;
  }
  return <span className="muscle-emoji" aria-hidden="true">🎯</span>;
}
