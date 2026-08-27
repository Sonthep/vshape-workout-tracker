import React from "react";

type IllustrationProps = {
  exerciseId: string;
  className?: string;
};

export function ExerciseIllustration({ exerciseId, className = "w-full h-64" }: IllustrationProps) {
  return (
    <div className="blueprint-diagram-container">
      {renderExerciseSvg(exerciseId, className)}
    </div>
  );
}

function GridPattern() {
  return (
    <defs>
      <pattern id="diag-grid" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" />
      </pattern>
      <linearGradient id="lime-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00f084" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>
      <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
      <marker id="arrowhead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#00f084" />
      </marker>
      <marker id="arrowhead-gold" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#fbbf24" />
      </marker>
      <marker id="arrowhead-blue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
      </marker>
    </defs>
  );
}

function renderExerciseSvg(exerciseId: string, className: string) {
  switch (exerciseId) {
    /* --------------------------------------------------------------------------
       1. ONE-ARM DUMBBELL LAT ROW
       -------------------------------------------------------------------------- */
    case "one-arm-lat-row":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">ONE-ARM DUMBBELL LAT ROW</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START / STRETCH</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <rect x="25" y="125" width="80" height="8" rx="2" fill="#1e293b" />
            <line x1="35" y1="133" x2="35" y2="165" stroke="#334155" strokeWidth="3" />
            <line x1="95" y1="133" x2="95" y2="165" stroke="#334155" strokeWidth="3" />
            <circle cx="45" cy="55" r="10" fill="#475569" />
            <path d="M52 62 L90 85 L125 140 L135 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M45 88 L45 125" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <path d="M78 78 L78 135" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="68" y="135" width="20" height="9" rx="2" fill="#cbd5e1" />
            <text x="110" y="75" fill="#fbbf24" fontSize="8.5" fontWeight="700">หลังขนานพื้น 45°</text>
          </g>

          <g transform="translate(255, 110)">
            <path d="M -5 30 Q 15 -10 35 10" stroke="url(#lime-grad)" strokeWidth="3.5" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="6 3" />
            <text x="15" y="-18" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ดึงเข้าหาเอว</text>
            <text x="15" y="45" fill="#94a3b8" fontSize="8" textAnchor="middle">ARC PATH</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PEAK CONTRACTION</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <rect x="25" y="125" width="80" height="8" rx="2" fill="#1e293b" />
            <circle cx="45" cy="55" r="10" fill="#94a3b8" />
            <path d="M52 62 L90 85 L125 140 L135 165" stroke="#cbd5e1" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M72 72 Q88 80 96 95" stroke="#00f084" strokeWidth="9" strokeLinecap="round" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="110" y="80" fill="#00f084" fontSize="9" fontWeight="800">LATISSIMUS ⚡</text>
            <path d="M45 88 L45 125" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
            <path d="M78 78 L105 60 L98 96" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="88" y="96" width="20" height="9" rx="2" fill="#00f084" />
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ล็อคกระดูกสันหลังตรง • ดึงศอกวิถีโค้งเข้าหาสะโพก • บีบปีกค้าง 1 วิ • ไม่หมุนเปิดไหล่</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       2. DUMBBELL FLOOR PULLOVER
       -------------------------------------------------------------------------- */
    case "floor-pullover":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL FLOOR PULLOVER</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START OVER CHEST</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 เริ่มต้น</text>
            <circle cx="65" cy="140" r="9" fill="#475569" />
            <path d="M74 142 L150 142 L170 115 L185 142" stroke="#64748b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M105 142 L105 85" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <rect x="96" y="75" width="18" height="10" rx="2" fill="#cbd5e1" />
            <text x="112" y="60" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ดัมเบลตรงเหนือหน้าอก</text>
          </g>

          <g transform="translate(255, 95)">
            <path d="M 35 25 Q 15 -10 -5 10" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">หย่อนข้ามหัว</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. OVERHEAD LATS STRETCH</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="65" cy="140" r="9" fill="#94a3b8" />
            <path d="M74 142 L150 142 L170 115 L185 142" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            {/* Lats Stretch Glow */}
            <path d="M95 140 Q80 130 65 130" stroke="#00f084" strokeWidth="9" strokeLinecap="round" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="112" y="45" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">LATS & SERRATUS ⚡</text>
            {/* Arms reached back */}
            <path d="M105 142 L45 142" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="35" y="137" width="10" height="18" rx="2" fill="#00f084" />
            <text x="112" y="105" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">หย่อนแขนลงใกล้พื้น ยืดปีกสุด</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">หลังล่างแนบพื้น • งอข้อศอกคงที่ 15° • ใช้แรงปีกดึงดัมเบลกลับขึ้นมาสู่แนวอก</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       3. PUSH-UP
       -------------------------------------------------------------------------- */
    case "push-up":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">PUSH-UP (BODYWEIGHT CHEST)</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. HIGH PLANK</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 เตรียมตัว</text>
            <circle cx="55" cy="85" r="9" fill="#475569" />
            <path d="M62 90 L180 135" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <path d="M72 95 L72 145" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <rect x="20" y="145" width="185" height="6" rx="2" fill="#1e293b" />
            <text x="112" y="65" fill="#fbbf24" fontSize="8.5" fontWeight="700" textAnchor="middle">ล็อคลำตัวเป็นเส้นตรง</text>
          </g>

          <g transform="translate(255, 95)">
            <path d="M -5 0 L 35 20" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ยุบอกลง 45°</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. BOTTOM CHEST DEPTH</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออกดันขึ้น</text>
            <circle cx="55" cy="125" r="9" fill="#94a3b8" />
            <path d="M62 130 L180 140" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            {/* Chest Glow */}
            <circle cx="75" cy="130" r="7" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="112" y="45" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">CHEST & CORE 🛡️</text>
            <path d="M72 130 L60 145" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="20" y="145" width="185" height="6" rx="2" fill="#1e293b" />
            <text x="112" y="105" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">อกเกือบแตะพื้น ศอกทำมุม 45°</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ล็อคลำตัวตรงตั้งแต่หัวถึงส้นเท้า • กางศอก 45° ไม่กาง 90° • ดันพื้นเต็มฝ่ามือ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       4. DUMBBELL FLOOR PRESS
       -------------------------------------------------------------------------- */
    case "floor-press":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL FLOOR PRESS</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. ELBOWS ON FLOOR</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="45" cy="140" r="9" fill="#475569" />
            <path d="M54 142 L130 142 L150 115 L165 142" stroke="#64748b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M85 142 L85 118" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <rect x="76" y="110" width="18" height="9" rx="2" fill="#cbd5e1" />
            <text x="110" y="85" fill="#fbbf24" fontSize="8.5" fontWeight="700">ศอกกาง 45° จากลำตัว</text>
          </g>

          <g transform="translate(255, 95)">
            <path d="M -5 30 L 35 -5" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5 2" />
            <text x="15" y="-14" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ดันตรงขึ้น</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. CHEST CONTRACTION</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="45" cy="140" r="9" fill="#94a3b8" />
            <path d="M54 142 L130 142 L150 115 L165 142" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="85" cy="138" r="9" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="102" y="125" fill="#00f084" fontSize="9" fontWeight="800">PECTORALIS 🛡️</text>
            <path d="M85 142 L85 80" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="76" y="70" width="18" height="9" rx="2" fill="#00f084" />
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">กดสะบักติดพื้น • ศอกทำมุม 45° (ไม่กาง 90°) • ดันดัมเบลขึ้นบีบยอดอกเข้าหากัน</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       5. GOBLET SQUAT
       -------------------------------------------------------------------------- */
    case "goblet-squat":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">GOBLET SQUAT</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. STANDING / BRACE</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="45" r="9" fill="#475569" />
            <path d="M112 55 L112 115" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <rect x="106" y="62" width="12" height="16" rx="3" fill="#cbd5e1" />
            <path d="M106 115 L98 165 M118 115 L126 165" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ยืนกว้างเท่าช่วงหัวไหล่</text>
          </g>

          <g transform="translate(255, 105)">
            <path d="M -5 -5 L 35 25" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5 2" />
            <text x="15" y="-14" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ย่อสะโพกลง</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PARALLEL DEPTH</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="70" r="9" fill="#94a3b8" />
            <path d="M112 80 L112 125" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <rect x="106" y="85" width="12" height="16" rx="3" fill="#00f084" />
            <path d="M106 125 L75 130 L85 165 M118 125 L145 130 L135 165" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="80" cy="130" r="6" fill="#00f084" filter="drop-shadow(0 0 6px #00f084)" />
            <circle cx="140" cy="130" r="6" fill="#00f084" filter="drop-shadow(0 0 6px #00f084)" />
            <text x="112" y="55" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">QUADS & GLUTES 🦵</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">อกเชิด หลังตรง • เข่าชี้ตามทิศทางปลายเท้า • ลงให้ต้นขาขนานพื้น • ถ่ายน้ำหนักลงเต็มฝ่าเท้า</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       6. FOREARM PLANK
       -------------------------------------------------------------------------- */
    case "plank":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">FOREARM PLANK (CORE)</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. ALIGNMENT SETUP</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจสม่ำเสมอ</text>
            <rect x="20" y="145" width="185" height="6" rx="2" fill="#1e293b" />
            <circle cx="50" cy="100" r="9" fill="#475569" />
            <path d="M58 108 L180 135" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <path d="M68 112 L58 145 L80 145" stroke="#475569" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="112" y="80" fill="#fbbf24" fontSize="8.5" fontWeight="700" textAnchor="middle">ล็อคกระดูกสันหลังเป็นเส้นตรง</text>
          </g>

          <g transform="translate(255, 105)">
            <path d="M -5 0 L 35 0" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-14" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">เกร็งบีบแกนกลาง</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PEAK TENSION</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 ขมิบเกร็งแน่น</text>
            <rect x="20" y="145" width="185" height="6" rx="2" fill="#1e293b" />
            <circle cx="50" cy="100" r="9" fill="#94a3b8" />
            <path d="M58 108 L180 135" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <path d="M90 115 L145 127" stroke="#00f084" strokeWidth="11" strokeLinecap="round" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="118" y="90" fill="#00f084" fontSize="9.5" fontWeight="800" textAnchor="middle">TRANSVERSE ABDOMINIS 🔥</text>
            <path d="M68 112 L58 145 L80 145" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ไม่แอ่นหลังล่าง • ดึงสะดือเข้าหากระดูกสันหลัง • ขมิบก้นและเกร็งต้นขาเพื่อเพิ่มความมั่นคง</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       7. DUMBBELL LATERAL RAISE
       -------------------------------------------------------------------------- */
    case "lateral-raise":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL LATERAL RAISE</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START (ข้างต้นขา)</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="48" r="10" fill="#475569" />
            <path d="M112 60 L112 120" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <path d="M98 65 L88 120 M126 65 L136 120" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <circle cx="88" cy="122" r="5" fill="#cbd5e1" />
            <circle cx="136" cy="122" r="5" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">งอข้อศอกเล็กน้อย 10-15°</text>
          </g>

          <g transform="translate(255, 105)">
            <path d="M -8 20 Q 15 -15 38 -5" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5 2" />
            <text x="15" y="-22" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">กางแนว Scapular</text>
            <text x="15" y="38" fill="#fbbf24" fontSize="8" textAnchor="middle">30° ไปข้างหน้า</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PEAK AT SHOULDER</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="48" r="10" fill="#94a3b8" />
            <circle cx="95" cy="62" r="7" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)" />
            <circle cx="129" cy="62" r="7" fill="#fbbf24" filter="drop-shadow(0 0 6px #fbbf24)" />
            <text x="112" y="35" fill="#fbbf24" fontSize="9" fontWeight="800" textAnchor="middle">SIDE DELTS ⚡</text>
            <path d="M112 60 L112 120" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <path d="M95 62 L45 70 M129 62 L179 70" stroke="#00f084" strokeWidth="6" strokeLinecap="round" />
            <rect x="35" y="65" width="12" height="10" rx="2" fill="#00f084" />
            <rect x="177" y="65" width="12" height="10" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">ศอกระดับเสมอหัวไหล่ (ไม่ยกสูงเกิน)</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ยกนำด้วยข้อศอก • เอียงแขนไปข้างหน้า 30° เล็กน้อย • ไม่ยักคอ/สะบัดตัว • ควบคุมจังหวะลงช้าๆ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       8. BENT-OVER TWO-ARM DUMBBELL ROW
       -------------------------------------------------------------------------- */
    case "db-bent-over-row":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">BENT-OVER TWO-ARM DUMBBELL ROW</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. HINGE & EXTEND</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="65" cy="55" r="9" fill="#475569" />
            <path d="M72 62 L110 82 L135 135 L145 165" stroke="#64748b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M98 75 L98 135" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="88" y="135" width="20" height="9" rx="2" fill="#cbd5e1" />
            <text x="120" y="65" fill="#fbbf24" fontSize="8.5" fontWeight="700">พับสะโพก 45°</text>
          </g>

          <g transform="translate(255, 105)">
            <path d="M -5 25 Q 15 -10 35 15" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="5 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">บีบสะบักหลัง</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. UPPER BACK SQUEEZE</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="65" cy="55" r="9" fill="#94a3b8" />
            <path d="M72 62 L110 82 L135 135 L145 165" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M85 70 Q105 78 115 85" stroke="#00f084" strokeWidth="9" strokeLinecap="round" filter="drop-shadow(0 0 6px #00f084)" />
            <text x="110" y="60" fill="#00f084" fontSize="9" fontWeight="800">UPPER BACK & LATS 🔥</text>
            <path d="M98 75 L125 58 L118 95" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="108" y="95" width="20" height="9" rx="2" fill="#00f084" />
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">เกร็งหน้าท้องล็อคหลังตรง • ดึงศอกนำขึ้นด้านบน • บีบกระดูกสะบักเข้าหากันแน่นๆ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       9. BENT-OVER REAR DELT FLY & REVERSE FLY
       -------------------------------------------------------------------------- */
    case "rear-delt-fly":
    case "reverse-fly":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#fbbf24" fontSize="10" fontWeight="800" textAnchor="end">BENT-OVER REAR DELT FLY</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="105" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START (ดัมเบลใต้ห้วงอก)</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="70" cy="55" r="9" fill="#475569" />
            <path d="M78 62 L115 82 L135 135 L145 165" stroke="#64748b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M102 75 L102 135" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="92" y="135" width="20" height="9" rx="2" fill="#cbd5e1" />
            <text x="120" y="65" fill="#fbbf24" fontSize="8.5" fontWeight="700">ลำตัวขนานพื้น 45-60°</text>
          </g>

          <g transform="translate(255, 105)">
            <path d="M -5 30 Q 15 -10 35 10" stroke="url(#gold-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-gold)" strokeDasharray="5 2" />
            <text x="15" y="-16" fill="#fbbf24" fontSize="9" fontWeight="800" textAnchor="middle">กางออกด้านข้าง</text>
            <text x="15" y="42" fill="#94a3b8" fontSize="8" textAnchor="middle">FLY (WINGS PATH)</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(251, 191, 36, 0.04)" stroke="rgba(251, 191, 36, 0.3)" />
            <rect x="10" y="10" width="125" height="18" rx="4" fill="rgba(251, 191, 36, 0.15)" />
            <text x="16" y="23" fill="#fbbf24" fontSize="9.5" fontWeight="800">2. PEAK FLY (กางปีกสุด)</text>
            <text x="165" y="23" fill="#fbbf24" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="70" cy="55" r="9" fill="#94a3b8" />
            <path d="M78 62 L115 82 L135 135 L145 165" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="95" cy="68" r="7" fill="#fbbf24" filter="drop-shadow(0 0 8px #fbbf24)" />
            <text x="108" y="58" fill="#fbbf24" fontSize="9" fontWeight="800">POSTERIOR DELTOID ⚡</text>
            <path d="M98 75 L60 88 M98 75 L145 88" stroke="#00f084" strokeWidth="6" strokeLinecap="round" />
            <rect x="48" y="84" width="14" height="9" rx="2" fill="#00f084" />
            <rect x="143" y="84" width="14" height="9" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#38bdf8" fontSize="8.5" fontWeight="700" textAnchor="middle">กางแขนแนวระดับไหล่ งอศอกคงที่</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#fbbf24" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">กางแขนออกด้านข้างเหมือนปีกนก (Fly) • ห้ามดึงศอกพับเข้าตัวแบบท่า Row • ล็อคข้อศอกงอคงที่</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       10. REAR DELT ROW (90° FLARED ELBOW)
       -------------------------------------------------------------------------- */
    case "rear-delt-row":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#fbbf24" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL REAR-DELT ROW</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START / HINGE</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="65" cy="55" r="9" fill="#475569" />
            <path d="M72 62 L110 82 L135 135 L145 165" stroke="#64748b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M98 75 L98 135" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="88" y="135" width="20" height="9" rx="2" fill="#cbd5e1" />
            <text x="120" y="65" fill="#fbbf24" fontSize="8.5" fontWeight="700">ลำตัว 45-60°</text>
          </g>

          <g transform="translate(255, 105)">
            <path d="M -5 25 Q 15 -10 35 15" stroke="url(#gold-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-gold)" strokeDasharray="5 2" />
            <text x="15" y="-16" fill="#fbbf24" fontSize="9" fontWeight="800" textAnchor="middle">กางศอก 90° ดึงขึ้น</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(251, 191, 36, 0.04)" stroke="rgba(251, 191, 36, 0.3)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(251, 191, 36, 0.15)" />
            <text x="16" y="23" fill="#fbbf24" fontSize="9.5" fontWeight="800">2. REAR DELT ROW</text>
            <text x="165" y="23" fill="#fbbf24" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="65" cy="55" r="9" fill="#94a3b8" />
            <path d="M72 62 L110 82 L135 135 L145 165" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="95" cy="65" r="7" fill="#fbbf24" filter="drop-shadow(0 0 8px #fbbf24)" />
            <text x="110" y="58" fill="#fbbf24" fontSize="9" fontWeight="800">REAR DELT 90° ⚡</text>
            <path d="M98 75 L125 50 L115 85" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="105" y="85" width="20" height="9" rx="2" fill="#fbbf24" />
            <text x="112" y="145" fill="#38bdf8" fontSize="8.5" fontWeight="700" textAnchor="middle">กางศอกออก 90° ดึงหาระดับอก</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#fbbf24" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">กางข้อศอกออก 90° ตั้งฉากกับลำตัว • ดึงเข้าหาระดับอกบน • บีบหัวไหล่หลังและสะบักบน</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       11. DUMBBELL SHRUG
       -------------------------------------------------------------------------- */
    case "shrug":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#fbbf24" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL SHRUG (TRAPEZIUS)</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START (ไหล่ผ่อน)</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="48" r="10" fill="#475569" />
            <path d="M112 60 L112 120" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <path d="M96 68 L92 125 M128 68 L132 125" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="84" y="125" width="16" height="8" rx="2" fill="#cbd5e1" />
            <rect x="124" y="125" width="16" height="8" rx="2" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">แขนเหยียดตรงข้างลำตัว</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 20 L 35 -10" stroke="url(#gold-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead-gold)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#fbbf24" fontSize="9" fontWeight="800" textAnchor="middle">ยกไหล่ขึ้นตรงๆ</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(251, 191, 36, 0.04)" stroke="rgba(251, 191, 36, 0.3)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(251, 191, 36, 0.15)" />
            <text x="16" y="23" fill="#fbbf24" fontSize="9.5" fontWeight="800">2. PEAK ELEVATION</text>
            <text x="165" y="23" fill="#fbbf24" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="48" r="10" fill="#94a3b8" />
            <path d="M96 52 Q112 45 128 52" stroke="#fbbf24" strokeWidth="8" strokeLinecap="round" filter="drop-shadow(0 0 8px #fbbf24)" />
            <text x="112" y="35" fill="#fbbf24" fontSize="9" fontWeight="800" textAnchor="middle">UPPER TRAPS ⚡</text>
            <path d="M112 55 L112 120" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <path d="M96 56 L92 115 M128 56 L132 115" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <rect x="84" y="115" width="16" height="8" rx="2" fill="#00f084" />
            <rect x="124" y="115" width="16" height="8" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">บีบเกร็งหนอกค้างไว้ 1-2 วินาที</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#fbbf24" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ยกหัวไหล่ขึ้นตรงๆ เข้าหาใบหู • ห้ามหมุนหัวไหล่เป็นวงกลม (ป้องกันการบาดเจ็บ) • บีบค้าง 1 วิ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       12. DUMBBELL CURL
       -------------------------------------------------------------------------- */
    case "db-curl":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL BICEPS CURL</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. ARMS EXTENDED</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="48" r="10" fill="#475569" />
            <path d="M112 60 L112 120" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <path d="M102 65 L96 125 M122 65 L128 125" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="88" y="125" width="16" height="8" rx="2" fill="#cbd5e1" />
            <rect x="120" y="125" width="16" height="8" rx="2" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ศอกแนบชิดลำตัว</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 20 Q 15 -10 35 5" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">พับศอก+หงายมือ</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PEAK BICEP SQUEEZE</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="48" r="10" fill="#94a3b8" />
            <circle cx="98" cy="80" r="7" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <circle cx="126" cy="80" r="7" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="112" y="35" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">BICEPS BRACHII 💪</text>
            <path d="M112 60 L112 120" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <path d="M102 65 L96 95 L108 70 M122 65 L128 95 L116 70" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="100" y="65" width="16" height="8" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">หงายฝ่ามือขึ้น (Supination)</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ล็อคข้อศอกให้อยู่ข้างลำตัว • หงายฝ่ามือขึ้น (Supination) ตอนยก • บีบกล้ามแขน 1 วิ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       13. HAMMER CURL
       -------------------------------------------------------------------------- */
    case "hammer-curl":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL HAMMER CURL</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="105" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. NEUTRAL GRIP</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="48" r="10" fill="#475569" />
            <path d="M112 60 L112 120" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <path d="M102 65 L96 125 M122 65 L128 125" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="92" y="120" width="8" height="16" rx="2" fill="#cbd5e1" />
            <rect x="124" y="120" width="8" height="16" rx="2" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ฝ่ามือหันเข้าหากัน</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 20 L 35 -5" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ยกแนวค้อน</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PEAK CONTRACTION</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="48" r="10" fill="#94a3b8" />
            <circle cx="96" cy="90" r="6" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
            <circle cx="128" cy="90" r="6" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)" />
            <text x="112" y="35" fill="#38bdf8" fontSize="9" fontWeight="800" textAnchor="middle">BRACHIALIS & FOREARMS ⚡</text>
            <path d="M112 60 L112 120" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <path d="M102 65 L96 95 L108 70 M122 65 L128 95 L116 70" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="104" y="65" width="8" height="16" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">ล็อคข้อมือตรง ไม่หงายข้อมือ</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">หันฝ่ามือเข้าหากันตลอดการเคลื่อนไหว (Neutral Grip) • ล็อคศอกนิ่ง • สร้างความหนาให้แขนท่อนบนและท่อนแขน</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       14. OVERHEAD TRICEPS EXTENSION
       -------------------------------------------------------------------------- */
    case "overhead-triceps-extension":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">OVERHEAD TRICEPS EXTENSION</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="105" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. DEEP STRETCH</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="55" r="9" fill="#475569" />
            <path d="M112 65 L112 120" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <path d="M112 65 L112 35 L102 55" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="94" y="52" width="16" height="12" rx="2" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">หย่อนดัมเบลหลังศีรษะ</text>
          </g>

          <g transform="translate(255, 95)">
            <path d="M -5 25 L 35 -10" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ดันตรงขึ้น</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. FULL LOCKOUT</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="65" r="9" fill="#94a3b8" />
            <circle cx="112" cy="45" r="6" fill="#00f084" filter="drop-shadow(0 0 6px #00f084)" />
            <text x="112" y="22" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">TRICEPS LONG HEAD ⚡</text>
            <path d="M112 75 L112 120" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <path d="M112 75 L112 25" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="104" y="15" width="16" height="12" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">เหยียดแขนตรงสุดเหนือหัว</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ล็อคข้อศอกชี้ไปข้างหน้า • ยืดหลังแขนให้ลึกที่สุด • เกร็งหน้าท้องไม่แอ่นหลัง</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       15. STANDING SHOULDER PRESS
       -------------------------------------------------------------------------- */
    case "standing-shoulder-press":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">STANDING SHOULDER PRESS</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. RACK POSITION</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="48" r="10" fill="#475569" />
            <path d="M112 60 L112 120" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
            <path d="M96 68 L88 78 M128 68 L136 78" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <rect x="78" y="72" width="16" height="8" rx="2" fill="#cbd5e1" />
            <rect x="130" y="72" width="16" height="8" rx="2" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ดัมเบลระดับหัวไหล่</text>
          </g>

          <g transform="translate(255, 95)">
            <path d="M -5 25 L 35 -10" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ดันขึ้นตรง</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. OVERHEAD LOCKOUT</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="55" r="10" fill="#94a3b8" />
            <circle cx="95" cy="65" r="6" fill="#00f084" filter="drop-shadow(0 0 6px #00f084)" />
            <circle cx="129" cy="65" r="6" fill="#00f084" filter="drop-shadow(0 0 6px #00f084)" />
            <text x="112" y="30" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">DELTOIDS ⚡</text>
            <path d="M112 65 L112 120" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M104 120 L96 165 M120 120 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
            <path d="M96 68 L98 25 M128 68 L126 25" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="90" y="18" width="16" height="8" rx="2" fill="#00f084" />
            <rect x="120" y="18" width="16" height="8" rx="2" fill="#00f084" />
            <text x="112" y="145" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">ดันสุดแขน เกร็งแกนกลาง</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ล็อคแกนกลางลำตัวไม่แอ่นหลัง • ดันดัมเบลขึ้นตรงในระนาบสะบัก • คุมจังหวะลงช้าๆ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       16. DUMBBELL ROMANIAN DEADLIFT
       -------------------------------------------------------------------------- */
    case "db-rdl":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL ROMANIAN DEADLIFT</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. STANDING TALL</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="45" r="9" fill="#475569" />
            <path d="M112 55 L112 115" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M106 115 L106 165 M118 115 L118 165" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <path d="M112 70 L112 120" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="104" y="120" width="16" height="8" rx="2" fill="#cbd5e1" />
            <text x="112" y="145" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ดัมเบลอยู่หน้าต้นขา</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 -5 Q 15 25 35 10" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ดันก้นไปข้างหลัง</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. HAMSTRINGS STRETCH</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="65" cy="65" r="9" fill="#94a3b8" />
            <path d="M72 70 L115 85 L125 135 L130 165" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M120 95 L125 135" stroke="#00f084" strokeWidth="9" strokeLinecap="round" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="135" y="115" fill="#00f084" fontSize="9" fontWeight="800">HAMSTRINGS 🎯</text>
            <path d="M95 80 L105 130" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
            <rect x="98" y="130" width="16" height="8" rx="2" fill="#00f084" />
            <text x="112" y="150" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">ดัมเบลเลียบชิดหน้าขา</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">พับสะโพกไปข้างหลัง (Hip Hinge) • ดัมเบลชิดหน้าขาตลอดเวลา • ห้ามโก่งหลังงอเด็ดขาด</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       17. REVERSE LUNGE
       -------------------------------------------------------------------------- */
    case "reverse-lunge":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL REVERSE LUNGE</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. STANDING SETUP</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้าตอนถอย</text>
            <circle cx="112" cy="45" r="9" fill="#475569" />
            <path d="M112 55 L112 115" stroke="#64748b" strokeWidth="10" strokeLinecap="round" />
            <path d="M106 115 L106 165 M118 115 L118 165" stroke="#475569" strokeWidth="8" strokeLinecap="round" />
            <path d="M104 65 L104 115 M120 65 L120 115" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
            <rect x="98" y="115" width="12" height="8" rx="2" fill="#cbd5e1" />
            <rect x="114" y="115" width="12" height="8" rx="2" fill="#cbd5e1" />
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 0 L 35 20" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ก้าวถอยหลัง 90°</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. 90/90 LUNGE DEPTH</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออกตอนดันขึ้น</text>
            <circle cx="105" cy="65" r="9" fill="#94a3b8" />
            <path d="M105 75 L105 125" stroke="#cbd5e1" strokeWidth="10" strokeLinecap="round" />
            <path d="M105 125 L125 125 L125 165 M105 125 L75 140 L75 165" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="120" cy="125" r="6" fill="#00f084" filter="drop-shadow(0 0 6px #00f084)" />
            <text x="112" y="45" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">QUADS & GLUTES 🦵</text>
            <text x="112" y="150" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">เข่าทั้งสองข้างทำมุม 90°</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ก้าวถอยหลัง ลำตัวตั้งตรง • เข่าหน้าทำมุม 90° ไม่เลยปลายเท้า • ออกแรงถีบจากส้นเท้าหน้า</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       18. REVERSE CRUNCH
       -------------------------------------------------------------------------- */
    case "reverse-crunch":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">REVERSE CRUNCH (LOWER ABS)</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. SUPINE ON MAT</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <rect x="15" y="145" width="195" height="6" rx="2" fill="#1e293b" />
            <circle cx="45" cy="140" r="9" fill="#475569" />
            <path d="M54 142 L130 142 L170 142" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <text x="112" y="120" fill="#94a3b8" fontSize="8.5" textAnchor="middle">หลังล่างแนบติดพื้น</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 20 Q 15 -10 35 5" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ม้วนเชิงกรานขึ้น</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PELVIS ROLL-UP</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <rect x="15" y="145" width="195" height="6" rx="2" fill="#1e293b" />
            <circle cx="45" cy="140" r="9" fill="#94a3b8" />
            <path d="M54 142 L115 142 L110 100 L140 75" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="105" cy="130" r="8" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="112" y="55" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">LOWER RECTUS ABDOMINIS 🔥</text>
            <text x="112" y="130" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">ยกสะโพกลอย 2-3 นิ้ว</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ม้วนเชิงกรานเข้าหาอก ไม่ใช่เตะขา • ยกสะโพกลอยจากพื้นเล็กน้อย • คุมจังหวะลงช้าๆ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       19. LYING LEG RAISE
       -------------------------------------------------------------------------- */
    case "leg-raise":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">LYING LEG RAISE (LOWER ABS)</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. LEGS OFF MAT</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้าตอนหย่อน</text>
            <rect x="15" y="145" width="195" height="6" rx="2" fill="#1e293b" />
            <circle cx="45" cy="140" r="9" fill="#475569" />
            <path d="M54 142 L115 142 L185 138" stroke="#64748b" strokeWidth="8" strokeLinecap="round" />
            <text x="112" y="115" fill="#fbbf24" fontSize="8.5" fontWeight="700" textAnchor="middle">หลังล่างแนบพื้น ขาลอย 2 นิ้ว</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 25 Q 15 -10 35 -15" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-22" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ยกขาขึ้น 80-90°</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. VERTICAL LEG RAISE</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออกตอนยก</text>
            <rect x="15" y="145" width="195" height="6" rx="2" fill="#1e293b" />
            <circle cx="45" cy="140" r="9" fill="#94a3b8" />
            <path d="M54 142 L115 142 L115 75" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" />
            <circle cx="105" cy="130" r="8" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="112" y="45" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">LOWER RECTUS ABDOMINIS 🔥</text>
            <text x="112" y="130" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">เกร็งหน้าท้องล่างเต็มที่</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">หลังล่างต้องแนบติดพื้นตลอดเวลา • ยกขาด้วยแรงหน้าท้อง ไม่เหวี่ยงขา • ผ่อนขาลงช้าๆ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       20. DUMBBELL CRUNCH
       -------------------------------------------------------------------------- */
    case "db-crunch":
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">DUMBBELL CRUNCH (UPPER ABS)</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <rect x="10" y="10" width="90" height="18" rx="4" fill="rgba(255,255,255,0.06)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START ON MAT</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <rect x="15" y="145" width="195" height="6" rx="2" fill="#1e293b" />
            <circle cx="45" cy="140" r="9" fill="#475569" />
            <path d="M54 142 L130 142 L150 115 L165 142" stroke="#64748b" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="75" y="125" width="14" height="10" rx="2" fill="#cbd5e1" />
            <text x="112" y="100" fill="#94a3b8" fontSize="8.5" textAnchor="middle">ดัมเบลทาบบนหน้าอก</text>
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 20 Q 15 -10 35 5" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-16" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ม้วนตัว 30-45°</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <rect x="10" y="10" width="115" height="18" rx="4" fill="rgba(0, 240, 132, 0.15)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. UPPER ABS CRUNCH</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <rect x="15" y="145" width="195" height="6" rx="2" fill="#1e293b" />
            <circle cx="55" cy="115" r="9" fill="#94a3b8" />
            <path d="M62 120 L105 142 L130 115 L145 142" stroke="#cbd5e1" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="85" cy="130" r="8" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <text x="112" y="55" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">UPPER ABDOMINALS 🔥</text>
            <rect x="75" y="110" width="14" height="10" rx="2" fill="#00f084" />
            <text x="112" y="90" fill="#00f084" fontSize="8.5" fontWeight="700" textAnchor="middle">สะบักลอยจากพื้น 30°</text>
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">ม้วนซี่โครงเข้าหาเชิงกราน • ไม่ใช่การลุกนั่งทั้งตัว (Sit-up) • บีบเกร็งหน้าท้องบนค้าง 1 วิ</text>
          </g>
        </svg>
      );

    /* --------------------------------------------------------------------------
       DEFAULT / FALLBACK
       -------------------------------------------------------------------------- */
    default:
      return (
        <svg viewBox="0 0 540 280" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="540" height="280" rx="16" fill="#090e1a" />
          <GridPattern />
          <rect width="540" height="280" fill="url(#diag-grid)" rx="16" />
          <line x1="20" y1="230" x2="520" y2="230" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4" />
          <text x="30" y="25" fill="#38bdf8" fontSize="10" fontWeight="800" letterSpacing="1">BIOMECHANICAL MOTION BLUEPRINT</text>
          <text x="510" y="25" fill="#00f084" fontSize="10" fontWeight="800" textAnchor="end">EXERCISE MOTION FLOW</text>

          <g transform="translate(30, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" />
            <text x="16" y="23" fill="#cbd5e1" fontSize="9.5" fontWeight="800">1. START / ALIGNMENT</text>
            <text x="165" y="23" fill="#38bdf8" fontSize="9" fontWeight="700">🫁 หายใจเข้า</text>
            <circle cx="112" cy="65" r="9" fill="#475569" />
            <path d="M112 75 L112 125" stroke="#64748b" strokeWidth="9" strokeLinecap="round" />
            <path d="M104 125 L96 165 M120 125 L128 165" stroke="#475569" strokeWidth="7" strokeLinecap="round" />
          </g>

          <g transform="translate(255, 100)">
            <path d="M -5 10 L 35 10" stroke="url(#lime-grad)" strokeWidth="3" fill="none" markerEnd="url(#arrowhead)" strokeDasharray="4 2" />
            <text x="15" y="-14" fill="#00f084" fontSize="9" fontWeight="800" textAnchor="middle">ออกแรงสม่ำเสมอ</text>
          </g>

          <g transform="translate(285, 40)">
            <rect x="0" y="0" width="225" height="175" rx="10" fill="rgba(0, 240, 132, 0.03)" stroke="rgba(0, 240, 132, 0.25)" />
            <text x="16" y="23" fill="#00f084" fontSize="9.5" fontWeight="800">2. PEAK CONTRACTION</text>
            <text x="165" y="23" fill="#00f084" fontSize="9" fontWeight="700">💨 หายใจออก</text>
            <circle cx="112" cy="65" r="9" fill="#94a3b8" />
            <path d="M112 75 L112 125" stroke="#cbd5e1" strokeWidth="9" strokeLinecap="round" />
            <circle cx="112" cy="85" r="8" fill="#00f084" filter="drop-shadow(0 0 8px #00f084)" />
            <path d="M104 125 L96 165 M120 125 L128 165" stroke="#64748b" strokeWidth="7" strokeLinecap="round" />
          </g>

          <g transform="translate(30, 235)">
            <rect x="0" y="0" width="480" height="34" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" />
            <text x="18" y="21" fill="#00f084" fontSize="9.5" fontWeight="800">✓ จุดโฟกัสฟอร์ม:</text>
            <text x="110" y="21" fill="#d1d5db" fontSize="9">จัดแนวกระดูกสันหลังให้มั่นคง • ควบคุมจังหวะขึ้น-ลงไม่ใช้แรงเหวี่ยง • หายใจอย่างถูกวิธี</text>
          </g>
        </svg>
      );
  }
}
