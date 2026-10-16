import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  Shapes,
  Play,
  LayoutTemplate,
  FileCode2,
  Search,
  Plus,
  Download,
  Pencil,
  Check,
  ArrowRight,
  Printer,
  X,
} from "lucide-react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  ThemeSwitch,
  ContinuousTabs,
  CopyConfirm,
  CommandSearch,
} from "./components/StudioUI";
import NoteOrbitStack from "./components/NoteOrbitStack";
import initialNotes from "./notes.json";
import mechanics from "./data/mechanics.json";
import { demos } from "./demos";
import { skillContent } from "./skills";
import "@fontsource-variable/dm-sans";
import "./theme.css";
import "./style.css";

const nav = [
  ["Wissen", "Knowledge"],
  ["Mechaniken", "Mechanics"],
  ["Beispiele", "Examples"],
  ["Templates", "Templates"],
  ["Cursor Skills", "Cursor Skills"],
];
const icons = [BookOpen, Shapes, Play, LayoutTemplate, FileCode2];
const fields = [
  [
    "application",
    "Anwendung",
    "Application",
    "Name, Plattform und Anbieter",
    "Name, platform and provider",
  ],
  [
    "experience",
    "Spielerlebnis",
    "Player experience",
    "Was fühlen die Spielenden? Welche Aktionen lösen das aus?",
    "What do players feel? Which actions trigger it?",
  ],
  [
    "motivation",
    "Motivation & Ziel",
    "Motivation & goal",
    "Spielziel, Anreize und Belohnungen",
    "Game goal, incentives and rewards",
  ],
  [
    "mechanics",
    "Mechaniken",
    "Mechanics",
    "Was wird eingesetzt? Wie funktionieren die Regeln?",
    "What is used? How do the rules work?",
  ],
  [
    "loop",
    "Core Loop & Feedback",
    "Core loop & feedback",
    "Wiederkehrende Aktion → Rückmeldung → Fortschritt",
    "Recurring action → feedback → progress",
  ],
  [
    "insights",
    "Erkenntnisse",
    "Insights",
    "Stärken, Schwächen und Ideen für den eigenen Prototyp",
    "Strengths, weaknesses and ideas for your prototype",
  ],
];
function stored(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
function download(name, text, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const newCanvas = (l = 0) => ({
  id: crypto.randomUUID(),
  name: l ? "Untitled analysis" : "Unbenannte Analyse",
  ...Object.fromEntries(fields.map((f) => [f[0], ""])),
});
function App() {
  const [noteView, setNoteView] = useState("overview");
  const [lang, setLang] = useState(() =>
    stored("spielraum-lang", "de") === "en" ? "en" : "de",
  );
  const l = lang === "en" ? 1 : 0,
    tr = (de, en) => (l ? en : de);
  const [theme, setTheme] = useState(() => {
    const value = stored("spielraum-theme", null);
    return ["light", "dark"].includes(value)
      ? value
      : matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  });
  const [page, setPage] = useState(0),
    [search, setSearch] = useState(""),
    [category, setCategory] = useState("all"),
    [goal, setGoal] = useState("all"),
    [commandOpen, setCommandOpen] = useState(false),
    [demoId, setDemoId] = useState("memory"),
    [noteId, setNoteId] = useState("n1"),
    [draft, setDraft] = useState(null),
    [storageError, setStorageError] = useState(false),
    [toast, setToast] = useState("");
  const [notes, setNotes] = useState(() => {
    const value = stored("spielraum-notes", initialNotes);
    return Array.isArray(value) && value.length ? value : initialNotes;
  });
  const [templates, setTemplates] = useState(() => {
    const value = stored("spielraum-templates", null);
    return Array.isArray(value) && value.length
      ? value
      : [
          {
            ...newCanvas(),
            id: "canvas-1",
            name: "Mein erster Analyse-Canvas",
          },
        ];
  });
  const [canvasId, setCanvasId] = useState(() => templates[0]?.id),
    [printId, setPrintId] = useState(null);
  const lenis = useRef(null),
    titleRef = useRef(null),
    toastTimer = useRef(null);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#1B2632" : "#EEE9DF");
    try {
      localStorage.setItem("spielraum-notes", JSON.stringify(notes));
      localStorage.setItem("spielraum-templates", JSON.stringify(templates));
      localStorage.setItem("spielraum-lang", JSON.stringify(lang));
      localStorage.setItem("spielraum-theme", JSON.stringify(theme));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [notes, templates, lang, theme]);
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      lenis.current?.destroy();
      lenis.current = reduced.matches
        ? null
        : new Lenis({
            autoRaf: true,
            duration: 0.65,
            anchors: true,
            prevent: (node) =>
              node instanceof HTMLElement &&
              !!node.closest("textarea, dialog, pre, .note-index, .demo-nav"),
          });
    };
    sync();
    reduced.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      lenis.current?.destroy();
    };
  }, []);
  useEffect(() => {
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((p) => !p);
      }
    };
    window.addEventListener("keydown", key);
    return () => window.removeEventListener("keydown", key);
  }, []);
  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 3500);
    return () => clearTimeout(toastTimer.current);
  }, [toast]);
  useEffect(() => {
    const after = () => setPrintId(null);
    window.addEventListener("afterprint", after);
    return () => window.removeEventListener("afterprint", after);
  }, []);
  function go(index, id) {
    setPage(index);
    setSearch("");
    setCategory("all");
    setDraft(null);
    if (index === 1) setGoal(id || "all");
    if (index === 2 && id) setDemoId(id);
    if (index === 0 && id) {
      setNoteId(id);
      setNoteView("read");
    }
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
    setTimeout(() => titleRef.current?.focus({ preventScroll: true }), 0);
  }
  const query = search.trim().toLowerCase();
  const filtered = notes.filter(
    (n) =>
      (category === "all" || n.category[l] === category) &&
      [n.title[l], n.summary[l], n.example[l]]
        .join(" ")
        .toLowerCase()
        .includes(query),
  );
  const selected = notes.find((n) => n.id === noteId) || notes[0];
  const matchedMechanics = mechanics.filter(
    (m) =>
      (goal === "all" || m.goal[0] === goal) &&
      [m.title[l], ...m.examples[l], m.practice[l]]
        .join(" ")
        .toLowerCase()
        .includes(query),
  );
  const currentCanvas =
    templates.find((t) => t.id === canvasId) || templates[0];
  function editNote(note) {
    setNoteView("read");
    setNoteId(note.id);
    setDraft(structuredClone(note));
  }
  function saveNote() {
    setNotes((prev) =>
      prev.some((n) => n.id === draft.id)
        ? prev.map((n) => (n.id === draft.id ? draft : n))
        : [...prev, draft],
    );
    setNoteId(draft.id);
    setDraft(null);
    setToast(tr("Notiz gespeichert.", "Note saved."));
  }
  const pageDescriptions = [
    tr(
      "Notizen zu Game Design und Gamification, mit Beispielen für die Anwendung.",
      "Notes on game design and gamification, with examples for practice.",
    ),
    tr(
      "Spielmechaniken nach Interesse und Ziel. Zusammengefasst aus deiner Tabelle.",
      "Game mechanics by interest and goal, condensed from your table.",
    ),
    tr(
      "Mechaniken ausprobieren, Regeln nachvollziehen und React-Code übernehmen.",
      "Try mechanics, inspect their rules and reuse the React code.",
    ),
    tr(
      "Referenz- und Wettbewerbsanalysen bearbeiten. Änderungen werden automatisch gespeichert.",
      "Edit reference and competitor analyses. Changes are saved automatically.",
    ),
    tr(
      "Anweisungen für Konzeptarbeit, Review und React-Prototypen.",
      "Instructions for concept design, review and React prototypes.",
    ),
  ];
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        {tr("Zum Inhalt", "Skip to content")}
      </a>
      <aside className="sidebar no-print">
        <a
          href="#"
          className="brand"
          onClick={(e) => {
            e.preventDefault();
            go(0);
          }}
        >
          spielraum<span>.</span>
        </a>
        <nav aria-label={tr("Hauptnavigation", "Main navigation")}>
          {nav.map((names, i) => {
            const Icon = icons[i];
            return (
              <button
                key={i}
                className={page === i ? "nav-item selected" : "nav-item"}
                aria-current={page === i ? "page" : undefined}
                onClick={() => go(i)}
              >
                <Icon size={18} />
                {names[l]}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-bottom">
          <span>{tr("Persönliche Sammlung", "Personal collection")}</span>
          <small>
            {tr(
              "Schulungen · Workshops · E-Learning",
              "Training · Workshops · E-learning",
            )}
          </small>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar no-print">
          <span className="current-section">{nav[page][l]}</span>
          <div className="header-actions">
            <button
              className="quick-search-trigger"
              onClick={() => setCommandOpen(true)}
              aria-label={tr("Schnellsuche öffnen", "Open quick search")}
            >
              <Search size={16} />
              <span>{tr("Suchen", "Search")}</span>
              <kbd>⌘ K</kbd>
            </button>
            <ThemeSwitch theme={theme} onChange={setTheme} l={l} />
            <div
              className="lang-switch"
              role="group"
              aria-label={tr("Sprache", "Language")}
            >
              <button
                aria-pressed={!l}
                onClick={() => {
                  setLang("de");
                  setCategory("all");
                }}
              >
                DE
              </button>
              <button
                aria-pressed={!!l}
                onClick={() => {
                  setLang("en");
                  setCategory("all");
                }}
              >
                EN
              </button>
            </div>
          </div>
        </header>
        <main id="main">
          <div className="page-heading no-print">
            <div>
              <h1 ref={titleRef} tabIndex={-1}>
                {nav[page][l]}
              </h1>
              <p>{pageDescriptions[page]}</p>
            </div>
            {page === 0 && (
              <button
                className="button"
                onClick={() => {
                  const note = {
                    id: crypto.randomUUID(),
                    title: ["Neue Notiz", "New note"],
                    category: ["Eigene Notizen", "My notes"],
                    summary: ["", ""],
                    example: ["", ""],
                    source: tr("Eigene Notiz", "Personal note"),
                  };
                  editNote(note);
                }}
              >
                <Plus size={16} />
                {tr("Neue Notiz", "New note")}
              </button>
            )}
            {page === 3 && (
              <button
                className="button"
                onClick={() => {
                  const canvas = newCanvas(l);
                  setTemplates((p) => [...p, canvas]);
                  setCanvasId(canvas.id);
                }}
              >
                <Plus size={16} />
                {tr("Neue Analyse", "New analysis")}
              </button>
            )}
          </div>
          {storageError && (
            <p className="error-notice" role="alert">
              {tr(
                "Der Browser kann Änderungen gerade nicht speichern. Bitte kopiere wichtige Inhalte vor dem Schließen.",
                "The browser cannot save changes right now. Copy important content before closing.",
              )}
            </p>
          )}
          {page === 0 && (
            <>
              <div className="filter-bar">
                <label className="search-field">
                  <Search size={17} />
                  <input
                    aria-label={tr("Notizen durchsuchen", "Search notes")}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={tr("Notizen durchsuchen", "Search notes")}
                  />
                  {search && (
                    <button
                      className="icon-button"
                      aria-label={tr("Suche leeren", "Clear search")}
                      onClick={() => setSearch("")}
                    >
                      <X size={15} />
                    </button>
                  )}
                </label>
                <label className="select-field">
                  <span>{tr("Thema", "Topic")}</span>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">
                      {tr("Alle Themen", "All topics")}
                    </option>
                    {[...new Set(notes.map((n) => n.category[l]))].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                <div className="note-view-switch">
                  <ContinuousTabs
                    label={tr("Notizansicht", "Note view")}
                    value={noteView}
                    onChange={setNoteView}
                    items={[
                      { id: "overview", label: tr("Übersicht", "Overview") },
                      { id: "read", label: tr("Lesen", "Read") },
                    ]}
                  />
                </div>
              </div>
              {noteView === "overview" ? (
                <div className="notes-overview">
                  {[...new Set(filtered.map((n) => n.category[l]))].map(
                    (topic) => (
                      <NoteOrbitStack
                        key={topic + "-" + search}
                        notes={filtered.filter((n) => n.category[l] === topic)}
                        category={topic}
                        l={l}
                        onOpen={(note) => {
                          setNoteId(note.id);
                          setDraft(null);
                          setNoteView("read");
                        }}
                      />
                    ),
                  )}
                  {!filtered.length && (
                    <p className="empty">
                      {tr("Keine passenden Notizen.", "No matching notes.")}
                    </p>
                  )}
                </div>
              ) : (
                <div className="knowledge-layout">
                  <div className="note-index" data-lenis-prevent>
                    <div className="list-meta">
                      {filtered.length} {tr("Notizen", "notes")}
                    </div>
                    {filtered.map((n) => (
                      <button
                        key={n.id}
                        className={
                          selected?.id === n.id && !draft
                            ? "note-row active"
                            : "note-row"
                        }
                        aria-pressed={selected?.id === n.id && !draft}
                        onClick={() => {
                          setNoteId(n.id);
                          setDraft(null);
                        }}
                      >
                        <span>{n.category[l]}</span>
                        <b>{n.title[l]}</b>
                        <p>{n.summary[l]}</p>
                      </button>
                    ))}
                    {!filtered.length && (
                      <p className="empty">
                        {tr("Keine passenden Notizen.", "No matching notes.")}
                      </p>
                    )}
                  </div>
                  <article className="note-detail">
                    {draft ? (
                      <form
                        className="note-editor"
                        onSubmit={(e) => {
                          e.preventDefault();
                          saveNote();
                        }}
                      >
                        <h2>{tr("Notiz bearbeiten", "Edit note")}</h2>
                        <p className="muted">
                          {tr(
                            "Du bearbeitest die deutsche Fassung.",
                            "You are editing the English version.",
                          )}
                        </p>
                        <label>
                          {tr("Titel", "Title")}
                          <input
                            required
                            value={draft.title[l]}
                            onChange={(e) =>
                              setDraft({
                                ...draft,
                                title: draft.title.map((x, i) =>
                                  i === l ? e.target.value : x,
                                ),
                              })
                            }
                          />
                        </label>
                        {["summary", "example"].map((key) => (
                          <label key={key}>
                            {key === "summary"
                              ? tr("Kurz erklärt", "In brief")
                              : tr("Anwendung", "Application")}
                            <textarea
                              required={key === "summary"}
                              value={draft[key][l]}
                              onChange={(e) =>
                                setDraft({
                                  ...draft,
                                  [key]: draft[key].map((x, i) =>
                                    i === l ? e.target.value : x,
                                  ),
                                })
                              }
                            />
                          </label>
                        ))}
                        <label>
                          {tr("Quelle", "Source")}
                          <input
                            value={draft.source}
                            onChange={(e) =>
                              setDraft({ ...draft, source: e.target.value })
                            }
                          />
                        </label>
                        <div className="button-row">
                          <button
                            className="button"
                            disabled={
                              !draft.title[l].trim() || !draft.summary[l].trim()
                            }
                            type="submit"
                          >
                            {tr("Speichern", "Save")}
                          </button>
                          <button
                            className="button secondary"
                            type="button"
                            onClick={() => setDraft(null)}
                          >
                            {tr("Abbrechen", "Cancel")}
                          </button>
                        </div>
                      </form>
                    ) : (
                      selected && (
                        <>
                          <div className="detail-toolbar">
                            <span className="category-label">
                              {selected.category[l]}
                            </span>
                            <button
                              className="text-button"
                              onClick={() => editNote(selected)}
                            >
                              <Pencil size={14} />
                              {tr("Bearbeiten", "Edit")}
                            </button>
                          </div>
                          <h2>{selected.title[l]}</h2>
                          <p className="reading-text">{selected.summary[l]}</p>
                          <section className="practice-section">
                            <h3>
                              {tr(
                                "Anwendung in Schulungen",
                                "Application in training",
                              )}
                            </h3>
                            <p>{selected.example[l]}</p>
                          </section>
                          <p className="source-reference">{selected.source}</p>
                          <button className="text-button" onClick={() => go(1)}>
                            {tr(
                              "Passende Mechaniken suchen",
                              "Find suitable mechanics",
                            )}
                            <ArrowRight size={15} />
                          </button>
                        </>
                      )
                    )}
                  </article>
                </div>
              )}
              <details className="source-details">
                <summary>{tr("Zu den Quellen", "About the sources")}</summary>
                <p>
                  {tr(
                    "Die Karten fassen deine Notizen zusammen. Die Seitenangaben stammen aus den Notizen; vollständige Literaturangaben fehlen noch. Praxisbeispiele wurden für Schulungen ergänzt.",
                    "Cards summarize your notes. Page references come from the notes; full bibliographic details are still missing. Practice examples were added for training contexts.",
                  )}
                </p>
              </details>
            </>
          )}
          {page === 1 && (
            <>
              <div className="filter-bar">
                <label className="search-field">
                  <Search size={17} />
                  <input
                    aria-label={tr(
                      "Mechaniken durchsuchen",
                      "Search mechanics",
                    )}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={tr(
                      "Mechanik oder Beispiel suchen",
                      "Search mechanics or examples",
                    )}
                  />
                </label>
                <label className="select-field">
                  <span>{tr("Ziel", "Goal")}</span>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                  >
                    <option value="all">{tr("Alle Ziele", "All goals")}</option>
                    {[
                      ...new Map(
                        mechanics.map((m) => [m.goal[0], m.goal[l]]),
                      ).entries(),
                    ].map(([id, label]) => (
                      <option key={id} value={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mechanic-table">
                <div className="mechanic-table-head" aria-hidden="true">
                  <span>{tr("Interesse", "Interest")}</span>
                  <span>
                    {tr(
                      "Beispielmechaniken aus der Vorlage",
                      "Example mechanics from the source",
                    )}
                  </span>
                  <span>
                    {tr(
                      "Übertragung auf Schulungen",
                      "Adaptation for training",
                    )}
                  </span>
                </div>
                {matchedMechanics.map((m) => (
                  <article className="mechanic-row" key={m.id}>
                    <div>
                      <h2>{m.title[l]}</h2>
                      <span className="category-label">{m.goal[l]}</span>
                    </div>
                    <ul>
                      {m.examples[l].map((text) => (
                        <li key={text}>{text}</li>
                      ))}
                    </ul>
                    <div>
                      <p>{m.practice[l]}</p>
                      {m.demo && (
                        <button
                          className="text-button"
                          onClick={() => go(2, m.demo)}
                        >
                          {tr("Beispiel ausprobieren", "Try example")}
                          <ArrowRight size={15} />
                        </button>
                      )}
                    </div>
                  </article>
                ))}
                {!matchedMechanics.length && (
                  <p className="empty">
                    {tr(
                      "Keine passenden Mechaniken.",
                      "No matching mechanics.",
                    )}
                  </p>
                )}
              </div>
              <details className="source-details">
                <summary>
                  {tr("Vorlage & Einordnung", "Source & context")}
                </summary>
                <p>
                  {tr(
                    "Grundlage ist dein Bild „Table 5-1. Example game mechanics“. Alle zwölf Interessen und die zugehörigen Mechaniken sind zusammengefasst. Die Übertragungen auf Schulungen sind ergänzt. Zufallsbelohnungen, öffentlicher Status und Verfall bei Inaktivität sind Beschreibungen der Vorlage, keine pauschalen Empfehlungen.",
                    "Based on your image “Table 5-1. Example game mechanics”. All twelve interests and their mechanics are summarized. Training adaptations are added. Random rewards, public status and inactivity decay describe the source; they are not blanket recommendations.",
                  )}
                </p>
              </details>
            </>
          )}
          {page === 2 && (
            <Examples
              l={l}
              demoId={demoId}
              setDemoId={setDemoId}
              onMechanics={(ids) => {
                go(1);
                const item = mechanics.find((m) => ids.includes(m.id));
                if (item) setSearch(item.title[l]);
              }}
              onError={() =>
                setToast(
                  tr(
                    "Kopieren nicht möglich. Bitte Code markieren oder herunterladen.",
                    "Could not copy. Select the code or download it.",
                  ),
                )
              }
            />
          )}
          {page === 3 && (
            <>
              <div className="canvas-tools no-print">
                <label className="select-field">
                  <span>{tr("Analyse auswählen", "Select analysis")}</span>
                  <select
                    value={currentCanvas.id}
                    onChange={(e) => setCanvasId(e.target.value)}
                  >
                    {templates.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </label>
                <button
                  className="button secondary"
                  onClick={() => {
                    setPrintId(currentCanvas.id);
                    requestAnimationFrame(() => window.print());
                  }}
                >
                  <Printer size={16} />
                  {tr("Drucken / PDF", "Print / PDF")}
                </button>
              </div>
              <article
                className="canvas"
                data-print-active={printId === currentCanvas.id || undefined}
              >
                <div className="canvas-heading">
                  <label>
                    <span className="sr-only">
                      {tr("Titel der Analyse", "Analysis title")}
                    </span>
                    <input
                      value={currentCanvas.name}
                      onChange={(e) =>
                        setTemplates((p) =>
                          p.map((x) =>
                            x.id === currentCanvas.id
                              ? { ...x, name: e.target.value }
                              : x,
                          ),
                        )
                      }
                    />
                  </label>
                  <p>
                    {tr(
                      "Referenz- und Wettbewerbsanalyse",
                      "Reference & competitor analysis",
                    )}
                  </p>
                </div>
                <div className="canvas-grid">
                  {fields.map(([key, de, en, pde, pen], i) => (
                    <label className="canvas-field" key={key}>
                      <span className="canvas-field-title">
                        <span>{i + 1}</span>
                        {l ? en : de}
                      </span>
                      <span className="field-hint">{l ? pen : pde}</span>
                      <textarea
                        value={currentCanvas[key]}
                        placeholder={tr(
                          "Beobachtungen festhalten …",
                          "Record observations …",
                        )}
                        onChange={(e) =>
                          setTemplates((p) =>
                            p.map((x) =>
                              x.id === currentCanvas.id
                                ? { ...x, [key]: e.target.value }
                                : x,
                            ),
                          )
                        }
                      />
                      <span className="print-value">
                        {currentCanvas[key] || "—"}
                      </span>
                    </label>
                  ))}
                </div>
              </article>
              <p className="storage-note no-print">
                {tr(
                  "Automatisch in diesem Browser gespeichert. Keine gemeinsame Teamablage.",
                  "Saved automatically in this browser. This is not shared team storage.",
                )}
              </p>
            </>
          )}
          {page === 4 && (
            <Skills
              l={l}
              onError={() =>
                setToast(
                  tr(
                    "Kopieren nicht möglich. Bitte Datei herunterladen.",
                    "Could not copy. Please download the file.",
                  ),
                )
              }
            />
          )}
          <footer className="no-print">
            <span>spielraum</span>
            <span>
              {storageError
                ? tr("Speichern nicht möglich", "Cannot save")
                : tr(
                    "Lokal in diesem Browser gespeichert",
                    "Saved locally in this browser",
                  )}
            </span>
            <a
              className="toggle-credit"
              href="https://skiper-ui.com"
              target="_blank"
              rel="noreferrer"
            >
              Theme toggle: Skiper UI
            </a>
          </footer>
        </main>
      </div>
      <CommandSearch
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        l={l}
        items={[
          ...nav.map((title, i) => ({
            id: "nav-" + i,
            title: title[l],
            category: tr("Bereich", "Section"),
            icon: icons[i],
            action: () => go(i),
          })),
          ...notes.map((n) => ({
            id: n.id,
            title: n.title[l],
            category: n.category[l],
            icon: BookOpen,
            action: () => go(0, n.id),
          })),
          ...mechanics.map((m) => ({
            id: "mechanic-" + m.id,
            title: m.title[l],
            category: tr("Mechanik", "Mechanic"),
            icon: Shapes,
            action: () => {
              go(1);
              setSearch(m.title[l]);
            },
          })),
          ...demos.map((d) => ({
            id: d.id,
            title: d.title[l],
            category: tr("Beispiel", "Example"),
            icon: Play,
            action: () => go(2, d.id),
          })),
        ]}
      />
      {toast && (
        <div className="toast" role="status">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}
function Examples({ l, demoId, setDemoId, onMechanics, onError }) {
  const [view, setView] = useState("play");
  const tr = (de, en) => (l ? en : de);
  const demo = demos.find((d) => d.id === demoId) || demos[0],
    Game = demo.Component;
  return (
    <div className="examples-layout">
      <label className="mobile-demo-select">
        {tr("Beispiel auswählen", "Choose an example")}
        <select
          value={demo.id}
          onChange={(e) => {
            setDemoId(e.target.value);
            setView("play");
          }}
        >
          {demos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.title[l]}
            </option>
          ))}
        </select>
      </label>
      <nav
        className="demo-nav"
        aria-label={tr("Beispiele auswählen", "Choose an example")}
      >
        {demos.map((d) => (
          <button
            key={d.id}
            aria-current={demo.id === d.id ? "true" : undefined}
            onClick={() => {
              setDemoId(d.id);
              setView("play");
            }}
          >
            <b>{d.title[l]}</b>
            <span>{d.mechanic[l]}</span>
          </button>
        ))}
      </nav>
      <div className="example-content">
        <div className="example-heading">
          <h2>{demo.title[l]}</h2>
          <p>{demo.mechanic[l]}</p>
        </div>
        <ContinuousTabs
          label={tr("Beispielansicht", "Example view")}
          value={view}
          onChange={setView}
          items={[
            { id: "play", label: tr("Ausprobieren", "Try it") },
            { id: "code", label: "React-Code" },
          ]}
        />
        {view === "play" ? (
          <div className="example-demo" key={demo.id}>
            <Game language={l ? "en" : "de"} />
          </div>
        ) : (
          <div className="code-panel">
            <div className="code-toolbar">
              <span>{demo.filename}</span>
              <CopyConfirm l={l} text={demo.code} onError={onError} />
            </div>
            <pre tabIndex={0} aria-label="React code">
              <code>{demo.code}</code>
            </pre>
            <div className="button-row">
              <button
                className="button secondary"
                onClick={() =>
                  download(demo.filename, demo.code, "text/javascript")
                }
              >
                <Download size={15} />
                {tr("Komponente herunterladen", "Download component")}
              </button>
              <button
                className="text-button"
                onClick={() =>
                  import("./demos/games.css?raw").then(({ default: css }) =>
                    download("games.css", css, "text/css"),
                  )
                }
              >
                {tr("Styles herunterladen", "Download styles")}
              </button>
            </div>
            <p className="muted">
              {tr(
                "Benötigt React und die Datei games.css im selben Ordner. Das ist der Quellcode der angezeigten Demo.",
                "Requires React and games.css in the same folder. This is the source of the displayed demo.",
              )}
            </p>
          </div>
        )}
        <div className="example-notes">
          <section>
            <h3>{tr("Regeln", "Rules")}</h3>
            <ol>
              {demo.rules.map((r) => (
                <li key={r[0]}>{r[l]}</li>
              ))}
            </ol>
          </section>
          <section>
            <h3>{tr("Für die eigene Schulung", "For your training")}</h3>
            <p>{demo.transfer[l]}</p>
            <button
              className="text-button"
              onClick={() => onMechanics(demo.related)}
            >
              {tr("Mechanikenübersicht", "Mechanics overview")}
              <ArrowRight size={14} />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
function Skills({ l, onError }) {
  const names = l
    ? [
        "Design a learning experience",
        "Review a concept",
        "Build a React prototype",
      ]
    : ["Lernerlebnis entwerfen", "Konzept prüfen", "React-Prototyp bauen"];
  const descriptions = l
    ? [
        "Define learning goals, choose mechanics and plan a playtest.",
        "Check learning value, rules, feedback and possible pressure.",
        "Build a small interaction with accessible controls and reset.",
      ]
    : [
        "Lernziele klären, Mechaniken auswählen und einen Playtest planen.",
        "Lernwirkung, Regeln, Feedback und möglichen Leistungsdruck prüfen.",
        "Eine kleine Interaktion mit zugänglichen Bedienelementen und Reset bauen.",
      ];
  return (
    <div className="skills-list">
      {["design", "review", "prototype"].map((id, i) => (
        <article className="skill-row" key={id}>
          <div>
            <h2>{names[i]}</h2>
            <p>{descriptions[i]}</p>
            <details>
              <summary>
                {l ? "Show instructions" : "Anweisungen ansehen"}
              </summary>
              <pre
                tabIndex={0}
                aria-label={l ? "Skill instructions" : "Skill-Anweisungen"}
              >
                {skillContent(id, l)}
              </pre>
            </details>
            <p className="skill-path">
              <code>.cursor/skills/gamification-{id}/SKILL.md</code>
            </p>
          </div>
          <div className="skill-actions">
            <button
              className="button secondary"
              onClick={() =>
                download("SKILL.md", skillContent(id, l), "text/markdown")
              }
            >
              <Download size={15} />
              {l ? "Download" : "Herunterladen"}
            </button>
            <CopyConfirm text={skillContent(id, l)} l={l} onError={onError} />
          </div>
        </article>
      ))}
      <p className="muted">
        {l
          ? "Save the file at the path shown in your project, then reload Cursor."
          : "Speichere die Datei unter dem angegebenen Pfad in deinem Projekt und lade Cursor neu."}
      </p>
    </div>
  );
}
createRoot(document.getElementById("root")).render(<App />);
