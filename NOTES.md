# Psychic101 — Project Notes

## Deployment

**Deploy via git push only.** Cloudflare Pages is configured with git integration
(`.pages.yml`). Push to `main` and Cloudflare auto-deploys within seconds.

```bash
git add -A
git commit -m "describe change"
git push origin main
```

**Do NOT use `wrangler pages deploy` directly.** Direct upload bypasses the git
integration and creates deployments that are not tracked in the Cloudflare
dashboard properly.

## Version Number

The version number lives in one place: `app/utils.js` → `const APP_VERSION`.

**Always update `APP_VERSION` when making a release commit.**

- Format: Semantic versioning (`1.2.0`, `1.2.1`, `1.3.0`, etc.)
- Displayed in the footer of the hub and all legal pages via `data-version` attribute
- Updated dynamically by `renderVersion()` in `utils.js`

## Language / i18n

The site supports **English (en)** and **Hebrew (he)**.

### How it works

1. **`app/utils.js`** — Contains the `TRANSLATIONS` object (all i18n keys),
   `applyTranslations()`, `setLang()`, `langSelectorHTML()`, and `t()` helper.
2. **`data-i18n` attribute** — Place on any element to translate its text:
   ```html
   <p data-i18n="hero-title">Psychic Development Suite</p>
   ```
3. **`data-i18n-placeholder`** — For input/textarea placeholders:
   ```html
   <input data-i18n-placeholder="your-impressions">
   ```
4. **Auto-detection** — Uses `navigator.language` to detect the browser's
   preferred language (Hebrew phones auto-show Hebrew). Falls back to English.
5. **URL param** — `?lang=he` forces Hebrew regardless of browser language.
6. **Persistence** — Language choice is saved via `localStorage` (or fallback
   to `sessionStorage` / cookie) so it persists across pages.

### Adding a translation

1. Add the key to both `en` and `he` blocks in `TRANSLATIONS` (in `utils.js`)
2. Add `data-i18n="your-key"` to the HTML element

### RTL handling

- `dir="rtl"` is applied to `<body>` (not `<html>`) to avoid a Chromium mobile
  rendering bug with flexbox
- RTL CSS adjustments are in `styles.css` under `[dir="rtl"]` selectors
- The `header` element always stays LTR (`direction: ltr` override)
- Use `getLangDirection()` helper to determine direction for a language

## Hidden Game: Star Drifter (spaceshooter.html)

- **File**: `app/spaceshooter.html` — a self-contained space shooter game.
- **Title**: "Star Drifter by erez"
- **Access**: Linked from the footer of the hub (`index.html`) and all legal pages.
- **Footer label**:
  - English: `🚀 Hidden Game` (translation key: `legal-game-link`)
  - Hebrew: `🚀 משחק` (translation key: `legal-game-link`)
- **No hub card** — intentionally hidden, only accessible via the footer link.
- **Original source**: `C:\Users\Erez\Documents\opencode projects\spaceshooter\index.html`
