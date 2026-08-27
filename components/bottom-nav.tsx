"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CameraIcon, ChartIcon, DumbbellIcon, HistoryIcon } from "@/components/icons";

export function BottomNav() {
  const pathname = usePathname();

  // Don't show bottom nav on active session or login page to keep focus clean
  if (pathname.startsWith("/session/") || pathname === "/login") {
    return null;
  }

  const links = [
    { href: "/", label: "โปรแกรม", icon: DumbbellIcon, match: (p: string) => p === "/" || p.startsWith("/workout") },
    { href: "/history", label: "ประวัติ", icon: HistoryIcon, match: (p: string) => p.startsWith("/history") },
    { href: "/progress", label: "พัฒนาการ", icon: ChartIcon, match: (p: string) => p.startsWith("/progress") },
    { href: "/photos", label: "รูปภาพ", icon: CameraIcon, match: (p: string) => p.startsWith("/photos") },
  ];

  return (
    <nav className="bottom-nav" aria-label="Main Navigation">
      <div className="bottom-nav-inner">
        {links.map((item) => {
          const isActive = item.match(pathname);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`bottom-nav-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <div className="bottom-nav-icon-wrap">
                <Icon className="bottom-nav-icon" />
              </div>
              <span className="bottom-nav-label">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
