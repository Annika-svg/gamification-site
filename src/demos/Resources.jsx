import React, { useState } from "react";
import "./games.css";

export default function Resources({ language = "de" }) {
  const en = language === "en";
  const [tokens, setTokens] = useState(2),
    [hint, setHint] = useState(false),
    [feedback, setFeedback] = useState(""),
    [solved, setSolved] = useState(false);
  function choose(value) {
    if (value === 2) {
      setSolved(true);
      setTokens((n) => n + 1);
      setFeedback(
        en
          ? "Correct: a concrete observation is easier to act on. You earn one token."
          : "Richtig: Eine konkrete Beobachtung lässt sich besser aufgreifen. Du erhältst einen Token.",
      );
    } else
      setFeedback(
        en
          ? "Try again. Which sentence describes observable behavior?"
          : "Versuch es erneut. Welcher Satz beschreibt beobachtbares Verhalten?",
      );
  }
  return (
    <section
      className="game"
      aria-label={en ? "Limited resources" : "Begrenzte Ressourcen"}
    >
      <div className="resource-balance">
        <b>{tokens}</b>
        <span>{en ? "available help tokens" : "verfügbare Hilfe-Token"}</span>
      </div>
      <p>
        {en
          ? "Which sentence starts a useful feedback conversation? You can spend one token for a hint. A solved case earns one token."
          : "Welcher Satz beginnt ein hilfreiches Feedbackgespräch? Ein Hinweis kostet einen Token. Für den gelösten Fall erhältst du einen zurück."}
      </p>
      <button
        className="button secondary"
        disabled={hint || solved || tokens < 1}
        onClick={() => {
          setTokens((n) => n - 1);
          setHint(true);
        }}
      >
        {en ? "Use hint · 1 token" : "Hinweis nutzen · 1 Token"}
      </button>
      {hint && (
        <p className="inline-feedback">
          {en
            ? "Describe a specific situation rather than judging a person."
            : "Beschreibe eine konkrete Situation, statt eine Person zu bewerten."}
        </p>
      )}
      <fieldset disabled={solved}>
        <legend>{en ? "Choose an opening" : "Wähle einen Einstieg"}</legend>
        <div className="choices">
          {(en
            ? [
                "You are always careless.",
                "Everyone thinks you need to improve.",
                "The source was missing from yesterday’s report.",
              ]
            : [
                "Du bist immer unaufmerksam.",
                "Alle finden, du musst besser werden.",
                "Im gestrigen Bericht fehlte die Quellenangabe.",
              ]
          ).map((text, i) => (
            <button className="choice" key={text} onClick={() => choose(i)}>
              {text}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="game-status" role="status">
        {feedback}
      </p>
      <button
        className="button secondary"
        onClick={() => {
          setTokens(2);
          setHint(false);
          setFeedback("");
          setSolved(false);
        }}
      >
        {en ? "Reset case" : "Fall zurücksetzen"}
      </button>
    </section>
  );
}
