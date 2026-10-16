// Adapted from Watermelon UI's command-search, continuous-tabs and copy-confirm.
// MIT © 2026 Watermelon Platform Contributors. See docs/UI-SOURCES.md.
import React, { useEffect, useRef, useState } from "react";
import { Search, ArrowUpRight, X, Copy, Check, Sun, Moon } from "lucide-react";
import { motion, LayoutGroup, useReducedMotion } from "motion/react";

export function ThemeSwitch({ theme, onChange, l }) {
  return (
    <button
      className="theme-switch"
      onClick={() => onChange(theme === "dark" ? "light" : "dark")}
      aria-label={
        l
          ? theme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"
          : theme === "dark"
            ? "Hellen Modus aktivieren"
            : "Dunklen Modus aktivieren"
      }
      title={l ? "Change appearance" : "Darstellung wechseln"}
    >
      <Sun size={15} />
      <span className={"theme-switch-track " + theme}>
        <span />
      </span>
      <Moon size={15} />
    </button>
  );
}
export function ContinuousTabs({ items, value, onChange, label }) {
  const reduced = useReducedMotion();
  const id = useRef("tabs-" + Math.random().toString(36).slice(2));
  return (
    <LayoutGroup id={id.current}>
      <div className="continuous-tabs" role="group" aria-label={label}>
        {items.map((item) => (
          <button
            key={item.id}
            aria-pressed={value === item.id}
            onClick={() => onChange(item.id)}
          >
            {value === item.id && (
              <motion.span
                className="active-pill"
                layoutId="pill"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            )}
            <span className="tab-label">{item.label}</span>
          </button>
        ))}
      </div>
    </LayoutGroup>
  );
}
export function CopyConfirm({ text, l, onError }) {
  const [copied, setCopied] = useState(false),
    timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      onError?.();
    }
  }
  return (
    <button
      className={"copy-confirm " + (copied ? "copied" : "")}
      onClick={copy}
      aria-live="polite"
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
      <span>
        {copied ? (l ? "Copied" : "Kopiert") : l ? "Copy" : "Kopieren"}
      </span>
    </button>
  );
}
export function CommandSearch({ open, onClose, items, l }) {
  const dialog = useRef(),
    input = useRef(),
    [query, setQuery] = useState(""),
    [selected, setSelected] = useState(0);
  const results = items
    .filter((x) =>
      (x.title + " " + x.category).toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 12);
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelected(0);
      dialog.current.showModal();
      input.current?.focus();
    } else if (dialog.current?.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    if (open)
      document
        .getElementById("command-" + selected)
        ?.scrollIntoView({ block: "nearest" });
  }, [selected, open]);
  function choose(item) {
    onClose();
    item.action();
  }
  return (
    <dialog
      className="command-dialog"
      ref={dialog}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
      aria-label={l ? "Quick search" : "Schnellsuche"}
      data-lenis-prevent
    >
      <div className="command-search-input">
        <Search size={21} />
        <input
          ref={input}
          aria-label={l ? "Search studio" : "Studio durchsuchen"}
          placeholder={
            l ? "Where do you want to go?" : "Was möchtest du entdecken?"
          }
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(0);
          }}
          role="combobox"
          aria-expanded="true"
          aria-controls="command-results"
          aria-activedescendant={
            results.length
              ? "command-" + Math.min(selected, results.length - 1)
              : undefined
          }
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelected((i) =>
                results.length ? (i + 1) % results.length : 0,
              );
            }
            if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelected((i) =>
                results.length ? (i - 1 + results.length) % results.length : 0,
              );
            }
            if (e.key === "Enter") {
              e.preventDefault();
              if (results[selected]) choose(results[selected]);
            }
          }}
        />
        <button
          className="icon-btn"
          aria-label={l ? "Close search" : "Suche schließen"}
          onClick={onClose}
        >
          <X size={18} />
        </button>
      </div>
      <div
        className="command-results"
        id="command-results"
        role="listbox"
        aria-label={l ? "Results" : "Ergebnisse"}
      >
        {results.map((item, i) => (
          <div
            key={item.id}
            id={"command-" + i}
            role="option"
            aria-selected={i === selected}
            className={
              "command-result " + (i === selected ? "highlighted" : "")
            }
            onMouseMove={() => setSelected(i)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => choose(item)}
          >
            <span className="command-result-icon">
              <item.icon size={18} />
            </span>
            <span>
              <b>{item.title}</b>
              <small>{item.category}</small>
            </span>
            <ArrowUpRight size={16} />
          </div>
        ))}
        {!results.length && (
          <p className="command-empty">
            {l
              ? "Nothing found. Try a different term."
              : "Nichts gefunden. Probiere einen anderen Begriff."}
          </p>
        )}
      </div>
      <div className="command-hint">
        <span>↑ ↓ {l ? "navigate" : "navigieren"}</span>
        <span>↵ {l ? "open" : "öffnen"}</span>
        <span>esc {l ? "close" : "schließen"}</span>
      </div>
    </dialog>
  );
}
