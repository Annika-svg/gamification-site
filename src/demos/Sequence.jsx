import React, { useState } from "react";
import "./games.css";

const steps = [
  ["Beobachtung beschreiben", "Describe an observation"],
  ["Wirkung erklären", "Explain the impact"],
  ["Nächsten Schritt vereinbaren", "Agree on the next step"],
];
export default function Sequence({ language = "de" }) {
  const l = language === "en" ? 1 : 0;
  const [order, setOrder] = useState([2, 0, 1]),
    [checked, setChecked] = useState(false);
  function move(index, delta) {
    const next = [...order];
    [next[index], next[index + delta]] = [next[index + delta], next[index]];
    setOrder(next);
    setChecked(false);
  }
  const correct = order.every((value, index) => value === index);
  return (
    <section
      className="game"
      aria-label={l ? "Order the steps" : "Schritte ordnen"}
    >
      <p>
        {l
          ? "Arrange a feedback conversation. Use the arrows; dragging is not required."
          : "Ordne den Ablauf eines Feedbackgesprächs. Nutze die Pfeile; Ziehen ist nicht nötig."}
      </p>
      <ol className="sequence-list">
        {order.map((value, i) => (
          <li key={value}>
            <span className="step-position">{i + 1}</span>
            <span>{steps[value][l]}</span>
            <div>
              <button
                className="move-button"
                disabled={i === 0}
                onClick={() => move(i, -1)}
                aria-label={(l ? "Move up: " : "Nach oben: ") + steps[value][l]}
              >
                ↑
              </button>
              <button
                className="move-button"
                disabled={i === order.length - 1}
                onClick={() => move(i, 1)}
                aria-label={
                  (l ? "Move down: " : "Nach unten: ") + steps[value][l]
                }
              >
                ↓
              </button>
            </div>
          </li>
        ))}
      </ol>
      <div className="button-row">
        <button className="button" onClick={() => setChecked(true)}>
          {l ? "Check order" : "Reihenfolge prüfen"}
        </button>
        <button
          className="button secondary"
          onClick={() => {
            setOrder([2, 0, 1]);
            setChecked(false);
          }}
        >
          {l ? "Reset" : "Zurücksetzen"}
        </button>
      </div>
      <p className="game-status" role="status">
        {checked
          ? correct
            ? l
              ? "Correct. Begin with what happened, explain its impact, then agree on an action."
              : "Richtig. Zuerst das Geschehen beschreiben, dann die Wirkung erklären und eine Handlung vereinbaren."
            : l
              ? "Start with a specific observation. Agree on an action at the end."
              : "Beginne mit einer konkreten Beobachtung. Die Vereinbarung steht am Ende."
          : ""}
      </p>
    </section>
  );
}
