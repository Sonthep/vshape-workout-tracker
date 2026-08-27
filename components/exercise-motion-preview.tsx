"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ExerciseMotionPreview({
  exerciseId,
  exerciseName,
}: {
  exerciseId: string;
  exerciseName: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const isPlaying = isVisible && !isPaused;

  return (
    <div ref={rootRef} className={`motion-preview ${isPlaying ? "playing" : "paused"}`}>
      <div className="motion-preview-stage" aria-label={`ภาพเคลื่อนไหวสาธิต ${exerciseName}`}>
        <Image
          src={`/motions/${exerciseId}-start.jpg`}
          alt={`${exerciseName} ท่าเริ่มต้น`}
          fill
          sizes="(max-width: 680px) 100vw, 640px"
          className="motion-frame motion-frame-start"
        />
        <Image
          src={`/motions/${exerciseId}-end.jpg`}
          alt=""
          aria-hidden="true"
          fill
          sizes="(max-width: 680px) 100vw, 640px"
          className="motion-frame motion-frame-end"
        />
        <span className="motion-phase motion-phase-start">เริ่มต้น</span>
        <span className="motion-phase motion-phase-end">ออกแรง</span>
      </div>
      <div className="motion-preview-footer">
        <span>สาธิต 2 จังหวะ</span>
        <button type="button" onClick={() => setIsPaused((value) => !value)}>
          {isPaused ? "เล่น" : "หยุด"}
        </button>
      </div>
    </div>
  );
}
