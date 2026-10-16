# Spielraum design

The user-supplied palette is binding: Palladian #EEE9DF, Oatmeal #C9C1B1, Blue Fantastic #2C3B4D, Burning Flame #FFB162, Truffle Trouble #A35139, Abyssal Anchorfish Blue #1B2632.

Light mode: warm cream canvas, slightly brighter reading surfaces, navy text and terracotta accents. Dark mode: abyssal canvas, blue elevated surfaces, cream text and orange actions. All components use semantic tokens in src/theme.css. Persist explicit theme selection; otherwise start from the system preference. Both modes serve reading and focused editing.

The user requested a quieter, more practical tool. Navigation leads straight to knowledge, mechanics, examples, templates and Cursor skills. Remove the marketing homepage, slogans, decorative hero, repeated eyebrow headings, icon tiles, AI badges and ornamental motion. Use a single self-hosted DM Sans family with readable body text. Keep color for selected navigation, meaningful game state and actions.

Knowledge uses a compact index and an inline reading/editor view. Mechanics use aligned reference rows rather than a card grid. Examples use a simple selection list, a functional game area, rules, application notes and an optional source view. The six-field canvas retains the supplied template structure. No JSON export/import UI remains; templates support browser print/PDF. Keep the supplied palette, both language versions, keyboard operation and reduced-motion support.

The user explicitly requested a Componentry Orbit Card Stack treatment for the note overview. Topic-based decks may fan and lift on interaction; this is an intentional functional exception to the otherwise restrained layout. Use real note content, no decorative profile images, and retain a direct reading view, search, touch controls, keyboard navigation and reduced-motion support.
