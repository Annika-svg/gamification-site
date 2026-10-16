import React, { useState } from "react";
import "./games.css";

const questions = [
  {
    q: ["Was gehört zu hilfreichem Feedback?", "What makes feedback useful?"],
    options: [
      ["Nur eine Punktzahl", "Only a score"],
      [
        "Eine Erklärung und ein nächster Schritt",
        "An explanation and a next step",
      ],
    ],
    correct: 1,
    clue: ["Feedback", "Feedback"],
    explanation: [
      "Eine Erklärung macht die Wirkung einer Entscheidung nachvollziehbar.",
      "An explanation makes the impact of a decision understandable.",
    ],
  },
  {
    q: [
      "Woran sollte ein Kompetenz-Badge geknüpft sein?",
      "What should a skill badge represent?",
    ],
    options: [
      ["Eine angewendete Fähigkeit", "An applied skill"],
      ["Das Öffnen einer Seite", "Opening a page"],
    ],
    correct: 0,
    clue: ["Kompetenz", "Skill"],
    explanation: [
      "Die Auszeichnung steht für eine erkennbare Leistung.",
      "The badge represents a recognizable accomplishment.",
    ],
  },
  {
    q: ["Was unterstützt Zusammenarbeit?", "What supports collaboration?"],
    options: [
      ["Eine Rangliste mit Verlierenden", "A leaderboard with losers"],
      [
        "Ein gemeinsames Ziel mit verteilten Informationen",
        "A shared goal with distributed information",
      ],
    ],
    correct: 1,
    clue: ["Zusammenarbeit", "Collaboration"],
    explanation: [
      "Alle haben einen Beitrag, der für die Lösung gebraucht wird.",
      "Everyone has a contribution needed for the solution.",
    ],
  },
];
export default function Collection({ language = "de" }) {
  const l = language === "en" ? 1 : 0;
  const [current, setCurrent] = useState(0),
    [collected, setCollected] = useState([]),
    [feedback, setFeedback] = useState("");
  const question = questions[current];
  function choose(index) {
    if (index === question.correct) {
      setCollected((p) => (p.includes(current) ? p : [...p, current]));
      setFeedback(question.explanation[l]);
    } else
      setFeedback(
        l
          ? "Try again: what would help someone apply their knowledge?"
          : "Versuch es noch einmal: Was hilft beim Anwenden des Wissens?",
      );
  }
  return (
    <section
      className="game"
      aria-label={l ? "Collect knowledge" : "Wissen sammeln"}
    >
      <ol className="collection-stamps">
        {questions.map((q, i) => (
          <li key={i} className={collected.includes(i) ? "earned" : ""}>
            <span>{collected.includes(i) ? "✓" : "—"}</span>
            {q.clue[l]}
          </li>
        ))}
      </ol>
      <fieldset disabled={collected.includes(current)}>
        <legend>{question.q[l]}</legend>
        <div className="choices">
          {question.options.map((answer, i) => (
            <button className="choice" key={i} onClick={() => choose(i)}>
              {answer[l]}
            </button>
          ))}
        </div>
      </fieldset>
      <p className="game-status" role="status">
        {feedback ||
          (l
            ? "Solve each task to earn its stamp."
            : "Löse jede Aufgabe, um die zugehörige Marke zu erhalten.")}
      </p>
      {collected.length === 3 ? (
        <p className="completion">
          {l
            ? "Collection complete. Your three principles: explain, apply, collaborate."
            : "Sammlung vollständig. Deine drei Prinzipien: erklären, anwenden, zusammenarbeiten."}
        </p>
      ) : (
        collected.includes(current) && (
          <button
            className="button"
            onClick={() => {
              setCurrent(questions.findIndex((_, i) => !collected.includes(i)));
              setFeedback("");
            }}
          >
            {l ? "Next task" : "Nächste Aufgabe"}
          </button>
        )
      )}
      <button
        className="button secondary"
        onClick={() => {
          setCollected([]);
          setCurrent(0);
          setFeedback("");
        }}
      >
        {l ? "Start again" : "Neu beginnen"}
      </button>
    </section>
  );
}
