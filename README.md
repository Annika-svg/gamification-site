# Spielraum

Persönliches Gamification-Studio für Schulungen, Workshops und E-Learning. React 19 / Vite 6, Node.js 22 oder neuer.

## Entwicklung

```sh
npm ci
npm run dev
```

Produktionsbuild: `npm run build`. Lokal prüfen: `npm run preview`.

## Funktionen

- 34 deutsch/englische Wissenskarten aus den bereitgestellten Notizen, mit Suche, Themenfiltern und Bearbeitung.
- Mechanik-Finder nach fünf Gestaltungszielen.
- Drei interaktive Demos mit eigenständigen React-Komponenten zum Kopieren und Herunterladen.
- Editierbarer Analyse-Canvas nach der Bildvorlage.
- Drei Cursor Skills als `SKILL.md` zum Download.
- Lokale Speicherung im Browser, JSON-Export und validierter JSON-Import. Import führt Einträge anhand ihrer IDs zusammen; importierte Einträge mit gleicher ID ersetzen die lokale Fassung. Exporte enthalten beide Sprachfassungen.

Kein Backend, kein Login und keine synchronisierte Teamablage. Inhalte werden über JSON-Dateien geteilt. Regelmäßig exportieren: Browserdaten können gelöscht werden. Keine personenbezogenen Testergebnisse erfassen. Der Präferenztest ist nur eine Reflexionsdemo.

Die Wissenskarten sind Paraphrasen; Praxisbeispiele wurden ergänzt. Die gelieferten Notizen enthalten keine vollständige Bibliografie. Quellenbezeichnungen sind daher vorläufig, Seitenangaben wurden übernommen. Eigene Notizen werden pro Sprache bearbeitet, ohne automatische Übersetzung. Die React-Codebeispiele verwenden englische Texte.

## Design und UI-Werkzeuge

Light/Dark-Mode nach der gelieferten Palette, mit gespeicherter Auswahl und Systemvorgabe beim ersten Besuch. Schnellsuche mit Cmd/Ctrl+K, animierte Demo-Auswahl und Bestätigung beim Code-Kopieren. Lenis glättet das Scrollen; bei reduzierter Bewegung bleibt es ausgeschaltet. Schriftdateien werden lokal ausgeliefert.

Impeccable ist als Cursor-Skill integriert, Watermelon MCP konfiguriert. 21st MCP ist als Konfigurationsvorlage vorbereitet und benötigt noch einen API-Key. Quellen, Lizenzen, konkrete Komponentenauswahl und Aktivierung: [docs/UI-SOURCES.md](docs/UI-SOURCES.md).

Impeccable ist initialisiert (`PRODUCT.md`, `.impeccable/config.json`). Der bestätigte Build-Standard ist code-first. Cursor-Hooks sind in `.cursor/hooks.json` aktiviert; nach dem Neuladen von Cursor unter Settings → Hooks prüfen. `npm ci` richtet den offiziellen, versionsgebundenen Impeccable-Engine-Aufruf automatisch ein. Lokale Zustimmung und native Binärdateien werden nicht eingecheckt. Live-Mode ist für die Vite-HTML-Datei vorkonfiguriert, aber nicht gestartet.
