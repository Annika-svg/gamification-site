# Spielraum

Persönliche Sammlung für die Gestaltung von Schulungen, Workshops und E-Learning. React / Vite, Node.js 22 oder neuer.

## Entwicklung

```sh
npm ci
npm run dev
```

Produktionsbuild: `npm run build`. Lokal prüfen: `npm run preview`.

## Inhalte

- **Wissen:** 34 deutsch/englische Notizen aus den bereitgestellten Texten, mit Themenstapeln nach dem Orbit-Card-Stack-Muster, Suche, Themenfilter und direkter Bearbeitung. Zwischen Übersicht und Lesen kann gewechselt werden.
- **Mechaniken:** alle zwölf Interessen aus „Table 5-1. Example game mechanics“, jeweils mit den drei Mechaniken der Vorlage und einer Übertragung auf Schulungen. Der Ziel-Filter übernimmt die Aufgabe des bisherigen Finders.
- **Beispiele:** sieben bedienbare React-Beispiele: Memory, Wissensmarken, Hilfe-Token, Reihenfolge, kooperativer Fall, versteckter Hinweis und Reflexion von Spielpräferenzen. Der Code-Download enthält genau den Quellcode der angezeigten Komponente. `games.css` kann separat heruntergeladen werden und gehört in denselben Ordner. Keine weiteren UI-Bibliotheken nötig.
- **Templates:** Analyse-Canvas nach der Bildvorlage, mit mehreren lokal gespeicherten Analysen und Drucken/PDF über den Browserdialog.
- **Cursor Skills:** drei Anweisungsdateien zum Ansehen, Kopieren und Herunterladen.

Die Oberfläche bietet Deutsch/Englisch, Light/Dark-Mode und Schnellsuche per Cmd/Ctrl+K. Lenis berücksichtigt reduzierte Bewegung. Schriften werden lokal ausgeliefert.

## Speicherung und Quellen

Notizen und Templates bleiben in localStorage. Bestehende Daten aus der bisherigen Version werden weiterverwendet. Auf Nutzerwunsch gibt es keine JSON-Import-/Export-Bedienelemente mehr. Ohne Backend gibt es keine gemeinsame Teamablage oder automatische Sicherung; das Löschen von Browserdaten entfernt lokal gespeicherte Änderungen. Analysen können über Drucken/PDF gesichert werden.

Die Wissensnotizen sind Paraphrasen mit ergänzten Praxisbeispielen. Vollständige bibliografische Angaben wurden nicht geliefert. Die Mechanikenübersicht basiert auf der vom Nutzer bereitgestellten Tabelle; die Demo-Implementierungen und Übertragungen wurden ergänzt. Das Rollenbeispiel läuft lokal in einem Browser, nicht als Mehrspieler-Anwendung. Spielpräferenzen dienen nur der Reflexion und sind keine validierte Persönlichkeitsdiagnostik.

## Design-Werkzeuge

Impeccable ist initialisiert, Code-first bestätigt und Cursor-Hooks sind aktiv. `npm ci` bereitet die versionsgebundene native Engine vor. Live-Mode ist konfiguriert, aber nicht gestartet. Watermelon MCP ist konfiguriert; 21st MCP benötigt weiterhin einen sicher hinterlegten API-Key. Quellen und Lizenzen: [docs/UI-SOURCES.md](docs/UI-SOURCES.md).
