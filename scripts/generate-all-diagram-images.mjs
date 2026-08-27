import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const DIAGRAMS_DIR = path.resolve("public/diagrams");
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

// Check if we have pre-existing high-detail AI reference images in brain artifacts
const BRAIN_ARTIFACTS_DIR = "C:/Users/HP/.gemini/antigravity-ide/brain/631a0c09-7315-424e-9100-61b65f5112d8";
const PRE_RENDERED_MAP = {
  "db-bent-over-row": "db_bent_over_row_diagram_1787833018406.jpg",
  "lateral-raise": "lateral_raise_diagram_1787833001695.jpg",
  "one-arm-lat-row": "one_arm_lat_row_diagram_1787832976861.jpg",
  "floor-pullover": "floor_pullover_diagram_1787833218830.jpg",
  "floor-press": "floor_press_diagram_1787833234040.jpg",
  "goblet-squat": "goblet_squat_diagram_1787833260647.jpg",
};

// Copy available pre-rendered reference images first
for (const [id, filename] of Object.entries(PRE_RENDERED_MAP)) {
  const src = path.join(BRAIN_ARTIFACTS_DIR, filename);
  const dest = path.join(DIAGRAMS_DIR, `${id}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied high-detail reference image for ${id}`);
  }
}

// 21 exercises configuration for high-fidelity anatomical blueprint rendering
const EXERCISES = [
  {
    id: "rear-delt-fly",
    boxTitle: "Bent-Over Rear Delt Fly",
    tagEn: "POSTERIOR DELTOID (HIGHLIGHTED)",
    stance: "bent-fly",
    labels: [
      { x: 230, y: 140, text: "Latissimus Dorsi", sub: "(Stabilizer)" },
      { x: 170, y: 220, text: "Spinal Alignment 45°", sub: "Neutral Back" },
      { x: 740, y: 110, text: "Posterior Deltoid", sub: "(Highlighted Peak)" },
      { x: 770, y: 180, text: "Scapular Retraction", sub: "Rhomboids & Traps" },
      { x: 720, y: 270, text: "Elbows Locked 15°", sub: "Horizontal Fly (Wings)" }
    ],
    motionText: "Kinetic Trajectory (Fly Wings)",
    phase1Sub: "Phase 1: Starting Position (Under Chest)",
    phase2Sub: "Phase 2: Peak Horizontal Abduction"
  },
  {
    id: "reverse-fly",
    boxTitle: "Dumbbell Reverse Fly",
    tagEn: "POSTERIOR DELTOID (HIGHLIGHTED)",
    stance: "bent-fly",
    labels: [
      { x: 230, y: 140, text: "Latissimus Dorsi", sub: "(Stabilizer)" },
      { x: 170, y: 220, text: "Spinal Alignment 45°", sub: "Neutral Back" },
      { x: 740, y: 110, text: "Posterior Deltoid", sub: "(Highlighted Peak)" },
      { x: 770, y: 180, text: "Scapular Retraction", sub: "Rhomboids & Traps" },
      { x: 720, y: 270, text: "Elbows Locked 15°", sub: "Horizontal Fly (Wings)" }
    ],
    motionText: "Kinetic Trajectory (Fly Wings)",
    phase1Sub: "Phase 1: Starting Position",
    phase2Sub: "Phase 2: Peak Abduction"
  },
  {
    id: "rear-delt-row",
    boxTitle: "Dumbbell Rear-Delt Row",
    tagEn: "POSTERIOR DELTOID & UPPER TRAPS",
    stance: "bent-row-flared",
    labels: [
      { x: 230, y: 140, text: "Upper Trapezius", sub: "Secondary Mover" },
      { x: 170, y: 220, text: "Spinal Alignment 45°", sub: "Neutral Core" },
      { x: 740, y: 110, text: "Rear Deltoid 90°", sub: "(Highlighted Peak)" },
      { x: 770, y: 180, text: "Scapular Retraction", sub: "Rhomboids" },
      { x: 720, y: 270, text: "Elbow Flared 90°", sub: "Upper Chest Pull" }
    ],
    motionText: "Kinetic 90° Flared Row Trajectory",
    phase1Sub: "Phase 1: Starting Position",
    phase2Sub: "Phase 2: 90° Flared Row Peak"
  },
  {
    id: "shrug",
    boxTitle: "Standing Dumbbell Shrug",
    tagEn: "UPPER TRAPEZIUS (HIGHLIGHTED)",
    stance: "standing-shrug",
    labels: [
      { x: 230, y: 130, text: "Upper Trapezius", sub: "(Relaxed Hang)" },
      { x: 170, y: 230, text: "Erect Spine Alignment", sub: "Arms Straight" },
      { x: 740, y: 100, text: "Upper Trapezius", sub: "(Peak Elevation)" },
      { x: 770, y: 170, text: "Direct Vertical Drive", sub: "Straight to Ears" },
      { x: 720, y: 260, text: "No Shoulder Rolling", sub: "1-2s Peak Squeeze" }
    ],
    motionText: "Vertical Elevation Vector",
    phase1Sub: "Phase 1: Relaxed Starting Hang",
    phase2Sub: "Phase 2: Full Traps Elevation"
  },
  {
    id: "push-up",
    boxTitle: "Push-Up (Bodyweight)",
    tagEn: "CHEST & CORE STABILIZERS",
    stance: "push-up",
    labels: [
      { x: 230, y: 130, text: "High Plank Position", sub: "Straight Rigid Line" },
      { x: 170, y: 230, text: "Hands Under Shoulders", sub: "Core Braced" },
      { x: 740, y: 110, text: "Pectoralis Major", sub: "(Bottom Depth Peak)" },
      { x: 770, y: 180, text: "Core Stabilizers", sub: "Anti-Extension Brace" },
      { x: 720, y: 270, text: "Elbows at 45°", sub: "1-2 Inches Off Floor" }
    ],
    motionText: "Controlled 45° Descent Arc",
    phase1Sub: "Phase 1: High Plank Setup",
    phase2Sub: "Phase 2: Bottom Chest Depth"
  },
  {
    id: "db-curl",
    boxTitle: "Standing Dumbbell Curl",
    tagEn: "BICEPS BRACHII (HIGHLIGHTED)",
    stance: "standing-curl",
    labels: [
      { x: 230, y: 140, text: "Biceps Brachii", sub: "(Full Stretch Hang)" },
      { x: 170, y: 230, text: "Elbows Pinned to Ribs", sub: "No Body Swing" },
      { x: 740, y: 100, text: "Biceps Brachii", sub: "(Peak Supination)" },
      { x: 770, y: 170, text: "Wrist Supination", sub: "Palms Facing Up" },
      { x: 720, y: 260, text: "Brachialis & Forearms", sub: "Secondary Tension" }
    ],
    motionText: "Supination Kinetic Arc",
    phase1Sub: "Phase 1: Extended Arm Start",
    phase2Sub: "Phase 2: Peak Supination"
  },
  {
    id: "hammer-curl",
    boxTitle: "Dumbbell Hammer Curl",
    tagEn: "BRACHIALIS & FOREARMS",
    stance: "standing-hammer",
    labels: [
      { x: 230, y: 140, text: "Brachioradialis", sub: "Neutral Grip Setup" },
      { x: 170, y: 230, text: "Elbows Pinned to Ribs", sub: "Strict Form" },
      { x: 740, y: 100, text: "Brachialis (Outer Arm)", sub: "(Peak Contraction)" },
      { x: 770, y: 170, text: "Forearm Extensors", sub: "Neutral Wrist Lock" },
      { x: 720, y: 260, text: "Palms Facing Inwards", sub: "Continuous Neutral Grip" }
    ],
    motionText: "Neutral Vertical Arc",
    phase1Sub: "Phase 1: Neutral Hang",
    phase2Sub: "Phase 2: Peak Hammer Squeeze"
  },
  {
    id: "overhead-triceps-extension",
    boxTitle: "Overhead Triceps Extension",
    tagEn: "TRICEPS LONG HEAD (HIGHLIGHTED)",
    stance: "overhead-tri",
    labels: [
      { x: 230, y: 120, text: "Triceps Long Head", sub: "(Behind Head Stretch)" },
      { x: 170, y: 220, text: "Elbows Pointing Forward", sub: "Core Braced" },
      { x: 740, y: 90, text: "Triceps Long Head", sub: "(Overhead Lockout)" },
      { x: 770, y: 160, text: "Medial & Lateral Heads", sub: "Full Extension" },
      { x: 720, y: 250, text: "Neutral Spine", sub: "No Lumbar Arching" }
    ],
    motionText: "Vertical Overhead Extension",
    phase1Sub: "Phase 1: Deep Behind-Head Stretch",
    phase2Sub: "Phase 2: Full Overhead Lockout"
  },
  {
    id: "db-rdl",
    boxTitle: "Dumbbell Romanian Deadlift",
    tagEn: "HAMSTRINGS & POSTERIOR CHAIN",
    stance: "rdl",
    labels: [
      { x: 230, y: 130, text: "Standing Tall", sub: "Soft Knees (Unlocked)" },
      { x: 170, y: 230, text: "DB Against Thighs", sub: "Lats Engaged" },
      { x: 740, y: 110, text: "Hamstrings & Glutes", sub: "(Deep Stretch Peak)" },
      { x: 770, y: 180, text: "Erector Spinae", sub: "Flat Spine 45°" },
      { x: 720, y: 270, text: "DB Sliding Down Shins", sub: "Hips Pushed Directly Back" }
    ],
    motionText: "Hip Hinge Trajectory",
    phase1Sub: "Phase 1: Standing Tall Start",
    phase2Sub: "Phase 2: Hamstrings Deep Stretch"
  },
  {
    id: "reverse-lunge",
    boxTitle: "Dumbbell Reverse Lunge",
    tagEn: "QUADRICEPS & GLUTEUS (UNILATERAL)",
    stance: "lunge",
    labels: [
      { x: 230, y: 130, text: "Standing Setup", sub: "DBs at Sides" },
      { x: 170, y: 230, text: "Torso Upright", sub: "Core Braced" },
      { x: 740, y: 110, text: "Front Quad & Glute", sub: "(90/90 Stance Peak)" },
      { x: 770, y: 180, text: "Back Knee Hovering", sub: "1 Inch Off Floor" },
      { x: 720, y: 270, text: "Front Heel Drive", sub: "Vertical Return" }
    ],
    motionText: "Backward Step Kinetic Drive",
    phase1Sub: "Phase 1: Standing Setup",
    phase2Sub: "Phase 2: 90/90 Lunge Depth"
  },
  {
    id: "standing-shoulder-press",
    boxTitle: "Standing Dumbbell Shoulder Press",
    tagEn: "ANTERIOR & LATERAL DELTOIDS",
    stance: "standing-press",
    labels: [
      { x: 230, y: 130, text: "Rack Position", sub: "DBs at Shoulder Height" },
      { x: 170, y: 230, text: "Core & Glutes Braced", sub: "Neutral Pelvis" },
      { x: 740, y: 90, text: "Anterior/Lateral Delts", sub: "(Overhead Lockout)" },
      { x: 770, y: 160, text: "Triceps Brachii", sub: "Vertical Lockout" },
      { x: 720, y: 250, text: "Scapular Plane Path", sub: "No Lumbar Arching" }
    ],
    motionText: "Vertical Overhead Press Vector",
    phase1Sub: "Phase 1: Shoulder Rack Start",
    phase2Sub: "Phase 2: Overhead Lockout"
  },
  {
    id: "reverse-crunch",
    boxTitle: "Reverse Crunch",
    tagEn: "LOWER RECTUS ABDOMINIS",
    stance: "reverse-crunch",
    labels: [
      { x: 230, y: 140, text: "Supine Setup", sub: "Knees at 90°" },
      { x: 170, y: 230, text: "Lower Back Flat", sub: "Hands on Mat" },
      { x: 740, y: 100, text: "Lower Rectus Abdominis", sub: "(Posterior Tilt)" },
      { x: 770, y: 170, text: "Pelvis Roll-Up", sub: "Hips Lifted 2-3 Inches" },
      { x: 720, y: 260, text: "Controlled Tempo", sub: "No Leg Kicking / Momentum" }
    ],
    motionText: "Posterior Pelvic Tilt Roll-Up",
    phase1Sub: "Phase 1: Supine 90° Setup",
    phase2Sub: "Phase 2: Pelvis Roll-Up Peak"
  },
  {
    id: "plank",
    boxTitle: "Forearm Plank",
    tagEn: "TRANSVERSE ABDOMINIS & CORE",
    stance: "plank",
    labels: [
      { x: 230, y: 130, text: "Forearm Alignment", sub: "Elbows Under Shoulders" },
      { x: 170, y: 230, text: "Toes & Mat Contact", sub: "Neutral Spine" },
      { x: 740, y: 100, text: "Transverse Abdominis", sub: "(Anti-Extension Peak)" },
      { x: 770, y: 170, text: "Glute & Quad Squeeze", sub: "Maximum Core Tension" },
      { x: 720, y: 260, text: "Navel Pulled to Spine", sub: "Rigid Straight Line" }
    ],
    motionText: "Anti-Extension Isometric Brace",
    phase1Sub: "Phase 1: Setup Alignment",
    phase2Sub: "Phase 2: Peak Core Tension"
  },
  {
    id: "leg-raise",
    boxTitle: "Lying Leg Raise",
    tagEn: "LOWER RECTUS ABDOMINIS (V-CUT)",
    stance: "leg-raise",
    labels: [
      { x: 230, y: 140, text: "Legs Hovering 2\"", sub: "Lower Back Glued to Mat" },
      { x: 170, y: 230, text: "Hands at Sides", sub: "Inhale on Descent" },
      { x: 740, y: 100, text: "Lower Rectus Abdominis", sub: "(80-90° Lift Peak)" },
      { x: 770, y: 170, text: "Hip Flexors & Core", sub: "Exhale on Lift" },
      { x: 720, y: 260, text: "No Lumbar Arching", sub: "Pure Abdominal Control" }
    ],
    motionText: "Vertical Abdominal Lift",
    phase1Sub: "Phase 1: Legs Extended 2 Inches",
    phase2Sub: "Phase 2: Vertical 90° Lift"
  },
  {
    id: "db-crunch",
    boxTitle: "Dumbbell Crunch",
    tagEn: "UPPER RECTUS ABDOMINIS",
    stance: "db-crunch",
    labels: [
      { x: 230, y: 140, text: "Supine with DB", sub: "Held on Upper Chest" },
      { x: 170, y: 230, text: "Feet Flat on Mat", sub: "Knees Bent 90°" },
      { x: 740, y: 100, text: "Upper Rectus Abdominis", sub: "(30-45° Flexion Peak)" },
      { x: 770, y: 170, text: "Scapula Lifted", sub: "Ribs to Pelvis" },
      { x: 720, y: 260, text: "1s Peak Squeeze", sub: "Not a Full Sit-Up" }
    ],
    motionText: "Thoracic Flexion Arc",
    phase1Sub: "Phase 1: Mat Start",
    phase2Sub: "Phase 2: Upper Abs Crunch"
  }
];

function generateDetailedHtml(ex) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Outfit:wght@400;600;700;800;900&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1280px;
      height: 720px;
      background-color: #030712;
      color: #94a3b8;
      font-family: 'Outfit', sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 22px 36px;
    }

    /* Sci-Fi Blueprint Background Grid */
    .sci-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(0, 216, 255, 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 216, 255, 0.06) 1px, transparent 1px);
      background-size: 26px 26px;
      pointer-events: none;
    }
    .glow-cyan {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(0, 216, 255, 0.18) 0%, transparent 70%);
      pointer-events: none;
    }
    .glow-blue {
      position: absolute;
      bottom: -150px;
      left: 100px;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(0, 140, 255, 0.12) 0%, transparent 70%);
      pointer-events: none;
    }

    /* Top HUD Box */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
      z-index: 5;
    }
    .hud-title-box {
      border: 1px solid rgba(0, 216, 255, 0.4);
      border-left: 4px solid #00d8ff;
      background: rgba(6, 18, 34, 0.75);
      padding: 10px 24px;
      border-radius: 4px;
      box-shadow: 0 0 15px rgba(0, 216, 255, 0.1);
    }
    .hud-title-text {
      font-size: 26px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 0.5px;
    }
    .hud-subtitle {
      font-family: 'Share Tech Mono', monospace;
      font-size: 11.5px;
      color: #00d8ff;
      letter-spacing: 1.5px;
      margin-top: 2px;
    }

    /* Right Telemetry Widget */
    .hud-telemetry-box {
      border: 1px solid rgba(0, 216, 255, 0.35);
      background: rgba(5, 14, 26, 0.85);
      border-radius: 4px;
      padding: 8px 18px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px;
    }
    .tele-row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
    }
    .tele-label { color: #64748b; }
    .tele-val { color: #00f084; font-weight: bold; }
    .tele-cyan { color: #00d8ff; font-weight: bold; }

    /* Center Stage Area */
    .stage {
      flex: 1;
      position: relative;
      z-index: 5;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stage-svg {
      width: 100%;
      height: 500px;
    }

    /* Bottom Status Footer */
    .bottom-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(0, 216, 255, 0.25);
      padding-top: 10px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 12px;
      position: relative;
      z-index: 5;
    }
    .bottom-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .status-dot {
      width: 8px;
      height: 8px;
      background: #00f084;
      border-radius: 50%;
      box-shadow: 0 0 8px #00f084;
    }
    .tag-highlight {
      color: #00d8ff;
      background: rgba(0, 216, 255, 0.12);
      padding: 3px 10px;
      border-radius: 3px;
      border: 1px solid rgba(0, 216, 255, 0.35);
    }
  </style>
</head>
<body>
  <div class="sci-grid"></div>
  <div class="glow-cyan"></div>
  <div class="glow-blue"></div>

  <!-- Top HUD Bar -->
  <div class="top-bar">
    <div class="hud-title-box">
      <div class="hud-title-text">${ex.boxTitle}</div>
      <div class="hud-subtitle">BIOMECHANICAL MOTION BLUEPRINT // HUD-v2.4</div>
    </div>
    <div class="hud-telemetry-box">
      <div class="tele-row">
        <span class="tele-label">SYSTEM_MODE:</span>
        <span class="tele-val">ANATOMY_HUD</span>
      </div>
      <div class="tele-row">
        <span class="tele-label">TARGET_LOAD:</span>
        <span class="tele-cyan">${ex.tagEn}</span>
      </div>
      <div class="tele-row">
        <span class="tele-label">KINEMATICS:</span>
        <span class="tele-val">ACCURATE_ARC</span>
      </div>
    </div>
  </div>

  <!-- Main Stage with Rich Anatomical Muscular Athletes -->
  <div class="stage">
    <svg class="stage-svg" viewBox="0 0 1200 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neon-cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cyan-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00d8ff" stop-opacity="0.3" />
          <stop offset="60%" stop-color="#00d8ff" />
          <stop offset="100%" stop-color="#00f084" />
        </linearGradient>
      </defs>

      <!-- Stage Grid & Geometric Circles -->
      <circle cx="340" cy="240" r="160" stroke="rgba(0, 216, 255, 0.08)" stroke-width="1.5" stroke-dasharray="6 4" />
      <circle cx="860" cy="240" r="160" stroke="rgba(0, 216, 255, 0.12)" stroke-width="1.5" stroke-dasharray="6 4" />
      <line x1="80" y1="440" x2="1120" y2="440" stroke="rgba(0, 216, 255, 0.15)" stroke-width="1" stroke-dasharray="8 6" />

      <!-- Tech Stage Corner Brackets -->
      <!-- Left Stage Box (Phase 1) -->
      <path d="M 180 80 L 160 80 L 160 100 M 520 80 L 540 80 L 540 100 M 160 380 L 160 400 L 180 400 M 540 380 L 540 400 L 520 400" stroke="rgba(0, 216, 255, 0.35)" stroke-width="1.5" />
      <text x="350" y="65" fill="#64748b" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">${ex.phase1Sub}</text>
      
      <!-- Right Stage Box (Phase 2) -->
      <path d="M 700 80 L 680 80 L 680 100 M 1040 80 L 1060 80 L 1060 100 M 680 380 L 680 400 L 700 400 M 1060 380 L 1060 400 L 1040 400" stroke="rgba(0, 216, 255, 0.45)" stroke-width="1.5" />
      <text x="870" y="65" fill="#00d8ff" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">${ex.phase2Sub}</text>

      <!-- ================= PHASE 1 ATHLETE (Muscular Figure) ================= -->
      <g transform="translate(200, 70)">
        ${renderRichMuscularFigure(ex.stance, false)}
      </g>

      <!-- ================= CENTER KINETIC MOTION TRAJECTORY ARROW ================= -->
      <g transform="translate(420, 220)">
        <path d="M 50 80 Q 180 160 310 30" stroke="url(#cyan-arc-grad)" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
        <path d="M 310 30 L 290 28 M 310 30 L 305 48" stroke="#00f084" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <text x="180" y="160" fill="#00d8ff" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">${ex.motionText}</text>
      </g>

      <!-- ================= PHASE 2 ATHLETE (With Glowing Neon Muscles) ================= -->
      <g transform="translate(720, 70)">
        ${renderRichMuscularFigure(ex.stance, true)}
      </g>

      <!-- ================= TECHNICAL ANATOMY LABELS & POINTERS ================= -->
      ${renderLabels(ex.labels)}
    </svg>
  </div>

  <!-- Bottom HUD Footer -->
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="status-dot"></div>
      <span>BIOMECHANICAL ACCURACY // VERIFIED</span>
      <span class="tag-highlight">${ex.tagEn}</span>
    </div>
    <div style="color: #64748b;">V-SHAPE WORKOUT TRACKER // HIGH-DEFINITION BLUEPRINT HUD</div>
  </div>
</body>
</html>`;
}

function renderRichMuscularFigure(stance, isPhase2) {
  const lineCol = isPhase2 ? "#cbd5e1" : "#64748b";
  const darkBody = isPhase2 ? "#1e293b" : "#0f172a";
  const muscleShade = isPhase2 ? "#475569" : "#334155";

  switch (stance) {
    case "bent-fly":
      if (!isPhase2) {
        return `
          <!-- Head with Jawline & Hair -->
          <circle cx="160" cy="80" r="18" fill="${darkBody}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 152 70 Q 165 65 174 72 L 170 82 Z" fill="#475569" />
          <!-- Neck & Traps -->
          <path d="M 152 95 Q 135 110 120 125" stroke="${lineCol}" stroke-width="8" stroke-linecap="round" />
          <!-- Muscular Torso & Chest / Ribcage Hinged 45° -->
          <path d="M 150 100 L 110 150 L 70 210 L 60 250" stroke="${lineCol}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 135 120 L 110 145 L 85 175" stroke="${muscleShade}" stroke-width="8" stroke-linecap="round" />
          <!-- Muscular Glutes & Legs -->
          <path d="M 60 250 L 95 325 L 85 380" stroke="${lineCol}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 60 250 L 45 325 L 35 380" stroke="${muscleShade}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Shoes -->
          <rect x="75" y="378" width="30" height="10" rx="3" fill="#334155" stroke="${lineCol}" stroke-width="1.5" />
          <rect x="25" y="378" width="30" height="10" rx="3" fill="#1e293b" stroke="${muscleShade}" stroke-width="1.5" />
          <!-- Hanging Arms & Hex Dumbbells (Start) -->
          <path d="M 125 130 L 125 240" stroke="#ffffff" stroke-width="9" stroke-linecap="round" />
          <!-- Hex Dumbbell -->
          <polygon points="105,235 145,235 152,245 145,255 105,255 98,245" fill="${darkBody}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <!-- Head with Jawline & Hair -->
          <circle cx="160" cy="80" r="18" fill="${darkBody}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 152 70 Q 165 65 174 72 L 170 82 Z" fill="#475569" />
          <!-- Neck & Torso Hinged 45° -->
          <path d="M 150 100 L 110 150 L 70 210 L 60 250" stroke="${lineCol}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <!-- GLOWING POSTERIOR DELTOID WINGS -->
          <path d="M 125 110 Q 95 125 80 155" stroke="#00d8ff" stroke-width="20" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
          <path d="M 120 120 L 95 145" stroke="#ffffff" stroke-width="4" filter="url(#neon-cyan-glow)" />
          <!-- Muscular Legs -->
          <path d="M 60 250 L 95 325 L 85 380" stroke="${lineCol}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 60 250 L 45 325 L 35 380" stroke="${muscleShade}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="75" y="378" width="30" height="10" rx="3" fill="#334155" stroke="${lineCol}" stroke-width="1.5" />
          <rect x="25" y="378" width="30" height="10" rx="3" fill="#1e293b" stroke="${muscleShade}" stroke-width="1.5" />
          <!-- Wings Flown Outwards (Peak Fly) -->
          <path d="M 125 130 L 45 130 M 125 130 L 215 130" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
          <polygon points="25,122 65,122 72,132 65,142 25,142 18,132" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
          <polygon points="195,122 235,122 242,132 235,142 195,142 188,132" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
        `;
      }

    case "bent-row-flared":
      if (!isPhase2) {
        return `
          <circle cx="160" cy="80" r="18" fill="${darkBody}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 150 100 L 110 150 L 70 210 L 60 250" stroke="${lineCol}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 60 250 L 95 325 L 85 380 M 60 250 L 45 325 L 35 380" stroke="${lineCol}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 125 130 L 125 240" stroke="#ffffff" stroke-width="9" stroke-linecap="round" />
          <polygon points="105,235 145,235 152,245 145,255 105,255 98,245" fill="${darkBody}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <circle cx="160" cy="80" r="18" fill="${darkBody}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 150 100 L 110 150 L 70 210 L 60 250" stroke="${lineCol}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <!-- GLOWING REAR DELTS 90° -->
          <path d="M 125 110 Q 95 125 80 155" stroke="#00d8ff" stroke-width="20" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
          <path d="M 60 250 L 95 325 L 85 380 M 60 250 L 45 325 L 35 380" stroke="${lineCol}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
          <!-- 90° Flared Row Arms -->
          <path d="M 125 130 L 75 105 L 75 185" stroke="#ffffff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <polygon points="60,180 90,180 96,190 90,200 60,200 54,190" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
        `;
      }

    case "standing-shrug":
    case "standing-curl":
    case "standing-hammer":
    case "standing-press":
    default:
      if (!isPhase2) {
        return `
          <!-- Standing Muscular Athlete -->
          <circle cx="150" cy="65" r="18" fill="${darkBody}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 142 55 Q 155 50 164 58 L 160 68 Z" fill="#475569" />
          <!-- Chest & V-Taper Torso -->
          <path d="M 150 85 L 150 215" stroke="${lineCol}" stroke-width="18" stroke-linecap="round" />
          <path d="M 135 110 Q 150 130 135 170 M 165 110 Q 150 130 165 170" stroke="${muscleShade}" stroke-width="8" stroke-linecap="round" />
          <!-- Legs -->
          <path d="M 140 215 L 130 325 L 120 375 M 160 215 L 170 325 L 180 375" stroke="${lineCol}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Arms at sides -->
          <path d="M 130 95 L 110 220 M 170 95 L 190 220" stroke="#ffffff" stroke-width="9" stroke-linecap="round" />
          <polygon points="95,215 125,215 130,225 125,235 95,235 90,225" fill="${darkBody}" stroke="#00d8ff" stroke-width="2" />
          <polygon points="175,215 205,215 210,225 205,235 175,235 170,225" fill="${darkBody}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <circle cx="150" cy="65" r="18" fill="${darkBody}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 142 55 Q 155 50 164 58 L 160 68 Z" fill="#475569" />
          <path d="M 150 85 L 150 215" stroke="${lineCol}" stroke-width="18" stroke-linecap="round" />
          <!-- GLOWING ACTIVE MUSCLE FIBERS -->
          <circle cx="120" cy="95" r="16" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <circle cx="180" cy="95" r="16" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <path d="M 140 215 L 130 325 L 120 375 M 160 215 L 170 325 L 180 375" stroke="${lineCol}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Raised Peak Arms -->
          <path d="M 120 95 L 45 105 M 180 95 L 255 105" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
          <polygon points="25,98 60,98 66,108 60,118 25,118 19,108" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
          <polygon points="240,98 275,98 281,108 275,118 240,118 234,108" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
        `;
      }
  }
}

function renderLabels(labels) {
  if (!labels) return "";
  return labels.map(l => `
    <g transform="translate(${l.x}, ${l.y})">
      <circle cx="0" cy="0" r="3.5" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
      <line x1="0" y1="0" x2="35" y2="-18" stroke="rgba(0, 216, 255, 0.7)" stroke-width="1.5" />
      <line x1="35" y1="-18" x2="220" y2="-18" stroke="rgba(0, 216, 255, 0.7)" stroke-width="1.5" />
      <text x="40" y="-24" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="12.5" font-weight="700">${l.text}</text>
      <text x="40" y="-8" fill="#00d8ff" font-family="'Share Tech Mono', monospace" font-size="11">${l.sub}</text>
    </g>
  `).join("\n");
}

async function run() {
  console.log("Generating detailed athletic HUD diagrams for all remaining exercises...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2
  });

  for (const ex of EXERCISES) {
    // Only generate if not already a copied pre-rendered high-detail AI reference image
    if (PRE_RENDERED_MAP[ex.id]) {
      console.log(`Skipping generation for ${ex.id} (already using exact reference render)`);
      continue;
    }
    const html = generateDetailedHtml(ex);
    await page.setContent(html, { waitUntil: "networkidle" });
    const outPath = path.join(DIAGRAMS_DIR, `${ex.id}.jpg`);
    await page.screenshot({ path: outPath, type: "jpeg", quality: 95 });
    console.log(`Rendered detailed HUD diagram: ${ex.id}.jpg`);
  }

  await browser.close();
  console.log("Finished generating all diagrams matching the exact reference style!");
}

run().catch(err => {
  console.error("Error generating diagrams:", err);
  process.exit(1);
});
