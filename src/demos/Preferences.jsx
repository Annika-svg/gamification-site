import React, { useState } from "react";
import "./games.css";

const rounds = [
  [
    [
      "Du startest einen Workshop. Was möchtest du zuerst tun?",
      "You are starting a workshop. What would you like to do first?",
    ],
    [
      ["Material selbst erkunden", "Explore the material"],
      ["Ein konkretes Ziel erreichen", "Achieve a specific goal"],
      ["Ideen mit anderen besprechen", "Discuss ideas with others"],
    ],
  ],
  [
    [
      "Eine Aufgabe ist gelöst. Was reizt dich als Nächstes?",
      "A task is solved. What appeals to you next?",
    ],
    [
      ["Einen anderen Lösungsweg entdecken", "Discover another approach"],
      ["Die schwierigere Variante versuchen", "Try a harder version"],
      ["Jemandem den eigenen Weg erklären", "Explain your approach to someone"],
    ],
  ],
  [
    [
      "Du planst eine Lernpause. Wie würdest du sie nutzen?",
      "You plan a learning break. How would you use it?",
    ],
    [
      ["Hintergrundmaterial durchsehen", "Explore background material"],
      ["Eine freiwillige Zusatzaufgabe lösen", "Solve an optional challenge"],
      [
        "Erfahrungen in der Gruppe austauschen",
        "Share experiences with the group",
      ],
    ],
  ],
];
export default function Preferences({ language = "de" }) {
  const l = language === "en" ? 1 : 0;
  const [votes, setVotes] = useState([]);
  return (
    <section
      className="game"
      aria-label={l ? "Play preferences" : "Spielpräferenzen"}
    >
      <p>
        {l
          ? "Three choices for reflection. This is not a validated personality test and does not assign a player type."
          : "Drei Entscheidungen zur Reflexion. Das ist kein validierter Persönlichkeitstest und ordnet dir keinen Spielertyp zu."}
      </p>
      {votes.length < 3 ? (
        <fieldset>
          <legend>{rounds[votes.length][0][l]}</legend>
          <div className="choices">
            {rounds[votes.length][1].map((option, i) => (
              <button
                key={i}
                className="choice"
                onClick={() => setVotes((p) => [...p, i])}
              >
                {option[l]}
              </button>
            ))}
          </div>
          <p className="muted">
            {l ? "Question" : "Frage"} {votes.length + 1}/3
          </p>
        </fieldset>
      ) : (
        <div role="status">
          <h3>{l ? "Your choices" : "Deine Auswahl"}</h3>
          <ul className="preference-results">
            {(l
              ? ["Explore", "Achieve", "Exchange"]
              : ["Erkunden", "Erreichen", "Austauschen"]
            ).map((text, i) => (
              <li key={i}>
                <span>{text}</span>
                <b>{votes.filter((v) => v === i).length}/3</b>
              </li>
            ))}
          </ul>
          <p>
            {l
              ? "Which combination of activities would suit your next training? Discuss the choices rather than treating them as fixed traits."
              : "Welche Mischung würde zu deiner nächsten Schulung passen? Besprecht die Auswahl, statt sie als feste Eigenschaft zu deuten."}
          </p>
        </div>
      )}
      <button className="button secondary" onClick={() => setVotes([])}>
        {l ? "Start again" : "Neu beginnen"}
      </button>
    </section>
  );
}
