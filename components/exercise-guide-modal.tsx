"use client";

import { useState } from "react";
import { type ExerciseGuide, getExerciseGuide } from "@/lib/workouts/exercise-guides";
import { DumbbellIcon, FireIcon, MuscleTagIcon } from "@/components/icons";
import { ExerciseIllustration } from "@/components/exercise-illustrations";

export function ExerciseGuideModal({
  exerciseId,
  isOpen,
  onClose,
}: {
  exerciseId: string | null;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"steps" | "muscles" | "tips">("steps");
  const [mediaMode, setMediaMode] = useState<"photo" | "diagram">("photo");

  if (!isOpen || !exerciseId) return null;

  const guide: ExerciseGuide | undefined = getExerciseGuide(exerciseId);
  if (!guide) return null;

  return (
    <div className="guide-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="guide-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="guide-modal-header">
          <div>
            <div className="guide-tag-row">
              <span className="guide-category-badge">{guide.categoryTh}</span>
              <span className="guide-equipment-badge">
                <DumbbellIcon className="w-3 h-3" />
                <span>{guide.equipment}</span>
              </span>
            </div>
            <h2 className="guide-title">{guide.name}</h2>
            <p className="guide-subtitle" lang="th">{guide.nameTh}</p>
          </div>
          <button type="button" className="guide-close-btn" onClick={onClose} aria-label="Close guide">
            ✕
          </button>
        </div>

        {/* Visual Media Showcase with 3D Photo Render & Diagram Toggle */}
        <div className="guide-media-showcase">
          <div className="guide-media-topbar">
            <span className="guide-media-label">
              {mediaMode === "photo" ? "📸 ภาพสาธิตท่าฝึก 3D Anatomy" : "📐 ไดอะแกรมทิศทางการออกแรง"}
            </span>
            <div className="guide-media-toggle-pills">
              <button
                type="button"
                className={`media-toggle-btn ${mediaMode === "photo" ? "active" : ""}`}
                onClick={() => setMediaMode("photo")}
              >
                ภาพ 3D
              </button>
              <button
                type="button"
                className={`media-toggle-btn ${mediaMode === "diagram" ? "active" : ""}`}
                onClick={() => setMediaMode("diagram")}
              >
                ไดอะแกรม
              </button>
            </div>
          </div>

          <div className="guide-media-view">
            {mediaMode === "photo" ? (
              <div className="guide-photo-wrap">
                <img
                  src={guide.imageUrl ?? `/exercises/${guide.id}.jpg`}
                  alt={`${guide.name} visual demonstration`}
                  className="guide-photo-img"
                  loading="eager"
                />
              </div>
            ) : guide.diagramUrl ? (
              <div className="guide-photo-wrap guide-diagram-photo-wrap">
                <img
                  src={guide.diagramUrl}
                  alt={`${guide.name} biomechanical diagram infographic`}
                  className="guide-photo-img"
                  loading="eager"
                />
              </div>
            ) : (
              <div className="guide-illustration-wrap">
                <ExerciseIllustration exerciseId={guide.id} className="guide-svg-canvas" />
              </div>
            )}
          </div>
        </div>

        {/* V-Shape Impact Callout Banner */}
        <div className="guide-vshape-banner">
          <div className="guide-vshape-icon">
            <FireIcon className="w-4 h-4" />
          </div>
          <div>
            <span className="guide-vshape-title">V-SHAPE IMPACT</span>
            <p className="guide-vshape-text">{guide.vShapeImpact}</p>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="guide-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "steps"}
            className={`guide-tab-btn ${activeTab === "steps" ? "active" : ""}`}
            onClick={() => setActiveTab("steps")}
          >
            📋 วิธีเล่นทีละขั้นตอน
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "muscles"}
            className={`guide-tab-btn ${activeTab === "muscles" ? "active" : ""}`}
            onClick={() => setActiveTab("muscles")}
          >
            🎯 กล้ามเนื้อเป้าหมาย
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "tips"}
            className={`guide-tab-btn ${activeTab === "tips" ? "active" : ""}`}
            onClick={() => setActiveTab("tips")}
          >
            💡 เทคนิค & ข้อควรระวัง
          </button>
        </div>

        {/* Tab Content */}
        <div className="guide-tab-content">
          {activeTab === "steps" && (
            <div className="guide-steps-view">
              {/* Setup */}
              <div className="guide-section">
                <h3 className="guide-section-heading">1. การเซ็ตท่าเริ่มต้น (Setup)</h3>
                <ul className="guide-list">
                  {guide.setup.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Execution */}
              <div className="guide-section">
                <h3 className="guide-section-heading">2. จังหวะการเคลื่อนไหว (Execution)</h3>
                <ul className="guide-list">
                  {guide.execution.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Breathing */}
              <div className="guide-section guide-breathing-box">
                <h3 className="guide-section-heading">🫁 จังหวะการหายใจ (Breathing)</h3>
                <p className="guide-breathing-text">{guide.breathing}</p>
              </div>
            </div>
          )}

          {activeTab === "muscles" && (
            <div className="guide-muscles-view">
              <div className="guide-section">
                <h3 className="guide-section-heading">กล้ามเนื้อหลักที่ทำงาน (Primary Muscles)</h3>
                <div className="guide-muscle-pills">
                  {guide.primaryMusclesTh.map((m, i) => (
                    <span key={i} className="guide-muscle-pill primary">
                      <MuscleTagIcon name={m} />
                      <span>{m} ({guide.primaryMuscles[i] ?? ""})</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="guide-section" style={{ marginTop: 16 }}>
                <h3 className="guide-section-heading">กล้ามเนื้อรองที่ช่วยพยุง (Secondary Muscles)</h3>
                <div className="guide-muscle-pills">
                  {guide.secondaryMuscles.map((m, i) => (
                    <span key={i} className="guide-muscle-pill secondary">
                      <span>• {m}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "tips" && (
            <div className="guide-tips-view">
              <div className="guide-section">
                <h3 className="guide-section-heading" style={{ color: "var(--accent-primary)" }}>
                  ⭐ เคล็ดลับการโฟกัส (Pro Tips)
                </h3>
                <ul className="guide-list tips-list">
                  {guide.proTips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="guide-section" style={{ marginTop: 16 }}>
                <h3 className="guide-section-heading" style={{ color: "var(--accent-danger)" }}>
                  ⚠️ ข้อผิดพลาดที่ห้ามทำ (Common Mistakes)
                </h3>
                <ul className="guide-list mistakes-list">
                  {guide.commonMistakes.map((mistake, i) => (
                    <li key={i}>{mistake}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="guide-modal-footer">
          <button type="button" className="start-button" onClick={onClose}>
            เข้าใจแล้ว พร้อมฝึก
          </button>
        </div>
      </div>
    </div>
  );
}

export function ExerciseInfoButton({
  exerciseId,
  onClick,
}: {
  exerciseId: string;
  onClick: (id: string) => void;
}) {
  return (
    <button
      type="button"
      className="exercise-info-btn"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onClick(exerciseId);
      }}
      title="ดูภาพสอนวิธีเล่นและเทคนิคการจัดท่า"
      aria-label="ดูภาพสอนวิธีเล่นและเทคนิคการจัดท่า"
    >
      <span style={{ fontSize: "0.82rem" }}>📸</span>
      <span>ดูภาพสอนท่า</span>
    </button>
  );
}
