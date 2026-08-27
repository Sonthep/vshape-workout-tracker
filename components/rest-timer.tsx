"use client";

import { createContext, useContext, useEffect, useReducer, type ReactNode } from "react";
import { TimerIcon } from "@/components/icons";

const ADJUST_STEP_SECONDS = 15;

type TimerState = {
  label: string | null;
  totalSeconds: number;
  remainingSeconds: number;
  running: boolean;
  endAt: number | null;
};

const initialState: TimerState = {
  label: null,
  totalSeconds: 0,
  remainingSeconds: 0,
  running: false,
  endAt: null,
};

type TimerAction =
  | { type: "start"; seconds: number; label: string; now: number }
  | { type: "tick"; now: number }
  | { type: "pause"; now: number }
  | { type: "resume"; now: number }
  | { type: "skip" }
  | { type: "adjust"; deltaSeconds: number; now: number };

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "start":
      return {
        label: action.label,
        totalSeconds: action.seconds,
        remainingSeconds: action.seconds,
        running: true,
        endAt: action.now + action.seconds * 1000,
      };
    case "tick": {
      if (!state.running || state.endAt === null) return state;
      const remaining = Math.max(0, Math.round((state.endAt - action.now) / 1000));
      if (remaining <= 0) return { ...state, remainingSeconds: 0, running: false, endAt: null };
      return { ...state, remainingSeconds: remaining };
    }
    case "pause": {
      if (!state.running || state.endAt === null) return state;
      const remaining = Math.max(0, Math.round((state.endAt - action.now) / 1000));
      return { ...state, remainingSeconds: remaining, running: false, endAt: null };
    }
    case "resume": {
      if (state.running || state.remainingSeconds <= 0) return state;
      return { ...state, running: true, endAt: action.now + state.remainingSeconds * 1000 };
    }
    case "skip":
      return initialState;
    case "adjust": {
      const remainingSeconds = Math.max(0, state.remainingSeconds + action.deltaSeconds);
      return {
        ...state,
        remainingSeconds,
        endAt: state.running ? action.now + remainingSeconds * 1000 : state.endAt,
      };
    }
    default:
      return state;
  }
}

type RestTimerContextValue = {
  label: string | null;
  remainingSeconds: number;
  running: boolean;
  done: boolean;
  start: (seconds: number, label: string) => void;
  pause: () => void;
  resume: () => void;
  skip: () => void;
  adjust: (deltaSeconds: number) => void;
};

const RestTimerContext = createContext<RestTimerContextValue | null>(null);

export function RestTimerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { label, totalSeconds, remainingSeconds, running, endAt } = state;

  useEffect(() => {
    if (!running || endAt === null) return;
    const interval = setInterval(() => dispatch({ type: "tick", now: Date.now() }), 250);
    return () => clearInterval(interval);
  }, [running, endAt]);

  const value: RestTimerContextValue = {
    label,
    remainingSeconds,
    running,
    done: label !== null && !running && remainingSeconds <= 0 && totalSeconds > 0,
    start: (seconds, exerciseLabel) => dispatch({ type: "start", seconds, label: exerciseLabel, now: Date.now() }),
    pause: () => dispatch({ type: "pause", now: Date.now() }),
    resume: () => dispatch({ type: "resume", now: Date.now() }),
    skip: () => dispatch({ type: "skip" }),
    adjust: (deltaSeconds) => dispatch({ type: "adjust", deltaSeconds, now: Date.now() }),
  };

  return <RestTimerContext.Provider value={value}>{children}</RestTimerContext.Provider>;
}

export function useRestTimer(): RestTimerContextValue {
  const ctx = useContext(RestTimerContext);
  if (!ctx) throw new Error("useRestTimer must be used within a RestTimerProvider");
  return ctx;
}

function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export function RestTimerBar() {
  const { label, remainingSeconds, running, done, pause, resume, skip, adjust } = useRestTimer();

  if (label === null) return null;

  return (
    <div className="rest-timer-bar" role="status" aria-live="polite">
      <div className="rest-timer-info">
        <div className="feature-icon-wrap" style={{ width: 36, height: 36, background: "rgba(0, 240, 132, 0.15)", color: "var(--accent-primary)" }}>
          <TimerIcon className="w-5 h-5" />
        </div>
        <div className="rest-timer-clock-wrap">
          <span className="rest-timer-label">{done ? "Rest complete" : `Rest · ${label}`}</span>
          <span className="rest-timer-clock">{formatClock(remainingSeconds)}</span>
        </div>
      </div>
      <div className="rest-timer-controls">
        {!done ? (
          <>
            <button type="button" onClick={() => adjust(-ADJUST_STEP_SECONDS)} aria-label="Subtract 15 seconds">
              −15
            </button>
            <button
              type="button"
              onClick={running ? pause : resume}
              className={running ? "rest-timer-pause-btn" : ""}
            >
              {running ? "Pause" : "Resume"}
            </button>
            <button type="button" onClick={() => adjust(ADJUST_STEP_SECONDS)} aria-label="Add 15 seconds">
              +15
            </button>
          </>
        ) : null}
        <button type="button" onClick={skip} className="rest-timer-skip">
          {done ? "Dismiss" : "Skip"}
        </button>
      </div>
    </div>
  );
}
