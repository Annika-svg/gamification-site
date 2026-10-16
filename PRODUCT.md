# Spielraum

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily the user and optionally their team, designing training sessions, workshops and e-learning. Their work frequently includes personality tests; the current app's play-preference activity is a reflection demo, not a validated personality assessment.

## Product Purpose

Keep important gamification knowledge condensed and easy to retrieve, explore game flows and mini-games, reuse React code, edit existing templates and obtain gamification skills for Cursor.

## Operating Context

A personal and small-team browser workspace. Primary language is German with an English switch. Content is edited directly on the website. The user subsequently requested removal of JSON export; the simplified UI no longer exposes JSON import/export.

## Capabilities and Constraints

- Searchable and editable bilingual knowledge cards based on the supplied notes.
- A mechanics reference based on all twelve interests in the supplied Table 5-1, filterable by learning/design goal.
- Seven working examples: memory, collecting, limited help tokens, ordering, cooperative clues, discovery and play-preference reflection; React source and styles can be copied/downloaded.
- Editable reference and competitor analysis canvas based on the supplied image, with local saving and browser print/PDF.
- Downloadable Cursor skills for gamification.
- Current implementation stores content locally in the browser; it has no shared backend, login or participant tracking. There is no current JSON exchange UI; existing local data is retained.
- Personality-test validation, additional template formats, shared synchronization and deployment requirements remain undecided.

## Brand Commitments

The existing implementation is named Spielraum. Preserve the supplied six-color palette and both light/dark modes; visual specifications belong in DESIGN.md. The user requested Impeccable, Watermelon UI, 21st MCP and Lenis integration. 21st access remains dependent on securely provided credentials.

## Evidence on Hand

The user supplied pasted game-design notes, two uploaded text files and images of a six-part reference/competitor analysis canvas and “Table 5-1. Example game mechanics”. Condensed bilingual knowledge is in src/notes.json. Page references are available but full bibliographic details were not supplied. Practice examples are adaptations, not original quotations. No validated personality-test instrument has been provided.

## Product Principles

- Start with the learning goal and intended player experience before choosing mechanics.
- Make knowledge understandable and directly useful for training and workshops.
- Connect theory with things users can try and reusable React code.
- Keep content directly editable; avoid export controls the user has removed.
- Distinguish reflection prompts, design models and evidence from validated diagnostic claims.
