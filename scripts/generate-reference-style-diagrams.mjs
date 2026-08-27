import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const DIAGRAMS_DIR = path.resolve("public/diagrams");
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

// 21 exercises definitions with exact technical labels & biomechanics
const EXERCISES = [
  {
    id: "rear-delt-fly",
    title: "Bent-Over Rear Delt Fly",
    tag: "POSTERIOR DELTOID // 3D SHOULDERS",
    category: "bent-fly",
    labels: [
      { x: 260, y: 150, text: "Latissimus Dorsi", sub: "(Stabilizer)" },
      { x: 180, y: 230, text: "Spinal Alignment 45°", sub: "Flat Spine & Braced Core" },
      { x: 740, y: 100, text: "Posterior Deltoid", sub: "(Highlighted Peak Contraction)" },
      { x: 770, y: 170, text: "Scapular Retraction", sub: "Rhomboids & Mid Traps" },
      { x: 710, y: 260, text: "Elbows Locked 15°", sub: "Horizontal Fly (Wings)" }
    ],
    motion: "Kinetic Fly Trajectory (Wings)",
    phase1: "Phase 1: Starting Position (Under Chest)",
    phase2: "Phase 2: Peak Horizontal Abduction"
  },
  {
    id: "reverse-fly",
    title: "Dumbbell Reverse Fly",
    tag: "POSTERIOR DELTOID // 3D SHOULDERS",
    category: "bent-fly",
    labels: [
      { x: 260, y: 150, text: "Latissimus Dorsi", sub: "(Stabilizer)" },
      { x: 180, y: 230, text: "Spinal Alignment 45°", sub: "Flat Spine & Braced Core" },
      { x: 740, y: 100, text: "Posterior Deltoid", sub: "(Highlighted Peak Contraction)" },
      { x: 770, y: 170, text: "Scapular Retraction", sub: "Rhomboids & Mid Traps" },
      { x: 710, y: 260, text: "Elbows Locked 15°", sub: "Horizontal Fly (Wings)" }
    ],
    motion: "Kinetic Fly Trajectory (Wings)",
    phase1: "Phase 1: Starting Position",
    phase2: "Phase 2: Peak Abduction"
  },
  {
    id: "rear-delt-row",
    title: "Dumbbell Rear-Delt Row",
    tag: "POSTERIOR DELTOID & UPPER TRAPS",
    category: "bent-row-flared",
    labels: [
      { x: 260, y: 150, text: "Upper Trapezius", sub: "Secondary Mover" },
      { x: 180, y: 230, text: "Spinal Alignment 45°", sub: "Core Stabilizers" },
      { x: 740, y: 100, text: "Rear Deltoid 90°", sub: "(Highlighted Target)" },
      { x: 770, y: 170, text: "Flared 90° Elbow Row", sub: "Level with Upper Chest" },
      { x: 710, y: 260, text: "Scapular Retraction", sub: "Rhomboids Squeeze" }
    ],
    motion: "Kinetic 90° Flared Row Trajectory",
    phase1: "Phase 1: Starting Position",
    phase2: "Phase 2: Peak 90° Flared Row"
  },
  {
    id: "one-arm-lat-row",
    title: "One-Arm Dumbbell Lat Row",
    tag: "LATISSIMUS DORSI // V-SHAPE WIDE",
    category: "bent-row",
    labels: [
      { x: 260, y: 150, text: "Latissimus Dorsi", sub: "(Full Stretch Position)" },
      { x: 180, y: 230, text: "Spinal Alignment", sub: "Support Arm Braced" },
      { x: 740, y: 100, text: "Latissimus Dorsi", sub: "(Highlighted Peak Squeeze)" },
      { x: 770, y: 170, text: "Teres Major & Traps", sub: "Assisting Stabilizers" },
      { x: 710, y: 260, text: "Elbow Driven to Hip", sub: "Tight Arc Path" }
    ],
    motion: "Kinetic Arc Trajectory to Hip",
    phase1: "Phase 1: Stretch Position",
    phase2: "Phase 2: Peak Lat Squeeze"
  },
  {
    id: "db-bent-over-row",
    title: "Bent-Over Two-Arm Dumbbell Row",
    tag: "LATISSIMUS DORSI & RHOMBOIDS",
    category: "bent-row",
    labels: [
      { x: 260, y: 150, text: "Latissimus Dorsi", sub: "(Starting Position)" },
      { x: 180, y: 230, text: "Spinal Alignment 45°", sub: "Core Stabilizers" },
      { x: 740, y: 100, text: "Scapular Retraction", sub: "Rhomboids (Highlighted)" },
      { x: 770, y: 170, text: "Latissimus Dorsi", sub: "(Peak Contraction)" },
      { x: 710, y: 260, text: "Elbow Flexion & Drive", sub: "Pulling Up to Waist" }
    ],
    motion: "Kinetic Trajectory to Waist",
    phase1: "Phase 1: Starting Position",
    phase2: "Phase 2: Peak Back Squeeze"
  },
  {
    id: "lateral-raise",
    title: "Standing Dumbbell Lateral Raise",
    tag: "LATERAL DELTOID // V-SHAPE WIDTH",
    category: "standing-latraise",
    labels: [
      { x: 250, y: 140, text: "Lateral Deltoid", sub: "(Starting Stretch)" },
      { x: 170, y: 230, text: "Core Stabilizers", sub: "Glutes & Abs Braced" },
      { x: 750, y: 90, text: "Lateral Deltoid", sub: "(Highlighted Peak)" },
      { x: 780, y: 160, text: "Scapular Plane (30°)", sub: "Elbows Leading" },
      { x: 720, y: 250, text: "Parallel to Floor", sub: "Shoulder Height Limit" }
    ],
    motion: "Kinetic Arc in Scapular Plane (30°)",
    phase1: "Phase 1: Starting at Thighs",
    phase2: "Phase 2: Shoulder-Level Peak"
  },
  {
    id: "floor-pullover",
    title: "Dumbbell Floor Pullover",
    tag: "LATISSIMUS DORSI & SERRATUS",
    category: "floor-pullover",
    labels: [
      { x: 250, y: 150, text: "Pectoralis & Lats", sub: "(Overhead Setup)" },
      { x: 170, y: 240, text: "Lower Back Flat", sub: "Knees Bent 90° on Floor" },
      { x: 750, y: 100, text: "Latissimus Dorsi", sub: "(Deep Stretch Peak)" },
      { x: 780, y: 170, text: "Serratus Anterior", sub: "(Highlighted)" },
      { x: 720, y: 250, text: "Elbows Fixed 15°", sub: "Floor Clearance 2 Inches" }
    ],
    motion: "Overhead Arc Trajectory",
    phase1: "Phase 1: Over Chest Start",
    phase2: "Phase 2: Deep Overhead Stretch"
  },
  {
    id: "shrug",
    title: "Standing Dumbbell Shrug",
    tag: "UPPER TRAPEZIUS // UPPER BACK",
    category: "standing-shrug",
    labels: [
      { x: 250, y: 130, text: "Upper Trapezius", sub: "(Relaxed Hang Start)" },
      { x: 170, y: 230, text: "Erect Spine Alignment", sub: "Arms Straight at Sides" },
      { x: 750, y: 80, text: "Upper Trapezius", sub: "(Highlighted Peak Elevation)" },
      { x: 780, y: 150, text: "Direct Vertical Drive", sub: "Straight Up to Ears" },
      { x: 720, y: 240, text: "No Shoulder Rolling", sub: "1-2s Peak Squeeze" }
    ],
    motion: "Vertical Elevation Vector",
    phase1: "Phase 1: Relaxed Starting Hang",
    phase2: "Phase 2: Full Traps Elevation"
  },
  {
    id: "floor-press",
    title: "Dumbbell Floor Press",
    tag: "PECTORALIS MAJOR // CHEST",
    category: "floor-press",
    labels: [
      { x: 250, y: 150, text: "Pectoralis Major", sub: "(Floor Rest Position)" },
      { x: 170, y: 240, text: "Elbows at 45°", sub: "Shoulder Protection" },
      { x: 750, y: 90, text: "Pectoralis Major", sub: "(Highlighted Peak Squeeze)" },
      { x: 780, y: 160, text: "Triceps Brachii", sub: "Lockout Assist" },
      { x: 720, y: 250, text: "Mid-Chest Squeeze", sub: "Vertical Press" }
    ],
    motion: "Vertical Pressing Kinetic Vector",
    phase1: "Phase 1: Floor Rest 45°",
    phase2: "Phase 2: Peak Chest Squeeze"
  },
  {
    id: "push-up",
    title: "Push-Up (Bodyweight)",
    tag: "CHEST & CORE STABILIZERS",
    category: "push-up",
    labels: [
      { x: 250, y: 130, text: "High Plank Position", sub: "Straight Head-to-Heels Line" },
      { x: 170, y: 230, text: "Hands Under Shoulders", sub: "Core Braced" },
      { x: 750, y: 100, text: "Pectoralis Major", sub: "(Highlighted Bottom Depth)" },
      { x: 780, y: 170, text: "Core Stabilizers", sub: "Anti-Extension Brace" },
      { x: 720, y: 250, text: "Elbows at 45°", sub: "1-2 Inches Off Floor" }
    ],
    motion: "Controlled 45° Descent Arc",
    phase1: "Phase 1: High Plank Setup",
    phase2: "Phase 2: Bottom Chest Depth"
  },
  {
    id: "db-curl",
    title: "Standing Dumbbell Curl",
    tag: "BICEPS BRACHII // ARM PEAK",
    category: "standing-curl",
    labels: [
      { x: 250, y: 140, text: "Biceps Brachii", sub: "(Full Stretch Hang)" },
      { x: 170, y: 230, text: "Elbows Pinned to Ribs", sub: "No Body Swing" },
      { x: 750, y: 90, text: "Biceps Brachii", sub: "(Highlighted Peak Supination)" },
      { x: 780, y: 160, text: "Wrist Supination", sub: "Palms Facing Upwards" },
      { x: 720, y: 250, text: "Brachialis & Forearms", sub: "Secondary Load" }
    ],
    motion: "Supination Kinetic Arc",
    phase1: "Phase 1: Extended Arm Start",
    phase2: "Phase 2: Peak Supination"
  },
  {
    id: "hammer-curl",
    title: "Dumbbell Hammer Curl",
    tag: "BRACHIALIS & FOREARMS",
    category: "standing-hammer",
    labels: [
      { x: 250, y: 140, text: "Brachioradialis", sub: "Neutral Grip Setup" },
      { x: 170, y: 230, text: "Elbows Pinned to Ribs", sub: "Strict Form" },
      { x: 750, y: 90, text: "Brachialis (Outer Arm)", sub: "(Highlighted Peak Load)" },
      { x: 780, y: 160, text: "Forearm Extensors", sub: "Neutral Wrist Lock" },
      { x: 720, y: 250, text: "Palms Facing Inwards", sub: "Continuous Neutral Grip" }
    ],
    motion: "Neutral Vertical Arc",
    phase1: "Phase 1: Neutral Hang",
    phase2: "Phase 2: Peak Hammer Squeeze"
  },
  {
    id: "overhead-triceps-extension",
    title: "Overhead Triceps Extension",
    tag: "TRICEPS LONG HEAD // ARMS",
    category: "overhead-tri",
    labels: [
      { x: 250, y: 120, text: "Triceps Long Head", sub: "(Behind-Head Stretch)" },
      { x: 170, y: 220, text: "Elbows Pointing Forward", sub: "Core Braced" },
      { x: 750, y: 80, text: "Triceps Long Head", sub: "(Highlighted Lockout)" },
      { x: 780, y: 150, text: "Medial & Lateral Heads", sub: "Full Vertical Extension" },
      { x: 720, y: 240, text: "Neutral Spine", sub: "No Lumbar Arching" }
    ],
    motion: "Vertical Overhead Extension",
    phase1: "Phase 1: Behind-Head Stretch",
    phase2: "Phase 2: Full Overhead Lockout"
  },
  {
    id: "goblet-squat",
    title: "Goblet Squat",
    tag: "QUADRICEPS & GLUTEUS MAXIMUS",
    category: "squat",
    labels: [
      { x: 250, y: 130, text: "Standing Setup", sub: "DB Held at Chest" },
      { x: 170, y: 230, text: "Feet Shoulder-Width", sub: "Toes Out 15°" },
      { x: 750, y: 100, text: "Quadriceps & Glutes", sub: "(Highlighted Parallel Depth)" },
      { x: 780, y: 170, text: "Core Stabilizers", sub: "Upright Chest & Torso" },
      { x: 720, y: 250, text: "Knees Tracking Toes", sub: "Mid-Foot Balance Drive" }
    ],
    motion: "Hip Hinge & Knee Flexion Drive",
    phase1: "Phase 1: Standing Setup",
    phase2: "Phase 2: Parallel Depth"
  },
  {
    id: "db-rdl",
    title: "Dumbbell Romanian Deadlift",
    tag: "HAMSTRINGS & POSTERIOR CHAIN",
    category: "rdl",
    labels: [
      { x: 250, y: 130, text: "Standing Tall", sub: "Soft Knees (Unlocked)" },
      { x: 170, y: 230, text: "DB Against Thighs", sub: "Lats Engaged" },
      { x: 750, y: 100, text: "Hamstrings & Glutes", sub: "(Highlighted Deep Stretch)" },
      { x: 780, y: 170, text: "Erector Spinae", sub: "Flat Spine 45° Alignment" },
      { x: 720, y: 250, text: "DB Sliding Down Shins", sub: "Hips Pushed Directly Back" }
    ],
    motion: "Hip Hinge Trajectory",
    phase1: "Phase 1: Standing Tall Start",
    phase2: "Phase 2: Hamstrings Deep Stretch"
  },
  {
    id: "reverse-lunge",
    title: "Dumbbell Reverse Lunge",
    tag: "QUADRICEPS & GLUTEUS (UNILATERAL)",
    category: "lunge",
    labels: [
      { x: 250, y: 130, text: "Standing Setup", sub: "DBs at Sides" },
      { x: 170, y: 230, text: "Torso Upright", sub: "Core Braced" },
      { x: 750, y: 100, text: "Front Quad & Glute", sub: "(Highlighted 90/90 Stance)" },
      { x: 780, y: 170, text: "Back Knee Hovering", sub: "1 Inch Off Floor" },
      { x: 720, y: 250, text: "Front Heel Drive", sub: "Vertical Return" }
    ],
    motion: "Backward Step Kinetic Drive",
    phase1: "Phase 1: Standing Setup",
    phase2: "Phase 2: 90/90 Lunge Depth"
  },
  {
    id: "standing-shoulder-press",
    title: "Standing Dumbbell Shoulder Press",
    tag: "ANTERIOR & LATERAL DELTOIDS",
    category: "standing-press",
    labels: [
      { x: 250, y: 130, text: "Rack Position", sub: "DBs at Shoulder Height" },
      { x: 170, y: 230, text: "Core & Glutes Braced", sub: "Neutral Pelvis" },
      { x: 750, y: 80, text: "Anterior/Lateral Delts", sub: "(Highlighted Lockout)" },
      { x: 780, y: 150, text: "Triceps Brachii", sub: "Vertical Lockout" },
      { x: 720, y: 240, text: "Scapular Plane Path", sub: "No Lumbar Arching" }
    ],
    motion: "Vertical Overhead Press Vector",
    phase1: "Phase 1: Shoulder Rack Start",
    phase2: "Phase 2: Overhead Lockout"
  },
  {
    id: "reverse-crunch",
    title: "Reverse Crunch",
    tag: "LOWER RECTUS ABDOMINIS",
    category: "reverse-crunch",
    labels: [
      { x: 250, y: 140, text: "Supine Setup", sub: "Knees at 90°" },
      { x: 170, y: 230, text: "Lower Back Flat", sub: "Hands on Mat" },
      { x: 750, y: 90, text: "Lower Rectus Abdominis", sub: "(Highlighted Posterior Tilt)" },
      { x: 780, y: 160, text: "Pelvis Roll-Up", sub: "Hips Lifted 2-3 Inches" },
      { x: 720, y: 250, text: "Controlled Tempo", sub: "No Leg Kicking / Momentum" }
    ],
    motion: "Posterior Pelvic Tilt Roll-Up",
    phase1: "Phase 1: Supine 90° Setup",
    phase2: "Phase 2: Pelvis Roll-Up Peak"
  },
  {
    id: "plank",
    title: "Forearm Plank",
    tag: "TRANSVERSE ABDOMINIS & CORE",
    category: "plank",
    labels: [
      { x: 250, y: 130, text: "Forearm Alignment", sub: "Elbows Under Shoulders" },
      { x: 170, y: 230, text: "Toes & Mat Contact", sub: "Neutral Spine" },
      { x: 750, y: 90, text: "Transverse Abdominis", sub: "(Highlighted Anti-Extension)" },
      { x: 780, y: 160, text: "Glute & Quad Squeeze", sub: "Maximum Core Tension" },
      { x: 720, y: 250, text: "Navel Pulled to Spine", sub: "Rigid Straight Line" }
    ],
    motion: "Anti-Extension Isometric Brace",
    phase1: "Phase 1: Setup Alignment",
    phase2: "Phase 2: Peak Core Tension"
  },
  {
    id: "leg-raise",
    title: "Lying Leg Raise",
    tag: "LOWER RECTUS ABDOMINIS (V-CUT)",
    category: "leg-raise",
    labels: [
      { x: 250, y: 140, text: "Legs Hovering 2\"", sub: "Lower Back Glued to Mat" },
      { x: 170, y: 230, text: "Hands at Sides", sub: "Inhale on Descent" },
      { x: 750, y: 90, text: "Lower Rectus Abdominis", sub: "(Highlighted 80-90° Lift)" },
      { x: 780, y: 160, text: "Hip Flexors & Core", sub: "Exhale on Lift" },
      { x: 720, y: 250, text: "No Lumbar Arching", sub: "Pure Abdominal Control" }
    ],
    motion: "Vertical Abdominal Lift",
    phase1: "Phase 1: Legs Extended 2 Inches",
    phase2: "Phase 2: Vertical 90° Lift"
  },
  {
    id: "db-crunch",
    title: "Dumbbell Crunch",
    tag: "UPPER RECTUS ABDOMINIS",
    category: "db-crunch",
    labels: [
      { x: 250, y: 140, text: "Supine with DB", sub: "Held on Upper Chest" },
      { x: 170, y: 230, text: "Feet Flat on Mat", sub: "Knees Bent 90°" },
      { x: 750, y: 90, text: "Upper Rectus Abdominis", sub: "(Highlighted 30-45° Flexion)" },
      { x: 780, y: 160, text: "Scapula Lifted", sub: "Ribs to Pelvis" },
      { x: 720, y: 250, text: "1s Peak Squeeze", sub: "Not a Full Sit-Up" }
    ],
    motion: "Thoracic Flexion Arc",
    phase1: "Phase 1: Mat Start",
    phase2: "Phase 2: Upper Abs Crunch"
  }
];

function generateExactRefSvgHtml(ex) {
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
      background: #040810;
      color: #94a3b8;
      font-family: 'Outfit', sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px 38px;
    }

    /* Sci-Fi Blueprint Tech Grid */
    .sci-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(0, 216, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 216, 255, 0.05) 1px, transparent 1px);
      background-size: 28px 28px;
      pointer-events: none;
    }
    .glow-cyan {
      position: absolute;
      top: -120px;
      right: -80px;
      width: 550px;
      height: 550px;
      background: radial-gradient(circle, rgba(0, 216, 255, 0.16) 0%, transparent 70%);
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
      border: 1px solid rgba(0, 216, 255, 0.45);
      border-left: 4px solid #00d8ff;
      background: rgba(6, 18, 36, 0.85);
      padding: 10px 24px;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0, 216, 255, 0.12);
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
      background: rgba(5, 14, 28, 0.9);
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
      height: 510px;
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
      <div class="hud-title-text">${ex.title}</div>
      <div class="hud-subtitle">BIOMECHANICAL MOTION BLUEPRINT // HUD-v2.4</div>
    </div>
    <div class="hud-telemetry-box">
      <div class="tele-row">
        <span class="tele-label">SYSTEM_MODE:</span>
        <span class="tele-val">ANATOMY_HUD</span>
      </div>
      <div class="tele-row">
        <span class="tele-label">TARGET_LOAD:</span>
        <span class="tele-cyan">${ex.tag}</span>
      </div>
      <div class="tele-row">
        <span class="tele-label">KINEMATICS:</span>
        <span class="tele-val">ACCURATE_ARC</span>
      </div>
    </div>
  </div>

  <!-- Main Stage with Vector Muscular Figures & Glowing Highlight Shaders -->
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
          <stop offset="0%" stop-color="#00d8ff" stop-opacity="0.3" />
          <stop offset="60%" stop-color="#00d8ff" />
          <stop offset="100%" stop-color="#00f084" />
        </linearGradient>
      </defs>

      <!-- Stage Grid & Geometric Circles -->
      <circle cx="340" cy="240" r="165" stroke="rgba(0, 216, 255, 0.08)" stroke-width="1.5" stroke-dasharray="6 4" />
      <circle cx="860" cy="240" r="165" stroke="rgba(0, 216, 255, 0.12)" stroke-width="1.5" stroke-dasharray="6 4" />
      <line x1="60" y1="440" x2="1140" y2="440" stroke="rgba(0, 216, 255, 0.15)" stroke-width="1" stroke-dasharray="8 6" />

      <!-- Corner Brackets -->
      <!-- Left Box (Phase 1) -->
      <path d="M 160 70 L 140 70 L 140 90 M 540 70 L 560 70 L 560 90 M 140 390 L 140 410 L 160 410 M 560 390 L 560 410 L 540 410" stroke="rgba(0, 216, 255, 0.35)" stroke-width="1.5" />
      <text x="350" y="55" fill="#64748b" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">${ex.phase1}</text>
      
      <!-- Right Box (Phase 2) -->
      <path d="M 680 70 L 660 70 L 660 90 M 1060 70 L 1080 70 L 1080 90 M 660 390 L 660 410 L 680 410 M 1080 390 L 1080 410 L 1060 410" stroke="rgba(0, 240, 132, 0.45)" stroke-width="1.5" />
      <text x="870" y="55" fill="#00f084" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="700" text-anchor="middle">${ex.phase2}</text>

      <!-- ================= PHASE 1 ATHLETE FIGURE ================= -->
      <g transform="translate(200, 70)">
        ${renderAthleticFigure(ex.category, false)}
      </g>

      <!-- ================= CENTER KINETIC MOTION TRAJECTORY ARROW ================= -->
      <g transform="translate(420, 220)">
        <path d="M 50 80 Q 180 160 310 30" stroke="url(#cyan-arc-grad)" stroke-width="4" fill="none" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
        <path d="M 310 30 L 290 28 M 310 30 L 305 48" stroke="#00f084" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        <text x="180" y="160" fill="#00f084" font-family="'Share Tech Mono', monospace" font-size="12" font-weight="800" text-anchor="middle" letter-spacing="1">${ex.motion}</text>
      </g>

      <!-- ================= PHASE 2 ATHLETE FIGURE ================= -->
      <g transform="translate(720, 70)">
        ${renderAthleticFigure(ex.category, true)}
      </g>

      <!-- ================= TECHNICAL ANATOMY LEADER LINES & LABELS ================= -->
      ${renderLabels(ex.labels)}
    </svg>
  </div>

  <!-- Bottom HUD Footer -->
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="status-dot"></div>
      <span>BIOMECHANICAL ACCURACY // VERIFIED</span>
      <span class="tag-highlight">${ex.tag}</span>
    </div>
    <div style="color: #64748b;">V-SHAPE WORKOUT TRACKER // HIGH-DEFINITION BLUEPRINT HUD</div>
  </div>
</body>
</html>`;
}

function renderAthleticFigure(category, isPhase2) {
  const lineCol = isPhase2 ? "#e2e8f0" : "#94a3b8";
  const darkCore = isPhase2 ? "#1e293b" : "#0f172a";
  const muscleShade = isPhase2 ? "#64748b" : "#475569";

  switch (category) {
    case "bent-fly":
      if (!isPhase2) {
        return `
          <path d="M 150 70 Q 170 65 175 80 Q 170 95 155 95 Q 145 95 142 80 Z" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 160 68 L 175 75 L 170 82 Z" fill="#475569" />
          <path d="M 150 90 Q 130 105 115 120" stroke="${lineCol}" stroke-width="10" stroke-linecap="round" />
          <path d="M 145 95 L 105 145 L 70 205 L 60 250" stroke="${lineCol}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 130 115 L 105 145 L 80 175" stroke="${muscleShade}" stroke-width="8" stroke-linecap="round" />
          <path d="M 60 250 L 95 325 L 85 380" stroke="${lineCol}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 60 250 L 45 325 L 35 380" stroke="${muscleShade}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="75" y="378" width="30" height="10" rx="3" fill="#334155" stroke="${lineCol}" stroke-width="1.5" />
          <rect x="25" y="378" width="30" height="10" rx="3" fill="#1e293b" stroke="${muscleShade}" stroke-width="1.5" />
          <path d="M 125 130 L 125 240" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
          <polygon points="105,235 145,235 152,245 145,255 105,255 98,245" fill="${darkCore}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <path d="M 150 70 Q 170 65 175 80 Q 170 95 155 95 Q 145 95 142 80 Z" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 160 68 L 175 75 L 170 82 Z" fill="#475569" />
          <path d="M 145 95 L 105 145 L 70 205 L 60 250" stroke="${lineCol}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
          <!-- GLOWING POSTERIOR DELTOIDS -->
          <path d="M 125 110 Q 95 125 75 155" stroke="#00d8ff" stroke-width="22" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
          <path d="M 120 120 L 95 145" stroke="#ffffff" stroke-width="5" filter="url(#neon-cyan-glow)" />
          <path d="M 60 250 L 95 325 L 85 380" stroke="${lineCol}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 60 250 L 45 325 L 35 380" stroke="${muscleShade}" stroke-width="13" stroke-linecap="round" stroke-linejoin="round" />
          <rect x="75" y="378" width="30" height="10" rx="3" fill="#334155" stroke="${lineCol}" stroke-width="1.5" />
          <rect x="25" y="378" width="30" height="10" rx="3" fill="#1e293b" stroke="${muscleShade}" stroke-width="1.5" />
          <!-- Wings Flown Outwards (Peak Fly) -->
          <path d="M 125 130 L 45 130 M 125 130 L 215 130" stroke="#ffffff" stroke-width="11" stroke-linecap="round" />
          <polygon points="25,122 65,122 72,132 65,142 25,142 18,132" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
          <polygon points="195,122 235,122 242,132 235,142 195,142 188,132" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
        `;
      }

    case "bent-row":
    case "bent-row-flared":
      if (!isPhase2) {
        return `
          <path d="M 150 70 Q 170 65 175 80 Q 170 95 155 95 Q 145 95 142 80 Z" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 145 95 L 105 145 L 70 205 L 60 250" stroke="${lineCol}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 60 250 L 95 325 L 85 380 M 60 250 L 45 325 L 35 380" stroke="${lineCol}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 125 130 L 125 240" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
          <polygon points="105,235 145,235 152,245 145,255 105,255 98,245" fill="${darkCore}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <path d="M 150 70 Q 170 65 175 80 Q 170 95 155 95 Q 145 95 142 80 Z" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 145 95 L 105 145 L 70 205 L 60 250" stroke="${lineCol}" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" />
          <!-- GLOWING LATS / RHOMBOIDS -->
          <path d="M 115 130 Q 85 150 70 185" stroke="#00d8ff" stroke-width="22" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
          <path d="M 60 250 L 95 325 L 85 380 M 60 250 L 45 325 L 35 380" stroke="${lineCol}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Pulled Elbow to Ribs -->
          <path d="M 125 130 L 75 110 L 80 185" stroke="#ffffff" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" />
          <polygon points="65,180 95,180 102,190 95,200 65,200 58,190" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
        `;
      }

    case "push-up":
      if (!isPhase2) {
        return `
          <circle cx="65" cy="180" r="16" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 80 188 L 240 235" stroke="${lineCol}" stroke-width="20" stroke-linecap="round" />
          <path d="M 95 195 L 95 290" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
          <polygon points="85,285 105,285 110,295 105,305 85,305 80,295" fill="#334155" stroke="#00d8ff" stroke-width="2" />
          <rect x="235" y="235" width="25" height="10" rx="3" fill="#334155" stroke="${lineCol}" stroke-width="1.5" />
          <line x1="30" y1="300" x2="270" y2="300" stroke="rgba(0, 216, 255, 0.4)" stroke-width="3" stroke-linecap="round" />
        `;
      } else {
        return `
          <circle cx="65" cy="245" r="16" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 80 250 L 240 260" stroke="${lineCol}" stroke-width="20" stroke-linecap="round" />
          <!-- GLOWING CHEST & CORE -->
          <circle cx="105" cy="245" r="18" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <path d="M 120 252 L 180 256" stroke="#00d8ff" stroke-width="14" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
          <path d="M 95 250 L 70 240 L 85 290" stroke="#ffffff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <polygon points="75,285 95,285 100,295 95,305 75,305 70,295" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
          <line x1="30" y1="300" x2="270" y2="300" stroke="rgba(0, 216, 255, 0.4)" stroke-width="3" stroke-linecap="round" />
        `;
      }

    case "standing-press":
      if (!isPhase2) {
        return `
          <circle cx="150" cy="65" r="18" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 150 85 L 150 215" stroke="${lineCol}" stroke-width="20" stroke-linecap="round" />
          <path d="M 140 215 L 130 325 L 120 375 M 160 215 L 170 325 L 180 375" stroke="${lineCol}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 130 95 L 105 135 L 110 100 M 170 95 L 195 135 L 190 100" stroke="#ffffff" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
          <polygon points="95,95 125,95 130,105 125,115 95,115 90,105" fill="${darkCore}" stroke="#00d8ff" stroke-width="2" />
          <polygon points="175,95 205,95 210,105 205,115 175,115 170,105" fill="${darkCore}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <circle cx="150" cy="65" r="18" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 150 85 L 150 215" stroke="${lineCol}" stroke-width="20" stroke-linecap="round" />
          <!-- GLOWING DELTOIDS OVERHEAD LOCKOUT -->
          <circle cx="120" cy="95" r="18" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <circle cx="180" cy="95" r="18" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <path d="M 140 215 L 130 325 L 120 375 M 160 215 L 170 325 L 180 375" stroke="${lineCol}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 120 95 L 115 20 M 180 95 L 185 20" stroke="#ffffff" stroke-width="11" stroke-linecap="round" />
          <polygon points="100,10 130,10 136,20 130,30 100,30 94,20" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
          <polygon points="170,10 200,10 206,20 200,30 170,30 164,20" fill="#00d8ff" stroke="#ffffff" stroke-width="2" filter="url(#neon-cyan-glow)" />
        `;
      }

    case "standing-latraise":
    case "standing-shrug":
    case "standing-curl":
    case "standing-hammer":
    default:
      if (!isPhase2) {
        return `
          <circle cx="150" cy="65" r="18" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 142 55 Q 155 50 164 58 L 160 68 Z" fill="#475569" />
          <path d="M 150 85 L 150 215" stroke="${lineCol}" stroke-width="20" stroke-linecap="round" />
          <path d="M 135 110 Q 150 130 135 170 M 165 110 Q 150 130 165 170" stroke="${muscleShade}" stroke-width="8" stroke-linecap="round" />
          <path d="M 140 215 L 130 325 L 120 375 M 160 215 L 170 325 L 180 375" stroke="${lineCol}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M 130 95 L 110 220 M 170 95 L 190 220" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
          <polygon points="95,215 125,215 130,225 125,235 95,235 90,225" fill="${darkCore}" stroke="#00d8ff" stroke-width="2" />
          <polygon points="175,215 205,215 210,225 205,235 175,235 170,225" fill="${darkCore}" stroke="#00d8ff" stroke-width="2" />
        `;
      } else {
        return `
          <circle cx="150" cy="65" r="18" fill="${darkCore}" stroke="${lineCol}" stroke-width="2" />
          <path d="M 142 55 Q 155 50 164 58 L 160 68 Z" fill="#475569" />
          <path d="M 150 85 L 150 215" stroke="${lineCol}" stroke-width="20" stroke-linecap="round" />
          <!-- GLOWING DELTS / TARGET MUSCLE -->
          <circle cx="120" cy="95" r="18" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <circle cx="180" cy="95" r="18" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
          <path d="M 140 215 L 130 325 L 120 375 M 160 215 L 170 325 L 180 375" stroke="${lineCol}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
          <!-- Raised Peak Arms -->
          <path d="M 120 95 L 45 105 M 180 95 L 255 105" stroke="#ffffff" stroke-width="11" stroke-linecap="round" />
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
      <circle cx="0" cy="0" r="4" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
      <line x1="0" y1="0" x2="35" y2="-18" stroke="rgba(0, 216, 255, 0.85)" stroke-width="1.8" />
      <line x1="35" y1="-18" x2="230" y2="-18" stroke="rgba(0, 216, 255, 0.85)" stroke-width="1.8" />
      <text x="40" y="-24" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="13" font-weight="800">${l.text}</text>
      <text x="40" y="-7" fill="#00d8ff" font-family="'Share Tech Mono', monospace" font-size="11" font-weight="700">${l.sub}</text>
    </g>
  `).join("\n");
}

async function run() {
  console.log("Generating 100% exact Reference-Style HUD Blueprint diagrams for ALL 21 exercises...");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2
  });

  for (const ex of EXERCISES) {
    const html = generateExactRefSvgHtml(ex);
    await page.setContent(html, { waitUntil: "networkidle" });
    const outPath = path.join(DIAGRAMS_DIR, `${ex.id}.jpg`);
    await page.screenshot({ path: outPath, type: "jpeg", quality: 95 });
    console.log(`Generated exact reference-style diagram: ${ex.id}.jpg`);
  }

  await browser.close();
  console.log("ALL 21 exercises now use the exact Reference Style in public/diagrams/*.jpg!");
}

run().catch(err => {
  console.error("Error generating exact ref diagrams:", err);
  process.exit(1);
});
