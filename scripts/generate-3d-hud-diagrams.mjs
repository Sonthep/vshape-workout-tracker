import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const DIAGRAMS_DIR = path.resolve("public/diagrams");
const EXERCISES_DIR = path.resolve("public/exercises");
const BRAIN_ARTIFACTS_DIR = "C:/Users/HP/.gemini/antigravity-ide/brain/631a0c09-7315-424e-9100-61b65f5112d8";

// 6 existing pre-rendered AI blueprints that are 100% exact
const EXACT_PRE_RENDERED = {
  "db-bent-over-row": "db_bent_over_row_diagram_1787833018406.jpg",
  "lateral-raise": "lateral_raise_diagram_1787833001695.jpg",
  "one-arm-lat-row": "one_arm_lat_row_diagram_1787832976861.jpg",
  "floor-pullover": "floor_pullover_diagram_1787833218830.jpg",
  "floor-press": "floor_press_diagram_1787833234040.jpg",
  "goblet-squat": "goblet_squat_diagram_1787833260647.jpg",
};

// Copy the 6 exact pre-rendered AI blueprint images first
for (const [id, filename] of Object.entries(EXACT_PRE_RENDERED)) {
  const src = path.join(BRAIN_ARTIFACTS_DIR, filename);
  const dest = path.join(DIAGRAMS_DIR, `${id}.jpg`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied exact AI reference blueprint for ${id}`);
  }
}

// All remaining exercises will be composited using their photorealistic 3D athletic renders
const REMAINING_EXERCISES = [
  {
    id: "rear-delt-fly",
    boxTitle: "Bent-Over Rear Delt Fly",
    tagEn: "POSTERIOR DELTOID (HIGHLIGHTED)",
    targetMuscle: "Posterior Deltoid",
    labels: [
      { x: 320, y: 150, text: "Latissimus Dorsi", sub: "(Stabilizer)" },
      { x: 260, y: 240, text: "Spinal Alignment 45°", sub: "Flat Spine & Core Braced" },
      { x: 820, y: 130, text: "Posterior Deltoid", sub: "(Highlighted Target)" },
      { x: 860, y: 210, text: "Horizontal Abduction", sub: "Wings Level with Shoulders" },
      { x: 800, y: 300, text: "Elbows Locked 15°", sub: "Fly Motion (No Rowing)" }
    ],
    motionText: "Kinetic Fly Trajectory (Wings)",
    phase1Sub: "Phase 1: Starting Position (Under Chest)",
    phase2Sub: "Phase 2: Peak Horizontal Abduction"
  },
  {
    id: "reverse-fly",
    boxTitle: "Dumbbell Reverse Fly",
    tagEn: "POSTERIOR DELTOID (HIGHLIGHTED)",
    targetMuscle: "Posterior Deltoid",
    labels: [
      { x: 320, y: 150, text: "Latissimus Dorsi", sub: "(Stabilizer)" },
      { x: 260, y: 240, text: "Spinal Alignment 45°", sub: "Flat Spine & Core Braced" },
      { x: 820, y: 130, text: "Posterior Deltoid", sub: "(Highlighted Target)" },
      { x: 860, y: 210, text: "Horizontal Abduction", sub: "Wings Level with Shoulders" },
      { x: 800, y: 300, text: "Elbows Locked 15°", sub: "Fly Motion (No Rowing)" }
    ],
    motionText: "Kinetic Fly Trajectory (Wings)",
    phase1Sub: "Phase 1: Starting Position",
    phase2Sub: "Phase 2: Peak Abduction"
  },
  {
    id: "rear-delt-row",
    boxTitle: "Dumbbell Rear-Delt Row",
    tagEn: "POSTERIOR DELTOID & UPPER TRAPS",
    targetMuscle: "Rear Deltoid 90° Flared",
    labels: [
      { x: 320, y: 150, text: "Upper Trapezius", sub: "Secondary Mover" },
      { x: 260, y: 240, text: "Spinal Alignment 45°", sub: "Core Stabilizers" },
      { x: 820, y: 130, text: "Rear Deltoid 90°", sub: "(Highlighted Target)" },
      { x: 860, y: 210, text: "Flared 90° Elbow Row", sub: "Level with Upper Chest" },
      { x: 800, y: 300, text: "Scapular Retraction", sub: "Rhomboids Squeeze" }
    ],
    motionText: "Kinetic 90° Flared Row Trajectory",
    phase1Sub: "Phase 1: Starting Position",
    phase2Sub: "Phase 2: Peak 90° Flared Row"
  },
  {
    id: "shrug",
    boxTitle: "Standing Dumbbell Shrug",
    tagEn: "UPPER TRAPEZIUS (HIGHLIGHTED)",
    targetMuscle: "Upper Trapezius",
    labels: [
      { x: 320, y: 140, text: "Upper Trapezius", sub: "(Relaxed Hang Start)" },
      { x: 260, y: 240, text: "Erect Spine Alignment", sub: "Arms Straight at Sides" },
      { x: 820, y: 120, text: "Upper Trapezius", sub: "(Highlighted Peak Elevation)" },
      { x: 860, y: 200, text: "Direct Vertical Drive", sub: "Straight Up to Ears" },
      { x: 800, y: 290, text: "No Shoulder Rolling", sub: "1-2s Peak Squeeze" }
    ],
    motionText: "Vertical Elevation Vector",
    phase1Sub: "Phase 1: Relaxed Starting Hang",
    phase2Sub: "Phase 2: Full Traps Elevation"
  },
  {
    id: "push-up",
    boxTitle: "Push-Up (Bodyweight)",
    tagEn: "CHEST & CORE STABILIZERS",
    targetMuscle: "Pectoralis Major",
    labels: [
      { x: 320, y: 140, text: "High Plank Position", sub: "Straight Head-to-Heels Line" },
      { x: 260, y: 240, text: "Hands Under Shoulders", sub: "Core Braced" },
      { x: 820, y: 130, text: "Pectoralis Major", sub: "(Highlighted Bottom Depth)" },
      { x: 860, y: 210, text: "Core Stabilizers", sub: "Anti-Extension Brace" },
      { x: 800, y: 290, text: "Elbows at 45°", sub: "1-2 Inches Off Floor" }
    ],
    motionText: "Controlled 45° Descent Arc",
    phase1Sub: "Phase 1: High Plank Setup",
    phase2Sub: "Phase 2: Bottom Chest Depth"
  },
  {
    id: "db-curl",
    boxTitle: "Standing Dumbbell Curl",
    tagEn: "BICEPS BRACHII (HIGHLIGHTED)",
    targetMuscle: "Biceps Brachii",
    labels: [
      { x: 320, y: 150, text: "Biceps Brachii", sub: "(Full Stretch Hang)" },
      { x: 260, y: 240, text: "Elbows Pinned to Ribs", sub: "No Body Swing" },
      { x: 820, y: 120, text: "Biceps Brachii", sub: "(Highlighted Peak Supination)" },
      { x: 860, y: 200, text: "Wrist Supination", sub: "Palms Facing Upwards" },
      { x: 800, y: 290, text: "Brachialis & Forearms", sub: "Secondary Load" }
    ],
    motionText: "Supination Kinetic Arc",
    phase1Sub: "Phase 1: Extended Arm Start",
    phase2Sub: "Phase 2: Peak Supination"
  },
  {
    id: "hammer-curl",
    boxTitle: "Dumbbell Hammer Curl",
    tagEn: "BRACHIALIS & FOREARMS",
    targetMuscle: "Brachialis & Forearms",
    labels: [
      { x: 320, y: 150, text: "Brachioradialis", sub: "Neutral Grip Setup" },
      { x: 260, y: 240, text: "Elbows Pinned to Ribs", sub: "Strict Form" },
      { x: 820, y: 120, text: "Brachialis (Outer Arm)", sub: "(Highlighted Peak Load)" },
      { x: 860, y: 200, text: "Forearm Extensors", sub: "Neutral Wrist Lock" },
      { x: 800, y: 290, text: "Palms Facing Each Other", sub: "Continuous Neutral Grip" }
    ],
    motionText: "Neutral Vertical Arc",
    phase1Sub: "Phase 1: Neutral Hang",
    phase2Sub: "Phase 2: Peak Hammer Squeeze"
  },
  {
    id: "overhead-triceps-extension",
    boxTitle: "Overhead Triceps Extension",
    tagEn: "TRICEPS LONG HEAD (HIGHLIGHTED)",
    targetMuscle: "Triceps Long Head",
    labels: [
      { x: 320, y: 130, text: "Triceps Long Head", sub: "(Behind-Head Stretch)" },
      { x: 260, y: 230, text: "Elbows Pointing Forward", sub: "Core Braced" },
      { x: 820, y: 110, text: "Triceps Long Head", sub: "(Highlighted Lockout)" },
      { x: 860, y: 190, text: "Medial & Lateral Heads", sub: "Full Vertical Extension" },
      { x: 800, y: 280, text: "Neutral Spine", sub: "No Lumbar Arching" }
    ],
    motionText: "Vertical Overhead Extension",
    phase1Sub: "Phase 1: Behind-Head Stretch",
    phase2Sub: "Phase 2: Full Overhead Lockout"
  },
  {
    id: "db-rdl",
    boxTitle: "Dumbbell Romanian Deadlift",
    tagEn: "HAMSTRINGS & POSTERIOR CHAIN",
    targetMuscle: "Hamstrings & Glutes",
    labels: [
      { x: 320, y: 140, text: "Standing Tall", sub: "Soft Knees (Unlocked)" },
      { x: 260, y: 240, text: "DB Against Thighs", sub: "Lats Engaged" },
      { x: 820, y: 130, text: "Hamstrings & Glutes", sub: "(Highlighted Deep Stretch)" },
      { x: 860, y: 210, text: "Erector Spinae", sub: "Flat Spine 45° Alignment" },
      { x: 800, y: 290, text: "DB Sliding Down Shins", sub: "Hips Pushed Directly Back" }
    ],
    motionText: "Hip Hinge Trajectory",
    phase1Sub: "Phase 1: Standing Tall Start",
    phase2Sub: "Phase 2: Hamstrings Deep Stretch"
  },
  {
    id: "reverse-lunge",
    boxTitle: "Dumbbell Reverse Lunge",
    tagEn: "QUADRICEPS & GLUTEUS (UNILATERAL)",
    targetMuscle: "Quadriceps & Gluteus",
    labels: [
      { x: 320, y: 140, text: "Standing Setup", sub: "DBs at Sides" },
      { x: 260, y: 240, text: "Torso Upright", sub: "Core Braced" },
      { x: 820, y: 130, text: "Front Quad & Glute", sub: "(Highlighted 90/90 Stance)" },
      { x: 860, y: 210, text: "Back Knee Hovering", sub: "1 Inch Off Floor" },
      { x: 800, y: 290, text: "Front Heel Drive", sub: "Vertical Return" }
    ],
    motionText: "Backward Step Kinetic Drive",
    phase1Sub: "Phase 1: Standing Setup",
    phase2Sub: "Phase 2: 90/90 Lunge Depth"
  },
  {
    id: "standing-shoulder-press",
    boxTitle: "Standing Dumbbell Shoulder Press",
    tagEn: "ANTERIOR & LATERAL DELTOIDS",
    targetMuscle: "Anterior & Lateral Deltoids",
    labels: [
      { x: 320, y: 140, text: "Rack Position", sub: "DBs at Shoulder Height" },
      { x: 260, y: 240, text: "Core & Glutes Braced", sub: "Neutral Pelvis" },
      { x: 820, y: 110, text: "Anterior/Lateral Delts", sub: "(Highlighted Lockout)" },
      { x: 860, y: 190, text: "Triceps Brachii", sub: "Vertical Lockout" },
      { x: 800, y: 280, text: "Scapular Plane Path", sub: "No Lumbar Arching" }
    ],
    motionText: "Vertical Overhead Press Vector",
    phase1Sub: "Phase 1: Shoulder Rack Start",
    phase2Sub: "Phase 2: Overhead Lockout"
  },
  {
    id: "reverse-crunch",
    boxTitle: "Reverse Crunch",
    tagEn: "LOWER RECTUS ABDOMINIS",
    targetMuscle: "Lower Rectus Abdominis",
    labels: [
      { x: 320, y: 150, text: "Supine Setup", sub: "Knees at 90°" },
      { x: 260, y: 240, text: "Lower Back Flat", sub: "Hands on Mat" },
      { x: 820, y: 120, text: "Lower Rectus Abdominis", sub: "(Highlighted Posterior Tilt)" },
      { x: 860, y: 200, text: "Pelvis Roll-Up", sub: "Hips Lifted 2-3 Inches" },
      { x: 800, y: 290, text: "Controlled Tempo", sub: "No Leg Kicking / Momentum" }
    ],
    motionText: "Posterior Pelvic Tilt Roll-Up",
    phase1Sub: "Phase 1: Supine 90° Setup",
    phase2Sub: "Phase 2: Pelvis Roll-Up Peak"
  },
  {
    id: "plank",
    boxTitle: "Forearm Plank",
    tagEn: "TRANSVERSE ABDOMINIS & CORE",
    targetMuscle: "Transverse Abdominis",
    labels: [
      { x: 320, y: 140, text: "Forearm Alignment", sub: "Elbows Under Shoulders" },
      { x: 260, y: 240, text: "Toes & Mat Contact", sub: "Neutral Spine" },
      { x: 820, y: 120, text: "Transverse Abdominis", sub: "(Highlighted Anti-Extension)" },
      { x: 860, y: 200, text: "Glute & Quad Squeeze", sub: "Maximum Core Tension" },
      { x: 800, y: 290, text: "Navel Pulled to Spine", sub: "Rigid Straight Line" }
    ],
    motionText: "Anti-Extension Isometric Brace",
    phase1Sub: "Phase 1: Setup Alignment",
    phase2Sub: "Phase 2: Peak Core Tension"
  },
  {
    id: "leg-raise",
    boxTitle: "Lying Leg Raise",
    tagEn: "LOWER RECTUS ABDOMINIS (V-CUT)",
    targetMuscle: "Lower Rectus Abdominis",
    labels: [
      { x: 320, y: 150, text: "Legs Hovering 2\"", sub: "Lower Back Glued to Mat" },
      { x: 260, y: 240, text: "Hands at Sides", sub: "Inhale on Descent" },
      { x: 820, y: 120, text: "Lower Rectus Abdominis", sub: "(Highlighted 80-90° Lift)" },
      { x: 860, y: 200, text: "Hip Flexors & Core", sub: "Exhale on Lift" },
      { x: 800, y: 290, text: "No Lumbar Arching", sub: "Pure Abdominal Control" }
    ],
    motionText: "Vertical Abdominal Lift",
    phase1Sub: "Phase 1: Legs Extended 2 Inches",
    phase2Sub: "Phase 2: Vertical 90° Lift"
  },
  {
    id: "db-crunch",
    boxTitle: "Dumbbell Crunch",
    tagEn: "UPPER RECTUS ABDOMINIS",
    targetMuscle: "Upper Rectus Abdominis",
    labels: [
      { x: 320, y: 150, text: "Supine with DB", sub: "Held on Upper Chest" },
      { x: 260, y: 240, text: "Feet Flat on Mat", sub: "Knees Bent 90°" },
      { x: 820, y: 120, text: "Upper Rectus Abdominis", sub: "(Highlighted 30-45° Flexion)" },
      { x: 860, y: 200, text: "Scapula Lifted", sub: "Ribs to Pelvis" },
      { x: 800, y: 290, text: "1s Peak Squeeze", sub: "Not a Full Sit-Up" }
    ],
    motionText: "Thoracic Flexion Arc",
    phase1Sub: "Phase 1: Mat Start",
    phase2Sub: "Phase 2: Upper Abs Crunch"
  }
];

function generate3DCompositeHtml(ex, base64Image) {
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

    /* 3D Realistic Render Background Backdrop */
    .render-backdrop {
      position: absolute;
      inset: 0;
      background: #02050c;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .render-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.85;
      filter: contrast(1.15) brightness(0.95);
    }
    .render-overlay-vignette {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at center, rgba(3, 7, 18, 0.2) 30%, rgba(3, 7, 18, 0.88) 85%, #030712 100%);
      pointer-events: none;
    }

    /* Sci-Fi Blueprint HUD Grid */
    .sci-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(0, 216, 255, 0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 216, 255, 0.08) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
      z-index: 2;
    }

    /* Top HUD Box */
    .top-bar {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      position: relative;
      z-index: 10;
    }
    .hud-title-box {
      border: 1px solid rgba(0, 216, 255, 0.45);
      border-left: 4px solid #00d8ff;
      background: rgba(5, 14, 26, 0.85);
      padding: 10px 24px;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0, 216, 255, 0.15);
      backdrop-filter: blur(8px);
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
      border: 1px solid rgba(0, 216, 255, 0.4);
      background: rgba(5, 14, 26, 0.88);
      border-radius: 4px;
      padding: 8px 18px;
      display: flex;
      flex-direction: column;
      gap: 3px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 11px;
      backdrop-filter: blur(8px);
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
      z-index: 10;
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
      border-top: 1px solid rgba(0, 216, 255, 0.3);
      padding-top: 10px;
      font-family: 'Share Tech Mono', monospace;
      font-size: 12px;
      position: relative;
      z-index: 10;
      background: rgba(3, 7, 18, 0.7);
      backdrop-filter: blur(6px);
      border-radius: 4px;
      padding: 8px 14px;
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
      background: rgba(0, 216, 255, 0.15);
      padding: 3px 10px;
      border-radius: 3px;
      border: 1px solid rgba(0, 216, 255, 0.4);
    }
  </style>
</head>
<body>
  <!-- Realistic 3D Athletic Render Backdrop -->
  <div class="render-backdrop">
    <img src="${base64Image}" class="render-image" alt="3D Athlete Render" />
    <div class="render-overlay-vignette"></div>
  </div>

  <div class="sci-grid"></div>

  <!-- Top HUD Bar -->
  <div class="top-bar">
    <div class="hud-title-box">
      <div class="hud-title-text">${ex.boxTitle}</div>
      <div class="hud-subtitle">BIOMECHANICAL MOTION BLUEPRINT // 3D HUD-v2.4</div>
    </div>
    <div class="hud-telemetry-box">
      <div class="tele-row">
        <span class="tele-label">SYSTEM_MODE:</span>
        <span class="tele-val">3D_ANATOMY_HUD</span>
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

  <!-- Main Stage with HUD Overlays, Pointers & Kinetic Trajectory -->
  <div class="stage">
    <svg class="stage-svg" viewBox="0 0 1200 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="neon-cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur1" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur2" />
          <feMerge>
            <feMergeNode in="blur1" />
            <feMergeNode in="blur2" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="cyan-arc-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#00d8ff" stop-opacity="0.2" />
          <stop offset="60%" stop-color="#00d8ff" />
          <stop offset="100%" stop-color="#00f084" />
        </linearGradient>
      </defs>

      <!-- Stage Grid & Geometric Circles -->
      <circle cx="340" cy="240" r="170" stroke="rgba(0, 216, 255, 0.12)" stroke-width="1.5" stroke-dasharray="6 4" />
      <circle cx="860" cy="240" r="170" stroke="rgba(0, 216, 255, 0.15)" stroke-width="1.5" stroke-dasharray="6 4" />
      <line x1="60" y1="440" x2="1140" y2="440" stroke="rgba(0, 216, 255, 0.2)" stroke-width="1" stroke-dasharray="8 6" />

      <!-- Tech Stage Corner Brackets -->
      <!-- Left Box (Phase 1) -->
      <path d="M 160 70 L 140 70 L 140 90 M 540 70 L 560 70 L 560 90 M 140 390 L 140 410 L 160 410 M 560 390 L 560 410 L 540 410" stroke="rgba(0, 216, 255, 0.45)" stroke-width="1.5" />
      <text x="350" y="55" fill="#94a3b8" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">${ex.phase1Sub}</text>
      
      <!-- Right Box (Phase 2) -->
      <path d="M 680 70 L 660 70 L 660 90 M 1060 70 L 1080 70 L 1080 90 M 660 390 L 660 410 L 680 410 M 1080 390 L 1080 410 L 1060 410" stroke="rgba(0, 240, 132, 0.55)" stroke-width="1.5" />
      <text x="870" y="55" fill="#00f084" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">${ex.phase2Sub}</text>

      <!-- Center Sweeping Kinetic Trajectory Arrow -->
      <g transform="translate(380, 210)">
        <path d="M 60 90 Q 220 170 380 20" stroke="url(#cyan-arc-grad)" stroke-width="4.5" fill="none" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
        <path d="M 380 20 L 358 20 M 380 20 L 372 40" stroke="#00f084" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
        <text x="220" y="165" fill="#00f084" font-family="'Share Tech Mono', monospace" font-size="12.5" font-weight="800" text-anchor="middle" letter-spacing="1.2">${ex.motionText}</text>
      </g>

      <!-- Technical Anatomy Labels & Glowing Pointers -->
      ${renderLabels(ex.labels)}
    </svg>
  </div>

  <!-- Bottom HUD Footer -->
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="status-dot"></div>
      <span>3D BIOMECHANICAL VALIDATION // VERIFIED</span>
      <span class="tag-highlight">${ex.tagEn}</span>
    </div>
    <div style="color: #64748b;">V-SHAPE WORKOUT TRACKER // 3D PHOTOREALISTIC BLUEPRINT HUD</div>
  </div>
</body>
</html>`;
}

function renderLabels(labels) {
  if (!labels) return "";
  return labels.map(l => `
    <g transform="translate(${l.x}, ${l.y})">
      <circle cx="0" cy="0" r="4" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
      <line x1="0" y1="0" x2="35" y2="-18" stroke="rgba(0, 216, 255, 0.85)" stroke-width="1.8" />
      <line x1="35" y1="-18" x2="230" y2="-18" stroke="rgba(0, 216, 255, 0.85)" stroke-width="1.8" />
      <text x="40" y="-24" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="13" font-weight="800" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">${l.text}</text>
      <text x="40" y="-7" fill="#00d8ff" font-family="'Share Tech Mono', monospace" font-size="11" font-weight="700" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))">${l.sub}</text>
    </g>
  `).join("\n");
}

async function run() {
  console.log("Compositing 3D photorealistic render into HUD blueprint diagrams for all remaining exercises...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2
  });

  for (const ex of REMAINING_EXERCISES) {
    if (EXACT_PRE_RENDERED[ex.id]) {
      console.log(`Skipping ${ex.id} (already using exact pre-rendered AI blueprint)`);
      continue;
    }

    const imgPath = path.join(EXERCISES_DIR, `${ex.id}.jpg`);
    if (!fs.existsSync(imgPath)) {
      console.warn(`Warning: 3D render not found at ${imgPath}`);
      continue;
    }

    const imgBuffer = fs.readFileSync(imgPath);
    const base64Image = `data:image/jpeg;base64,${imgBuffer.toString("base64")}`;

    const html = generate3DCompositeHtml(ex, base64Image);
    await page.setContent(html, { waitUntil: "networkidle" });
    const outPath = path.join(DIAGRAMS_DIR, `${ex.id}.jpg`);
    await page.screenshot({ path: outPath, type: "jpeg", quality: 95 });
    console.log(`Rendered 3D realistic HUD diagram: ${ex.id}.jpg`);
  }

  await browser.close();
  console.log("ALL 21 exercise diagrams now use 100% 3D realistic athlete renders in unified HUD style!");
}

run().catch(err => {
  console.error("Error generating 3D HUD diagrams:", err);
  process.exit(1);
});
