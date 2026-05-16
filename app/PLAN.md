# Psychic101 App Suite — Implementation Plan

## Architecture

All apps share a common framework:
- **Single-page HTML** per app, no build tools, no dependencies
- **Shared CSS** via `<link>` to `styles.css` (dark theme, consistent design)
- **Shared JS utilities** via `<script src="utils.js">` (storage, navigation, tips)
- **Hub page** (`index.html`) — welcome page linking to all apps
- Each app lives in its own `.html` file in the `app/` directory
- All data stored in `localStorage` with app-specific keys

### Directory Structure

```
app/
├── index.html          ← Hub / welcome page
├── styles.css          ← Shared styles
├── utils.js            ← Shared utilities (storage, tips, nav)
├── rv-trainer.html     ← Existing Remote Viewing Trainer (renamed)
├── card-guess.html     ← #1 Card Guessing Trainer
├── zener.html          ← #6 Zener Symbol Trainer
├── clair-id.html       ← #3 Clair Sense Identifier
├── journal.html        ← #4 Psychic Journal
├── grounding.html      ← #5 Grounding & Centering Coach
├── dream-tracker.html  ← #8 Dream Precognition Tracker
├── random-viewer.html  ← #9 Random Object Viewer
├── partner.html        ← #7 Partner Practice Platform
└── analyzer.html       ← #10 Signal Line Analyzer
```

---

## Shared Infrastructure

### `styles.css`
Extract all CSS from the current `index.html` into a shared stylesheet. App-specific styles stay inline in each app. Design system:
- Dark theme (`--bg: #0f0f1a`, `--surface: #1a1a2e`, `--accent: #7b68ee`)
- Card components, buttons, textareas, progress bars
- Responsive grid layouts
- Modal overlay system
- Tip banner component

### `utils.js`
Shared JavaScript utilities:
- `showScreen(name)` — navigation helper
- `loadData(key)` / `saveData(key, data)` — localStorage wrappers
- `getRandomTip(screen)` — randomized tip display
- `formatDate(ts)` — date formatting
- `esc(str)` — HTML escape
- `generateCode()` — random target code generator
- `startTimer()` / `stopTimer()` / `updateTimer()` — session timer
- `renderTip(screenId)` — inject tip into DOM element

### `index.html` (Hub)
Welcome page with:
- Hero section: "Psychic101 — Your Psychic Development Toolkit"
- Grid of app cards, each with:
  - Icon (emoji)
  - Title
  - 1-2 sentence description
  - "Open" button linking to the app
- Global stats summary (total sessions across all apps)
- Tip banner at top

---

## App Specifications

### 1. Card Guessing Trainer (`card-guess.html`)

**Purpose:** Build clairvoyance through classic card-guessing with instant feedback.

**Flow:**
1. Choose deck type: Playing Cards (52) or Simplified (4 suits × 10)
2. App randomly selects a card
3. User records impression (free text + suit/number buttons for quick entry)
4. Reveal card with animation
5. Rate accuracy: Exact match / Same suit / Same color / Miss
6. Save to history

**Data model:**
```json
{
  "timestamp": 1715000000000,
  "deck": "playing",
  "card": "♠ 7",
  "guess": "♥ Q",
  "result": "same-color",
  "notes": "felt warm, red energy"
}
```

**Stats:**
- Total guesses, exact matches, same-suit, same-color, misses
- Accuracy percentage vs. chance baseline (1/52 ≈ 1.9% for exact)
- Per-suit accuracy breakdown
- Streak tracking

**UI:**
- Card display with CSS card graphics (suit symbols + rank)
- Quick-guess buttons for suits and common ranks
- Reveal animation (card flip)
- History list with card thumbnails

---

### 2. Zener Symbol Trainer (`zener.html`)

**Purpose:** Authentic ESP training using the 5 Zener symbols from classic parapsychology research.

**Flow:**
1. App randomly selects one of 5 symbols: ○ Circle, ✚ Cross, ≋ Waves, □ Square, ★ Star
2. User selects what they perceive (click the symbol)
3. Instant reveal — correct or wrong
4. Statistical significance tracker (shows if beating 20% chance)

**Data model:**
```json
{
  "timestamp": 1715000000000,
  "target": "circle",
  "guess": "star",
  "correct": false,
  "session": 42
}
```

**Stats:**
- Total trials, correct count, accuracy %
- Chi-square test result (is result statistically significant?)
- Per-symbol accuracy (which symbols are easiest/hardest)
- Session-based grouping (25 trials per session = standard)
- Graph showing accuracy over time

**UI:**
- Large Zener symbol display (hidden until guess)
- 5 symbol buttons for guessing
- Running stats bar at top
- Session progress (e.g., "Trial 14/25")
- Statistical significance indicator (green when p < 0.05)

---

### 3. Clair Sense Identifier (`clair-id.html`)

**Purpose:** Identify dominant Clair sense and provide targeted training exercises.

**Flow:**
1. **Assessment Phase:** 16 questions (2 per Clair sense) — user rates how often they experience each type of perception
2. **Results:** Bar chart showing scores per sense, identifies dominant Clair
3. **Training Phase:** Daily exercises tailored to dominant sense + balanced training for others

**8 Clair Senses & Sample Exercises:**

| Sense | Assessment Questions | Training Exercise |
|---|---|---|
| Clairvoyance | "I see images in my mind's eye", "I get visual flashes about people/places" | Card guessing, blind object identification |
| Clairaudience | "I hear voices/sounds no one else does", "I get auditory impressions" | Blind sound identification, tone matching |
| Clairsentience | "I feel emotions of others", "I get physical sensations without cause" | Texture guessing (eyes closed), emotion reading |
| Claircognizance | "I just know things without knowing how", "Information appears in my mind" | Yes/no gut check, rapid-fire intuition quiz |
| Clairalience | "I smell scents others don't", "Scent impressions come to me" | Blind scent identification (app-guided) |
| Clairgustance | "I taste flavors that aren't there", "Taste impressions appear" | Flavor association exercises |
| Clairempathe | "I absorb others' emotions", "I feel drained around certain people" | Empathy boundary exercises, emotion journaling |
| Clairambience | "I sense the energy of a room", "Places feel different to me" | Room energy assessment, location comparison |

**Data model:**
```json
{
  "assessment": {
    "clairvoyance": 7,
    "clairaudience": 4,
    "clairsentience": 8,
    "claircognizance": 6,
    "clairalience": 2,
    "clairgustance": 1,
    "clairempathe": 5,
    "clairambience": 3
  },
  "dominant": "clairsentience",
  "date": "2026-05-15"
}
```

**UI:**
- Assessment: 16 questions with 1-5 rating sliders
- Results: Horizontal bar chart, dominant sense highlighted
- Training: Daily exercise card with instructions, completion tracking
- Progress: Per-sense improvement over time

---

### 4. Psychic Journal (`journal.html`)

**Purpose:** Dedicated journal for recording impressions, dreams, gut feelings, and verifying them later.

**Flow:**
1. Create entry with category, timestamp, free-text impression
2. Tag entry with keywords
3. Later: verify entry — mark as confirmed, partial, or incorrect
4. Browse/search/filter entries
5. Pattern analysis — which categories are most accurate?

**Categories:**
- 🔮 Remote Viewing Session
- 💭 Dream
- 🌊 Gut Feeling / Intuition
- 👁 Clairvoyant Impression
- 👂 Clairaudient Impression
- ✋ Clairsentient Impression
- 💡 Claircognizant Knowing
- 🔮 Precognition
- 👥 People Reading
- 📦 Psychometry / Object Reading

**Data model:**
```json
{
  "id": "uuid",
  "timestamp": 1715000000000,
  "category": "dream",
  "title": "Dream about flying",
  "content": "I was flying over a city with red buildings...",
  "tags": ["flying", "city", "red"],
  "verification": "confirmed",
  "verificationDate": 1715100000000,
  "verificationNotes": "Next day I visited a city with red buildings"
}
```

**UI:**
- New entry form with category selector, text area, tags
- Entry list with filters (by category, date range, verification status)
- Entry detail view with verify button
- Stats: entries per category, verification rates, accuracy by category
- Export: JSON or text dump

---

### 5. Grounding & Centering Coach (`grounding.html`)

**Purpose:** Guided grounding exercises before and after psychic practice.

**Flow:**
1. Choose exercise type
2. Guided step-by-step with timer and visual cues
3. Completion tracking

**Exercise Types:**

| Exercise | Duration | Method |
|---|---|---|
| Rooting Visualization | 3 min | Visualize roots growing from feet into earth |
| 4-7-8 Breathing | 2 min | Inhale 4s, hold 7s, exhale 8s |
| Body Scan | 5 min | Progressive awareness from toes to crown |
| 5-4-3-2-1 Grounding | 2 min | Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste |
| Quick Reset | 1 min | 3 deep breaths + shake out tension |
| Crystal/Stone Anchor | 3 min | Hold an object, focus on its physical properties |
| Water Visualization | 3 min | Imagine being washed clean by flowing water |
| Pre-Session Routine | 5 min | Combined grounding + centering + intention setting |
| Post-Session Routine | 3 min | Close signal line, ground, return to normal awareness |

**Data model:**
```json
{
  "timestamp": 1715000000000,
  "exercise": "rooting",
  "duration": 180,
  "completed": true,
  "rating": 4
}
```

**UI:**
- Exercise grid with icons and durations
- Guided exercise screen: step-by-step instructions with countdown timer
- Visual progress indicator (breathing circle animation for breathing exercises)
- History: exercises completed, streak tracking
- Quick-access buttons for "Pre-Session" and "Post-Session" routines

---

### 6. Dream Precognition Tracker (`dream-tracker.html`)

**Purpose:** Log dreams and track precognitive hits over time.

**Flow:**
1. Log dream on waking (voice-to-text or typed)
2. Tag key elements (people, places, objects, emotions, actions)
3. Daily review: "Did anything from last night's dream come true?"
4. Mark hits with details
5. Monthly review: precognitive hit rate, common themes

**Data model:**
```json
{
  "id": "uuid",
  "date": "2026-05-15",
  "content": "I was in a white room with a blue door...",
  "elements": ["white room", "blue door", "flying", "grandmother"],
  "emotions": ["peaceful", "curious"],
  "hits": [
    {
      "element": "blue door",
      "manifestation": "Saw a blue door at work next day",
      "date": "2026-05-16",
      "strength": "strong"
    }
  ]
}
```

**UI:**
- Quick-log form (optimized for sleepy morning use — large buttons, minimal typing)
- Voice input button (Web Speech API)
- Dream list with date, mood indicator, hit count
- Dream detail view with hit annotations
- Stats: total dreams, hit rate, top recurring elements, monthly hit graph
- "Review yesterday's dream" prompt on daily visit

---

### 7. Random Object Viewer (`random-viewer.html`)

**Purpose:** Simulates real remote viewing with infinite variety targets.

**Flow:**
1. Choose target source: Wikipedia random article, picsum image, random coordinate
2. App fetches target and shows only a code
3. User does RV session (simplified: impressions + concept)
4. Reveal target (image or article summary)
5. Rate accuracy

**Data model:**
```json
{
  "timestamp": 1715000000000,
  "code": "3847-2910",
  "source": "picsum",
  "targetUrl": "https://picsum.photos/seed/38472910/600/400",
  "impressions": "water, blue, movement, cold",
  "concept": "ocean or lake",
  "rating": 4
}
```

**UI:**
- Source selector (Wikipedia / Image / Coordinate)
- Target code display
- Impression form (free text + quick tags)
- Reveal with image or article preview
- History with target thumbnails

---

### 8. Partner Practice Platform (`partner.html`)

**Purpose:** Coordinate blind sessions between two people.

**Flow:**
1. One person creates a session, gets a share code
2. Other person enters the code to join
3. Roles assigned: Holder (sees target) and Viewer (blind)
4. Synchronized reveal
5. Both rate accuracy independently

**Note:** Without a server, this uses a workaround — the holder shares the target code via any channel (text, email), and the app handles the blind protocol locally. Full real-time sync would require a backend.

**Data model:**
```json
{
  "sessionId": "abc123",
  "role": "viewer",
  "target": "sealed",
  "impressions": "...",
  "rating": 3,
  "partnerRating": null
}
```

**UI:**
- Create/Join session
- Role selection
- Impression form
- Reveal screen
- Session comparison

---

### 9. Signal Line Analyzer (`analyzer.html`)

**Purpose:** Aggregate data from all apps and show patterns.

**Flow:**
1. Reads data from all app localStorage keys
2. Computes cross-app statistics
3. Shows visualizations

**Analytics:**
- Total sessions across all apps
- Accuracy by app type
- Accuracy by time of day (best hours)
- Accuracy by day of week
- Streak tracking (daily practice)
- Clair sense accuracy correlation (if Clair ID data exists)
- AOL frequency trends (from RV sessions)
- Monthly progress graphs

**UI:**
- Dashboard with stat cards
- Charts: accuracy over time, accuracy by hour, accuracy by app
- Grounding correlation: accuracy when grounded vs. not
- Export all data as JSON

---

## Implementation Order

1. **Shared infrastructure** — `styles.css`, `utils.js`, hub `index.html`
2. **RV Trainer** — migrate existing `index.html` → `rv-trainer.html`, extract shared CSS/JS
3. **Card Guessing** — simple, high impact, good validation
4. **Zener Symbols** — similar to card guessing, adds statistical analysis
5. **Psychic Journal** — backbone for all apps, enables verification
6. **Clair Sense Identifier** — assessment + personalized training
7. **Grounding Coach** — guided exercises with timers
8. **Dream Tracker** — voice input, hit tracking
9. **Random Object Viewer** — API-based targets
10. **Partner Platform** — local-only version (no server)
11. **Signal Line Analyzer** — reads all app data, shows patterns

## Technical Notes

- **No build step** — all files are plain HTML/CSS/JS, open directly in browser
- **localStorage** for all data — no server needed
- **Web Speech API** for voice input (dream tracker) — graceful fallback if unavailable
- **picsum.photos** for random images — free, no API key needed
- **Wikipedia API** for random articles — free, CORS-friendly
- **No external libraries** — everything vanilla JS/CSS
- **Responsive** — works on mobile and desktop
- **Export** — all apps support data export as JSON for backup
