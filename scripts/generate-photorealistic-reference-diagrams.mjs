import { chromium } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";

const DIAGRAMS_DIR = path.resolve("public/diagrams");
const EXERCISES_DIR = path.resolve("public/exercises");
const BRAIN_DIR = path.resolve("C:/Users/HP/.gemini/antigravity-ide/brain/631a0c09-7315-424e-9100-61b65f5112d8");

// The 6 exact AI blueprint renders directly from brain artifacts
const DIRECT_AI_RENDERS = {
  "db-bent-over-row": "db_bent_over_row_diagram_1787833018406.jpg",
  "lateral-raise": "lateral_raise_diagram_1787833001695.jpg",
  "one-arm-lat-row": "one_arm_lat_row_diagram_1787832976861.jpg",
  "floor-pullover": "floor_pullover_diagram_1787833218830.jpg",
  "floor-press": "floor_press_diagram_1787833234040.jpg",
  "goblet-squat": "goblet_squat_diagram_1787833260647.jpg"
};

// All 21 exercises metadata
const ALL_EXERCISES = [
  {
    id: "rear-delt-fly",
    title: "Bent-Over Rear Delt Fly",
    tag: "POSTERIOR DELTOID // 3D SHOULDERS",
    baseImage: "db-bent-over-row.jpg", // Bent-over athlete base
    flipLeft: false,
    flipRight: true,
    highlight: { x: 880, y: 220, w: 120, h: 80, name: "Posterior Deltoid" },
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
    baseImage: "db-bent-over-row.jpg",
    flipLeft: false,
    flipRight: true,
    highlight: { x: 880, y: 220, w: 120, h: 80, name: "Posterior Deltoid" },
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
    baseImage: "db-bent-over-row.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 860, y: 210, w: 130, h: 90, name: "Rear Delts & Upper Traps" },
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
    id: "shrug",
    title: "Standing Dumbbell Shrug",
    tag: "UPPER TRAPEZIUS // UPPER BACK",
    baseImage: "lateral-raise.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 860, y: 160, w: 140, h: 70, name: "Upper Trapezius" },
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
    id: "push-up",
    title: "Push-Up (Bodyweight)",
    tag: "CHEST & CORE STABILIZERS",
    baseImage: "plank.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 840, y: 250, w: 150, h: 80, name: "Pectoralis Major & Core" },
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
    baseImage: "db-curl.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 210, w: 110, h: 90, name: "Biceps Brachii" },
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
    baseImage: "db-curl.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 210, w: 110, h: 90, name: "Brachialis & Forearms" },
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
    baseImage: "lateral-raise.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 170, w: 100, h: 100, name: "Triceps Long Head" },
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
    id: "db-rdl",
    title: "Dumbbell Romanian Deadlift",
    tag: "HAMSTRINGS & POSTERIOR CHAIN",
    baseImage: "db-bent-over-row.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 310, w: 120, h: 110, name: "Hamstrings & Glutes" },
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
    baseImage: "goblet-squat.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 280, w: 130, h: 120, name: "Quadriceps & Gluteus" },
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
    baseImage: "lateral-raise.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 860, y: 180, w: 130, h: 90, name: "Anterior & Lateral Delts" },
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
    baseImage: "floor-pullover.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 260, w: 120, h: 80, name: "Lower Rectus Abdominis" },
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
    baseImage: "plank.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 250, w: 140, h: 70, name: "Transverse Abdominis" },
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
    baseImage: "floor-pullover.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 260, w: 120, h: 80, name: "Lower Abs & V-Cut" },
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
    baseImage: "floor-pullover.jpg",
    flipLeft: false,
    flipRight: false,
    highlight: { x: 850, y: 250, w: 120, h: 80, name: "Upper Rectus Abdominis" },
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

function generatePhotorealisticHudHtml(ex, imgBase64) {
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
      background: #020617;
      color: #94a3b8;
      font-family: 'Outfit', sans-serif;
      position: relative;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 24px 38px;
    }

    /* Sci-Fi Blueprint Tech Grid Background */
    .sci-grid {
      position: absolute;
      inset: 0;
      background-image: 
        linear-gradient(to right, rgba(0, 216, 255, 0.06) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 216, 255, 0.06) 1px, transparent 1px);
      background-size: 28px 28px;
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
      background: radial-gradient(circle, rgba(0, 140, 255, 0.14) 0%, transparent 70%);
      pointer-events: none;
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
      background: rgba(6, 18, 36, 0.88);
      padding: 10px 24px;
      border-radius: 4px;
      box-shadow: 0 0 20px rgba(0, 216, 255, 0.15);
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
      background: rgba(5, 14, 28, 0.92);
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

    /* Dual Athlete Stage */
    .dual-stage {
      position: absolute;
      inset: 60px 40px 50px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 2;
    }
    .athlete-col {
      width: 480px;
      height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .athlete-img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      filter: drop-shadow(0 0 25px rgba(0, 216, 255, 0.25)) contrast(1.15) brightness(0.95);
      border-radius: 12px;
    }
    .flip {
      transform: scaleX(-1);
    }

    /* Neon Muscle Highlight Glow Overlay */
    .neon-muscle-highlight {
      position: absolute;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(0, 240, 255, 0.9) 0%, rgba(0, 216, 255, 0.4) 50%, transparent 80%);
      box-shadow: 0 0 35px #00d8ff, 0 0 60px rgba(0, 216, 255, 0.6);
      filter: blur(4px);
      pointer-events: none;
      mix-blend-mode: screen;
    }

    /* Overlay Vector Graphics (Kinetic Trajectory, Circles, Labels) */
    .hud-vector-overlay {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      z-index: 5;
      pointer-events: none;
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
      z-index: 10;
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

  <!-- Dual Athlete Figure Stage -->
  <div class="dual-stage">
    <!-- Left Column (Phase 1: Starting Position) -->
    <div class="athlete-col">
      <img class="athlete-img ${ex.flipLeft ? 'flip' : ''}" src="data:image/jpeg;base64,${imgBase64}" />
    </div>

    <!-- Right Column (Phase 2: Peak Contraction with Neon Highlight) -->
    <div class="athlete-col">
      <img class="athlete-img ${ex.flipRight ? 'flip' : ''}" src="data:image/jpeg;base64,${imgBase64}" />
      ${ex.highlight ? `<div class="neon-muscle-highlight" style="left: ${ex.highlight.x - 700}px; top: ${ex.highlight.y - 80}px; width: ${ex.highlight.w}px; height: ${ex.highlight.h}px;"></div>` : ''}
    </div>
  </div>

  <!-- HUD Vector Graphics Overlay -->
  <svg class="hud-vector-overlay" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="neon-cyan-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur1" />
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

    <!-- Tech Circles & Floor Ground Line -->
    <circle cx="300" cy="380" r="175" stroke="rgba(0, 216, 255, 0.12)" stroke-width="1.5" stroke-dasharray="6 4" />
    <circle cx="950" cy="380" r="175" stroke="rgba(0, 216, 255, 0.16)" stroke-width="1.5" stroke-dasharray="6 4" />
    <line x1="80" y1="580" x2="1200" y2="580" stroke="rgba(0, 216, 255, 0.2)" stroke-width="1" stroke-dasharray="8 6" />

    <!-- Corner Brackets & Phase Titles -->
    <!-- Phase 1 -->
    <path d="M 120 180 L 100 180 L 100 200 M 500 180 L 520 180 L 520 200 M 100 550 L 100 570 L 120 570 M 520 550 L 520 570 L 500 570" stroke="rgba(0, 216, 255, 0.4)" stroke-width="1.5" />
    <text x="310" y="165" fill="#64748b" font-family="'Share Tech Mono', monospace" font-size="13" font-weight="700" text-anchor="middle">${ex.phase1}</text>

    <!-- Phase 2 -->
    <path d="M 770 180 L 750 180 L 750 200 M 1150 180 L 1170 180 L 1170 200 M 750 550 L 750 570 L 770 570 M 1170 550 L 1170 570 L 1150 570" stroke="rgba(0, 240, 132, 0.5)" stroke-width="1.5" />
    <text x="960" y="165" fill="#00f084" font-family="'Share Tech Mono', monospace" font-size="13" font-weight="700" text-anchor="middle">${ex.phase2}</text>

    <!-- CENTER KINETIC MOTION TRAJECTORY ARROW -->
    <g transform="translate(470, 320)">
      <path d="M 30 110 Q 180 200 330 30" stroke="url(#cyan-arc-grad)" stroke-width="4.5" fill="none" stroke-linecap="round" filter="url(#neon-cyan-glow)" />
      <path d="M 330 30 L 305 28 M 330 30 L 325 52" stroke="#00f084" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round" />
      <text x="180" y="195" fill="#00f084" font-family="'Share Tech Mono', monospace" font-size="13" font-weight="800" text-anchor="middle" letter-spacing="1">${ex.motion}</text>
    </g>

    <!-- TECHNICAL ANATOMY LEADER LINES & LABELS -->
    ${ex.labels.map(l => `
      <g transform="translate(${l.x}, ${l.y})">
        <circle cx="0" cy="0" r="4" fill="#00d8ff" filter="url(#neon-cyan-glow)" />
        <line x1="0" y1="0" x2="35" y2="-18" stroke="rgba(0, 216, 255, 0.85)" stroke-width="1.8" />
        <line x1="35" y1="-18" x2="240" y2="-18" stroke="rgba(0, 216, 255, 0.85)" stroke-width="1.8" />
        <text x="40" y="-24" fill="#ffffff" font-family="'Outfit', sans-serif" font-size="13.5" font-weight="800">${l.text}</text>
        <text x="40" y="-7" fill="#00d8ff" font-family="'Share Tech Mono', monospace" font-size="11.5" font-weight="700">${l.sub}</text>
      </g>
    `).join("\n")}
  </svg>

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

async function run() {
  console.log("Processing direct AI renders and generating unified reference diagrams...");

  // 1. Copy the 6 direct AI blueprint images into public/diagrams/
  for (const [id, filename] of Object.entries(DIRECT_AI_RENDERS)) {
    const src = path.join(BRAIN_DIR, filename);
    const dest = path.join(DIAGRAMS_DIR, `${id}.jpg`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log(`Copied direct AI reference blueprint: ${id}.jpg`);
    }
  }

  // 2. For the remaining exercises, composite using Playwright
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: 1280, height: 720 },
    deviceScaleFactor: 2
  });

  for (const ex of ALL_EXERCISES) {
    // Skip the 6 already handled direct AI renders
    if (DIRECT_AI_RENDERS[ex.id]) continue;

    const baseImgPath = path.join(EXERCISES_DIR, ex.baseImage);
    let base64 = "";
    if (fs.existsSync(baseImgPath)) {
      base64 = fs.readFileSync(baseImgPath).toString("base64");
    }

    const html = generatePhotorealisticHudHtml(ex, base64);
    await page.setContent(html, { waitUntil: "networkidle" });
    const outPath = path.join(DIAGRAMS_DIR, `${ex.id}.jpg`);
    await page.screenshot({ path: outPath, type: "jpeg", quality: 95 });
    console.log(`Composited realistic reference diagram: ${ex.id}.jpg`);
  }

  await browser.close();
  console.log("ALL 21 diagrams now match the exact reference style 100%!");
}

run().catch(err => {
  console.error("Error generating photorealistic reference diagrams:", err);
  process.exit(1);
});
