# UI sources and integration

## Integrated

### Impeccable
- Website: https://impeccable.style/
- Official source: https://github.com/pbakaus/impeccable
- Revision: dd47ec83eca2dcc57be2c5d2e3f927a167ce6cf4 (4.6.0).
- The official precompiled Cursor skill is vendored under `.cursor/skills/impeccable`, including its references and launcher. Reload Cursor to discover it. Use `/impeccable colorize`, `/impeccable audit` or `/impeccable polish`.
- The website bundle installer was blocked by the current egress policy; the compiled files were obtained from the official Git repository, without disabling verification. Project initialization is recorded in PRODUCT.md with code-first as the confirmed build default. Cursor preToolUse hooks are enabled in .cursor/hooks.json. The official CLI is pinned as a development dependency; npm ci prepares its native engine for the vendored launcher through scripts/setup-impeccable.mjs. The CLI context command ran successfully through the npm-distributed engine.
- License: `licenses/impeccable-Apache-2.0.txt`.

### Watermelon UI
- Website: https://ui.watermelon.sh/
- Official source: https://github.com/WatermelonCorp/watermelon-platform
- Revision: 9a5415fffb871b3aa5ceee3860be1bb9e14682a3.
- Source-backed selections adapted in `src/components/StudioUI.jsx`:
  - `command-search/base.tsx`: quick search of pages and notes, Cmd/Ctrl+K, arrows and Enter. Adapted to a native dialog with focus containment, escape and restored focus.
  - `continuous-tabs/base.tsx`: shared-layout active pill for switching between the live example and its React source. Controlled state, pressed-state semantics and reduced-motion support added.
  - `copy-confirm/base.tsx`: clipboard action changes from Copy to Copied. Simplified animation and added error handling/timer cleanup.
- Source directory: `src/data/contents/animated-components/` in the official repository. Components use the existing CSS system rather than introducing Tailwind.
- Additional suitable candidates inspected in the catalog tree: `filter-disclosure` for larger filter sets, `feature-tour` for optional onboarding, `expand-details` for progressive disclosure. Deferred until the current UI needs them.
- Public MCP configured in `.cursor/mcp.json`; no API key required. The connection is configured but not verified in this runtime because the destination is currently blocked. Reload Cursor and enable this server after allowing the domain.
- License: `licenses/watermelon-MIT.txt`.

### Lenis
- https://github.com/darkroomengineering/lenis
- Runtime dependency `lenis`, exact resolved version in package-lock.json.
- Single instance, automatic animation frame loop, instant reset on page change, native nested scrolling for dialogs, editors and code. Disabled for reduced-motion users and cleaned up on unmount or preference changes.

## Prepared, awaiting access: 21st MCP

- Setup: https://21st.dev/mcp
- Official instructions checked at https://github.com/21st-dev/magic-mcp (the old Magic package now points to the unified 21st MCP).
- Requires a fresh API key; no API_KEY_21ST binding was present. Do not enter it into source, chat or the frontend.
- `.cursor/mcp.21st.example.json` contains the complete optional configuration. After securely setting `API_KEY_21ST` in the environment used to launch Cursor, merge the `21st` entry into `.cursor/mcp.json` and reload Cursor. No example value is a working credential.
- Endpoint: `https://21st.dev/api/mcp`, header `x-api-key` using `${env:API_KEY_21ST}`. It remains out of the active config until credentials are supplied.
- First searches to compare: command palette, accessible sidebar navigation, filter toolbar, editable workspace canvas. Retrieve actual source and its license before adopting any result.
- No 21st catalog result was retrieved and no generated 21st component is claimed. Search/get_component access and hosted AI generation may depend on account access.

## Cloud access

The requested domains and optional secret requirement are saved in the cloud configuration draft. Saving the draft does not apply networking, inject a key, connect MCP tools in this session or publish the environment. Review/save the environment settings and publish when appropriate. The main application works without these external design services.

## Subsequent simplification

On user request, the promotional overview and decorative tiles were removed. Knowledge is a reading workspace, mechanics a source-based reference, and examples functional games. The Watermelon continuous-tabs adaptation now switches between a game and its exact React source. The brand palette, theme switch, command search and copy confirmation remain. JSON export/import UI was removed; existing local data is preserved. Templates support print/PDF.

## Componentry — note overview

- Reference: https://componentry.dev/docs/components/orbit-card-stack
- Official repository: https://github.com/harshjdhv/componentry
- Revision: b602c2872fea85c9f2464016ce3bbe0af17b51b4.
- Source: `packages/ui/src/components/orbit-card-stack.tsx` and its documentation component. The documentation site was blocked by egress policy; the official GitHub source was accessible.
- Adapted in `src/components/NoteOrbitStack.jsx`: compact resting deck, orbit fan on hover/focus, raised active card, arrow-key navigation and reduced-motion support. Profile imagery is replaced by actual note titles, summaries and sources. Notes are grouped by topic; previous/next controls expose every note in each group, and selecting a card opens the existing reading/editor view.
- No new runtime dependencies. Styling uses the existing light/dark palette.
- License: `licenses/componentry-MIT.txt`.

## Animated theme toggle — user-supplied Skiper UI example

The user supplied a React/Framer Motion example containing five `ThemeToggleButton` variants. The header adapts variant 2 (sun rays retract and a moving SVG cutout reveals a crescent) in `src/components/StudioUI.jsx`. The toggle is controlled by the application's persisted theme rather than the example's local demo state. SVG clip IDs are unique, labels are localized, keyboard operation is native, and reduced motion uses a zero-duration transition. No new dependency is required; the project uses `motion/react`.

Attribution from the supplied source: React adaptation by @gurvinder-singh02 / Skiper UI, based on open-source CSS theme toggles at https://toggles.dev/ by Alfie Jones. The supplied usage notice allows free personal/commercial modification and requires Skiper UI attribution for the free version. The public footer includes that credit; no Pro entitlement is assumed. The example's draggable configuration panel and five redundant demo switches are not included in the product.
