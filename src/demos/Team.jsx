import React, { useState } from "react";
import "./games.css";

const clues = [
  [
    "Moderation",
    "Facilitation",
    "Der erste Schritt ist eine konkrete Beobachtung.",
    "The first step is a specific observation.",
  ],
  [
    "Beobachtung",
    "Observation",
    "Der zweite Schritt erklärt die Wirkung auf die Zusammenarbeit.",
    "The second step explains the impact on collaboration.",
  ],
  [
    "Dokumentation",
    "Documentation",
    "Am Ende steht ein gemeinsam vereinbarter nächster Schritt.",
    "The final step is a jointly agreed next action.",
  ],
];
export default function Team({ language = "de" }) {
  const en = language === "en";
  const [revealed, setRevealed] = useState([]),
    [gifted, setGifted] = useState(false),
    [answer, setAnswer] = useState(""),
    [feedback, setFeedback] = useState("");
  function submit(e) {
    e.preventDefault();
    setFeedback(
      answer.replace(/\s/g, "").toUpperCase() === "BWA"
        ? en
          ? "Solved together: observation → impact → agreement."
          : "Gemeinsam gelöst: Beobachtung → Wirkung → Abmachung."
        : en
          ? "Not yet. Combine the initial letters of the three steps."
          : "Noch nicht. Kombiniert die Anfangsbuchstaben der drei Schritte.",
    );
  }
  return (
    <section
      className="game"
      aria-label={en ? "Cooperative case" : "Kooperativer Fall"}
    >
      <p>
        {en
          ? "Each role holds part of a feedback conversation. Open the three role cards and derive the German three-letter code. In a workshop, hand one card to each person."
          : "Jede Rolle kennt einen Teil des Feedbackgesprächs. Öffne die Rollenkarten und finde den Code aus drei Anfangsbuchstaben. Im Workshop erhält jede Person nur ihre eigene Karte."}
      </p>
      <div className="role-cards">
        {clues.map((clue, i) => (
          <div key={i}>
            <button
              className="choice"
              aria-expanded={revealed.includes(i)}
              onClick={() =>
                setRevealed((p) =>
                  p.includes(i) ? p.filter((x) => x !== i) : [...p, i],
                )
              }
            >
              {clue[en ? 1 : 0]}
            </button>
            {revealed.includes(i) && <p>{clue[en ? 3 : 2]}</p>}
          </div>
        ))}
      </div>
      <button
        className="button secondary"
        disabled={gifted}
        onClick={() => setGifted(true)}
      >
        {gifted
          ? en
            ? "Help card shared"
            : "Hilfekarte verschenkt"
          : en
            ? "Give the team a help card"
            : "Dem Team eine Hilfekarte schenken"}
      </button>
      {gifted && (
        <p className="inline-feedback">
          {en
            ? "German keywords: Beobachtung, Wirkung, Abmachung. The code uses their initial letters."
            : "Die Begriffe sind Beobachtung, Wirkung und Abmachung. Der Code besteht aus ihren Anfangsbuchstaben."}
        </p>
      )}
      <form onSubmit={submit}>
        <label>
          {en ? "Team code (German initials)" : "Team-Code"}
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            maxLength={6}
            autoComplete="off"
            placeholder="z. B. ABC"
          />
        </label>
        <button className="button" type="submit" disabled={!answer.trim()}>
          {en ? "Check code" : "Code prüfen"}
        </button>
      </form>
      <p className="game-status" role="status">
        {feedback}
      </p>
      <button
        className="button secondary"
        onClick={() => {
          setRevealed([]);
          setGifted(false);
          setAnswer("");
          setFeedback("");
        }}
      >
        {en ? "Reset" : "Zurücksetzen"}
      </button>
    </section>
  );
}
