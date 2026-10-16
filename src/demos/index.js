import Memory from "./Memory";
import Collection from "./Collection";
import Resources from "./Resources";
import Sequence from "./Sequence";
import Team from "./Team";
import Discovery from "./Discovery";
import Preferences from "./Preferences";
import memoryCode from "./Memory.jsx?raw";
import collectionCode from "./Collection.jsx?raw";
import resourcesCode from "./Resources.jsx?raw";
import sequenceCode from "./Sequence.jsx?raw";
import teamCode from "./Team.jsx?raw";
import discoveryCode from "./Discovery.jsx?raw";
import preferencesCode from "./Preferences.jsx?raw";

export const demos = [
  {
    id: "memory",
    title: ["Memory", "Memory"],
    mechanic: ["Mustererkennung", "Pattern recognition"],
    Component: Memory,
    code: memoryCode,
    filename: "Memory.jsx",
    related: ["pattern"],
    rules: [
      ["Zwei Karten aufdecken.", "Reveal two cards."],
      [
        "Gleiche Begriffe bleiben offen, andere werden wieder verdeckt.",
        "Matching terms stay visible; other cards turn over again.",
      ],
      [
        "Vier Paare finden. Es gibt kein Zeitlimit.",
        "Find four pairs. There is no time limit.",
      ],
    ],
    transfer: [
      "Begriffe und konkrete Beispiele als unterschiedliche Karten eines Paares verwenden. Anschließend die Zuordnung begründen lassen.",
      "Use concepts and concrete examples as the two sides of a pair. Ask participants to explain the match.",
    ],
  },
  {
    id: "collection",
    title: ["Wissensmarken sammeln", "Collect knowledge stamps"],
    mechanic: ["Sammeln & Anerkennung", "Collecting & recognition"],
    Component: Collection,
    code: collectionCode,
    filename: "Collection.jsx",
    related: ["collect", "achievement", "status"],
    rules: [
      ["Drei Fallfragen lösen.", "Solve three case questions."],
      [
        "Eine richtige Antwort schaltet die passende Wissensmarke frei.",
        "A correct answer unlocks its knowledge stamp.",
      ],
      [
        "Falsche Antworten können ohne Punktverlust wiederholt werden.",
        "Incorrect answers can be retried without losing points.",
      ],
    ],
    transfer: [
      "Marken für nachgewiesene Fähigkeiten vergeben. Für längere Lernpfade können sie unterschiedliche Themen sichtbar machen.",
      "Award stamps for demonstrated abilities. In longer learning paths, use them to show different topics.",
    ],
  },
  {
    id: "resources",
    title: ["Hilfe-Token einsetzen", "Spend help tokens"],
    mechanic: ["Begrenzte Ressourcen", "Limited resources"],
    Component: Resources,
    code: resourcesCode,
    filename: "Resources.jsx",
    related: ["pattern", "growth"],
    rules: [
      ["Mit zwei Hilfe-Token starten.", "Start with two help tokens."],
      ["Ein Hinweis kostet einen Token.", "A hint costs one token."],
      [
        "Die gelöste Aufgabe bringt einen Token zurück.",
        "Solving the task earns one token back.",
      ],
    ],
    transfer: [
      "Teams entscheiden selbst, wann sie Unterstützung einsetzen. Hilfen sollten niemanden dauerhaft von Lerninhalten ausschließen.",
      "Teams decide when to use support. Help must not permanently lock anyone out of learning content.",
    ],
  },
  {
    id: "sequence",
    title: ["Ablauf ordnen", "Order a sequence"],
    mechanic: ["Ordnen & Struktur schaffen", "Organizing & creating order"],
    Component: Sequence,
    code: sequenceCode,
    filename: "Sequence.jsx",
    related: ["order"],
    rules: [
      [
        "Drei Schritte sind durcheinandergeraten.",
        "Three steps are out of order.",
      ],
      ["Mit den Pfeilen umsortieren.", "Rearrange them with the arrows."],
      [
        "Die Reihenfolge prüfen und bei Bedarf überarbeiten.",
        "Check the order and revise it if needed.",
      ],
    ],
    transfer: [
      "Für Prozessschulungen, Sicherheitsabläufe oder Gesprächsmodelle geeignet. Nicht nur die Reihenfolge, sondern auch ihre Begründung besprechen.",
      "Useful for process training, safety procedures or conversation models. Discuss the reasoning as well as the sequence.",
    ],
  },
  {
    id: "team",
    title: ["Kooperativer Fall", "Cooperative case"],
    mechanic: ["Verteilte Hinweise & Schenken", "Distributed clues & gifting"],
    Component: Team,
    code: teamCode,
    filename: "Team.jsx",
    related: ["gift", "lead", "hero"],
    rules: [
      [
        "Drei Rollen kennen unterschiedliche Hinweise.",
        "Three roles hold different clues.",
      ],
      [
        "Hinweise zusammenführen und den Code bilden.",
        "Combine clues to form the code.",
      ],
      [
        "Eine Hilfekarte kann dem Team geschenkt werden.",
        "A help card can be given to the team.",
      ],
    ],
    transfer: [
      "Im Workshop die Rollen auf verschiedene Personen verteilen. Diese Demo simuliert die Rollen in einem Browser und ist kein Mehrspieler-System.",
      "Distribute roles among different people in a workshop. This demo simulates roles in one browser; it is not a multiplayer system.",
    ],
  },
  {
    id: "discovery",
    title: ["Versteckter Hinweis", "Hidden clue"],
    mechanic: ["Entdecken & Überraschung", "Discovery & surprise"],
    Component: Discovery,
    code: discoveryCode,
    filename: "Discovery.jsx",
    related: ["surprise"],
    rules: [
      ["Eine Fallsituation erkunden.", "Explore a case."],
      ["Details einzeln aufklappen.", "Open individual details."],
      [
        "Ein zusätzlicher Hinweis verändert die Perspektive.",
        "An extra clue changes the perspective.",
      ],
    ],
    transfer: [
      "Optionale Details können neugierig machen. Informationen, die für den Lernerfolg nötig sind, dürfen nicht nur zufällig auffindbar sein.",
      "Optional details can spark curiosity. Information required for learning must not depend on chance discovery.",
    ],
  },
  {
    id: "preferences",
    title: ["Spielpräferenzen reflektieren", "Reflect on play preferences"],
    mechanic: ["Entscheidungen & Reflexion", "Choices & reflection"],
    Component: Preferences,
    code: preferencesCode,
    filename: "Preferences.jsx",
    related: [],
    rules: [
      [
        "Drei bevorzugte Aktivitäten auswählen.",
        "Choose three preferred activities.",
      ],
      [
        "Die Auswahl wird nach Themen gezählt.",
        "Choices are counted by theme.",
      ],
      [
        "Das Ergebnis dient als Gesprächseinstieg, nicht als Diagnose.",
        "The result starts a discussion; it is not a diagnosis.",
      ],
    ],
    transfer: [
      "Als Einstieg in die gemeinsame Gestaltung einer Schulung einsetzen. Vorlieben sind situationsabhängig; es entstehen keine festen Persönlichkeitstypen.",
      "Use this to start co-designing a training session. Preferences depend on context and do not establish fixed personality types.",
    ],
  },
];
