import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  Asterisk,
  ArrowUpRight,
  ArrowRight,
  BookOpen,
  Shapes,
  FlaskConical,
  LayoutTemplate,
  Sparkles,
  Search,
  Plus,
  Download,
  Upload,
  X,
  Check,
  Copy,
  RotateCcw,
  ChevronRight,
  Compass,
  Target,
  Users,
  Flag,
  Menu,
  Pencil,
  Bookmark,
  Github,
  CircleHelp,
} from "lucide-react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import {
  ThemeSwitch,
  ContinuousTabs,
  CopyConfirm,
  CommandSearch,
} from "./components/StudioUI";
import initialNotes from "./notes.json";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/manrope";
import "./style.css";
import "./theme.css";
const copy = {
  de: {
    nav: [
      "Übersicht",
      "Wissensbibliothek",
      "Mechanik-Finder",
      "Spielwiese",
      "Meine Templates",
      "Cursor Skills",
    ],
    sub: "DEIN GAMIFICATION STUDIO",
    greeting: "Gute Ideen brauchen",
    headline: "Raum zum Spielen.",
    intro:
      "Von der ersten Idee zum spielbaren Erlebnis. Dein Wissen, deine Werkzeuge und ein bisschen Experimentierfreude – an einem Ort.",
    browse: "Wissen entdecken",
    try: "Etwas ausprobieren",
    search: "Wissen, Mechaniken und Ideen durchsuchen …",
    workspace: "DEIN ARBEITSPLATZ",
    everything: "Alles für dein nächstes Aha.",
    all: "Alle",
    read: "Wissen vertiefen",
    latest: "AUS DEINER BIBLIOTHEK",
    picked: "Kleine Impulse. Große Wirkung.",
    view: "Alle Notizen ansehen",
    tip: "ERST DAS ERLEBNIS. DANN DIE MECHANIK.",
    tipbody:
      "Was sollen deine Teilnehmenden fühlen, tun und mitnehmen? Beginne damit – die Punkte kommen später.",
    save: "Speichern",
    cancel: "Abbrechen",
    example: "In der Praxis",
    source: "Quelle aus deinen Notizen",
    edit: "Bearbeiten",
    empty: "Keine passenden Einträge. Probiere einen anderen Suchbegriff.",
    local: "Lokal gespeichert · JSON für dein Team",
    export: "JSON exportieren",
    import: "JSON importieren",
  },
  en: {
    nav: [
      "Overview",
      "Knowledge library",
      "Mechanic finder",
      "Playground",
      "My templates",
      "Cursor Skills",
    ],
    sub: "YOUR GAMIFICATION STUDIO",
    greeting: "Good ideas need",
    headline: "Room to play.",
    intro:
      "From the first spark to a playable experience. Your knowledge, your tools and a little curiosity — all in one place.",
    browse: "Explore knowledge",
    try: "Try something out",
    search: "Search knowledge, mechanics and ideas …",
    workspace: "YOUR WORKSPACE",
    everything: "Everything for your next aha.",
    all: "All",
    read: "Explore the library",
    latest: "FROM YOUR LIBRARY",
    picked: "Small insights. Big impact.",
    view: "View all notes",
    tip: "EXPERIENCE FIRST. MECHANICS SECOND.",
    tipbody:
      "What should participants feel, do and take away? Start there — the points can come later.",
    save: "Save",
    cancel: "Cancel",
    example: "In practice",
    source: "Source from your notes",
    edit: "Edit",
    empty: "No matching entries. Try a different search.",
    local: "Saved locally · JSON for your team",
    export: "Export JSON",
    import: "Import JSON",
  },
};
const icons = [
  Compass,
  BookOpen,
  Shapes,
  FlaskConical,
  LayoutTemplate,
  Sparkles,
];
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
    "Welche Gefühle entstehen? Was löst sie aus?",
    "Which feelings emerge? What triggers them?",
  ],
  [
    "motivation",
    "Motivation & Ziel",
    "Motivation & goal",
    "Spielziel, Motivationsanreize und Belohnungen",
    "Game goal, incentives and rewards",
  ],
  [
    "mechanics",
    "Mechaniken",
    "Mechanics",
    "Konkrete Umsetzung, Regeln und Bedingungen",
    "Implementation, rules and conditions",
  ],
  [
    "loop",
    "Core Loop & Feedback",
    "Core loop & feedback",
    "Aktion → Reaktion → Fortschritt → nächste Aktion",
    "Action → response → progress → next action",
  ],
  [
    "insights",
    "Erkenntnisse",
    "Insights",
    "Stärken, Verbesserungspotenzial und Ideen für den Prototyp",
    "Strengths, improvements and prototype ideas",
  ],
];
function download(name, data, type = "application/json") {
  const u = URL.createObjectURL(
    new Blob(
      [typeof data === "string" ? data : JSON.stringify(data, null, 2)],
      { type },
    ),
  );
  const a = document.createElement("a");
  a.href = u;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}
function stored(k, f) {
  try {
    return JSON.parse(localStorage.getItem(k)) ?? f;
  } catch {
    return f;
  }
}
function App() {
  const [theme, setTheme] = useState(() => {
    const saved = stored("spielraum-theme", null);
    return saved === "light" || saved === "dark"
      ? saved
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  });
  const [commandOpen, setCommandOpen] = useState(false);
  const lenis = useRef(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#1B2632" : "#EEE9DF");
    try {
      localStorage.setItem("spielraum-theme", JSON.stringify(theme));
    } catch {}
  }, [theme]);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      lenis.current?.destroy();
      lenis.current = reduced.matches
        ? null
        : new Lenis({
            autoRaf: true,
            duration: 0.85,
            anchors: true,
            prevent: (node) =>
              node instanceof HTMLElement &&
              !!node.closest(
                ".modal, .code-panel, textarea, .skill-card pre, dialog",
              ),
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
    const toggle = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (!document.querySelector(".modal")) setCommandOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", toggle);
    return () => window.removeEventListener("keydown", toggle);
  }, []);
  const [lang, setLang] = useState(() => stored("spielraum-lang", "de"));
  const l = lang === "de" ? 0 : 1,
    t = copy[lang];
  const [page, setPage] = useState(0),
    [query, setQuery] = useState(""),
    [category, setCategory] = useState("all"),
    [notes, setNotes] = useState(() => stored("spielraum-notes", initialNotes)),
    [templates, setTemplates] = useState(() =>
      stored("spielraum-templates", [
        {
          id: "canvas-1",
          name: "Mein erster Analyse-Canvas",
          ...Object.fromEntries(fields.map((f) => [f[0], ""])),
        },
      ]),
    ),
    [active, setActive] = useState(null),
    [editing, setEditing] = useState(false),
    [draft, setDraft] = useState(null),
    [toast, setToast] = useState(""),
    [mobile, setMobile] = useState(false),
    [goal, setGoal] = useState("start"),
    [demo, setDemo] = useState("loop"),
    [step, setStep] = useState(0),
    [answer, setAnswer] = useState(null),
    [votes, setVotes] = useState([]);
  const input = useRef();
  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem("spielraum-notes", JSON.stringify(notes));
      localStorage.setItem("spielraum-templates", JSON.stringify(templates));
      localStorage.setItem("spielraum-lang", JSON.stringify(lang));
    } catch {
      setToast(
        l
          ? "Storage is full. Export your work."
          : "Speicher voll. Bitte Arbeit exportieren.",
      );
    }
  }, [notes, templates, lang]);
  useEffect(() => {
    if (toast) {
      const id = setTimeout(() => setToast(""), 4000);
      return () => clearTimeout(id);
    }
  }, [toast]);
  useEffect(() => {
    const close = (e) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "Tab") {
        const modal = document.querySelector(".modal");
        if (modal) {
          const items = [
            ...modal.querySelectorAll("button:not(:disabled),input,textarea"),
          ];
          const first = items[0],
            last = items.at(-1);
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const tr = (de, en) => (l ? en : de);
  const go = (p) => {
    setPage(p);
    setMobile(false);
    setQuery("");
    setCategory("all");
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  };
  const filtered = notes.filter(
    (n) =>
      (category === "all" || n.category[l] === category) &&
      [n.title[l], n.summary[l], n.example[l], n.category[l]]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  function openNote(n) {
    setActive(n);
    setDraft(structuredClone(n));
    setEditing(false);
  }
  async function importData(e) {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      if (file.size > 3000000) throw Error();
      const d = JSON.parse(await file.text());
      if (
        d.version !== 1 ||
        !Array.isArray(d.notes) ||
        !Array.isArray(d.templates)
      )
        throw Error();
      const pairs = (v) =>
        Array.isArray(v) &&
        v.length === 2 &&
        v.every((x) => typeof x === "string");
      if (
        !d.notes.every(
          (n) =>
            typeof n.id === "string" &&
            ["title", "category", "summary", "example"].every((k) =>
              pairs(n[k]),
            ) &&
            typeof n.source === "string",
        ) ||
        !d.templates.every(
          (n) =>
            typeof n.id === "string" &&
            typeof n.name === "string" &&
            fields.every((f) => typeof n[f[0]] === "string"),
        )
      )
        throw Error();
      if (
        new Set(d.notes.map((n) => n.id)).size !== d.notes.length ||
        new Set(d.templates.map((n) => n.id)).size !== d.templates.length
      )
        throw Error();
      setNotes((prev) => [
        ...prev.filter((n) => !d.notes.some((x) => x.id === n.id)),
        ...d.notes,
      ]);
      setTemplates((prev) => [
        ...prev.filter((n) => !d.templates.some((x) => x.id === n.id)),
        ...d.templates,
      ]);
      setToast(
        tr(
          "Importiert. Gleiche IDs wurden aktualisiert.",
          "Imported. Matching IDs were updated.",
        ),
      );
    } catch {
      setToast(
        tr(
          "Ungültige Datei. Bitte einen Spielraum-JSON-Export verwenden.",
          "Invalid file. Use a Spielraum JSON export.",
        ),
      );
    }
    e.target.value = "";
  }
  const exportData = () =>
    download("spielraum-workspace.json", { version: 1, notes, templates });
  const tiles = [
    {
      p: 1,
      title: tr("Wissen, das weiterbringt.", "Knowledge that moves you."),
      desc: tr(
        "Deine Notizen. Kondensiert, verknüpft und direkt anwendbar.",
        "Your notes. Condensed, connected and ready to use.",
      ),
      tag: notes.length + " " + tr("Wissenskarten", "knowledge cards"),
      color: "mint",
      icon: BookOpen,
    },
    {
      p: 2,
      title: tr("Die passende Mechanik.", "The right mechanic."),
      desc: tr(
        "Starte mit deinem Ziel. Finde Mechaniken, die dazu passen.",
        "Start with your goal. Find mechanics that fit.",
      ),
      tag: tr("Nach Lernziel entdecken", "Explore by learning goal"),
      color: "peach",
      icon: Shapes,
    },
    {
      p: 3,
      title: tr("Weniger Theorie. Mehr Play.", "Less theory. More play."),
      desc: tr(
        "Flows und Minigames ausprobieren. React-Code mitnehmen.",
        "Try flows and mini games. Take the React code.",
      ),
      tag: tr("3 interaktive Demos", "3 interactive demos"),
      color: "lilac",
      icon: FlaskConical,
    },
    {
      p: 4,
      title: tr("Deine Ideen in Form.", "Give your ideas shape."),
      desc: tr(
        "Canvas ausfüllen, Gedanken sortieren und als JSON exportieren.",
        "Fill a canvas, organize your thinking and export JSON.",
      ),
      tag: templates.length + " " + tr("eigene Canvas", "personal canvases"),
      color: "yellow",
      icon: LayoutTemplate,
    },
  ];
  return (
    <div className="app">
      <aside className={mobile ? "sidebar visible" : "sidebar"}>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go(0);
          }}
        >
          <span className="brand-icon">
            s
            <span>
              <ArrowUpRight size={15} />
            </span>
          </span>
          spielraum<span className="brand-dot">®</span>
        </a>
        <div className="studio-label">{t.sub}</div>
        <nav>
          {t.nav.map((name, i) => {
            const Icon = icons[i];
            return (
              <button
                key={i}
                onClick={() => go(i)}
                className={page === i ? "nav-item selected" : "nav-item"}
              >
                <Icon size={19} />
                <span>{name}</span>
                {i === 5 && <span className="new">AI</span>}
              </button>
            );
          })}
        </nav>
        <div className="sidebar-note">
          <span className="tiny-stars">
            <Sparkles size={30} />
          </span>
          <p>
            {tr(
              "Gutes Lernen darf sich nach Spielen anfühlen.",
              "Great learning can feel like play.",
            )}
          </p>
          <span>MAKE LEARNING PLAYFUL</span>
        </div>
        <div className="profile">
          <div className="avatar">A</div>
          <div>
            <b>{tr("Mein Studio", "My studio")}</b>
            <small>
              {tr("Persönlicher Arbeitsbereich", "Personal workspace")}
            </small>
          </div>
          <span className="status-dot" />
        </div>
      </aside>
      <div className="main-shell">
        <header>
          <div className="breadcrumbs">
            <button
              className="mobile-toggle"
              onClick={() => setMobile(!mobile)}
              aria-label="Menu"
            >
              <Menu size={20} />
            </button>
            <span>Workspace</span>
            <ChevronRight size={13} />
            <b>{t.nav[page]}</b>
          </div>
          <div className="header-actions">
            <button
              className="quick-search-trigger icon-btn"
              aria-label={tr("Schnellsuche öffnen", "Open quick search")}
              onClick={() => setCommandOpen(true)}
            >
              <Search size={17} />
              <kbd>⌘ K</kbd>
            </button>
            <ThemeSwitch theme={theme} onChange={setTheme} l={l} />
            <span className="local-indicator">
              <i />
              {tr("Dein Wissen. Dein Raum.", "Your knowledge. Your space.")}
            </span>
            <div className="lang-switch">
              <button className={!l ? "on" : ""} onClick={() => setLang("de")}>
                DE
              </button>
              <button className={l ? "on" : ""} onClick={() => setLang("en")}>
                EN
              </button>
            </div>
            <button className="icon-btn" title={t.export} onClick={exportData}>
              <Download size={18} />
            </button>
          </div>
        </header>
        <main>
          {page === 0 ? (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <div className="eyebrow">
                    <span />{" "}
                    {tr(
                      "GAMIFICATION, MIT ABSICHT.",
                      "GAMIFICATION, WITH INTENTION.",
                    )}
                  </div>
                  <h1>
                    {t.greeting}
                    <br />
                    <em>{t.headline}</em>
                    <span className="heading-star">
                      <Asterisk size={31} />
                    </span>
                  </h1>
                  <p>{t.intro}</p>
                  <div className="button-row">
                    <button className="btn dark" onClick={() => go(1)}>
                      {t.browse}
                      <ArrowUpRight size={17} />
                    </button>
                    <button className="btn light" onClick={() => go(3)}>
                      <span className="play-symbol">▷</span>
                      {t.try}
                    </button>
                  </div>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="art-grid" />
                  <span className="art-orbit" />
                  <div className="art-sticker sticker-a">
                    <span>
                      <Sparkles size={17} />
                    </span>{" "}
                    AHA!
                  </div>
                  <div className="art-card card-back">
                    <span className="mini-label">THE NEXT LEVEL</span>
                    <div className="blocks">
                      <i />
                      <i />
                      <i />
                    </div>
                  </div>
                  <div className="art-card card-front">
                    <div className="art-card-top">
                      <span className="spark-box">
                        <Asterisk size={28} />
                      </span>
                      <span>IDEA → EXPERIENCE</span>
                      <ArrowUpRight size={17} />
                    </div>
                    <div className="loop-drawing">
                      <div>
                        <ArrowUpRight size={36} />
                      </div>
                      <span className="loop-node node-a" />
                      <span className="loop-node node-b" />
                      <span className="loop-node node-c" />
                    </div>
                    <div className="art-card-bottom">
                      <span>Explore. Play. Repeat.</span>
                      <div>● ● ○</div>
                    </div>
                  </div>
                  <span className="art-sticker sticker-b">
                    let’s play{" "}
                    <span>
                      <ArrowUpRight size={12} />
                    </span>
                  </span>
                  <span className="art-star">
                    <Asterisk size={54} />
                  </span>
                  <span className="art-caption">
                    A LITTLE STRUCTURE. A LOT OF POSSIBILITY.
                  </span>
                </div>
              </section>
              <button
                className="search-bar"
                onClick={() => setCommandOpen(true)}
              >
                <Search size={20} />
                <span>{t.search}</span>
                <kbd>⌘ K</kbd>
              </button>
              <section>
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">{t.workspace}</span>
                    <h2>{t.everything}</h2>
                  </div>
                  <span className="section-caption">
                    {tr(
                      "Vom Verstehen ins Machen.",
                      "From understanding to doing.",
                    )}
                  </span>
                </div>
                <div className="tile-grid">
                  {tiles.map((x) => (
                    <button
                      className="workspace-tile"
                      key={x.p}
                      onClick={() => go(x.p)}
                    >
                      <div className={"tile-icon " + x.color}>
                        <x.icon size={25} />
                      </div>
                      <ArrowUpRight className="tile-arrow" size={18} />
                      <h3>{x.title}</h3>
                      <p>{x.desc}</p>
                      <div className="tile-footer">
                        <span>{x.tag}</span>
                        <ArrowRight size={16} />
                      </div>
                    </button>
                  ))}
                </div>
              </section>
              <section>
                <div className="section-heading">
                  <div>
                    <span className="eyebrow">{t.latest}</span>
                    <h2>{t.picked}</h2>
                  </div>
                  <button className="text-btn" onClick={() => go(1)}>
                    {t.view}
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="note-grid">
                  {[
                    notes.find((n) => n.id === "n18"),
                    notes.find((n) => n.id === "n6"),
                    notes.find((n) => n.id === "n17"),
                  ]
                    .filter(Boolean)
                    .map((n) => (
                      <Note key={n.id} n={n} l={l} open={openNote} />
                    ))}
                </div>
              </section>
              <div className="thought">
                <span>
                  <Asterisk size={36} />
                </span>
                <div>
                  <b>{t.tip}</b>
                  <p>{t.tipbody}</p>
                </div>
                <ArrowUpRight size={24} />
              </div>
            </>
          ) : (
            <>
              <div className="page-title">
                <span className="eyebrow">
                  SPIELRAUM / {String(page).padStart(2, "0")}
                </span>
                <h1>
                  {t.nav[page]}
                  <span className="title-dot">.</span>
                </h1>
                <p>
                  {
                    [
                      null,
                      tr(
                        "Deine Notizen, auf das Wesentliche verdichtet. Für den Moment, in dem du sie brauchst.",
                        "Your notes, distilled to what matters. Ready when you need them.",
                      ),
                      tr(
                        "Welches Erlebnis möchtest du ermöglichen? Beginne beim Ziel.",
                        "What experience do you want to create? Start with the goal.",
                      ),
                      tr(
                        "Klick dich durch. Verändere den Ablauf. Nimm den React-Code mit.",
                        "Click through, change the flow and take the React code.",
                      ),
                      tr(
                        "Von der Referenz zur eigenen Idee. Dein Canvas, direkt bearbeitbar.",
                        "From reference to your own idea. Your editable canvas.",
                      ),
                      tr(
                        "Dein Designwissen als praktische Anweisung für Cursor.",
                        "Your design knowledge as practical instructions for Cursor.",
                      ),
                    ][page]
                  }
                </p>
              </div>
              {page === 1 && (
                <>
                  <div className="library-tools">
                    <div className="search-input">
                      <Search size={19} />
                      <input
                        id="library-search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.search}
                      />
                    </div>
                    <button
                      className="btn dark"
                      onClick={() => {
                        const n = {
                          id: crypto.randomUUID(),
                          title: ["Neue Notiz", "New note"],
                          category: ["Eigene Notizen", "My notes"],
                          summary: ["", ""],
                          example: ["", ""],
                          source: tr("Eigene Notiz", "Personal note"),
                        };
                        setDraft(n);
                        setActive(n);
                        setEditing(true);
                      }}
                    >
                      <Plus size={17} />
                      {tr("Notiz", "Note")}
                    </button>
                  </div>
                  <div className="chips">
                    {["all", ...new Set(notes.map((n) => n.category[l]))].map(
                      (c) => (
                        <button
                          key={c}
                          className={category === c ? "chip active" : "chip"}
                          onClick={() => setCategory(c)}
                        >
                          {c === "all" ? t.all : c}
                        </button>
                      ),
                    )}
                  </div>
                  <div className="results-label">
                    {filtered.length} {tr("Wissenskarten", "knowledge cards")}
                    <span>
                      {tr(
                        "Zusammengefasst aus deinen Notizen · Praxisbeispiele ergänzt",
                        "Summarized from your notes · added practice examples",
                      )}
                    </span>
                  </div>
                  <div className="note-grid library">
                    {filtered.map((n) => (
                      <Note key={n.id} n={n} l={l} open={openNote} />
                    ))}
                  </div>
                  {!filtered.length && <p className="empty">{t.empty}</p>}
                  <div className="source-info">
                    <CircleHelp size={18} />
                    <p>
                      {tr(
                        "Die Originalnotizen enthalten Seitenangaben, aber keine vollständigen bibliografischen Angaben. Die Quellenbezeichnungen sind vorläufig. Beispiele sind Übertragungen für deine Arbeit, keine Originalzitate.",
                        "The original notes include pages but no full bibliographic details. Source labels are provisional. Examples are practical adaptations, not original quotations.",
                      )}
                    </p>
                  </div>
                </>
              )}
              {page === 2 && (
                <Finder
                  l={l}
                  goal={goal}
                  setGoal={setGoal}
                  open={(id) =>
                    openNote(notes.find((n) => n.id === id) || notes[0])
                  }
                  play={() => go(3)}
                />
              )}
              {page === 3 && (
                <>
                  <ContinuousTabs
                    label={tr("Demo auswählen", "Select demo")}
                    value={demo}
                    onChange={(id) => {
                      setDemo(id);
                      setStep(0);
                      setAnswer(null);
                      setVotes([]);
                    }}
                    items={[
                      { id: "loop", label: "Core Loop" },
                      {
                        id: "quiz",
                        label: tr("Szenario-Quiz", "Scenario quiz"),
                      },
                      {
                        id: "profile",
                        label: tr("Spielpräferenzen", "Play preferences"),
                      },
                    ]}
                  />
                  <div className="play-layout">
                    <div className="demo-panel">
                      <div className="panel-top">
                        <span className="live-dot" /> LIVE DEMO{" "}
                        <button
                          className="icon-btn"
                          title={tr("Zurücksetzen", "Reset")}
                          onClick={() => {
                            setStep(0);
                            setAnswer(null);
                            setVotes([]);
                          }}
                        >
                          <RotateCcw size={16} />
                        </button>
                      </div>
                      {demo === "loop" ? (
                        <>
                          <div className="demo-emoji">
                            <Sparkles size={42} />
                          </div>
                          <h2>
                            {tr(
                              "Deine kleine Lernmission",
                              "Your little learning mission",
                            )}
                          </h2>
                          <p>
                            {tr(
                              "Schließe drei Übungsrunden ab. Jede Aktion führt zu Feedback und sichtbarem Fortschritt.",
                              "Complete three practice rounds. Every action leads to feedback and visible progress.",
                            )}
                          </p>
                          <div className="progress-track">
                            <span style={{ width: (step / 3) * 100 + "%" }} />
                          </div>
                          <b>
                            {step} / 3 {tr("Runden", "rounds")}
                          </b>
                          <div className="demo-feedback" aria-live="polite">
                            {step === 0
                              ? tr(
                                  "Bereit für den ersten Schritt?",
                                  "Ready for the first step?",
                                )
                              : step < 3
                                ? tr(
                                    "Gut gemacht. Reflektiere: Was hat dir beim Lösen geholfen?",
                                    "Well done. Reflect: what helped you solve the task?",
                                  )
                                : tr(
                                    "Mission geschafft! Wende das Gelernte jetzt auf einen eigenen Fall an.",
                                    "Mission complete! Apply what you learned to your own case.",
                                  )}
                          </div>
                          <button
                            className="btn dark"
                            disabled={step === 3}
                            onClick={() => setStep((s) => s + 1)}
                          >
                            {step === 3
                              ? tr("Abgeschlossen", "Completed")
                              : tr(
                                  "Übungsrunde abschließen",
                                  "Complete practice round",
                                )}
                            <Check size={17} />
                          </button>
                        </>
                      ) : demo === "quiz" ? (
                        <>
                          <div className="demo-emoji">
                            <ArrowUpRight size={40} />
                          </div>
                          <h2>
                            {tr(
                              "Feedback, das weiterhilft",
                              "Feedback that helps",
                            )}
                          </h2>
                          <p>
                            {tr(
                              "Eine Teilnehmerin wählt die falsche Antwort. Welche Reaktion unterstützt das Lernen?",
                              "A participant selects an incorrect answer. Which response supports learning?",
                            )}
                          </p>
                          {[
                            tr(
                              "„Falsch. Dir werden 10 Punkte abgezogen.“",
                              "“Wrong. You lose 10 points.”",
                            ),
                            tr(
                              "„Schau auf die Konsequenz für das Team. Versuch es erneut.“",
                              "“Consider the effect on the team. Try again.”",
                            ),
                            tr(
                              "„Die anderen waren schneller.“",
                              "“Others were faster.”",
                            ),
                          ].map((a, i) => (
                            <button
                              className={
                                "quiz-option " + (answer === i ? "chosen" : "")
                              }
                              onClick={() => setAnswer(i)}
                              key={i}
                            >
                              {a}
                            </button>
                          ))}
                          {answer !== null && (
                            <div className="demo-feedback" role="status">
                              {answer === 1
                                ? tr(
                                    "Genau: Eine konkrete Hilfestellung und ein neuer Versuch fördern Lernen und Selbstwirksamkeit.",
                                    "Exactly: a specific hint and another attempt support learning and agency.",
                                  )
                                : tr(
                                    "Das kann Druck erzeugen. Gib stattdessen eine konkrete Hilfestellung und ermögliche einen neuen Versuch.",
                                    "This can create pressure. Offer a specific hint and another attempt instead.",
                                  )}
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="demo-emoji">
                            <Asterisk size={42} />
                          </div>
                          <h2>
                            {tr("Was macht dir Spaß?", "What do you enjoy?")}
                          </h2>
                          <p>
                            {tr(
                              "Wähle für drei Workshop-Runden deine bevorzugte Aktivität. Eine Reflexionshilfe, kein validierter Persönlichkeitstest.",
                              "Choose a preferred activity for three workshop rounds. A reflection tool, not a validated personality test.",
                            )}
                          </p>
                          {votes.length < 3 ? (
                            <>
                              {[
                                tr(
                                  "Unbekannte Hinweise erkunden",
                                  "Explore unfamiliar clues",
                                ),
                                tr(
                                  "Ein kniffliges Ziel erreichen",
                                  "Achieve a challenging goal",
                                ),
                                tr(
                                  "Gemeinsam Ideen entwickeln",
                                  "Develop ideas together",
                                ),
                              ].map((a, i) => (
                                <button
                                  className="quiz-option"
                                  key={i}
                                  onClick={() => setVotes((v) => [...v, i])}
                                >
                                  {a}
                                </button>
                              ))}
                              <small>
                                {tr("Runde", "Round")} {votes.length + 1}/3
                              </small>
                            </>
                          ) : (
                            <div className="preference-results">
                              {[
                                tr("Erkunden", "Exploration"),
                                tr("Erreichen", "Achievement"),
                                tr("Austausch", "Social interaction"),
                              ].map((a, i) => (
                                <div key={i}>
                                  <label>
                                    {a}
                                    <b>
                                      {votes.filter((v) => v === i).length}/3
                                    </b>
                                  </label>
                                  <div className="progress-track">
                                    <span
                                      style={{
                                        width:
                                          (votes.filter((v) => v === i).length /
                                            3) *
                                            100 +
                                          "%",
                                      }}
                                    />
                                  </div>
                                </div>
                              ))}
                              <p>
                                {tr(
                                  "Das zeigt nur deine Auswahl in dieser Demo. Besprecht, welche Kombination die nächste Schulung anbieten sollte.",
                                  "This only reflects choices in this demo. Discuss which combination your next training should offer.",
                                )}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    <div className="code-panel">
                      <div className="panel-top">
                        <span>REACT / JSX</span>
                        <CopyConfirm
                          text={demoCode(demo, l)}
                          l={l}
                          onError={() =>
                            setToast(
                              tr(
                                "Bitte Code markieren und kopieren.",
                                "Please select and copy the code.",
                              ),
                            )
                          }
                        />
                      </div>
                      <pre tabIndex={0} aria-label="React code">
                        <code>{demoCode(demo, l)}</code>
                      </pre>
                      <button
                        className="btn light"
                        onClick={() =>
                          download(
                            demo + ".jsx",
                            demoCode(demo, l),
                            "text/javascript",
                          )
                        }
                      >
                        <Download size={16} />
                        {tr("Komponente herunterladen", "Download component")}
                      </button>
                    </div>
                  </div>
                  <div className="source-info">
                    <CircleHelp size={18} />
                    <p>
                      {tr(
                        "Die Demos speichern keine Teilnehmendendaten. Der React-Code bildet die jeweilige Interaktion ab und kann als eigenständige Komponente übernommen werden.",
                        "Demos store no participant data. The React code implements the interaction and can be used as a standalone component.",
                      )}
                    </p>
                  </div>
                </>
              )}
              {page === 4 && (
                <>
                  <div className="template-toolbar">
                    <span>
                      {tr(
                        "Referenz- und Wettbewerbsanalyse Canvas",
                        "Reference & competitor analysis canvas",
                      )}
                    </span>
                    <button
                      className="btn dark"
                      onClick={() =>
                        setTemplates((p) => [
                          ...p,
                          {
                            id: crypto.randomUUID(),
                            name: tr("Unbenannter Canvas", "Untitled canvas"),
                            ...Object.fromEntries(
                              fields.map((f) => [f[0], ""]),
                            ),
                          },
                        ])
                      }
                    >
                      <Plus size={17} />
                      {tr("Neuer Canvas", "New canvas")}
                    </button>
                  </div>
                  {templates.map((canvas, index) => (
                    <section className="canvas" key={canvas.id}>
                      <div className="canvas-heading">
                        <span className="canvas-symbol">
                          <LayoutTemplate size={25} />
                        </span>
                        <div>
                          <input
                            aria-label={tr("Canvas-Titel", "Canvas title")}
                            value={canvas.name}
                            onChange={(e) =>
                              setTemplates((p) =>
                                p.map((x) =>
                                  x.id === canvas.id
                                    ? { ...x, name: e.target.value }
                                    : x,
                                ),
                              )
                            }
                          />
                          <small>
                            {tr(
                              "Analyse zur Identifikation von Spielmechaniken, Spielerlebnissen und Gestaltungspotenzialen",
                              "Identify game mechanics, player experiences and design opportunities",
                            )}
                          </small>
                        </div>
                        <span className="canvas-counter">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="canvas-grid">
                        {fields.map(([key, de, en, hde, hen], i) => (
                          <label className="canvas-field" key={key}>
                            <h3>
                              <span>{i + 1}</span>
                              {l ? en : de}
                            </h3>
                            <small>{l ? hen : hde}</small>
                            <textarea
                              value={canvas[key]}
                              placeholder={tr(
                                "Deine Beobachtungen …",
                                "Your observations …",
                              )}
                              onChange={(e) =>
                                setTemplates((p) =>
                                  p.map((x) =>
                                    x.id === canvas.id
                                      ? { ...x, [key]: e.target.value }
                                      : x,
                                  ),
                                )
                              }
                            />
                          </label>
                        ))}
                      </div>
                      <div className="canvas-bottom">
                        <span>
                          <Check size={14} />
                          {tr(
                            "Automatisch in diesem Browser gespeichert",
                            "Automatically saved in this browser",
                          )}
                        </span>
                        <button
                          className="text-btn"
                          onClick={() =>
                            download("canvas.json", {
                              version: 1,
                              notes: [],
                              templates: [canvas],
                            })
                          }
                        >
                          <Download size={15} />
                          {t.export}
                        </button>
                      </div>
                    </section>
                  ))}
                </>
              )}
              {page === 5 && (
                <div className="skills-grid">
                  {["design", "review", "prototype"].map((id, i) => (
                    <Skill key={id} id={id} i={i} l={l} toast={setToast} />
                  ))}
                </div>
              )}
            </>
          )}
          <footer>
            <span className="footer-brand">
              spielraum{" "}
              <span>
                <Asterisk size={36} />
              </span>
            </span>
            <span>{t.local}</span>
            <div>
              <button onClick={() => input.current.click()}>
                <Upload size={14} />
                {t.import}
              </button>
              <button onClick={exportData}>
                <Download size={14} />
                {t.export}
              </button>
            </div>
            <input
              hidden
              ref={input}
              type="file"
              accept="application/json,.json"
              onChange={importData}
            />
          </footer>
        </main>
      </div>
      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <section
            data-lenis-prevent
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-label={active.title[l]}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-top">
              <span className="eyebrow">{active.category[l]}</span>
              <button
                autoFocus
                className="icon-btn"
                onClick={() => setActive(null)}
                aria-label={tr("Schließen", "Close")}
              >
                <X size={21} />
              </button>
            </div>
            {editing ? (
              <>
                <label>
                  {tr("Titel", "Title")}
                  <input
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
                {["summary", "example"].map((k) => (
                  <label key={k}>
                    {k === "summary"
                      ? tr("Kurz erklärt", "In brief")
                      : t.example}
                    <textarea
                      value={draft[k][l]}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          [k]: draft[k].map((x, i) =>
                            i === l ? e.target.value : x,
                          ),
                        })
                      }
                    />
                  </label>
                ))}
                <label>
                  {t.source}
                  <input
                    value={draft.source}
                    onChange={(e) =>
                      setDraft({ ...draft, source: e.target.value })
                    }
                  />
                </label>
                <p className="muted">
                  {tr(
                    "Du bearbeitest die deutsche Fassung. Für Englisch oben die Sprache wechseln.",
                    "You are editing the English version. Switch language above for German.",
                  )}
                </p>
                <div className="button-row">
                  <button
                    className="btn dark"
                    disabled={
                      !draft.title[l].trim() || !draft.summary[l].trim()
                    }
                    onClick={() => {
                      setNotes((p) =>
                        p.some((n) => n.id === draft.id)
                          ? p.map((n) => (n.id === draft.id ? draft : n))
                          : [...p, draft],
                      );
                      setActive(draft);
                      setEditing(false);
                      setToast(tr("Notiz gespeichert", "Note saved"));
                    }}
                  >
                    {t.save}
                    <Check size={16} />
                  </button>
                  <button className="btn light" onClick={() => setActive(null)}>
                    {t.cancel}
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2>{active.title[l]}</h2>
                <p className="note-summary">{active.summary[l]}</p>
                <div className="example-box">
                  <span className="eyebrow">{t.example}</span>
                  <p>{active.example[l]}</p>
                </div>
                <div className="source-line">
                  {t.source}
                  <br />
                  <b>{active.source}</b>
                </div>
                <button className="btn light" onClick={() => setEditing(true)}>
                  <Pencil size={15} />
                  {t.edit}
                </button>
              </>
            )}
          </section>
        </div>
      )}
      <CommandSearch
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        l={l}
        items={[
          ...t.nav.map((title, i) => ({
            id: "page-" + i,
            title,
            category: tr("Bereiche", "Pages"),
            icon: icons[i],
            action: () => go(i),
          })),
          ...notes.map((n) => ({
            id: n.id,
            title: n.title[l],
            category: n.category[l],
            icon: BookOpen,
            action: () => openNote(n),
          })),
        ]}
      />
      {toast && (
        <div className="toast" role="status">
          <Check size={17} />
          {toast}
        </div>
      )}
    </div>
  );
}
function Note({ n, l, open }) {
  return (
    <button className="note-card" onClick={() => open(n)}>
      <div className="note-meta">
        <span>{n.category[l]}</span>
        <ArrowUpRight size={16} />
      </div>
      <h3>{n.title[l]}</h3>
      <p>{n.summary[l]}</p>
      <div className="note-source">
        <BookOpen size={13} />
        {n.source.split(" · ")[1] || n.source}
      </div>
    </button>
  );
}
function Finder({ l, goal, setGoal, open, play }) {
  const goals = [
    [
      "start",
      "Einstieg erleichtern",
      "Ease onboarding",
      "n22",
      "Eine erste, sichere Aktion",
      "A safe first action",
      "Lass Teilnehmende eine einfache Entscheidung treffen und zeige sofort die Wirkung.",
      "Let participants make an easy decision and immediately show its impact.",
    ],
    [
      "progress",
      "Fortschritt sichtbar machen",
      "Make progress visible",
      "n20",
      "Meilensteine statt Punktedruck",
      "Milestones over point pressure",
      "Teile den Lernpfad in konkrete Etappen. Zeige, was schon gelingt und was als Nächstes kommt.",
      "Break learning into concrete stages. Show what is working and what comes next.",
    ],
    [
      "team",
      "Zusammenarbeit fördern",
      "Support collaboration",
      "n23",
      "Gemeinsam etwas bewegen",
      "Make progress together",
      "Verbinde Rollen mit unterschiedlichen Informationen und einem gemeinsamen Ziel.",
      "Connect roles with different information and a shared goal.",
    ],
    [
      "reflect",
      "Reflexion anregen",
      "Encourage reflection",
      "n9",
      "Entscheidungen mit Folgen",
      "Choices with consequences",
      "Nutze ein realistisches Dilemma, gib Raum für Begründungen und besprecht die Konsequenzen.",
      "Use a realistic dilemma, invite explanations and discuss consequences.",
    ],
    [
      "feedback",
      "Feedback verbessern",
      "Improve feedback",
      "n24",
      "Den nächsten Schritt zeigen",
      "Show the next step",
      "Erkläre die Wirkung einer Entscheidung und gib einen konkreten Hinweis für einen neuen Versuch.",
      "Explain the impact of a decision and give a specific hint for another attempt.",
    ],
  ];
  const g = goals.find((x) => x[0] === goal);
  return (
    <div className="finder-layout">
      <div className="goal-list">
        <span className="eyebrow">{l ? "I WANT TO …" : "ICH MÖCHTE …"}</span>
        {goals.map((x, i) => (
          <button
            key={x[0]}
            className={goal === x[0] ? "goal selected" : "goal"}
            onClick={() => setGoal(x[0])}
          >
            <span>0{i + 1}</span>
            {x[l ? 2 : 1]}
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      <div className="recommendation">
        <span className="match-label">
          <Sparkles size={15} />
          {l ? "YOUR DESIGN IMPULSE" : "DEIN DESIGNIMPULS"}
        </span>
        <h2>{g[l ? 5 : 4]}</h2>
        <p>{g[l ? 7 : 6]}</p>
        <div className="recommend-detail">
          <b>
            {l ? "Try it in a workshop" : "So könnte es im Workshop aussehen"}
          </b>
          <p>
            {goal === "team"
              ? l
                ? "Each person receives one clue. Only the team can assemble a complete solution."
                : "Jede Person erhält einen Hinweis. Nur gemeinsam entsteht die vollständige Lösung."
              : l
                ? "Build a five-minute paper prototype, observe two participants and ask what helped them learn."
                : "Baue einen fünfminütigen Papierprototyp, beobachte zwei Teilnehmende und frage, was beim Lernen geholfen hat."}
          </p>
        </div>
        <div className="caution">
          <Flag size={17} />
          <p>
            {l
              ? "Watch for: voluntary participation, accessible alternatives and meaningful learning rather than just more activity."
              : "Achte auf: Freiwilligkeit, zugängliche Alternativen und sinnvolles Lernen statt bloß mehr Aktivität."}
          </p>
        </div>
        <div className="button-row">
          <button className="btn dark" onClick={() => open(g[3])}>
            {l ? "Read the background" : "Hintergrund lesen"}
            <BookOpen size={16} />
          </button>
          <button className="btn light" onClick={play}>
            {l ? "Open playground" : "Zur Spielwiese"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
function demoCode(id, l) {
  if (id === "loop")
    return `import { useState } from 'react';\n\nexport default function LearningLoop() {\n  const [round, setRound] = useState(0);\n  const total = 3;\n  return (\n    <section aria-label="Learning mission">\n      <h2>Learning mission</h2>\n      <progress value={round} max={total} />\n      <p>{round} / {total}</p>\n      <p aria-live="polite">\n        {round === total\n          ? 'Complete! Apply this to your own case.'\n          : round > 0\n            ? 'What helped you solve the task?'\n            : 'Ready for your first step?'}\n      </p>\n      <button disabled={round === total}\n        onClick={() => setRound(r => r + 1)}>\n        Complete practice round\n      </button>\n      <button onClick={() => setRound(0)}>Reset</button>\n    </section>\n  );\n}`;
  if (id === "quiz")
    return `import { useState } from 'react';\n\nexport default function FeedbackQuiz() {\n  const [answer, setAnswer] = useState(null);\n  const options = [\n    'Wrong. You lose 10 points.',\n    'Consider the effect on the team. Try again.',\n    'Others were faster.'\n  ];\n  return (\n    <section>\n      <h2>Which feedback supports learning?</h2>\n      {options.map((option, i) => (\n        <button key={option}\n          aria-pressed={answer === i}\n          onClick={() => setAnswer(i)}>\n          {option}\n        </button>\n      ))}\n      {answer !== null && <p role="status">\n        {answer === 1\n          ? 'Yes! A specific hint supports learning.'\n          : 'Try a specific hint and another attempt.'}\n      </p>}\n      <button onClick={() => setAnswer(null)}>Reset</button>\n    </section>\n  );\n}`;
  return `import { useState } from 'react';\n\nexport default function PlayPreferences() {\n  const [votes, setVotes] = useState([]);\n  const options = ['Explore clues', 'Achieve a goal',\n    'Develop ideas together'];\n  return (\n    <section>\n      <h2>What do you enjoy?</h2>\n      <p>Reflection only, not a validated test.</p>\n      {votes.length < 3 ? options.map((text, i) => (\n        <button key={text}\n          onClick={() => setVotes(v => [...v, i])}>\n          {text}\n        </button>\n      )) : options.map((text, i) => (\n        <p key={text}>{text}:\n          {votes.filter(v => v === i).length}/3\n        </p>\n      ))}\n      <p>Round: {Math.min(votes.length + 1, 3)}/3</p>\n      <button onClick={() => setVotes([])}>Reset</button>\n    </section>\n  );\n}`;
}
function skillContent(id, l) {
  const task = {
    design: l
      ? "Design a gamified learning experience"
      : "Entwirf ein gamifiziertes Lernerlebnis",
    review: l
      ? "Review a gamification concept"
      : "Prüfe ein Gamification-Konzept",
    prototype: l
      ? "Build a React learning prototype"
      : "Baue einen React-Lernprototyp",
  }[id];
  return `---\nname: gamification-${id}\ndescription: ${task} for training, workshops and e-learning.\n---\n\n# ${task}\n\n${l ? "Work in the language requested by the user." : "Arbeite in der vom Nutzer gewünschten Sprache."}\n\n1. ${l ? "Identify audience, learning objective, context and constraints. Ask only for missing essentials." : "Kläre Zielgruppe, Lernziel, Kontext und Grenzen. Frage nur nach fehlenden wesentlichen Angaben."}\n2. ${l ? "Define the desired player experience before selecting features." : "Formuliere das gewünschte Spielerlebnis vor der Auswahl von Features."}\n3. ${l ? "Connect mechanics, emerging dynamics and experience (MDA)." : "Verknüpfe Mechaniken, entstehende Dynamiken und Erlebnis (MDA)."}\n4. ${l ? "Describe the core loop: action → informative feedback → progress → next action." : "Beschreibe den Core Loop: Aktion → informatives Feedback → Fortschritt → nächste Aktion."}\n5. ${l ? "Include voluntary participation, accessibility and a cooperative alternative to competition." : "Berücksichtige Freiwilligkeit, Zugänglichkeit und eine kooperative Alternative zu Wettbewerb."}\n6. ${l ? "Treat player types as design lenses, never validated personality diagnoses. Do not generalize source percentages." : "Nutze Spielertypen als Designperspektive, niemals als validierte Persönlichkeitsdiagnostik. Verallgemeinere keine Prozentwerte aus Quellen."}\n7. ${id === "prototype" ? (l ? "Deliver a runnable React component with keyboard-accessible controls, reset and explanatory feedback. No participant tracking." : "Liefere eine lauffähige React-Komponente mit tastaturbedienbaren Elementen, Reset und erklärendem Feedback. Kein Teilnehmenden-Tracking.") : id === "review" ? (l ? "Report strengths, learning-goal gaps, risks and three prioritized improvements." : "Berichte Stärken, Lücken zum Lernziel, Risiken und drei priorisierte Verbesserungen.") : l ? "Offer two suitable mechanics, one workshop example and one e-learning example." : "Schlage zwei passende Mechaniken, ein Workshop-Beispiel und ein E-Learning-Beispiel vor."}\n8. ${l ? "End with a small playtest plan and observable success criteria. Distinguish evidence from assumptions." : "Schließe mit einem kleinen Playtest-Plan und beobachtbaren Erfolgskriterien. Trenne Belege von Annahmen."}\n\n## Sources\nUser-supplied condensed notes: playcentric design, formal elements, MDA, motivation and feedback. Page references are in the Spielraum library; full bibliography is not yet provided.\n`;
}
function Skill({ id, i, l, toast }) {
  const names = l
    ? [
        "Learning experience designer",
        "Gamification concept review",
        "React prototype builder",
      ]
    : [
        "Lernerlebnisse entwerfen",
        "Gamification kritisch prüfen",
        "React-Prototypen bauen",
      ];
  return (
    <article className="skill-card">
      <div className={"tile-icon " + ["mint", "peach", "lilac"][i]}>
        <Sparkles size={24} />
      </div>
      <span className="skill-format">SKILL.md</span>
      <h2>{names[i]}</h2>
      <p>
        {
          (l
            ? [
                "From learning goal to mechanics, core loop and a meaningful playtest.",
                "Find gaps, reduce point pressure and improve informative feedback.",
                "Create small, accessible interactions with reset and useful feedback.",
              ]
            : [
                "Vom Lernziel zu Mechaniken, Core Loop und einem sinnvollen Playtest.",
                "Lücken finden, Punktedruck reduzieren und hilfreiches Feedback verbessern.",
                "Kleine, zugängliche Interaktionen mit Reset und hilfreicher Rückmeldung entwickeln.",
              ])[i]
        }
      </p>
      <details>
        <summary>{l ? "Preview instructions" : "Anweisungen ansehen"}</summary>
        <pre
          tabIndex={0}
          aria-label={l ? "Skill instructions" : "Skill-Anweisungen"}
        >
          {skillContent(id, l)}
        </pre>
      </details>
      <div className="skill-install">
        <b>{l ? "Use in Cursor" : "In Cursor verwenden"}</b>
        <p>
          {l
            ? "Save the downloaded file as:"
            : "Speichere die heruntergeladene Datei unter:"}
        </p>
        <code>.cursor/skills/gamification-{id}/SKILL.md</code>
      </div>
      <button
        className="btn dark"
        onClick={() =>
          download("SKILL.md", skillContent(id, l), "text/markdown")
        }
      >
        <Download size={16} />
        {l ? "Download skill" : "Skill herunterladen"}
      </button>
    </article>
  );
}

createRoot(document.getElementById("root")).render(<App />);
