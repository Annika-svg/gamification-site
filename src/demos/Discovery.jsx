import React, { useState } from "react";
import "./games.css";

const details = [
  [
    "Der Termin",
    "The meeting",
    "Die Besprechung dauert 30 Minuten.",
    "The meeting lasts 30 minutes.",
  ],
  [
    "Die Unterlagen",
    "The documents",
    "Die Fallbeschreibung nennt nur die Sicht der Führungskraft.",
    "The case description only includes the manager’s perspective.",
  ],
  [
    "Die Randnotiz",
    "The margin note",
    "Eine Kollegin war beim Gespräch dabei. Frage sie nach ihrer Beobachtung.",
    "A colleague witnessed the conversation. Ask for her observation.",
  ],
];
export default function Discovery({ language = "de" }) {
  const en = language === "en";
  const [opened, setOpened] = useState([]);
  return (
    <section
      className="game"
      aria-label={en ? "Discover a clue" : "Hinweis entdecken"}
    >
      <p>
        {en
          ? "A conflict is described from one perspective. Explore the details to discover another source of information."
          : "Ein Konflikt wird nur aus einer Perspektive beschrieben. Untersuche die Details, um eine weitere Informationsquelle zu finden."}
      </p>
      <div className="choices">
        {details.map((detail, i) => (
          <div className="discovery-item" key={i}>
            <button
              className="choice"
              aria-expanded={opened.includes(i)}
              onClick={() =>
                setOpened((p) =>
                  p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
                )
              }
            >
              {detail[en ? 1 : 0]}
            </button>
            {opened.includes(i) && <p>{detail[en ? 3 : 2]}</p>}
          </div>
        ))}
      </div>
      <p className="game-status" role="status">
        {opened.includes(2)
          ? en
            ? "Clue found: a second perspective can change your assessment. What would you ask the colleague?"
            : "Hinweis gefunden: Eine zweite Perspektive kann deine Einschätzung verändern. Was würdest du die Kollegin fragen?"
          : en
            ? "You decide which details to explore."
            : "Du entscheidest, welche Details du untersuchst."}
      </p>
      <button className="button secondary" onClick={() => setOpened([])}>
        {en ? "Start again" : "Neu beginnen"}
      </button>
    </section>
  );
}
