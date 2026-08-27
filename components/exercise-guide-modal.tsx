"use client";

import { useEffect, useRef, useState } from "react";
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
  const [isMediaExpanded, setIsMediaExpanded] = useState(true);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => dialogRef.current?.focus());

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [exerciseId, isOpen, onClose]);

  if (!isOpen || !exerciseId) return null;

  const guide: ExerciseGuide | undefined = getExerciseGuide(exerciseId);
  if (!guide) return null;

  return (
    <div className="guide-modal-backdrop" onClick={onClose}>
      <div
        ref={dialogRef}
        className="guide-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exercise-guide-title"
        tabIndex={-1}
      >
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
            <h2 id="exercise-guide-title" className="guide-title">{guide.name}</h2>
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
              {mediaMode === "photo" ? "ภาพสาธิตท่าฝึก 3D" : "ไดอะแกรมการเคลื่อนไหว"}
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
            <button
              type="button"
              className="guide-media-collapse"
              aria-expanded={isMediaExpanded}
              onClick={() => setIsMediaExpanded((value) => !value)}
            >
              {isMediaExpanded ? "ย่อภาพ" : "แสดงภาพ"}
            </button>
          </div>

          {isMediaExpanded ? <div className="guide-media-view">
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
          </div> : null}
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
        <div
          className="guide-tabs"
          role="tablist"
          onKeyDown={(event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            const order = ["steps", "muscles", "tips"] as const;
            const current = order.indexOf(activeTab);
            const delta = event.key === "ArrowRight" ? 1 : -1;
            const next = order[(current + delta + order.length) % order.length];
            setActiveTab(next);
            requestAnimationFrame(() =>
              dialogRef.current?.querySelector<HTMLElement>(`[data-guide-tab="${next}"]`)?.focus(),
            );
          }}
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "steps"}
            data-guide-tab="steps"
            tabIndex={activeTab === "steps" ? 0 : -1}
            className={`guide-tab-btn ${activeTab === "steps" ? "active" : ""}`}
            onClick={() => setActiveTab("steps")}
          >
            วิธีเล่น
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "muscles"}
            data-guide-tab="muscles"
            tabIndex={activeTab === "muscles" ? 0 : -1}
            className={`guide-tab-btn ${activeTab === "muscles" ? "active" : ""}`}
            onClick={() => setActiveTab("muscles")}
          >
            กล้ามเนื้อ
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "tips"}
            data-guide-tab="tips"
            tabIndex={activeTab === "tips" ? 0 : -1}
            className={`guide-tab-btn ${activeTab === "tips" ? "active" : ""}`}
            onClick={() => setActiveTab("tips")}
          >
            เทคนิคและข้อควรระวัง
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
            ปิดคู่มือ
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
