// Adapted from Componentry's Orbit Card Stack. MIT © 2026 Harsh Jadhav.
// Source and revision: docs/UI-SOURCES.md. Uses real notes instead of profiles.
import React, { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "motion/react";

export default function NoteOrbitStack({ notes, category, l, onOpen }) {
  const [index, setIndex] = useState(0),
    [expanded, setExpanded] = useState(false),
    [hovered, setHovered] = useState(null);
  const stage = useRef(null),
    reduced = useReducedMotion();
  const current = index % notes.length;
  const slots =
    notes.length === 1 ? [0] : notes.length === 2 ? [0, 1] : [-1, 0, 1];
  function close() {
    setExpanded(false);
    setHovered(null);
  }
  function move(delta, focus = false) {
    setIndex((current + delta + notes.length) % notes.length);
    setHovered(null);
    if (focus)
      requestAnimationFrame(() =>
        stage.current?.querySelector('[data-front="true"]')?.focus(),
      );
  }
  return (
    <section className="note-stack" aria-label={category}>
      <div className="stack-heading">
        <h2>{category}</h2>
        <span>
          {notes.length} {l ? "notes" : "Notizen"}
        </span>
      </div>
      <div
        ref={stage}
        className={"orbit-stage " + (expanded ? "expanded" : "")}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={close}
        onFocus={() => setExpanded(true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) close();
        }}
        role="group"
        aria-label={
          l
            ? "Note cards. Use arrow keys to browse."
            : "Notizkarten. Mit den Pfeiltasten blättern."
        }
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            move(event.key === "ArrowRight" ? 1 : -1, true);
          }
          if (event.key === "Escape") {
            event.preventDefault();
            close();
          }
        }}
      >
        {slots.map((slot) => {
          const note = notes[(current + slot + notes.length) % notes.length];
          const active = hovered === null ? slot === 0 : hovered === slot;
          const x = expanded
            ? `calc(${slot} * var(--orbit-spread, 60px))`
            : `${slot * 11}px`;
          const y = expanded
            ? Math.abs(slot) * 16 - (active ? 18 : 0)
            : Math.abs(slot) * 5;
          const rotation = expanded
            ? `calc(${slot} * var(--orbit-open-angle, 8.5deg))`
            : `${slot * 2.8}deg`;
          return (
            <button
              key={note.id}
              className={"orbit-note " + (slot === 0 ? "front" : "")}
              data-front={slot === 0}
              aria-label={
                (l ? "Open note: " : "Notiz öffnen: ") + note.title[l]
              }
              style={{
                "--orbit-x": x,
                "--orbit-y": y + "px",
                "--orbit-rotation": rotation,
                zIndex: active ? 5 : 3 - Math.abs(slot),
                transitionDuration: reduced ? "0ms" : "360ms",
              }}
              onMouseEnter={() => setHovered(slot)}
              onFocus={() => setHovered(slot)}
              onClick={() => onOpen(note)}
            >
              <div className="orbit-note-top">
                <span>{note.category[l]}</span>
                <ArrowUpRight size={17} />
              </div>
              <h3>{note.title[l]}</h3>
              <p>{note.summary[l]}</p>
              <span className="orbit-note-source">{note.source}</span>
            </button>
          );
        })}
      </div>
      <div className="stack-controls">
        <button
          className="icon-button"
          disabled={notes.length < 2}
          aria-label={
            (l ? "Previous note in " : "Vorherige Notiz in ") + category
          }
          onClick={() => move(-1)}
        >
          <ChevronLeft size={18} />
        </button>
        <span role="status">
          {current + 1} / {notes.length}
        </span>
        <button
          className="icon-button"
          disabled={notes.length < 2}
          aria-label={(l ? "Next note in " : "Nächste Notiz in ") + category}
          onClick={() => move(1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
