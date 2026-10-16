# Spielraum

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primarily the user and optionally their team, designing training sessions, workshops and e-learning. Their work frequently includes personality tests; the current app's play-preference activity is a reflection demo, not a validated personality assessment.

## Product Purpose

Keep important gamification knowledge condensed and easy to retrieve, explore game flows and mini-games, reuse React code, edit existing templates and obtain gamification skills for Cursor.

## Operating Context

A personal and small-team browser workspace. Primary language is German with an English switch. Content is edited directly on the website and exchanged through JSON import/export.

## Capabilities and Constraints

- Searchable and editable bilingual knowledge cards based on the supplied notes.
- A mechanic finder organized by learning/design goal.
- Interactive demos with React code to copy or download.
- Editable reference and competitor analysis canvas based on the supplied image, with JSON export/import.
- Downloadable Cursor skills for gamification.
- Current implementation stores content locally in the browser; it has no shared backend, login or participant tracking. JSON is the current exchange mechanism.
- Personality-test validation, additional template formats, shared synchronization and deployment requirements remain undecided.

## Brand Commitments

The existing implementation is named Spielraum. Preserve the supplied six-color palette and both light/dark modes; visual specifications belong in DESIGN.md. The user requested Impeccable, Watermelon UI, 21st MCP and Lenis integration. 21st access remains dependent on securely provided credentials.

## Evidence on Hand

The user supplied pasted game-design notes, two uploaded text files and an image of a six-part reference/competitor analysis canvas. Condensed bilingual knowledge is in src/notes.json. Page references are available but full bibliographic details were not supplied. Practice examples are adaptations, not original quotations. No validated personality-test instrument has been provided.

## Product Principles

- Start with the learning goal and intended player experience before choosing mechanics.
- Make knowledge understandable and directly useful for training and workshops.
- Connect theory with things users can try and reusable React code.
- Keep content editable and portable through JSON.
- Distinguish reflection prompts, design models and evidence from validated diagnostic claims.
