# 🔮 Psychic101

**A free, open-source suite of 18 apps to explore and develop psychic abilities through playful practice, journaling, and analysis.**

> **Play over pressure.** Every interaction is low-stakes, fun, and rewarding — like a game, not a lab.

[**Try it live**](https://psychic101.pages.dev)

---

## Features

- **18 apps** covering remote viewing, ESP training, intuition games, dream work, and more
- **Bilingual** — English and Hebrew (RTL), auto-detected from browser language
- **Gamified** — XP, levels, badges, streaks, daily challenges, and confetti
- **Psychic Profile** — Track your level, stats, badges, and weekly progress
- **100% private** — Zero tracking, zero analytics, zero cookies. All data stays in your browser (`localStorage`)
- **Mobile-first** — Works on any device, tested on Android (Brave, Chrome, Firefox) and iOS (Safari)

---

## Apps

### 🎯 Remote Viewing

| App | Description |
|-----|-------------|
| [Remote Viewing Trainer](app/rv-trainer.html) | Full CRV protocol: ideogram → sensory data → dimensions → emotions → reveal |
| [Random Object Viewer](app/random-viewer.html) | Blind targets from Wikipedia and random images |
| [Partner Platform](app/partner.html) | Coordinate sessions with a partner — one holds, one views |

### 🃏 ESP Training

| App | Description |
|-----|-------------|
| [Card Guessing Trainer](app/card-guess.html) | Guess playing cards from a shuffled deck |
| [Zener Symbol Trainer](app/zener.html) | Classic ESP with 5 Zener symbols, chi-square analysis |
| [Clair Sense Identifier](app/clair-id.html) | Discover your dominant Clair sense |
| [Dial Trainer](app/dial-trainer.html) | Influence a random pointer with your mind |

### 🎮 Play & Explore

| App | Description |
|-----|-------------|
| [Intuition Dice](app/intuition-dice.html) | Focus on a number, roll the dice, see if intuition influences the outcome |
| [Color Sense](app/color-sense.html) | A color flashes briefly — can your inner eye see it? |
| [Mind Reader](app/mind-reader.html) | Think of a symbol, then try to read your own mind |
| [Focus Orb](app/focus-orb.html) | Concentration exercise — how long can you maintain focus? |
| [Energy Pulse](app/energy-pulse.html) | Can you sense the rhythm? Feel when the energy peaks |
| [Dream Catcher](app/dream-catcher.html) | Capture dreams with tags, voice input, and mood tracking |
| [Telepathy Game](app/telepathy-game.html) | Two players, same room — can you sense your partner's emoji? |

### 📖 Journaling & Tracking

| App | Description |
|-----|-------------|
| [Psychic Journal](app/journal.html) | Record impressions, experiences, and synchronicities |
| [Dream Tracker](app/dream-tracker.html) | Log dreams, tag symbols, identify precognitive hits |

### 🧘 Preparation & Analysis

| App | Description |
|-----|-------------|
| [Grounding Coach](app/grounding.html) | Guided grounding: 5-4-3-2-1, rooting visualization, breath work |
| [Signal Line Analyzer](app/analyzer.html) | Analyze data across all apps — accuracy trends, AOL frequency, peak times |

### 👤 Profile

| App | Description |
|-----|-------------|
| [Psychic Profile](app/profile.html) | Your level, XP, stats, badges, and weekly report |

---

## Gamification

### XP & Levels

Earn XP by using any app. Level up through 11 ranks:

| Level | Rank |
|-------|------|
| 0 | Awakening |
| 1 | Seeker |
| 2 | Explorer |
| 3 | Channeler |
| 4 | Perceiver |
| 5 | Seer |
| 6 | Visionary |
| 7 | Adept |
| 8 | Master |
| 9 | Sage |
| 10 | Enlightened |

### Badges

20 badges to unlock, including:

- 🌱 **First Step** — Complete your first session
- 🔥 **Getting Started** — 3-day practice streak
- 🔥🔥 **On Fire** — 7-day practice streak
- 🔥🔥🔥 **Unstoppable** — 30-day practice streak
- 🃏 **Card Shark** — 10 Card Guess sessions
- 🔮 **RV Veteran** — 10 Remote Viewing sessions
- 👁 **Clairvoyant** — Complete the Clairvoyance assessment
- And many more...

### Daily Engagement

- **Streaks** — Tracks consecutive days of practice
- **Daily Challenges** — Rotating tasks to encourage variety
- **Time-of-Day Prompts** — Context-aware suggestions (e.g., dream logging in the morning)
- **Fun Facts** — Rotating educational tidbits about psychic phenomena
- **Confetti & Sound Effects** — Visual and audio celebration on hits

---

## Privacy

Psychic101 makes a strong privacy guarantee:

- ❌ No external calls
- ❌ No tracking
- ❌ No analytics
- ❌ No beacons
- ❌ No cookies

All data is stored locally in your browser using `localStorage` (with `sessionStorage` fallback). Nothing leaves your device.

---

## Tech Stack

- **Pure HTML/CSS/JavaScript** — No frameworks, no build step
- **Cloudflare Pages** — Static hosting, deployed via Git integration
- **Web Audio API** — Sound effects (no external audio files)
- **Canvas API** — Drawing (RV Trainer, Dial Trainer)
- **localStorage** — Data persistence

---

## Project Structure

```
psychic101/
├── app/
│   ├── index.html          # Hub / home page
│   ├── index-app.js        # Hub JavaScript
│   ├── utils.js            # Shared utilities (i18n, gamification, sounds)
│   ├── styles.css          # Global styles
│   ├── _headers            # Cloudflare Pages headers (CSP, etc.)
│   ├── rv-trainer.html     # Remote Viewing Trainer
│   ├── zener.html          # Zener Symbol Trainer
│   ├── card-guess.html     # Card Guessing Trainer
│   ├── dial-trainer.html   # Dial Trainer
│   ├── clair-id.html       # Clair Sense Identifier
│   ├── partner.html        # Partner Platform
│   ├── random-viewer.html  # Random Object Viewer
│   ├── journal.html        # Psychic Journal
│   ├── dream-tracker.html  # Dream Tracker
│   ├── dream-catcher.html  # Dream Catcher
│   ├── grounding.html      # Grounding Coach
│   ├── analyzer.html       # Signal Line Analyzer
│   ├── profile.html        # Psychic Profile Dashboard
│   ├── intuition-dice.html # Intuition Dice
│   ├── color-sense.html    # Color Sense
│   ├── mind-reader.html    # Mind Reader
│   ├── focus-orb.html      # Focus Orb
│   ├── energy-pulse.html   # Energy Pulse
│   ├── telepathy-game.html # Telepathy Game
│   ├── about.html          # About page
│   ├── privacy.html        # Privacy Policy (EN)
│   ├── privacy-he.html     # Privacy Policy (HE)
│   ├── terms.html          # Terms of Service (EN)
│   ├── terms-he.html       # Terms of Service (HE)
│   ├── accessibility.html  # Accessibility (EN)
│   └── accessibility-he.html # Accessibility (HE)
├── .pages.yml              # Cloudflare Pages config
├── NOTES.md                # Deployment & versioning guide
├── PLAYFUL_DEVELOPMENT_PLAN.md # Gamification & UX plan
├── TRAINING_TECHNIQUES.md  # Remote viewing training techniques
├── research.md             # Research on psychic abilities & remote viewing
└── README.md               # This file
```

---

## Deployment

**Deploy via Git push only.** Cloudflare Pages auto-deploys from the `main` branch.

```bash
git add -A
git commit -m "describe change"
git push origin main
```

Do **not** use `wrangler pages deploy` — it bypasses the Git integration.

### Versioning

The version number lives in `app/utils.js` → `const APP_VERSION`. Update it on each release commit. It's displayed in the footer of all pages.

---

## Internationalization

The site supports **English** and **Hebrew (RTL)**.

- **Auto-detection** via `navigator.language` (Hebrew phones auto-show Hebrew)
- **Manual override** via `?lang=he` URL parameter
- **Persistent** — language choice saved to `localStorage`
- **RTL** applied to `<body>` (not `<html>`) to avoid Chromium mobile rendering bugs

To add a translation, add the key to both `en` and `he` blocks in `app/utils.js` and use `data-i18n="your-key"` on the HTML element.

---

## Research

The `research.md` file contains compiled research on:

- Remote viewing history (Stargate Project, Puthoff & Targ)
- Controlled Remote Viewing (CRV) methodology
- Scientific studies and meta-analyses
- Neural correlates of psychic phenomena
- Recent developments (2024–2026)

---

## License

MIT
