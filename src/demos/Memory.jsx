import React, { useEffect, useState } from "react";
import "./games.css";

const labels = {
  de: ["Feedback", "Regel", "Ziel", "Ressource"],
  en: ["Feedback", "Rule", "Goal", "Resource"],
};
function deck() {
  const cards = [0, 1, 2, 3, 0, 1, 2, 3].map((pair, id) => ({ pair, id }));
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
export default function Memory({ language = "de" }) {
  const en = language === "en";
  const [cards, setCards] = useState(deck),
    [open, setOpen] = useState([]),
    [matched, setMatched] = useState([]),
    [turns, setTurns] = useState(0);
  useEffect(() => {
    if (open.length === 2) {
      const timer = setTimeout(() => setOpen([]), 1100);
      return () => clearTimeout(timer);
    }
  }, [open]);
  function reveal(index) {
    if (
      open.length === 2 ||
      open.includes(index) ||
      matched.includes(cards[index].pair)
    )
      return;
    const next = [...open, index];
    setOpen(next);
    if (next.length === 2) {
      setTurns((t) => t + 1);
      if (cards[next[0]].pair === cards[next[1]].pair) {
        setMatched((p) => [...p, cards[index].pair]);
        setOpen([]);
      }
    }
  }
  function reset() {
    setCards(deck());
    setOpen([]);
    setMatched([]);
    setTurns(0);
  }
  return (
    <section className="game" aria-label={en ? "Memory game" : "Memory-Spiel"}>
      <p>
        {en
          ? "Find four matching pairs. Remember the positions."
          : "Finde vier gleiche Paare. Merke dir die Positionen."}
      </p>
      <div className="memory-grid">
        {cards.map((card, i) => {
          const found = matched.includes(card.pair),
            shown = found || open.includes(i);
          return (
            <button
              key={card.id}
              className={
                "memory-card " +
                (shown ? "revealed " : "") +
                (found ? "matched" : "")
              }
              disabled={found}
              onClick={() => reveal(i)}
              aria-label={`${en ? "Card" : "Karte"} ${i + 1}: ${shown ? labels[language][card.pair] : en ? "face down" : "verdeckt"}`}
            >
              {shown ? (
                labels[language][card.pair]
              ) : (
                <span aria-hidden="true">?</span>
              )}
            </button>
          );
        })}
      </div>
      <p className="game-status" role="status">
        {matched.length === 4
          ? en
            ? "All pairs found."
            : "Alle Paare gefunden."
          : `${matched.length}/4 ${en ? "pairs" : "Paare"}`}{" "}
        · {turns} {en ? "attempts" : "Versuche"}
      </p>
      <button className="button secondary" onClick={reset}>
        {en ? "Shuffle again" : "Neu mischen"}
      </button>
    </section>
  );
}
