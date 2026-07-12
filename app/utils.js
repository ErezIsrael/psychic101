// ─── Psychic101 Shared Utilities ──────────────────────────

// ─── Version (update here on each release) ────────────────
const APP_VERSION = '1.3.0';

// ─── i18n ─────────────────────────────────────────────────
// Detect once which storage mechanism actually works, then use it exclusively
let _storageType = null; // 'local' | 'session' | 'cookie'
function detectStorage() {
  if (_storageType) return _storageType;
  try {
    localStorage.setItem('__p101_test__', '1');
    if (localStorage.getItem('__p101_test__') === '1') {
      localStorage.removeItem('__p101_test__');
      _storageType = 'local'; return 'local';
    }
  } catch(e) {}
  try {
    sessionStorage.setItem('__p101_test__', '1');
    if (sessionStorage.getItem('__p101_test__') === '1') {
      sessionStorage.removeItem('__p101_test__');
      _storageType = 'session'; return 'session';
    }
  } catch(e) {}
  _storageType = 'cookie'; return 'cookie';
}

function getStoredLang() {
  const st = detectStorage();
  if (st === 'local') { try { const v = localStorage.getItem('p101_lang'); if (v) return v; } catch(e) {} }
  if (st === 'session') { try { const v = sessionStorage.getItem('p101_lang'); if (v) return v; } catch(e) {} }
  if (st === 'cookie') { const m = document.cookie.match(/p101_lang=([^;]+)/); if (m) return m[1]; }
  const params = new URLSearchParams(window.location.search);
  const urlLang = params.get('lang');
  if (urlLang && TRANSLATIONS[urlLang]) return urlLang;
  // Auto-detect from browser language (he → Hebrew, otherwise English)
  const browser = navigator.language.slice(0, 2);
  if (browser === 'he') return 'he';
  return 'en';
}
function setStoredLang(lang) {
  const st = detectStorage();
  if (st === 'local') { try { localStorage.setItem('p101_lang', lang); return; } catch(e) {} }
  if (st === 'session') { try { sessionStorage.setItem('p101_lang', lang); return; } catch(e) {} }
  document.cookie = 'p101_lang=' + lang + ';path=/;max-age=31536000';
}
let currentLang = getStoredLang() || 'en';

const TRANSLATIONS = {
  en: {
    // Shared UI
    'lang-label': 'Language',
    'back-home': '← Back to Home',
    'back': '← Back',
    'quit': '← Quit',
    'save': '💾 Save',
    'next': 'Next →',
    'previous': '← Previous',
    'finish': '📊 Finish',
    'start': 'Start',
    'continue': '▶ Continue',
    'reveal': '🔍 Reveal',
    'submit': '🔍 Submit',
    'history': '📋 History',
    'training': '🏋 Training',
    'close': 'Close',
    'loading-tip': 'Loading tip...',
    'no-data': 'No data yet.',
    'date': 'Date',
    'notes': 'Notes',
    'rating': 'Rating',
    'duration': 'Duration',
    'accuracy': 'Accuracy',
    'sessions': 'Sessions',
    'total': 'Total',
    'correct': 'Correct',
    'chance': 'Chance',
    'over-chance': 'Over Chance',
    'trials': 'Trials',
    'exact': 'Exact',
    'same-suit': 'Same Suit',
    'same-color': 'Same Color',
    'miss': 'Miss',
    'day-streak': 'Day Streak',
    'avg-rating': 'Avg Rating',
    'total-trials': 'Total Trials',
    'total-rounds': 'Total Rounds',
    'exact-matches': 'Exact Matches',
    'exact-pct': 'Exact %',
    'per-symbol-accuracy': 'Per-Symbol Accuracy',
    'chi-square': 'Chi-Square Analysis',
    'session-notes': 'Session Notes',
    'reflection': 'Reflection',
    'impression-notes': 'Impression Notes',
    'feedback-notes': 'What matched? What didn\'t?',
    'self-assessment': 'Self-Assessment',
    'accuracy-rating': 'Accuracy Rating',
    'your-impressions': 'Your Impressions',
    'target-revealed': '🎯 Target Revealed',
    'session-history': '📊 Session History',
    'card-history': '📊 Card Guessing History',
    'zener-history': '📊 Zener History',
    'daily-exercises': 'Daily Training Exercises',
    'training-log': 'Training Log',
    'score-breakdown': 'Score Breakdown',
    'recommended-training': 'Recommended Training',
    'clair-profile': 'Your Clair Sense Profile',
    'next-trial': '▶ Next Trial',
    'save-session': '💾 Save Session',
    'save-next': '💾 Save & Next Round',
    'start-round': '🃏 Start New Round',
    'start-session': '⭕ Start New Session',
    'start-assessment': '🔮 Start Assessment',
    'view-results': '📊 View Results',
    'go-training': '🏋 Go to Training',
    'start-new-session': '✨ Start New Session',
    'continue-session': '▶ Continue Session',
    'continue-sensory': 'Continue to Sensory Data →',
    'continue-dimensions': 'Continue to Dimensions →',
    'continue-emotions': 'Continue to Emotions →',
    'reveal-target': '🔍 Reveal Target',
    'log-complete': '✓ Log Complete',
    'no-sessions': 'No sessions yet. Start your first session!',
    'no-rounds': 'No rounds yet. Start guessing!',
    'no-exercises': 'No exercises logged yet.',
    'complete-assessment': 'Complete the assessment first to see personalized exercises.',
    'no-assessment': 'No assessment data found. Complete the assessment first.',
    'select-symbol': 'Please select a symbol before submitting.',
    'select-suit-rank': 'Please select both a suit and a rank before revealing.',
    'need-10-trials': 'Need at least 10 trials for chi-square analysis.',
    'chi-sig': '✅ Statistically significant! χ² = {chi2} (critical: {critical})',
    'chi-ns': '⚠ Approaching significance. χ² = {chi2} (critical: {critical})',
    'chi-low': 'Not significant. χ² = {chi2} (critical: {critical})',
    // Zener
    'zener-title': '⭕ Zener Symbols',
    'zener-subtitle': '— ESP Trainer',
    'zener-desc': 'Classic ESP research using 5 symbols. Random chance is 20% — sustained scores above 25% are noteworthy.',
    'zener-symbols-title': 'The 5 Zener Symbols',
    'circle': 'Circle',
    'cross': 'Cross',
    'waves': 'Waves',
    'square': 'Square',
    'star': 'Star',
    'trials-per-session': 'Trials per Session',
    'what-symbol': 'What symbol do you sense?',
    'focus-hidden': 'Focus on the hidden symbol. Select what your intuition tells you.',
    'correct': '🎯 Correct!',
    'incorrect': '❌ Incorrect — Target was {sym}',
    'you-guessed': 'You guessed: {guess}  |  Target: {target}',
    'excellent': '🌟 Excellent — Well above chance!',
    'above-chance': '👍 Above chance — Good work!',
    'near-chance': '👁 Near chance — Keep practicing!',
    'below-chance': '📉 Below chance — Don\'t be discouraged.',
    // Card
    'card-title': '🃏 Card Guessing',
    'card-subtitle': '— ESP Trainer',
    'card-desc': 'Focus on the card back, then record your psychic impression of the hidden card. Test your clairvoyance!',
    'how-to-play': 'How to Play',
    'deck-type': 'Deck Type',
    'full-deck': 'Full Deck (52 cards)',
    'simplified': 'Simplified (4 suits × 10)',
    'what-card': 'What card do you sense?',
    'focus-card': 'Focus on the card back. Select the suit and rank your impression points to.',
    'suit': 'Suit',
    'rank': 'Rank',
    'spades': 'Spades',
    'hearts': 'Hearts',
    'diamonds': 'Diamonds',
    'clubs': 'Clubs',
    'exact-match': '🎯 Exact Match!',
    'same-suit-badge': '👍 Same Suit!',
    'same-color-badge': '👁 Same Color',
    'miss-badge': '❌ Miss',
    // RV Trainer
    'rv-title': '🔮 Psychic101',
    'rv-subtitle': '— RV Trainer',
    'rv-desc': 'Practice Controlled Remote Viewing (CRV) with randomized targets. Each session gives you a target code — record your impressions, then reveal the target to compare.',
    'how-it-works': 'How It Works',
    'rv-step1': 'Get a target code — a random 8-digit number linked to a hidden image',
    'rv-step2': 'Draw your ideogram — let your hand move freely to capture the gestalt',
    'rv-step3': 'Record impressions — sensory data, dimensions, colors, emotions',
    'rv-step4': 'Reveal & compare — see the target and rate your accuracy',
    'rv-step5': 'Review & improve — track your progress over time',
    'quick-tips': 'Quick Tips',
    'rv-tip1': 'Relax before starting — take 3 deep breaths',
    'rv-tip2': 'Iterate the target code silently: "Target',
    'rv-tip3': 'Record everything — even if it seems silly',
    'rv-tip4': 'Don\'t force or guess — let impressions come naturally',
    'rv-tip5': 'Watch for AOL (analytical overlays) — label them and move on',
    'step1-ideogram': 'Step 1 — Ideogram',
    'ideogram-desc': 'Iterate the target code silently. Let your hand move freely on the canvas below. The resulting mark is your <strong>ideogram</strong> — the gestalt of the target.',
    'ideogram-category': 'Ideogram Category',
    'ideogram-notes': 'Ideogram Notes',
    'ideogram-placeholder': 'What does the ideogram suggest? Describe the shape, feel, and initial impressions...',
    'step2-sensory': 'Step 2 — Sensory Data (A/B)',
    'sensory-desc': 'Record raw sensory impressions. What do you <strong>see, hear, feel, smell, taste</strong>? Keep it factual — no interpretation yet.',
    'visual': '👁 Visual',
    'auditory': '👂 Auditory',
    'tactile': '✋ Tactile / Kinesthetic',
    'olfactory': '👃 Olfactory',
    'gustatory': '👅 Gustatory',
    'aol': '⚠️ Analytical Overlays (AOL)',
    'step3-dimensions': 'Step 3 — Dimensions & Colors',
    'dimensions-desc': 'Estimate the size, shape, and color palette of the target. Think in terms of relative scale.',
    'size-scale': 'Size / Scale',
    'shape-form': 'Shape / Form',
    'colors': 'Colors',
    'motion-energy': 'Motion / Energy',
    'step4-emotions': 'Step 4 — Emotions & Conceptualization',
    'emotions-desc': 'What feelings does the target evoke? What is the overall "vibe"? Now you may begin to form a conceptual understanding.',
    'emotional-tone': 'Emotional Tone',
    'overall-vibe': 'Overall Vibe / Atmosphere',
    'conceptualization': 'Conceptualization',
    'session-duration': 'Session Duration',
    'compare-impressions': 'Compare your impressions with the actual target. Be honest in your self-assessment.',
    // Clair
    'clair-title': '👁 Clair Sense ID',
    'clair-subtitle': '— Assessment',
    'clair-desc': 'Discover your dominant Clair sense through a 16-question assessment. Each sense gets 2 questions rated on a 1–5 scale.',
    'clair-senses-title': 'The 8 Clair Senses',
    'clairvoyance': 'Clairvoyance',
    'clairvoyance-desc': 'Clear seeing, visual impressions',
    'clairaudience': 'Clairaudience',
    'clairaudience-desc': 'Clear hearing, auditory impressions',
    'clairsentience': 'Clairsentience',
    'clairsentience-desc': 'Clear feeling, tactile/emotional sensations',
    'claircognizance': 'Claircognizance',
    'claircognizance-desc': 'Clear knowing, information without source',
    'clairalience': 'Clairalience',
    'clairalience-desc': 'Clear smelling, scent impressions',
    'clairgustance': 'Clairgustance',
    'clairgustance-desc': 'Clear tasting, flavor impressions',
    'clairempathy': 'Clairempathy',
    'clairempathy-desc': 'Clear empathy, absorbing others\' emotions',
    'clairambience': 'Clairambience',
    'clairambience-desc': 'Clear ambience, sensing energy of places',
    'dominant-sense': 'Your dominant Clair sense is: {icon} {name} ({desc}).<br>This is your strongest channel for psychic perception. Focus training here first.',
    'focus-dominant': 'Focus on strengthening your dominant sense first, then cross-train the others.',
    'rating-never': 'Never',
    'rating-rarely': 'Rarely',
    'rating-sometimes': 'Sometimes',
    'rating-often': 'Often',
    'rating-always': 'Always',
    'never': 'Never',
    'rarely': 'Rarely',
    'sometimes': 'Sometimes',
    'often': 'Often',
    'always': 'Always',
    'dominant-desc': 'This is your strongest channel for psychic perception. Focus training here first.',
    'training-focus': 'Focus on strengthening your dominant sense first, then cross-train the others.',
    'training-exercises-below': 'Here are your personalized exercises below.',
    'complete-assessment-first': 'Complete the assessment first to see personalized exercises.',
    'no-exercises-logged': 'No exercises logged yet.',
    'no-assessment-data': 'No assessment data found. Complete the assessment first.',
    // Hub
    'hub-title': '🔮 Psychic101',
    'hub-subtitle': '— Suite',
    'hero-title': 'Psychic Development Suite',
    'hero-desc': 'Explore and develop your psychic abilities through structured practice, journaling, and analysis.',
    'section-rv': '🎯 Remote Viewing',
    'section-esp': '🃏 ESP Training',
    'section-journal': '📖 Journaling & Tracking',
    'section-prep': '🧘 Preparation & Analysis',
    'hub-activity-title': '📋 Recent Activity',
    'hub-entries': 'entries',
    'hub-sessions': 'sessions',
    'hub-no-activity': 'No activity yet. Start a session!',
    'launch': 'Launch →',
    'rv-trainer-title': 'Remote Viewing Trainer',
    'rv-trainer-desc': 'Full CRV protocol: ideogram → sensory data → dimensions → emotions → reveal.',
    'random-viewer-title': 'Random Object Viewer',
    'random-viewer-desc': 'Blind targets from Wikipedia and random images. Practice with unpredictable subjects.',
    'partner-title': 'Partner Platform',
    'partner-desc': 'Coordinate sessions with a partner. One holds, one views. Compare results.',
    'card-guess-title': 'Card Guessing Trainer',
    'card-guess-desc': 'Guess playing cards from a shuffled deck. Track accuracy by suit and rank.',
    // Card Guessing extra
    'card-history-title': '📊 Session History',
    'card-start': '▶ Start Session',
    'card-step1': 'Choose your deck type',
    'card-step2': 'Focus on the card back',
    'card-step3': 'Record your impression',
    'card-step4': 'Reveal the card',
    'card-step5': 'Rate your accuracy',
    'reveal-card': '🔍 Reveal Card',
    'simplified-deck': 'Simplified Deck',
    'zener-title-hub': 'Zener Symbol Trainer',
    'zener-desc-hub': 'Classic ESP research with 5 Zener symbols. 25-trial sessions with chi-square analysis.',
    // Zener extra
    'chi-analysis': 'Chi-Square Analysis',
    'submit-guess': 'Submit Guess',
    'sym-circle': '○ Circle',
    'sym-cross': '✚ Cross',
    'sym-square': '□ Square',
    'sym-star': '★ Star',
    'sym-waves': '≋ Waves',
    'zener-guess-desc': 'Focus on the hidden symbol. What do you perceive?',
    'zener-guess-title': 'Guess the Symbol',
    'zener-history-title': '📊 Session History',
    'zener-start': '▶ Start Session',
    'clair-id-title': 'Clair Sense Identifier',
    'clair-id-desc': 'Discover your dominant Clair sense through guided exercises.',
    'journal-title': 'Psychic Journal',
    'journal-desc': 'Record impressions, experiences, and synchronicities. Tag and search entries.',
    'dream-title': 'Dream Tracker',
    'dream-desc': 'Log dreams, tag symbols, identify precognitive hits. Review patterns over time.',
    'dream-log-btn': '📋 Dream Log',
    'grounding-title': 'Grounding Coach',
    'grounding-desc': 'Guided grounding: 5-4-3-2-1 technique, rooting visualization, breath work.',
    'analyzer-title': 'Signal Line Analyzer',
    'analyzer-desc': 'Analyze data across all apps. Track accuracy trends, AOL frequency, peak times.',
    // Analyzer extra
    'analyzer-overview': 'Overview',
    'analyzer-overview-desc': 'This dashboard aggregates data from all your psychic training apps to reveal patterns and trends.',
    'analyzer-data-sources': 'Data Sources',
    'analyzer-accuracy': 'Accuracy by App',
    'analyzer-peak-times': 'Peak Activity Times',
    'analyzer-aol': 'AOL Frequency',
    'analyzer-refresh': '🔄 Refresh',
    'analyzer-refresh-btn': '🔄 Refresh Analysis',
    'analyzer-loading': 'Loading data...',
    'analyzer-aol-high': 'Strong signal — keep it up!',
    'analyzer-aol-med': 'Moderate signal — keep practicing',
    'analyzer-aol-low': 'Weak signal — try grounding before sessions',
    'analyzer-no-data': 'No data yet. Start some sessions first!',
    'analyzer-no-journal-data': 'No journal entries yet. Log some experiences first.',
    'analyzer-records': 'records',
    'analyzer-rv': 'RV Trainer',
    'analyzer-card': 'Card Guessing',
    'analyzer-zener': 'Zener Symbols',
    'analyzer-random': 'Random Viewer',
    'analyzer-partner': 'Partner Platform',
    'analyzer-dial': 'Dial Trainer',
    'os-total-sessions': 'Total Sessions',
    'os-avg-rating': 'Avg Rating',
    'os-journal-entries': 'Journal Entries',
    'os-dream-entries': 'Dream Entries',
    // Journal
    'journal-title': '📓 Psychic Journal',
    'journal-desc': 'Record impressions, experiences, and synchronicities. Track verification over time.',
    'journal-new': 'New Entry',
    'journal-new-btn': '✨ New Entry',
    'journal-new-desc': 'Record a psychic impression, experience, or synchronicity.',
    'journal-new-entry': 'New Entry',
    'journal-entries': '📋 Entries',
    'journal-view-entries': '📋 View Entries',
    'journal-confirmed': 'Confirmed',
    'journal-partial': 'Partial',
    'journal-unverified': 'Unverified',
    'entry-title': 'Title',
    'entry-date': 'Date',
    'entry-category': 'Category',
    'entry-impression': 'Impression / Experience',
    'entry-context': 'Context',
    'entry-outcome': 'Outcome / Result',
    'entry-verification': 'Verification',
    'save-entry': '💾 Save Entry',
    'cat-premonition': 'Premonition',
    'cat-clairvoyance': 'Clairvoyance',
    'cat-clairsentience': 'Clairsentience',
    'cat-clairaudience': 'Clairaudience',
    'cat-synchronicity': 'Synchronicity',
    'cat-remote-viewing': 'Remote Viewing',
    'cat-dream': 'Dream',
    'cat-other': 'Other',
    'ver-confirmed': 'Confirmed',
    'ver-partial': 'Partial',
    'ver-incorrect': 'Incorrect',
    'ver-unverified': 'Unverified',
    'filter-all': 'All',
    // Grounding
    'grounding-title': '🌳 Grounding Coach',
    'grounding-desc': 'Grounding techniques to stabilize your energy before and after psychic work.',
    'grounding-why': 'Why Ground?',
    'grounding-why-desc': 'Grounding helps you stay centered, prevents energy drain, and improves signal clarity.',
    'grounding-techniques': 'Techniques',
    'grounding-history': '📊 Session History',
    'gh-sessions': 'Sessions',
    'tech-54321': '5-4-3-2-1 Sensory',
    'tech-54321-desc': 'Name 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste.',
    'tech-rooting': 'Rooting Visualization',
    'tech-rooting-desc': 'Visualize roots growing from your feet into the earth.',
    'tech-breath': '4-7-8 Breath Work',
    'tech-breath-desc': 'Breathe in 4s, hold 7s, exhale 8s. Repeat 4 cycles.',
    'tech-body-scan': 'Body Scan',
    'tech-body-scan-desc': 'Progressively relax each body part from head to toe.',
    'senses-label': 'Name 5 things you SEE:',
    'senses-label-see': 'Name 5 things you SEE:',
    'senses-label-feel': 'Name 4 things you FEEL:',
    'senses-label-hear': 'Name 3 things you HEAR:',
    'senses-label-smell': 'Name 2 things you SMELL:',
    'senses-label-taste': 'Name 1 thing you TASTE:',
    'senses-step-see': 'Notice 5 things you can SEE around you',
    'senses-step-see-desc': 'Look around and identify 5 distinct visual details — colors, shapes, objects, or patterns.',
    'senses-step-feel': 'Notice 4 things you can FEEL',
    'senses-step-feel-desc': 'Pay attention to physical sensations — the chair against your back, air on your skin, your feet on the floor.',
    'senses-step-hear': 'Notice 3 things you can HEAR',
    'senses-step-hear-desc': 'Listen for sounds near and far — traffic, birds, the hum of electronics, your own breathing.',
    'senses-step-smell': 'Notice 2 things you can SMELL',
    'senses-step-smell-desc': 'Identify scents in your environment. If none are present, recall 2 favorite smells.',
    'senses-step-taste': 'Notice 1 thing you can TASTE',
    'senses-step-taste-desc': 'Notice the taste in your mouth. If nothing, take a sip of water and focus on its flavor.',
    'senses-next': 'Next →',
    'rooting-step1': 'Close your eyes. Feel your feet on the ground.',
    'rooting-step1-desc': 'Stand or sit comfortably. Press your feet firmly into the floor and notice the contact.',
    'rooting-step2': 'Visualize roots growing from your feet deep into the earth.',
    'rooting-step2-desc': 'Imagine thick roots extending downward, anchoring you to the solid ground beneath.',
    'rooting-step3': 'Feel the earth\'s stability supporting you.',
    'rooting-step3-desc': 'Sense the weight and steadiness of the planet holding you. You are grounded and secure.',
    'rooting-step4': 'Breathe deeply. With each inhale, draw stability up through the roots.',
    'rooting-step4-desc': 'Imagine calm, steady energy rising from the earth through your roots into your body.',
    'rooting-step5': 'You are grounded, centered, and ready.',
    'rooting-step5-desc': 'Take a final deep breath. When ready, slowly open your eyes, carrying this grounded feeling with you.',
    'rooting-next': 'Next →',
    'rooting-notes-label': 'How do you feel after grounding?',
    'breath-desc': 'Breathe in for 4 seconds, hold for 7, exhale for 8.',
    'breath-ready': 'Ready? Press Start to begin.',
    'breath-inhale': 'Breathe In...',
    'breath-hold': 'Hold...',
    'breath-exhale': 'Breathe Out...',
    'breath-start': '▶ Start',
    'scan-step-head': 'Focus on your head. Release tension.',
    'scan-step-head-desc': 'Notice any tightness in your scalp, forehead, or jaw. Breathe into these areas and let go.',
    'scan-step-face': 'Move to your face. Soften your expression.',
    'scan-step-face-desc': 'Relax your eyes, cheeks, nose, and lips. Let your face become smooth and calm.',
    'scan-step-neck': 'Relax your neck and throat.',
    'scan-step-neck-desc': 'Release any tension in your neck muscles. Let your head rest lightly.',
    'scan-step-shoulders': 'Drop your shoulders. Let go of any weight.',
    'scan-step-shoulders-desc': 'We often carry stress in our shoulders. Consciously lower them and breathe into the area.',
    'scan-step-arms': 'Relax your arms, wrists, and hands.',
    'scan-step-arms-desc': 'Feel your arms become heavy and loose. Unclench your fingers.',
    'scan-step-chest': 'Breathe into your chest. Feel it expand.',
    'scan-step-chest-desc': 'Notice your breath filling your chest. Let each exhale release any held emotion.',
    'scan-step-stomach': 'Softening your stomach and abdomen.',
    'scan-step-stomach-desc': 'Let your belly be soft and relaxed. Breathe deeply into your core.',
    'scan-step-legs': 'Relax your legs, knees, and calves.',
    'scan-step-legs-desc': 'Feel your legs become heavy and still. Release any tension in your thighs and knees.',
    'scan-step-feet': 'Finally, relax your feet and toes.',
    'scan-step-feet-desc': 'Notice the warmth in your feet. Unclench your toes. You are fully relaxed.',
    'scan-next': 'Next →',
    // Dream Tracker
    'dream-title': '🌙 Dream Tracker',
    'dream-desc': 'Log dreams, tag symbols, identify precognitive hits.',
    'dream-new': 'New Dream',
    'dream-new-btn': '✨ Log Dream',
    'dream-new-desc': 'Record a dream you remember. Include symbols, emotions, and any precognitive elements.',
    'dream-new-entry': 'New Dream Entry',
    'dream-entries': '📋 Dream Log',
    'dream-view-btn': '📋 View Dreams',
    'dream-entry-title': 'Dream Entry',
    'dream-date': 'Date',
    'dream-description': 'Description',
    'dream-mood': 'Mood',
    'dream-symbols': 'Symbols',
    'dream-type': 'Dream Type',
    'dream-precog': 'Precognitive',
    'dream-precog-status': 'Precognitive Status',
    'dream-precog-event': 'Event That Confirmed/Disproved',
    'save-dream': '💾 Save Dream',
    'dream-total': 'Total',
    'dream-precog': 'Precognitive',
    'dream-hits': 'Hits',
    'dream-lucid': 'Lucid',
    'mood-happy': '😊 Happy',
    'mood-fear': '😨 Fear',
    'mood-neutral': '😐 Neutral',
    'mood-sad': '😢 Sad',
    'mood-amazed': '😲 Amazed',
    'mood-peaceful': '😌 Peaceful',
    'sym-water': '💧 Water',
    'sym-flying': '🕊 Flying',
    'sym-falling': '📉 Falling',
    'sym-teeth': '🦷 Teeth',
    'sym-naked': '👤 Naked',
    'sym-chase': '🏃 Being Chased',
    'sym-house': '🏠 House',
    'sym-animals': '🐾 Animals',
    'sym-death': '💀 Death',
    'sym-birth': '👶 Birth',
    'sym-deceased': '👻 Deceased Person',
    'sym-journey': '🗺 Journey',
    'type-normal': 'Normal',
    'type-lucid': 'Lucid',
    'type-precog': 'Precognitive',
    'type-prophetic': 'Prophetic',
    'type-nightmare': 'Nightmare',
    'type-recurring': 'Recurring',
    'precog-pending': 'Pending',
    'precog-hit': 'Hit',
    'precog-miss': 'Miss',
    // Random Viewer
    'random-viewer-title': '🌍 Random Object Viewer',
    'random-viewer-desc': 'Blind targets from Wikipedia and random images. Practice with unpredictable subjects.',
    'rv-how-to': 'How It Works',
    'rv-step1': 'Generate a target code',
    'rv-step2': 'Choose target type (image or article)',
    'rv-step3': 'Focus and record impressions',
    'rv-step4': 'Reveal the target',
    'rv-step5': 'Rate your accuracy',
    'rv-target-code': 'Target Code',
    'rv-target-type': 'Target Type',
    'tt-image': '🖼 Random Image',
    'tt-wikipedia': '📖 Wikipedia Article',
    'rv-generate': '🎲 Generate Target',
    'rv-focus-instruction': 'Focus on the target code. Record your impressions below.',
    'rv-impressions': 'Impressions',
    'rv-reflection': 'Reflection',
    'rv-reveal': '🔍 Reveal Target',
    'rv-click-reveal': 'Click to reveal the target',
    'rv-rate': 'Rate Accuracy',
    'rv-no-rating': 'No rating given',
    'rv-save-next': '💾 Save & Next',
    'rv-sessions': 'Sessions',
    'rv-avg-rating': 'Avg Rating',
    'rv-best-rating': 'Best Rating',
    'rv-history-title': '📊 Session History',
    // Partner
    'partner-title': '👥 Partner Platform',
    'partner-desc': 'Coordinate sessions with a partner. One holds, one views. Compare results.',
    'partner-how': 'How It Works',
    'partner-step1': 'Choose your role (Holder or Viewer)',
    'partner-step2': 'Holder sets a target and generates a code',
    'partner-step3': 'Viewer enters code and records impressions',
    'partner-step4': 'Compare results and rate accuracy',
    'partner-choose-role': 'Choose Your Role',
    'role-holder': '🎯 Holder',
    'role-holder-desc': 'You set the target and compare results',
    'role-viewer': '👁 Viewer',
    'role-viewer-desc': 'You receive the code and record impressions',
    'holder-set-target': 'Set Your Target',
    'holder-set-desc': 'Think of a specific object, place, or person. Be specific.',
    'holder-target-name': 'Target Description',
    'holder-target-details': 'Details (optional)',
    'holder-generate': '🎲 Generate Code',
    'holder-share-code': 'Share This Code',
    'holder-share-desc': 'Share this code with your viewer. Wait for them to send their impressions.',
    'holder-viewer-notes': 'Viewer\'s Impressions',
    'holder-wait': 'Waiting for viewer to send impressions...',
    'holder-compare': '🔍 Compare Results',
    'viewer-enter-code': 'Enter Session Code',
    'viewer-enter-desc': 'Enter the code your holder gave you.',
    'viewer-code-label': 'Session Code',
    'viewer-start': '▶ Start Viewing',
    'viewer-target-code': 'Target Code',
    'viewer-focus': 'Focus on the target code. Record your impressions.',
    'viewer-impressions': 'Impressions',
    'viewer-sensory': 'Sensory Data',
    'viewer-emotions': 'Emotions / Feelings',
    'viewer-your-impressions': 'Your Impressions',
    'viewer-share-impressions': 'Share Your Impressions',
    'viewer-share-desc': 'Copy these impressions and send them to your holder.',
    'viewer-done': '✅ Done — Send to Holder',
    'viewer-finish': '🔍 Finish',
    'comparison-title': '🔍 Comparison Results',
    'comparison-holder': 'Holder\'s Target',
    'comparison-viewer': 'Viewer\'s Impressions',
    'comp-rating': 'Accuracy Rating',
    'comp-rate-1': 'No match',
    'comp-rate-2': 'Slight connection',
    'comp-rate-3': 'Partial match',
    'comp-rate-4': 'Good match',
    'comp-rate-5': 'Excellent match!',
    'comp-notes': 'Notes on the match',
    'comp-save': '💾 Save Session',
    'partner-history': '📊 Session History',
    'partner-sessions': 'Sessions',
    'partner-avg-rating': 'Avg Rating',
    'partner-best': 'Best Rating',
    // Dial Trainer
    'dial-title': '🎯 Dial Trainer',
    'dial-desc': 'Influence a random pointer on a -10 to +10 scale with your mind.',
    'dial-welcome': 'Welcome to Dial Trainer',
    'dial-instruction': 'A pointer starts at 0 and moves randomly every half-second. Choose a target (+10 or -10), then focus your mind to influence the pointer toward it.',
    'dial-choose-target': 'Choose Your Target',
    'dial-duration-label': 'Duration (seconds)',
    'dial-focus-title': 'Focus on the Dial',
    'dial-focus-desc': 'Try to influence the pointer toward',
    'dial-current': 'Current',
    'dial-elapsed': 'Elapsed',
    'dial-moves': 'Moves',
    'dial-toward': 'Toward',
    'dial-away': 'Away',
    'dial-neutral': 'Neutral',
    'dial-stop': '⏹ Stop Session',
    'dial-result': 'Session Results',
    'dial-target': 'Target',
    'dial-final': 'Final Position',
    'dial-difference': 'Difference',
    'dial-ratio': 'Toward Ratio',
    'dial-peak': 'Peak Position',
    'dial-strong': '🔥 Strong influence!',
    'dial-promising': '✨ Promising signal',
    'dial-slight': '👀 Slight influence',
    'dial-weak': '😐 No clear signal',
    'dial-history': '📊 History',
    'dial-sessions': 'Sessions',
    'dial-avg-ratio': 'Avg Toward %',
    'dial-best': 'Best Difference',
    'dial-start': '▶ Start Session',
    'dial-save': '💾 Save Session',
    'about-page': 'ℹ️ About',
    'about-hero-title': 'Your Psychic Development Toolkit',
    'about-hero-desc': 'A free, open-source suite of 11 apps designed to help you explore and develop psychic abilities through structured practice, journaling, and analysis.',
    'about-what-title': 'What is Psychic101?',
    'about-what-desc': 'Psychic101 is a collection of browser-based training tools for exploring extrasensory perception (ESP), remote viewing, and related psychic phenomena. Each app targets a specific skill or practice area, from classic Zener card exercises to full Controlled Remote Viewing (CRV) protocol sessions.',
    'about-what-philosophy': 'The project is built on the principle that psychic abilities can be developed through consistent, structured practice — much like any other skill. The apps provide the framework; you provide the focus.',
    'about-privacy': 'This site does not track your data. Everything you see is stored locally in your browser. Released as open source for testing and educational purposes.',
    'about-apps-title': 'The Apps',
    'about-research-title': 'Research Foundation',
    'about-research-desc': 'The training methods in Psychic101 are grounded in decades of research, including:',
    'about-research-note': 'For detailed research, see <a href="research.md" target="_blank">research.md</a> and <a href="TRAINING_TECHNIQUES.md" target="_blank">TRAINING_TECHNIQUES.md</a> in the project repository.',
    'about-how-title': 'How to Use',
    'about-how-1': '<strong>Start with Grounding</strong> — Use the Grounding Coach before each session to center yourself and reduce analytical overlay (AOL).',
    'about-how-2': '<strong>Practice daily</strong> — Consistency matters more than duration. Even 10 minutes a day builds skill over time.',
    'about-how-3': '<strong>Journal everything</strong> — Record impressions in the Psychic Journal, even if they seem silly. Patterns emerge over time.',
    'about-how-4': '<strong>Track your progress</strong> — Use the Signal Line Analyzer to see accuracy trends, identify peak activity times, and manage AOL.',
    'about-how-5': '<strong>Practice with partners</strong> — The Partner Platform lets you coordinate sessions with a friend for structured feedback.',
    'about-roadmap-title': 'Training Roadmap',
    'about-tech-title': 'Technical Details',
    'about-tech-1': '100% client-side — no server, no database, no tracking. Your data stays in your browser.',
    'about-tech-2': 'Built with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies.',
    'about-tech-3': 'Mobile-first responsive design — works on phones, tablets, and desktops.',
    'about-tech-4': 'Bilingual support — English and Hebrew (RTL).',
    'about-tech-5': 'Open source — available on <a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a>.',
    // Legal pages
    'legal-privacy-title': 'Privacy Policy',
    'legal-terms-title': 'Terms of Service',
    'legal-accessibility-title': 'Accessibility Statement',
    'legal-last-updated': 'Last updated',
    'legal-privacy-heading': 'Privacy Policy',
    'legal-terms-heading': 'Terms of Service',
    'legal-accessibility-heading': 'Accessibility Statement',
    'legal-privacy-h1': '1. Data We Store',
    'legal-privacy-p1': 'Psychic101 stores data <strong>exclusively in your browser</strong> using <code>localStorage</code> or <code>sessionStorage</code>. No data is ever transmitted to a server, sent to any third party, or stored in a database.',
    'legal-privacy-p2': 'The types of data stored include:',
    'legal-privacy-li1': '<strong>Training data:</strong> Session results, accuracy scores, ratings from the Remote Viewing Trainer, Zener Symbol Trainer, Card Guessing Trainer, Dial Trainer, and Partner Platform.',
    'legal-privacy-li2': '<strong>Journal entries:</strong> Text you write in the Psychic Journal and Dream Tracker.',
    'legal-privacy-li3': '<strong>Assessment results:</strong> Your Clair Sense profile from the Clair Sense Identifier.',
    'legal-privacy-li4': '<strong>Grounding session logs:</strong> Records of grounding exercises completed.',
    'legal-privacy-li5': '<strong>Language preference:</strong> Your chosen language (English or Hebrew).',
    'legal-privacy-h2': '2. No Cookies',
    'legal-privacy-p3': 'Psychic101 does <strong>not</strong> use cookies. All persistent data is stored via <code>localStorage</code> or <code>sessionStorage</code>, which are browser-based storage mechanisms that keep data on your device only.',
    'legal-privacy-h3': '3. No Third-Party Services',
    'legal-privacy-p4': 'Psychic101 does not load any external scripts, analytics, advertising, or tracking services. The only external resource accessed is <strong>Wikimedia/Wikipedia</strong> images, which are fetched by the Random Object Viewer feature for training purposes.',
    'legal-privacy-h4': '4. Data Deletion',
    'legal-privacy-p5': 'You can delete all stored data at any time by:',
    'legal-privacy-li6': 'Clearing your browser\'s site data for this domain',
    'legal-privacy-li7': 'Using your browser\'s "Clear browsing data" feature',
    'legal-privacy-li8': 'Deleting individual entries within the app',
    'legal-privacy-p6': 'Instructions vary by browser. In most browsers, go to Settings → Privacy → Clear browsing data, and select "Cookies and other site data" or "Local storage data".',
    'legal-privacy-h5': '5. Legal Basis',
    'legal-privacy-p7': 'This policy complies with the <strong>Israeli Privacy Protection Law (PPL), Amendment 13</strong>. Since data is stored only on your device and never transmitted, the risk to your privacy is minimal. However, we believe in full transparency about what data is stored and why.',
    'legal-privacy-h6': '6. Contact',
    'legal-privacy-p8': 'For questions about this privacy policy or data requests, please contact us via the project repository at <a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a>.',
    'legal-terms-h1': '1. Nature of the Service',
    'legal-terms-p1': 'Psychic101 is a collection of browser-based training tools designed for <strong>educational and entertainment purposes only</strong>. The apps provide structured exercises inspired by historical parapsychological research methods.',
    'legal-terms-h2': '2. No Medical or Scientific Claims',
    'legal-terms-p2': 'Psychic101 does <strong>not</strong> make medical, scientific, or psychological claims. Psychic abilities, ESP, and remote viewing are <strong>not scientifically proven</strong> and should not be relied upon for any practical decision-making, medical diagnosis, or professional advice.',
    'legal-terms-h3': '3. No Guarantees',
    'legal-terms-p3': 'Results from the training exercises are <strong>not guaranteed</strong>. Individual experiences vary widely. The accuracy metrics provided by the apps are for self-tracking purposes only and should not be interpreted as evidence of psychic ability.',
    'legal-terms-h4': '4. User Data',
    'legal-terms-p4': 'All data generated by your use of Psychic101 is stored <strong>locally in your browser</strong>. We do not collect, transmit, or store any personal data on servers. See our <a href="privacy.html">Privacy Policy</a> for details.',
    'legal-terms-h5': '5. Intellectual Property',
    'legal-terms-p5': 'The code, design, and original content of Psychic101 are the property of the project author. The project is available under an open-source license on <a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a>. Training methods described are based on publicly available parapsychological research.',
    'legal-terms-h6': '6. Limitation of Liability',
    'legal-terms-p6': 'Psychic101 is provided "as is" without warranty of any kind. The authors are not liable for any damages, losses, or adverse effects arising from the use of this software. You use Psychic101 at your own discretion.',
    'legal-terms-h7': '7. Governing Law',
    'legal-terms-p7': 'These terms are governed by the laws of the State of Israel. Any disputes shall be resolved in the courts of Israel.',
    'legal-terms-h8': '8. Changes to These Terms',
    'legal-terms-p8': 'These terms may be updated from time to time. Changes will be reflected in the project repository and on this page.',
    'legal-access-h1': 'Our Commitment',
    'legal-access-p1': 'Psychic101 is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and strive to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> and the Israeli standard <strong>IS 5568</strong>.',
    'legal-access-h2': 'Current Accessibility Features',
    'legal-access-li1': '<strong>Semantic HTML:</strong> Pages use proper heading hierarchy, <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, and <code>&lt;footer&gt;</code> landmarks.',
    'legal-access-li2': '<strong>Skip Navigation:</strong> A "Skip to content" link is provided on all pages for keyboard and screen reader users.',
    'legal-access-li3': '<strong>Keyboard Accessibility:</strong> All interactive elements are operable via keyboard navigation.',
    'legal-access-li4': '<strong>Focus Indicators:</strong> Visible focus outlines are provided for all interactive elements.',
    'legal-access-li5': '<strong>Color Contrast:</strong> Text and background colors meet WCAG AA contrast ratio requirements (minimum 4.5:1 for normal text).',
    'legal-access-li6': '<strong>Responsive Design:</strong> The site works on phones, tablets, and desktops with appropriate touch targets (minimum 48×48px).',
    'legal-access-li7': '<strong>Language Declaration:</strong> The <code>lang</code> attribute is set correctly on all pages and updates dynamically when switching between English and Hebrew.',
    'legal-access-li8': '<strong>RTL Support:</strong> Full right-to-left layout support for Hebrew, including proper text direction and mirrored UI elements.',
    'legal-access-li9': '<strong>Screen Reader Compatibility:</strong> ARIA attributes and semantic markup assist screen reader users.',
    'legal-access-h3': 'Known Limitations',
    'legal-access-li10': 'Some interactive canvas elements (ideogram drawing, dial trainer) may present challenges for screen reader users. We are working on providing alternative text descriptions.',
    'legal-access-li11': 'Complex data visualizations in the Signal Line Analyzer may not be fully accessible to all assistive technologies.',
    'legal-access-h4': 'Feedback',
    'legal-access-p2': 'We welcome your feedback on the accessibility of Psychic101. If you encounter accessibility barriers, please let us know:',
    'legal-access-li12': 'Open an issue on our <a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub repository</a>',
    'legal-access-h5': 'Evaluation',
    'legal-access-p3': 'The Psychic101 accessibility evaluation process includes:',
    'legal-access-li13': 'Self-review against WCAG 2.1 AA and IS 5568 criteria',
    'legal-access-li14': 'Automated accessibility testing tools',
    'legal-access-li15': 'Manual testing with keyboard navigation and screen readers',
    'legal-copyright': '© 2026 Psychic101. All rights reserved.',
    'legal-disclaimer': 'Psychic101 is provided for educational and entertainment purposes only. No medical, scientific, or psychological claims are made.',
    'legal-bug-link': '🐛 Report a Bug',
    'legal-game-link': '🚀 Hidden Game',
    'version-tag': 'v{v}',
    'legal-privacy-link': 'Privacy Policy',
    'legal-terms-link': 'Terms of Service',
    'legal-access-link': 'Accessibility',
    // Phase 1 — Gamification
    'streak-start': 'Start practicing to build a streak!',
    'streak-days': 'day streak',
    'challenge-title': "Today's Challenge",
    'fact-title': 'Did you know?',
  },
  he: {
    // Shared UI
    'lang-label': 'שפה',
    'back-home': '← חזרה לבית',
    'back': '← חזרה',
    'quit': '← יציאה',
    'save': '💾 שמירה',
    'next': 'הבא →',
    'previous': '← הקודם',
    'finish': '📊 סיום',
    'start': 'התחלה',
    'continue': '▶ המשך',
    'reveal': '🔍 חשיפה',
    'submit': '🔍 שליחה',
    'history': '📋 היסטוריה',
    'training': '🏋 אימון',
    'close': 'סגירה',
    'loading-tip': 'טוען טיפ...',
    'no-data': 'אין נתונים עדיין.',
    'date': 'תאריך',
    'notes': 'הערות',
    'rating': 'דירוג',
    'duration': 'משך',
    'accuracy': 'דיוק',
    'sessions': 'סשנים',
    'total': 'סה״כ',
    'correct': 'נכון',
    'chance': 'הזדמנות',
    'over-chance': 'מעל הזדמנות',
    'trials': 'ניסיונות',
    'exact': 'מדויק',
    'same-suit': 'אותו סמל',
    'same-color': 'אותו צבע',
    'miss': 'חטא',
    'day-streak': 'רצף ימים',
    'avg-rating': 'דירוג ממוצע',
    'total-trials': 'סה״כ ניסיונות',
    'total-rounds': 'סה״כ סיבובים',
    'exact-matches': 'התאמות מדויקות',
    'exact-pct': 'אחוז מדויק',
    'per-symbol-accuracy': 'דיוק לפי סמל',
    'chi-square': 'ניתוח חי-בריבוע',
    'session-notes': 'הערות סשן',
    'reflection': 'הרהור',
    'impression-notes': 'הערות רושם',
    'feedback-notes': 'מה התאים? מה לא?',
    'self-assessment': 'הערכה עצמית',
    'accuracy-rating': 'דירוג דיוק',
    'your-impressions': 'הרושמים שלך',
    'target-revealed': '🎯 היעד חושף',
    'session-history': '📊 היסטוריית סשנים',
    'card-history': '📊 היסטוריית ניחוש קלפים',
    'zener-history': '📊 היסטוריית זנר',
    'daily-exercises': 'תרגילים יומיים',
    'training-log': 'יומן אימון',
    'score-breakdown': 'פירוט ציונים',
    'recommended-training': 'אימון מומלץ',
    'clair-profile': 'פרופיל קליר שלך',
    'next-trial': '▶ ניסיון הבא',
    'save-session': '💾 שמירת סשן',
    'save-next': '💾 שמירה וסיבוב הבא',
    'start-round': '🃏 התחל סיבוב חדש',
    'start-session': '⭕ התחל סשן חדש',
    'start-assessment': '🔮 התחל הערכה',
    'view-results': '📊 צפה בתוצאות',
    'go-training': '🏋 עבור לאימון',
    'start-new-session': '✨ התחל סשן חדש',
    'continue-session': '▶ המשך סשן',
    'continue-sensory': 'המשך לנתונים חושיים →',
    'continue-dimensions': 'המשך למידות →',
    'continue-emotions': 'המשך לרגשות →',
    'reveal-target': '🔍 חשוף יעד',
    'log-complete': '✓ רשום כהושלם',
    'no-sessions': 'אין סשנים עדיין. התחל את הסשן הראשון!',
    'no-rounds': 'אין סיבובים עדיין. התחל לנחש!',
    'no-exercises': 'אין תרגילים רשומים עדיין.',
    'complete-assessment': 'השלם את ההערכה קודם כדי לראות תרגילים מותאמים.',
    'no-assessment': 'לא נמצאו נתוני הערכה. השלם את ההערכה קודם.',
    'select-symbol': 'אנא בחר סמל לפני שליחה.',
    'select-suit-rank': 'אנא בחר סמל ודרג לפני חשיפה.',
    'need-10-trials': 'נדרשים לפחות 10 ניסיונות לניתוח חי-בריבוע.',
    'chi-sig': '✅ משמעותי סטטיסטית! χ² = {chi2} (קריטי: {critical})',
    'chi-ns': '⚠ מתקרב למשמעותיות. χ² = {chi2} (קריטי: {critical})',
    'chi-low': 'לא משמעותי. χ² = {chi2} (קריטי: {critical})',
    // Zener
    'zener-title': '⭕ סמלי זנר',
    'zener-subtitle': '— מאמן ESP',
    'zener-desc': 'מחקר ESP קלאסי עם 5 סמלים. סיכוי אקראי הוא 20% — ציונים מתמשכים מעל 25% ראויים לציון.',
    'zener-symbols-title': '5 סמלי זנר',
    'circle': 'עיגול',
    'cross': 'צלב',
    'waves': 'גלים',
    'square': 'ריבוע',
    'star': 'כוכב',
    'trials-per-session': 'ניסיונות לסשן',
    'what-symbol': 'איזה סמל אתה מרגיש?',
    'focus-hidden': 'התמקד בסמל הסמוי. בחר מה האינטואיציה שלך אומרת.',
    'correct': '🎯 נכון!',
    'incorrect': '❌ לא נכון — היעד היה {sym}',
    'you-guessed': 'נחשת: {guess}  |  יעד: {target}',
    'excellent': '🌟 מצוין — הרבה מעל סיכוי!',
    'above-chance': '👍 מעל סיכוי — עבודה טובה!',
    'near-chance': '👁 ליד סיכוי — המשך להתאמן!',
    'below-chance': '📉 מתחת לסיכוי — אל תתייאש.',
    // Card
    'card-title': '🃏 ניחוש קלפים',
    'card-subtitle': '— מאמן ESP',
    'card-desc': 'התמקד בגב הקלף, ואז רשום את הרושם שלך על הקלף הסמוי. בדוק את הקלרויאנס שלך!',
    'how-to-play': 'איך משחקים',
    'deck-type': 'סוג חפיסה',
    'full-deck': 'חפיסה מלאה (52 קלפים)',
    'simplified': 'מופשט (4 סמלים × 10)',
    'what-card': 'איזה קלף אתה מרגיש?',
    'focus-card': 'התמקד בגב הקלף. בחר סמל ודרג שהרושם שלך מצביע עליהם.',
    'suit': 'סמל',
    'rank': 'דרג',
    'spades': 'מקלות',
    'hearts': 'לבבות',
    'diamonds': 'יהלומים',
    'clubs': 'עלים',
    'exact-match': '🎯 התאמה מדויקת!',
    'same-suit-badge': '👍 אותו סמל!',
    'same-color-badge': '👁 אותו צבע',
    'miss-badge': '❌ חטא',
    // RV Trainer
    'rv-title': '🔮 Psychic101',
    'rv-subtitle': '— מאמן RV',
    'rv-desc': 'תרגל ראייה מרחוק מבוקרת (CRV) עם יעדים אקראיים. כל סשן נותן לך קוד יעד — רשום את הרושמים שלך, ואז חשוף את היעד להשוואה.',
    'how-it-works': 'איך זה עובד',
    'rv-step1': 'קבל קוד יעד — מספר אקראי של 8 ספרות מקושר לתמונה סמויה',
    'rv-step2': 'צייר את האיידיוגרמה שלך — תן לידיך לזוז בחופשיות כדי לתפוס את הגסטלט',
    'rv-step3': 'רשום רושמים — נתונים חושיים, מידות, צבעים, רגשות',
    'rv-step4': 'חשוף והשווה — ראה את היעד ודרג את הדיוק שלך',
    'rv-step5': 'סקור ושיפר — עקוב אחר ההתקדמות שלך לאורך זמן',
    'quick-tips': 'טיפים מהירים',
    'rv-tip1': 'הירגע לפני ההתחלה — קח 3 נשימות עמוקות',
    'rv-tip2': 'חזור על קוד היעד בשקט: "יעד',
    'rv-tip3': 'רשום הכל — גם אם זה נראה טיפש',
    'rv-tip4': 'אל תכריח או תנחש — תן לרושמים לבוא באופן טבעי',
    'rv-tip5': 'שים לב ל-AOL (כיסויים אנליטיים) — תגוב אותם והמשך',
    'step1-ideogram': 'שלב 1 — איידיוגרמה',
    'ideogram-desc': 'חזור על קוד היעד בשקט. תן לידיך לזוז בחופשיות על הקנבס למטה. הסימן המתקבל הוא <strong>האיידיוגרמה</strong> שלך — הגסטלט של היעד.',
    'ideogram-category': 'קטגוריית איידיוגרמה',
    'ideogram-notes': 'הערות איידיוגרמה',
    'ideogram-placeholder': 'מה האיידיוגרמה מצביעה? תאר את הצורה, התחושה והרושמים הראשוניים...',
    'step2-sensory': 'שלב 2 — נתונים חושיים (A/B)',
    'sensory-desc': 'רשום רושמים חושיים גולמיים. מה אתה <strong>רואה, שומע, מרגיש, מריח, טועם</strong>? שמור על עובדות — עדיין ללא פרשנות.',
    'visual': '👁 ויזואלי',
    'auditory': '👂 שמיעה',
    'tactile': '✋ מגע / קינסטטי',
    'olfactory': '👃 ריח',
    'gustatory': '👅 טעם',
    'aol': '⚠️ כיסויים אנליטיים (AOL)',
    'step3-dimensions': 'שלב 3 — מידות וצבעים',
    'dimensions-desc': 'העריך את הגודל, הצורה ופלטת הצבעים של היעד. חשב במונחים של סקלה יחסית.',
    'size-scale': 'גודל / סקלה',
    'shape-form': 'צורה / תבנית',
    'colors': 'צבעים',
    'motion-energy': 'תנועה / אנרגיה',
    'step4-emotions': 'שלב 4 — רגשות וקונספטואליזציה',
    'emotions-desc': 'איזה רגשות היעד מעורר? מה ה-"וייב" הכללי? עכשיו אתה יכול להתחיל ליצור הבנה קונספטואלית.',
    'emotional-tone': 'גוון רגשי',
    'overall-vibe': 'וייב כללי / אווירה',
    'conceptualization': 'קונספטואליזציה',
    'session-duration': 'משך סשן',
    'compare-impressions': 'השווה את הרושמים שלך עם היעד האמיתי. היה כן בהערכה העצמית שלך.',
    // Clair
    'clair-title': '👁 זיהוי קליר',
    'clair-subtitle': '— הערכה',
    'clair-desc': 'גלה את חוש הקליר הדומיננטי שלך דרך הערכה של 16 שאלות. כל חוש מקבל 2 שאלות מדורגות בסולם 1–5.',
    'clair-senses-title': '8 חושי הקליר',
    'clairvoyance': 'קלרויאנס',
    'clairvoyance-desc': 'ראייה ברורה, רושמים ויזואליים',
    'clairaudience': 'קלאיראודיאנס',
    'clairaudience-desc': 'שמיעה ברורה, רושמים שמיעתיים',
    'clairsentience': 'קלאירסנטיאנס',
    'clairsentience-desc': 'תחושה ברורה, תחושות מגע/רגש',
    'claircognizance': 'קלאירקוגניזנס',
    'claircognizance-desc': 'ידע ברור, מידע ללא מקור',
    'clairalience': 'קלאיראליאנס',
    'clairalience-desc': 'ריח ברור, רושמי ריח',
    'clairgustance': 'קלאירגוסטנס',
    'clairgustance-desc': 'טעם ברור, רושמי טעם',
    'clairempathy': 'קלאירמפתיה',
    'clairempathy-desc': 'אמפתיה ברורה, ספיגת רגשות אחרים',
    'clairambience': 'קלאיראמביאנס',
    'clairambience-desc': 'אמביאנס ברור, תחושת אנרגיה של מקומות',
    'dominant-sense': 'חוש הקליר הדומיננטי שלך הוא: {icon} {name} ({desc}).<br>זה הערוץ החזק ביותר שלך לקריאת מחשבות. התמקד באימון כאן קודם.',
    'focus-dominant': 'התמקד בחיזוק החוש הדומיננטי קודם, ואז תרגל חושים אחרים.',
    'rating-never': 'לעולם לא',
    'rating-rarely': 'נדיר',
    'rating-sometimes': 'לפעמים',
    'rating-often': 'לרוב',
    'rating-always': 'תמיד',
    'never': 'לעולם לא',
    'rarely': 'נדיר',
    'sometimes': 'לפעמים',
    'often': 'לרוב',
    'always': 'תמיד',
    'dominant-desc': 'זה הערוץ החזק ביותר שלך לקריאת מחשבות. התמקד באימון כאן קודם.',
    'training-focus': 'התמקד בחיזוק החוש הדומיננטי קודם, ואז תרגל חושים אחרים.',
    'training-exercises-below': 'הנה התרגילים המותאמים שלך למטה.',
    'complete-assessment-first': 'השלם את ההערכה קודם כדי לראות תרגילים מותאמים.',
    'no-exercises-logged': 'אין תרגילים רשומים עדיין.',
    'no-assessment-data': 'לא נמצאו נתוני הערכה. השלם את ההערכה קודם.',
    // Hub
    'hub-title': '🔮 Psychic101',
    'hub-subtitle': '— סוויטה',
    'hero-title': 'סוויטה לפיתוח קריאת מחשבות',
    'hero-desc': 'חקור ופתח את יכולות קריאת המחשבות שלך דרך תרגול מסודר, יומן וניתוח.',
    'section-rv': '🎯 ראייה מרחוק',
    'section-esp': '🃏 אימון ESP',
    'section-journal': '📖 יומן ומעקב',
    'section-prep': '🧘 הכנה וניתוח',
    'hub-activity-title': '📋 פעילות אחרונה',
    'hub-entries': 'רשומות',
    'hub-sessions': 'סשנים',
    'hub-no-activity': 'אין פעילות עדיין. התחל סשן!',
    'launch': 'הפעל →',
    'rv-trainer-title': 'מאמן ראייה מרחוק',
    'rv-trainer-desc': 'פרוטוקול CRV מלא: איידיוגרמה → נתונים חושיים → מידות → רגשות → חשיפה.',
    'random-viewer-title': 'צופה אובייקט אקראי',
    'random-viewer-desc': 'יעדים עיוורים מוויקיפדיה ותמונות אקראיות. תרגל עם נושאים בלתי צפויים.',
    'partner-title': 'פלטפורמת שותפים',
    'partner-desc': 'תאם סשנים עם שותף. אחד מחזיק, אחד צופה. השווה תוצאות.',
    'card-guess-title': 'מאמן ניחוש קלפים',
    'card-guess-desc': 'נחש קלפים מחפיסה מעורבבת. עקוב אחר דיוק לפי סמל ודרג.',
    // Card Guessing extra
    'card-history-title': '📊 היסטוריית סשנים',
    'card-start': '▶ התחל סשן',
    'card-step1': 'בחר סוג חפיסה',
    'card-step2': 'התמקד בגב הקלף',
    'card-step3': 'רשום את הרושם שלך',
    'card-step4': 'חשוף את הקלף',
    'card-step5': 'דרג את הדיוק שלך',
    'reveal-card': '🔍 חשוף קלף',
    'simplified-deck': 'חפיסה מופשטת',
    'zener-title-hub': 'מאמן סמלי זנר',
    'zener-desc-hub': 'מחקר ESP קלאסי עם 5 סמלי זנר. סשנים של 25 ניסיונות עם ניתוח חי-בריבוע.',
    // Zener extra
    'chi-analysis': 'ניתוח חי-בריבוע',
    'submit-guess': 'הגש ניחוש',
    'sym-circle': '○ עיגול',
    'sym-cross': '✚ צלב',
    'sym-square': '□ ריבוע',
    'sym-star': '★ כוכב',
    'sym-waves': '≋ גלים',
    'zener-guess-desc': 'התמקד בסמל הסמוי. מה אתה מרגיש?',
    'zener-guess-title': 'נחש את הסמל',
    'zener-history-title': '📊 היסטוריית סשנים',
    'zener-start': '▶ התחל סשן',
    'clair-id-title': 'מזהה חוש קליר',
    'clair-id-desc': 'גלה את חוש הקליר הדומיננטי שלך דרך תרגילים מודרכים.',
    'journal-title': 'יומן קריאת מחשבות',
    'journal-desc': 'רשום רושמים, חוויות וסינכרוניות. תגוב וחפש רשומות.',
    'dream-title': 'עוקב חלומות',
    'dream-desc': 'רשום חלומות, תגוב סמלים, זהה פגיעות קדם-קוגניטיביות. סקור דפוסים לאורך זמן.',
    'dream-log-btn': '📋 יומן חלומות',
    'grounding-title': 'מאמן עיגון',
    'grounding-desc': 'עיגון מודרך: טכניקת 5-4-3-2-1, ויזואליזציה שורשית, עבודת נשימה.',
    'analyzer-title': 'מנתח קו אות',
    'analyzer-desc': 'נתח נתונים בכל האפליקציות. עקוב אחר מגמות דיוק, תדירות AOL, שעות שיא.',
    // Analyzer extra
    'analyzer-overview': 'סקירה כללית',
    'analyzer-overview-desc': 'לוח בקרה זה מרכז נתונים מכל אפליקציות אימון קריאת המחשבות שלך כדי לחשוף דפוסים ומגמות.',
    'analyzer-data-sources': 'מקורות נתונים',
    'analyzer-accuracy': 'דיוק לפי אפליקציה',
    'analyzer-peak-times': 'שעות שיא',
    'analyzer-aol': 'תדירות AOL',
    'analyzer-refresh': '🔄 רענן',
    'analyzer-refresh-btn': '🔄 רענן ניתוח',
    'analyzer-loading': 'טוען נתונים...',
    'analyzer-aol-high': 'אות חזק — המשך כך!',
    'analyzer-aol-med': 'אות בינוני — המשך להתאמן',
    'analyzer-aol-low': 'אות חלש — נסה עיגון לפני סשנים',
    'analyzer-no-data': 'אין נתונים עדיין. התחל כמה סשנים קודם!',
    'analyzer-no-journal-data': 'אין רשומות יומן עדיין. רשום כמה חוויות קודם.',
    'analyzer-records': 'רשומות',
    'analyzer-rv': 'מאמן RV',
    'analyzer-card': 'ניחוש קלפים',
    'analyzer-zener': 'סמלי זנר',
    'analyzer-random': 'צופה אקראי',
    'analyzer-partner': 'פלטפורמת שותפים',
    'analyzer-dial': 'מאמן חץ',
    'os-total-sessions': 'סה״כ סשנים',
    'os-avg-rating': 'דירוג ממוצע',
    'os-journal-entries': 'רשומות יומן',
    'os-dream-entries': 'רשומות חלומות',
    // Journal
    'journal-title': '📓 יומן קריאת מחשבות',
    'journal-desc': 'רשום רושמים, חוויות וסינכרוניות. עקוב אחר אימות לאורך זמן.',
    'journal-new': 'רשומה חדשה',
    'journal-new-btn': '✨ רשומה חדשה',
    'journal-new-desc': 'רשום רושם קריאת מחשבות, חוויה או סינכרוניות.',
    'journal-new-entry': 'רשומה חדשה',
    'journal-entries': '📋 רשומות',
    'journal-view-entries': '📋 צפה ברשומות',
    'journal-confirmed': 'אומת',
    'journal-partial': 'חלקי',
    'journal-unverified': 'לא מאומת',
    'entry-title': 'כותרת',
    'entry-date': 'תאריך',
    'entry-category': 'קטגוריה',
    'entry-impression': 'רושם / חוויה',
    'entry-context': 'הקשר',
    'entry-outcome': 'תוצאה',
    'entry-verification': 'אימות',
    'save-entry': '💾 שמור רשומה',
    'cat-premonition': 'תחזית',
    'cat-clairvoyance': 'קלרויאנס',
    'cat-clairsentience': 'קלאירסנטיאנס',
    'cat-clairaudience': 'קלאיראודיאנס',
    'cat-synchronicity': 'סינכרוניות',
    'cat-remote-viewing': 'ראייה מרחוק',
    'cat-dream': 'חלום',
    'cat-other': 'אחר',
    'ver-confirmed': 'אומת',
    'ver-partial': 'חלקי',
    'ver-incorrect': 'לא נכון',
    'ver-unverified': 'לא מאומת',
    'filter-all': 'הכל',
    // Grounding
    'grounding-title': '🌳 מאמן עיגון',
    'grounding-desc': 'טכניקות עיגון לייצוב האנרגיה שלך לפני ואחרי עבודה בקריאת מחשבות.',
    'grounding-why': 'למה לעגן?',
    'grounding-why-desc': 'עיגון עוזר לך להישאר ממוקם, מונע נזילת אנרגיה ומשפר בהירות אות.',
    'grounding-techniques': 'טכניקות',
    'grounding-history': '📊 היסטוריית סשנים',
    'gh-sessions': 'סשנים',
    'tech-54321': '5-4-3-2-1 חושי',
    'tech-54321-desc': 'שם 5 דברים שאתה רואה, 4 שאתה מרגיש, 3 שאתה שומע, 2 שאתה מריח, 1 שאתה טועם.',
    'tech-rooting': 'ויזואליזציה שורשית',
    'tech-rooting-desc': 'הדמיין שורשים צומחים מהרגליך לעומק האדמה.',
    'tech-breath': 'נשימה 4-7-8',
    'tech-breath-desc': 'נשום 4 שניות, החזק 7, נשוף 8. חזור 4 מחזורים.',
    'tech-body-scan': 'סריקת גוף',
    'tech-body-scan-desc': 'הרפד כל חלק בגוף מהראש ועד הרגליים.',
    'senses-label': 'שם 5 דברים שאתה רואה:',
    'senses-label-see': 'שם 5 דברים שאתה רואה:',
    'senses-label-feel': 'שם 4 דברים שאתה מרגיש:',
    'senses-label-hear': 'שם 3 דברים שאתה שומע:',
    'senses-label-smell': 'שם 2 דברים שאתה מריח:',
    'senses-label-taste': 'שם דבר אחד שאתה טועם:',
    'senses-step-see': 'שים לב ל-5 דברים שאתה יכול לראות סביבך',
    'senses-step-see-desc': 'הבט סביבך וזהה 5 פרטים ויזואליים נפרדים — צבעים, צורות, אובייקטים או דפוסים.',
    'senses-step-feel': 'שים לב ל-4 דברים שאתה יכול להרגיש',
    'senses-step-feel-desc': 'שים לב לתחושות פיזיות — הכיסא מול גבך, האוויר על עורך, הרגליים על הרצפה.',
    'senses-step-hear': 'שים לב ל-3 דברים שאתה יכול לשמוע',
    'senses-step-hear-desc': 'הקשב לצלילים קרובים ורחוקים — תנועה, ציפורים, רעש מכשירים, הנשימה שלך.',
    'senses-step-smell': 'שים לב ל-2 דברים שאתה יכול לריח',
    'senses-step-smell-desc': 'זהה ריחות בסביבה. אם אין, חשב על 2 ריחות אהובים.',
    'senses-step-taste': 'שים לב לדבר אחד שאתה יכול לטעום',
    'senses-step-taste-desc': 'שים לב לטעם בפה. אם אין, שתה לגימת מים והתמקד בטעם.',
    'senses-next': 'הבא →',
    'rooting-step1': 'סגור את העיניים. הרגש את הרגליים על הקרקע.',
    'rooting-step1-desc': 'עמוד או ישב בנוחות. לחץ את כפות הרגליים על הרצפה ושים לב למגע.',
    'rooting-step2': 'הדמיין שורשים צומחים מהרגליך לעומק האדמה.',
    'rooting-step2-desc': 'דמיין שורשים עבים הנמתחים כלפי מטה, ומאגרים אותך לקרקע המוצקה.',
    'rooting-step3': 'הרגש את יציבות האדמה תומכת בך.',
    'rooting-step3-desc': 'חש את המשקל והיציבות של כדור הארץ החוזק אותך. אתה עגון ובטוח.',
    'rooting-step4': 'נשום עמוק. עם כל נשימה, שאב יציבות דרך השורשים.',
    'rooting-step4-desc': 'דמיין אנרגיה רגועה ועקבית עולה מהאדמה דרך השורשים לגוף שלך.',
    'rooting-step5': 'אתה עגון, ממוקד ומוכן.',
    'rooting-step5-desc': 'קח נשימה אחרונה ועמוקה. כשאתה מוכן, פתח לאט את העיניים.',
    'rooting-next': 'הבא →',
    'rooting-notes-label': 'איך אתה מרגיש אחרי העיגון?',
    'breath-desc': 'נשום ל-4 שניות, החזק 7, נשוף 8.',
    'breath-ready': 'מוכן? לחץ התחלה.',
    'breath-inhale': 'נשום פנימה...',
    'breath-hold': 'החזק...',
    'breath-exhale': 'נשום החוצה...',
    'breath-start': '▶ התחל',
    'scan-step-head': 'התמקד בראש שלך. שחרר מתח.',
    'scan-step-head-desc': 'שים לב ללחץ בקרקפת, במצח או בלסת. נשום לאזורים אלה ושחרר.',
    'scan-step-face': 'עבור לפנים. רכך את הבעה שלך.',
    'scan-step-face-desc': 'הרף את העיניים, הלחיים, האף והשפתיים. תן לפנים להיות חלקות ושקטות.',
    'scan-step-neck': 'הרף את הצוואר והגרון.',
    'scan-step-neck-desc': 'שחרר מתח בשרירי הצוואר. תן לראש לנוח בעדינות.',
    'scan-step-shoulders': 'הורד את הכתפיים. שחרר כל משקל.',
    'scan-step-shoulders-desc': 'לרוב אנו נושאים מתח בכתפיים. הורד אותם מודע ונשום לאזור.',
    'scan-step-arms': 'הרף את הזרועות, המפרקים והידיים.',
    'scan-step-arms-desc': 'חש את הזרועות הופכות כבדות ורפויות. שחרר את האצבעות.',
    'scan-step-chest': 'נשום לתוך החזה. חש אותו מתרחב.',
    'scan-step-chest-desc': 'שים לב לנשימה ממלאת את החזה. תן לכל נשימה לשחרר רגשות נעוצים.',
    'scan-step-stomach': 'ריכוך הבטן והאזור.',
    'scan-step-stomach-desc': 'תן לבטן להיות רכה ורפויה. נשום עמוק לתוך הלבה.',
    'scan-step-legs': 'הרף את הרגליים, הברכיים והשוקיים.',
    'scan-step-legs-desc': 'חש את הרגליים הופכות כבדות ושקטות. שחרר מתח מהירכיים והברכיים.',
    'scan-step-feet': 'לבסוף, הרף את כפות הרגליים והאצבעות.',
    'scan-step-feet-desc': 'שים לב לחום בכפות הרגליים. שחרר את האצבעות. אתה רגוע לחלוטין.',
    'scan-next': 'הבא →',
    // Dream Tracker
    'dream-title': '🌙 עוקב חלומות',
    'dream-desc': 'רשום חלומות, תגוב סמלים, זהה פגיעות קדם-קוגניטיביות.',
    'dream-new': 'חלום חדש',
    'dream-new-btn': '✨ רשום חלום',
    'dream-new-desc': 'רשום חלום שאתה זוכר. כולל סמלים, רגשות ואלמנטים קדם-קוגניטיביים.',
    'dream-new-entry': 'רשומת חלום חדשה',
    'dream-entries': '📋 יומן חלומות',
    'dream-view-btn': '📋 צפה בחלומות',
    'dream-entry-title': 'רשומת חלום',
    'dream-date': 'תאריך',
    'dream-description': 'תיאור',
    'dream-mood': 'מצב רוח',
    'dream-symbols': 'סמלים',
    'dream-type': 'סוג חלום',
    'dream-precog': 'קדם-קוגניטיבי',
    'dream-precog-status': 'סטטוס קדם-קוגניטיבי',
    'dream-precog-event': 'אירוע שאימת/הפריך',
    'save-dream': '💾 שמור חלום',
    'dream-total': 'סה״כ',
    'dream-precog': 'קדם-קוגניטיבי',
    'dream-hits': 'פגיעות',
    'dream-lucid': 'מודע',
    'mood-happy': '😊 שמח',
    'mood-fear': '😨 פחד',
    'mood-neutral': '😐 ניטרלי',
    'mood-sad': '😢 עצוב',
    'mood-amazed': '😲 מופתע',
    'mood-peaceful': '😌 שליו',
    'sym-water': '💧 מים',
    'sym-flying': '🕊 טיסה',
    'sym-falling': '📉 נפילה',
    'sym-teeth': '🦷 שיניים',
    'sym-naked': '👤 ערום',
    'sym-chase': '🏃 מרדף',
    'sym-house': '🏠 בית',
    'sym-animals': '🐾 חיות',
    'sym-death': '💀 מוות',
    'sym-birth': '👶 לידה',
    'sym-deceased': '👻 נפטר',
    'sym-journey': '🗺 מסע',
    'type-normal': 'רגיל',
    'type-lucid': 'מודע',
    'type-precog': 'קדם-קוגניטיבי',
    'type-prophetic': 'נבואי',
    'type-nightmare': 'סיוט',
    'type-recurring': 'חוזר',
    'precog-pending': 'ממתין',
    'precog-hit': 'פגיעה',
    'precog-miss': 'חטא',
    // Random Viewer
    'random-viewer-title': '🌍 צופה אובייקט אקראי',
    'random-viewer-desc': 'יעדים עיוורים מוויקיפדיה ותמונות אקראיות. תרגל עם נושאים בלתי צפויים.',
    'rv-how-to': 'איך זה עובד',
    'rv-step1': 'צור קוד יעד',
    'rv-step2': 'בחר סוג יעד (תמונה או מאמר)',
    'rv-step3': 'התמקד ורשום רושמים',
    'rv-step4': 'חשוף את היעד',
    'rv-step5': 'דרג את הדיוק שלך',
    'rv-target-code': 'קוד יעד',
    'rv-target-type': 'סוג יעד',
    'tt-image': '🖼 תמונה אקראית',
    'tt-wikipedia': '📖 מאמר ויקיפדיה',
    'rv-generate': '🎲 צור יעד',
    'rv-focus-instruction': 'התמקד בקוד היעד. רשום את הרושמים שלך למטה.',
    'rv-impressions': 'רושמים',
    'rv-reflection': 'הרהור',
    'rv-reveal': '🔍 חשוף יעד',
    'rv-click-reveal': 'לחץ לחשוף את היעד',
    'rv-rate': 'דרג דיוק',
    'rv-no-rating': 'לא נותן דירוג',
    'rv-save-next': '💾 שמור והבא',
    'rv-sessions': 'סשנים',
    'rv-avg-rating': 'דירוג ממוצע',
    'rv-best-rating': 'דירוג הטוב ביותר',
    'rv-history-title': '📊 היסטוריית סשנים',
    // Partner
    'partner-title': '👥 פלטפורמת שותפים',
    'partner-desc': 'תאם סשנים עם שותף. אחד מחזיק, אחד צופה. השווה תוצאות.',
    'partner-how': 'איך זה עובד',
    'partner-step1': 'בחר תפקיד (מחזיק או צופה)',
    'partner-step2': 'המחזיק מגדיר יעד ויוצר קוד',
    'partner-step3': 'הצופה מזין קוד ורשם רושמים',
    'partner-step4': 'השווה תוצאות ודרג דיוק',
    'partner-choose-role': 'בחר תפקיד',
    'role-holder': '🎯 מחזיק',
    'role-holder-desc': 'אתה מגדיר את היעד ומשווה תוצאות',
    'role-viewer': '👁 צופה',
    'role-viewer-desc': 'אתה מקבל קוד ורשם רושמים',
    'holder-set-target': 'גדיר יעד',
    'holder-set-desc': 'חשוב על אובייקט, מקום או אדם ספציפי. היה ספציפי.',
    'holder-target-name': 'תיאור יעד',
    'holder-target-details': 'פרטים (אופציונלי)',
    'holder-generate': '🎲 צור קוד',
    'holder-share-code': 'שתף קוד זה',
    'holder-share-desc': 'שתף קוד זה עם הצופה שלך. המתן שהצופה ישלח רושמים.',
    'holder-viewer-notes': 'רושמי הצופה',
    'holder-wait': 'ממתין לצופה לשלוח רושמים...',
    'holder-compare': '🔍 השווה תוצאות',
    'viewer-enter-code': 'הזן קוד סשן',
    'viewer-enter-desc': 'הזן את הקוד שהמחזיק נתן לך.',
    'viewer-code-label': 'קוד סשן',
    'viewer-start': '▶ התחל צפייה',
    'viewer-target-code': 'קוד יעד',
    'viewer-focus': 'התמקד בקוד היעד. רשום את הרושמים שלך.',
    'viewer-impressions': 'רושמים',
    'viewer-sensory': 'נתונים חושיים',
    'viewer-emotions': 'רגשות / תחושות',
    'viewer-your-impressions': 'הרושמים שלך',
    'viewer-share-impressions': 'שתף רושמים',
    'viewer-share-desc': 'העתק את הרושמים האלה ושליח אותם למחזיק.',
    'viewer-done': '✅ סיימתי — שלח למחזיק',
    'viewer-finish': '🔍 סיים',
    'comparison-title': '🔍 תוצאות השוואה',
    'comparison-holder': 'יעד המחזיק',
    'comparison-viewer': 'רושמי הצופה',
    'comp-rating': 'דירוג דיוק',
    'comp-rate-1': 'ללא התאמה',
    'comp-rate-2': 'חיבור קל',
    'comp-rate-3': 'התאמה חלקית',
    'comp-rate-4': 'התאמה טובה',
    'comp-rate-5': 'התאמה מצוינת!',
    'comp-notes': 'הערות על ההתאמה',
    'comp-save': '💾 שמור סשן',
    'partner-history': '📊 היסטוריית סשנים',
    'partner-sessions': 'סשנים',
    'partner-avg-rating': 'דירוג ממוצע',
    'partner-best': 'דירוג הטוב ביותר',
    // Dial Trainer
    'dial-title': '🎯 מאמן מחוג',
    'dial-desc': 'השפע על חץ אקראי בסקאלה מ-10- עד 10+ עם המחשבה שלך.',
    'dial-welcome': 'ברוכים הבאים למאמן מחוג',
    'dial-instruction': 'חץ מתחיל ב-0 ונע באופן אקראי כל חצי שנייה. בחר יעד (+10 או -10), ואז התמקד כדי להשפיע על החץ לכיוונו.',
    'dial-choose-target': 'בחר יעד',
    'dial-duration-label': 'משך (שניות)',
    'dial-focus-title': 'התמקד במחוג',
    'dial-focus-desc': 'נסה להשפיע על החץ לכיוון',
    'dial-current': 'נוכחי',
    'dial-elapsed': 'חלף',
    'dial-moves': 'תנועות',
    'dial-toward': 'לכיוון',
    'dial-away': 'הרחק',
    'dial-neutral': 'ניטרלי',
    'dial-stop': '⏹ עצור סשן',
    'dial-result': 'תוצאות סשן',
    'dial-target': 'יעד',
    'dial-final': 'מיקום סופי',
    'dial-difference': 'הפרש',
    'dial-ratio': 'יחס לכיוון',
    'dial-peak': 'מיקום שיא',
    'dial-strong': '🔥 השפעה חזקה!',
    'dial-promising': '✨ אות מבטיח',
    'dial-slight': '👀 השפעה קלה',
    'dial-weak': '😐 אין אות ברור',
    'dial-history': '📊 היסטוריה',
    'dial-sessions': 'סשנים',
    'dial-avg-ratio': 'ממוצע % לכיוון',
    'dial-best': 'הפרש הטוב ביותר',
    'dial-start': '▶ התחל סשן',
    'dial-save': '💾 שמור סשן',
    'about-page': 'ℹ️ אודות',
    'about-hero-title': 'ערכת הפיתוח הפסיכו-אקטיבית שלך',
    'about-hero-desc': 'סוויטה חינמית בקוד פתוח של 11 אפליקציות לעזרה בחקר ופיתוח יכולות קריאת מחשבות דרך תרגול מסודר, יומן וניתוח.',
    'about-what-title': 'מה זה Psychic101?',
    'about-what-desc': 'Psychic101 הוא אוסף כלים לתרגול בדפדפן לחקר תפיסה חושי-חויה (ESP), ראייה מרחוק, ותופעות פסיכו-אקטיביות קשורות. כל אפליקציה מתמקדת במיומנות ספציפית, מתרגול קלפי זנר קלאסי ועד פרוטוקול CRV מלא.',
    'about-what-philosophy': 'הפרויקט מבוסס על העקרון שיכולות קריאת מחשבות ניתנות לפיתוח דרך תרגול עקבי ומסודר — כמו כל מיומנות אחרת. האפליקציות מספקות את המסגרת; אתה מספק את המיקוד.',
    'about-privacy': 'אתר זה אינו עוקב אחר הנתונים שלך. כל מה שאתה רואה נשמר באופן מקומי בדפדפן שלך. שוחרר כקוד פתוח למטרות בדיקה וחינוכיות.',
    'about-apps-title': 'האפליקציות',
    'about-research-title': 'יסודות המחקר',
    'about-research-desc': 'שיטות התרגול ב-Psychic101 מבוססות על עשורים של מחקר, כולל:',
    'about-research-note': 'למחקר מפורט, ראו <a href="research.md" target="_blank">research.md</a> ו-<a href="TRAINING_TECHNIQUES.md" target="_blank">TRAINING_TECHNIQUES.md</a> במאגר הפרויקט.',
    'about-how-title': 'איך להשתמש',
    'about-how-1': '<strong>התחל עם עיגון</strong> — השתמש במדריך העיגון לפני כל סשן כדי למקד את עצמך ולהפחית חפיפה אנליטית (AOL).',
    'about-how-2': '<strong>תרגל יומיומית</strong> — עקביות חשובה יותר מאורך זמן. גם 10 דקות ביום בונות מיומנות לאורך זמן.',
    'about-how-3': '<strong>רשם הכל</strong> — רשם רושמים ביומן הפסיכי, גם אם הם נראים טיפשיים. דפוסים מתגלים לאורך זמן.',
    'about-how-4': '<strong>עקוב אחר ההתקדמות</strong> — השתמש במנתח קו האות כדי לראות מגמות דיוק, לזהות שעות שיא, ולנהל AOL.',
    'about-how-5': '<strong>תרגל עם שותפים</strong> — פלטפורמת השותפים מאפשרת לך לתיאם סשנים עם חבר למשוב מסודר.',
    'about-roadmap-title': 'מפת דרכים לתרגול',
    'about-tech-title': 'פרטים טכניים',
    'about-tech-1': '100% צד לקוח — ללא שרת, ללא מסד נתונים, ללא מעקב. הנתונים שלך נשארים בדפדפן שלך.',
    'about-tech-2': 'בנוי עם HTML, CSS ו-JavaScript טהורים — ללא פריימוורקים, ללא תלות חיצונית.',
    'about-tech-3': 'עיצוב רספונסיבי מובייל-פירסט — עובד על טלפונים, טאבלטים ומחשבים.',
    'about-tech-4': 'תמיכה דו-לשונית — אנגלית ועברית (RTL).',
    'about-tech-5': 'קוד פתוח — זמין ב-<a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a>.',
    // Legal pages
    'legal-privacy-title': 'מדיניות פרטיות',
    'legal-terms-title': 'תנאי שירות',
    'legal-accessibility-title': 'הצהרת נגישות',
    'legal-last-updated': 'עודכן לאחרונה',
    'legal-privacy-heading': 'מדיניות פרטיות',
    'legal-terms-heading': 'תנאי שירות',
    'legal-accessibility-heading': 'הצהרת נגישות',
    'legal-privacy-h1': '1. נתונים שאנו מאחסנים',
    'legal-privacy-p1': 'Psychic101 מאחסן נתונים <strong>בלעדית בדפדפן שלך</strong> באמצעות <code>localStorage</code> או <code>sessionStorage</code>. אף נתון אינו מועבר לשרת, נשלח לצד שלישי, או מאוחסן במסד נתונים.',
    'legal-privacy-p2': 'סוגי הנתונים המאוחסנים כוללים:',
    'legal-privacy-li1': '<strong>נתוני אימון:</strong> תוצאות סשנים, ציוני דיוק, דירוגים ממאמן ראייה מרחוק, מאמן סמלי זנר, מאמן ניחוש קלפים, מאמן מחוג, ופלטפורמת שותפים.',
    'legal-privacy-li2': '<strong>רשומות יומן:</strong> טקסט שאתה כותב ביומן הפסיכי ועוקב החלומות.',
    'legal-privacy-li3': '<strong>תוצאות הערכה:</strong> פרופיל חוש הקליר שלך ממזהה חוש הקליר.',
    'legal-privacy-li4': '<strong>יומן סשני עיגון:</strong> רשומות של תרגילי עיגון שבוצעו.',
    'legal-privacy-li5': '<strong>העדפת שפה:</strong> השפה שבחרת (אנגלית או עברית).',
    'legal-privacy-h2': '2. ללא עוגיות',
    'legal-privacy-p3': 'Psychic101 <strong>אינו</strong> משתמש בעוגיות. כל הנתונים הקבועים מאוחסנים באמצעות <code>localStorage</code> או <code>sessionStorage</code>, שהם מנגנוני אחסון מבוססי דפדפן שמחזיקים נתונים על המכשיר שלך בלבד.',
    'legal-privacy-h3': '3. ללא שירותים חיצוניים',
    'legal-privacy-p4': 'Psychic101 אינו טוען סקריפטים חיצוניים, אנליטיקה, פרסומות או שירותי מעקב. המשאב החיצוני היחיד שנגש הוא תמונות <strong>ויקימדיה/ויקיפדיה</strong>, הנטענות על ידי תכונת צופה האובייקט האקראי למטרות אימון.',
    'legal-privacy-h4': '4. מחיקת נתונים',
    'legal-privacy-p5': 'אתה יכול למחוק את כל הנתונים המאוחסנים בכל עת על ידי:',
    'legal-privacy-li6': 'ניקוי נתוני האתר של הדפדפן שלך עבור הדומיין הזה',
    'legal-privacy-li7': 'שימוש בתכונת "ניקוי נתוני גלישה" של הדפדפן',
    'legal-privacy-li8': 'מחיקת רשומות בודדות בתוך האפליקציה',
    'legal-privacy-p6': 'ההוראות משתנות לפי דפדפן. ברוב הדפדפנים, עבור להגדרות → פרטיות → נקה נתוני גלישה, ובחר "עוגיות ונתוני אתר אחרים" או "נתוני אחסון מקומי".',
    'legal-privacy-h5': '5. בסיס חוקי',
    'legal-privacy-p7': 'מדיניות זו עומדת בדרישות <strong>חוק הגנת הפרטיות (תיקון 13)</strong> הישראלי. מכיוון שנתונים מאוחסנים רק על המכשיר שלך ואינם מועברים לעולם, הסיכון לפרטיות שלך מינימלי. עם זאת, אנו מאמינים בשקיפות מלאה לגבי מה נתונים מאוחסנים ולמה.',
    'legal-privacy-h6': '6. יצירת קשר',
    'legal-privacy-p8': 'לשאלות על מדיניות פרטיות זו או בקשות נתונים, אנא צור איתנו קשר דרך מאגר הפרויקט ב-<a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a>.',
    'legal-terms-h1': '1. אופי השירות',
    'legal-terms-p1': 'Psychic101 הוא אוסף כלים לאימון מבוססי דפדפן שנועדו <strong>למטרות חינוכיות ובידור בלבד</strong>. האפליקציות מספקות תרגילים מסודרים בהשראת שיטות מחקר היסטוריות בפסיכולוגיה פסיכית.',
    'legal-terms-h2': '2. ללא טענות רפואיות או מדעיות',
    'legal-terms-p2': 'Psychic101 <strong>אינו</strong> עושה טענות רפואיות, מדעיות או פסיכולוגיות. יכולות פסיכיות, ESP וראייה מרחוק <strong>אינן מוכחות מדעית</strong> ואין להסתמך עליהן לקבלת החלטות מעשיות, אבחון רפואי או ייעוץ מקצועי.',
    'legal-terms-h3': '3. ללא אחריות לתוצאות',
    'legal-terms-p3': 'תוצאות מתרגילי האימון <strong>אינן מובטחות</strong>. חוויות אישיות משתנות במידה רבה. מדדי הדיוק המסופקים על ידי האפליקציות הם למטרות מעקב עצמי בלבד ואין לפרש אותם כראיה ליכולת פסיכית.',
    'legal-terms-h4': '4. נתוני משתמש',
    'legal-terms-p4': 'כל הנתונים שנוצרו על ידי השימוש שלך ב-Psychic101 מאוחסנים <strong>מקומית בדפדפן שלך</strong>. אנו אינו אוספים, מעבירים או מאחסנים נתונים אישיים על שרתים. ראה את <a href="privacy-he.html">מדיניות הפרטיות</a> שלנו לפרטים.',
    'legal-terms-h5': '5. קניין רוחני',
    'legal-terms-p5': 'הקוד, העיצוב והתוכן המקורי של Psychic101 הם רכושו של מחבר הפרויקט. הפרויקט זמין תחת רישיון קוד פתוח ב-<a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a>. שיטות האימון המתוארות מבוססות על מחקר פסיכולוגי פסיכי זמין לציבור.',
    'legal-terms-h6': '6. הגבלת אחריות',
    'legal-terms-p6': 'Psychic101 מסופק "כפי שהוא" ללא אחריות מסוג כלשהו. המחברים אינם אחראים לנזקים, אובדנים או השפעות שליליות הנובעות משימוש בתוכנה זו. אתה משתמש ב-Psychic101 על אחריותך האישית.',
    'legal-terms-h7': '7. דיני החלים',
    'legal-terms-p7': 'תנאים אלו כפופים לחוקי מדינת ישראל. כל מחלוקות ייפתרו בבתי המשפט של ישראל.',
    'legal-terms-h8': '8. שינויים בתנאים אלו',
    'legal-terms-p8': 'תנאים אלו עשויים להתעדכן מעת לעת. שינויים יישקפו במאגר הפרויקט ובדף זה.',
    'legal-access-h1': 'המחויבות שלנו',
    'legal-access-p1': 'Psychic101 מחויב להבטחת נגישות דיגיטלית לאנשים עם מוגבלויות. אנו משפרים ללא הרף את חוויית המשתמש לכולם ושואפים להתאים את עצמנו ל-<strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> ולתקן הישראלי <strong>IS 5568</strong>.',
    'legal-access-h2': 'תכונות נגישות נוכחיות',
    'legal-access-li1': '<strong>HTML סמנטי:</strong> הדפים משתמשים בהיררכיית כותרות נכונה, <code>&lt;header&gt;</code>, <code>&lt;main&gt;</code>, ו-<code>&lt;footer&gt;</code>.',
    'legal-access-li2': '<strong>קישור דילוג:</strong> קישור "דלג לתוכן" מסופק בכל הדפים למשתמשי מקלדת וקוראי מסך.',
    'legal-access-li3': '<strong>נגישות מקלדת:</strong> כל האלמנטים האינטראקטיביים ניתנים לתפעול דרך ניווט במקלדת.',
    'legal-access-li4': '<strong>אינדיקטורי מיקוד:</strong> קווי מתאר גלויים מסופקים לכל האלמנטים האינטראקטיביים.',
    'legal-access-li5': '<strong>ניגודיות צבע:</strong> צבעי טקסט ורקע עומדים בדרישות יחס ניגודיות WCAG AA (מינימום 4.5:1 לטקסט רגיל).',
    'legal-access-li6': '<strong>עיצוב רספונסיבי:</strong> האתר עובד על טלפונים, טאבלטים ומחשבים עם יעדי נגיעה מתאימים (מינימום 48×48 פיקסלים).',
    'legal-access-li7': '<strong>הצהרת שפה:</strong> התכונה <code>lang</code> מוגדרת נכון בכל הדפים ומתעדכנת דינמית בעת המעבר בין אנגלית לעברית.',
    'legal-access-li8': '<strong>תמיכת RTL:</strong> תמיכה מלאה בפריסה מימין לשמאל לעברית, כולל כיוון טקסט נכון ואלמנטים ממשק משתמש ממוירים.',
    'legal-access-li9': '<strong>תאימות לקוראי מסך:</strong> תכונות ARIA ו-markup סמנטי מסייעים למשתמשי קוראי מסך.',
    'legal-access-h3': 'מגבלות ידועות',
    'legal-access-li10': 'אלמנטי canvas אינטראקטיביים מסוימים (ציור איידיוגרמה, מאמן מחוג) עשויים להציג אתגרים למשתמשי קוראי מסך. אנו עובדים על ספק תיאורי טקסט חלופיים.',
    'legal-access-li11': 'ויזואליזציות נתונים מורכבות במנתח קו האות עשויות לא להיות נגישות לחלוטין לכל טכנולוגיות הסיוע.',
    'legal-access-h4': 'משוב',
    'legal-access-p2': 'אנו מקבלים בברכה את המשוב שלך על נגישות Psychic101. אם נתקלת במחסומי נגישות, אנא הודע לנו:',
    'legal-access-li12': 'פתח issue במאגר ה-<a href="https://github.com/ErezIsrael/psychic101" target="_blank">GitHub</a> שלנו',
    'legal-access-h5': 'הערכה',
    'legal-access-p3': 'תהליך ההערכה של נגישות Psychic101 כולל:',
    'legal-access-li13': 'ביקורת עצמית מול קריטריוני WCAG 2.1 AA ו-IS 5568',
    'legal-access-li14': 'כלי בדיקה אוטומטיים לנגישות',
    'legal-access-li15': 'בדיקה ידנית עם ניווט מקלדת וקוראי מסך',
    'legal-copyright': '© 2026 Psychic101. כל הזכויות שמורות.',
    'legal-disclaimer': 'Psychic101 מסופק למטרות חינוכיות ובידור בלבד. לא נעשות טענות רפואיות, מדעיות או פסיכולוגיות.',
    'legal-bug-link': '🐛 דווח על באג',
    'legal-game-link': '🚀 משחק',
    'version-tag': 'v{v}',
    'legal-privacy-link': 'מדיניות פרטיות',
    'legal-terms-link': 'תנאי שירות',
    'legal-access-link': 'נגישות',
    // Phase 1 — Gamification
    'streak-start': 'התחל להתאמן כדי לבנות רצף!',
    'streak-days': 'רצף ימים',
    'challenge-title': 'אתגר היום',
    'fact-title': 'הידעת?',
  }
};

// Translate a key, with optional replacements
function t(key, replacements) {
  let str = TRANSLATIONS[currentLang]?.[key] || TRANSLATIONS.en[key] || key;
  if (replacements) {
    Object.entries(replacements).forEach(([k, v]) => {
      str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
    });
  }
  return str;
}

// Apply translations to all elements with data-i18n attribute
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const replacements = el.getAttribute('data-i18n-replacements')
      ? JSON.parse(el.getAttribute('data-i18n-replacements'))
      : null;
    const translated = t(key, replacements);
    // Use innerHTML so <strong>, <a>, etc. render correctly
    el.innerHTML = translated;
  });
  // Also handle placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
  });
  // RTL support — apply dir to body only (not html) to avoid Chromium mobile flex+RTL bug
  document.body.dir = getLangDirection();
  document.documentElement.lang = currentLang;
}

function getLangDirection() {
  return currentLang === 'he' ? 'rtl' : 'ltr';
}

// Language switcher
function setLang(lang) {
  currentLang = lang;
  setStoredLang(lang);
  // Re-render selector so active button updates
  const ls = document.getElementById('lang-selector');
  if (ls) ls.innerHTML = langSelectorHTML();
  applyTranslations();
  renderVersion();
}

// ─── Version Tag ──────────────────────────────────────────
function renderVersion() {
  document.querySelectorAll('[data-version]').forEach(el => {
    el.textContent = t('version-tag', { v: APP_VERSION });
  });
}
// ─── Tips Database ────────────────────────────────────────
const TIPS = {
  rv: {
    en: [
      'Relax before starting — take 3 deep breaths',
      'Iterate the target code silently in your mind',
      'Let the ideogram flow naturally — don\'t force it',
      'Record everything, even if it seems silly',
      'Watch for analytical overlays (AOL) — label them and move on',
      'Stage A is raw sensory data — no interpretation yet',
      'Stage B adds structure: colors, textures, temperatures',
      'Don\'t try to name the target until Stage VI',
      'Practice daily — consistency builds signal strength',
      'Keep a journal of your sessions for pattern recognition',
      'Ground yourself before each session',
      'The first impression is often the most accurate',
      'If signal is weak, try again later — don\'t push',
      'Meditation improves signal clarity over time',
      'Trust your intuition, not your intellect'
    ],
    he: [
      'הירגע לפני ההתחלה — קח 3 נשימות עמוקות',
      'חזור על קוד היעד בשקט בראש שלך',
      'תן לאיידיוגרמה לזרום באופן טבעי — אל תכריח',
      'רשום הכל, גם אם זה נראה טיפש',
      'שים לב לכיסויים אנליטיים (AOL) — תגוב אותם והמשך',
      'שלב A הוא נתונים חושיים גולמיים — עדיין ללא פרשנות',
      'שלב B מוסיף מבנה: צבעים, מרקמים, טמפרטורות',
      'אל תנסה לקרוא ליעד עד שלב VI',
      'תרגל מדי יום — עקביות בונה עוצמת אות',
      'שמור יומן של הסשנים שלך לזיהוי דפוסים',
      'עגן את עצמך לפני כל סשן',
      'הרושם הראשון הוא לרוב המדויק ביותר',
      'אם האות חלש, נסה שוב מאוחר יותר — אל תלחץ',
      'מדיטציה משפרת בהירות אות לאורך זמן',
      'אמין באינטואיציה שלך, לא באינטלקט שלך'
    ]
  },
  zener: {
    en: [
      'Focus on the card, not on guessing',
      'Let the symbol appear in your mind\'s eye',
      'Record your first impression — it\'s usually the best',
      '20% is random chance — sustained 25%+ is noteworthy',
      'Don\'t second-guess your initial impression',
      'Relax between trials — don\'t rush',
      'Track your results over time to see trends',
      'If you feel frustrated, take a break',
      'Practice in a quiet, distraction-free environment',
      'Some people naturally score higher on certain symbols',
      'Chi-square analysis helps determine statistical significance',
      'Consistency matters more than single-session spikes',
      'Ground yourself before starting a session',
      'Visualize the symbols clearly before guessing',
      'Trust your gut feeling'
    ],
    he: [
      'התמקד בקלף, לא בניחוש',
      'תן לסמל להופיע בעיניים שלך',
      'רשום את הרושם הראשון — הוא לרוב הטוב ביותר',
      '20% הוא סיכוי אקראי — 25%+ מתמשך ראוי לציון',
      'אל תנחש מחדש את הרושם הראשוני שלך',
      'הירגע בין ניסיונות — אל תמהר',
      'עקוב אחר התוצאות שלך לאורך זמן כדי לראות מגמות',
      'אם אתה מרגיש מתוסכל, קח הפסקה',
      'תרגל בסביבה שקטה וללא הסחות דעת',
      'לחלק מהאנשים יש ציונים גבוהים יותר באופן טבעי על סמלים מסוימים',
      'ניתוח חי-בריבוע עוזר לקבוע משמעותיות סטטיסטית',
      'עקביות חשובה יותר מפיצוצים של סשן בודד',
      'עגן את עצמך לפני התחלת סשן',
      'הדמיין את הסמלים בבירור לפני ניחוש',
      'אמין בתחושת הבטן שלך'
    ]
  },
  card: {
    en: [
      'Focus on the card back design — let impressions flow',
      'Visualize the suit first, then the rank',
      'Color impressions (red/black) can be a good starting point',
      'Record your impression before revealing — no changing!',
      'Exact matches are rare — same suit or color is still a hit',
      'Practice with the simplified deck first if you\'re new',
      'Don\'t analyze — just feel',
      'Track your accuracy by suit to find strengths',
      'Some people are better at suits, others at ranks',
      'Relax between rounds — don\'t force impressions',
      'The card back pattern can sometimes give subtle cues',
      'Trust your first instinct',
      'Ground yourself before each round',
      'If you see a number, trust it even if it seems wrong',
      'Consistency over time is the real measure of ability'
    ],
    he: [
      'התמקד בעיצוב גב הקלף — תן לרושמים לזרום',
      'הדמיין את הסמל קודם, ואז את הדרג',
      'רושמי צבע (אדום/שחור) יכולים להיות נקודת התחלה טובה',
      'רשום את הרושם שלך לפני החשיפה — אין שינויים!',
      'התאמות מדויקות נדירות — אותו סמל או צבע הוא עדיין פגיעה',
      'תרגל עם החפיסה המופשטת קודם אם אתה חדש',
      'אל תנתח — פשוט תרגיש',
      'עקוב אחר הדיוק שלך לפי סמל כדי למצוא חוזקות',
      'לחלק מהאנשים טוב יותר בסמלים, לאחרים בדרגים',
      'הירגע בין סיבובים — אל תכריח רושמים',
      'דוגמת גב הקלף לפעמים יכולה לתת רמזים עדינים',
      'אמין באינסטינקט הראשון שלך',
      'עגן את עצמך לפני כל סיבוב',
      'אם אתה רואה מספר, אמין בו גם אם זה נראה לא נכון',
      'עקביות לאורך זמן היא המדד האמיתי ליכולת'
    ]
  },
  clair: {
    en: [
      'Be honest in your self-assessment — there are no wrong answers',
      'Your dominant sense is your natural gift — nurture it',
      'Cross-train other senses for balanced development',
      'Claircognizance is the most common — don\'t dismiss it',
      'Clairempathy can be draining — learn boundary techniques',
      'Practice daily exercises to strengthen your senses',
      'Keep a training log to track your progress',
      'Some senses develop faster than others — be patient',
      'Meditation helps all Clair senses develop',
      'Grounding is essential, especially for clairempaths',
      'Your profile may change over time as you develop',
      'Trust your impressions — they are valid regardless of score',
      'Journaling helps identify patterns in your abilities',
      'Working with a partner can accelerate development',
      'Be gentle with yourself — this is a lifelong journey'
    ],
    he: [
      'היה כן בהערכה העצמית — אין תשובות לא נכונות',
      'החוש הדומיננטי שלך הוא המתנה הטבעית שלך — גדל אותו',
      'תרגל חושים אחרים לפיתוח מאוזן',
      'קלאירקוגניזנס הוא הנפוץ ביותר — אל תזניח אותו',
      'קלאירמפתיה יכולה להיות מתישה — למד טכניקות גבולות',
      'תרגל תרגילים יומיים לחיזוק החושים שלך',
      'שמור יומן אימון לעקוב אחר ההתקדמות שלך',
      'חלק מהחושים מתפתחים מהר יותר מאחרים — היה סבלני',
      'מדיטציה עוזרת לכל חושי הקליר להתפתח',
      'עיגון חיוני, במיוחד עבור קלאירמפתים',
      'הפרופיל שלך עשוי להשתנות לאורך זמן כשאתה מתפתח',
      'אמין ברושמים שלך — הם תקפים ללא קשר לציון',
      'כתיבת יומן עוזרת לזהות דפוסים ביכולות שלך',
      'עבודה עם שותף יכולה להאיץ פיתוח',
      'היה עדין איתך עצמך — זו מסע לכל החיים'
    ]
  },
  analyzer: {
    en: [
      'Track your data over time — patterns emerge with consistency',
      'High AOL frequency means strong signal — celebrate it',
      'Look for peak times — practice when your signal is strongest',
      'Journal entries help calibrate your accuracy perception',
      'Confirmed entries are your best data points',
      'Don\'t obsess over numbers — trust your experience',
      'Grounding before sessions improves overall accuracy',
      'Compare apps to find your strongest modality',
      'Dream precognitive hits are powerful confirmation',
      'Partner sessions reveal blind spots in your perception',
      'Review your data weekly for insights',
      'Accuracy trends matter more than single sessions',
      'If accuracy drops, check your grounding routine',
      'Signal strength varies — some days are better than others',
      'Use this data to refine your practice routine'
    ],
    he: [
      'עקוב אחר הנתונים שלך לאורך זמן — דפוסים מופיעים עם עקביות',
      'תדירות AOL גבוהה אומרת אות חזק — חגוג את זה',
      'חפש שעות שיא — תרגל כשהאות שלך חזק ביותר',
      'רשומות יומן עוזרות לכייל את תפיסת הדיוק שלך',
      'רשומות מאומתות הן נקודות הנתונים הטובות ביותר שלך',
      'אל תתמקד במספרים — אמין בחוויה שלך',
      'עיגון לפני סשנים משפר דיוק כללי',
      'השווה אפליקציות כדי למצוא את המודאליות החזקה ביותר שלך',
      'פגיעות קדם-קוגניטיביות בחלומות הן אימות חזק',
      'סשני שותפים חושפים נקודות עיוורון בתפיסה שלך',
      'סקור את הנתונים שלך שבועית לתובנות',
      'מגמות דיוק חשובות יותר מסשנים בודדים',
      'אם הדיוק יורד, בדוק את שגרת העיגון שלך',
      'עוצמת האות משתנה — יש ימים טובים יותר מאחרים',
      'השתמש בנתונים האלה לשיפור שגרת התרגול שלך'
    ]
  },
  journal: {
    en: [
      'Write down impressions immediately — memory fades fast',
      'Label entries with verification status to track accuracy',
      'Look for patterns across weeks — synchronicities reveal themselves',
      'Record even small hits — they build confidence',
      'Use categories to find your strongest modality',
      'Review old entries — you may spot connections you missed',
      'Be honest with verification — partial counts too',
      'Journaling itself sharpens your awareness',
      'Note the time and place — context matters',
      'Track emotional state — it affects perception'
    ],
    he: [
      'רשום רושמים מיד — הזיכרון דוהה מהר',
      'סמן רשומות עם סטטוס אימות כדי לעקוב אחר דיוק',
      'חפש דפוסים לאורך שבועות — סינכרוניות חושפות את עצמן',
      'רשום גם פגיעות קטנות — הן בונות ביטחון',
      'השתמש בקטגוריות כדי למצוא את המודאליות החזקה ביותר שלך',
      'סקור רשומות ישנות — ייתכן שתגלה קשרים שפספסת',
      'היה כן עם אימות — חלקי גם סופר',
      'כתיבת יומן מחדה את המודעות שלך',
      'רשום את הזמן והמקום — הקשר חשוב',
      'עקוב אחר מצב רגשי — הוא משפיע על התפיסה'
    ]
  },
  grounding: {
    en: [
      'Ground before every session — it stabilizes your signal',
      'The 5-4-3-2-1 technique is great for quick resets',
      'Rooting visualization helps anchor your energy',
      'Breath work calms the analytical mind',
      'Body scan releases tension that blocks perception',
      'Consistency matters more than duration',
      'Ground after sessions too — it helps integrate the experience',
      'Try different techniques to find what works for you',
      'Even 2 minutes of grounding makes a difference',
      'Track your grounding sessions to build the habit'
    ],
    he: [
      'עגן לפני כל סשן — זה מייצב את האות שלך',
      'טכניקת 5-4-3-2-1 מצוינת לאיפוס מהיר',
      'ויזואליזציה של שורשים עוזרת לעגן את האנרגיה שלך',
      'עבודת נשימה מרגיעה את המוח האנליטי',
      'סריקת גוף משחררת מתח שחוסם תפיסה',
      'עקביות חשובה יותר מאורך זמן',
      'עגן גם אחרי סשנים — זה עוזר לאינטגרציה',
      'נסה טכניקות שונות כדי למצוא מה עובד לך',
      'גם 2 דקות עיגון עושות הבדל',
      'עקוב אחר סשני עיגון כדי לבנות הרגל'
    ]
  },
  dream: {
    en: [
      'Keep a notebook by your bed — write immediately upon waking',
      'Set an intention before sleep: "I will remember my dreams"',
      'Tag symbols — they often repeat with meaning',
      'Track precognitive dreams — they are powerful confirmation',
      'Lucid dreaming can be trained with reality checks',
      'Mood in dreams often reflects waking life stress',
      'Water symbols often relate to emotions',
      'Flying dreams can indicate freedom or escape desires',
      'Review dreams weekly for patterns',
      'Don\'t dismiss nightmares — they carry important messages'
    ],
    he: [
      'שמור מחברת ליד המיטה — רשום מיד בהתעוררות',
      'הגדר כוונה לפני שינה: "אזכור את החלומות שלי"',
      'סמן סמלים — הם לרוב חוזרים עם משמעות',
      'עקוב אחר חלומות קדם-קוגניטיביים — הם אימות חזק',
      'חלום ער יכול להיות מתורגל עם בדיקות מציאות',
      'מצב רגשי בחלומות משקף לרוב מתח בחיים',
      'סמלי מים קשורים לרוב לרגשות',
      'חלומות טיסה יכולים להעיד על רצון לחופש',
      'סקור חלומות שבועית לדפוסים',
      'אל תזני לילות רע — הם נושאים מסרים חשובים'
    ]
  },
  'random-viewer': {
    en: [
      'Let the image load before you start guessing',
      'Record impressions before looking — honesty is key',
      'Rate accuracy honestly — it calibrates your perception',
      'Try both image and article targets for variety',
      'Notice if certain target types are easier for you',
      'Don\'t force connections — let impressions flow naturally',
      'Compare your impressions after reveal — note surprises',
      'Practice regularly — consistency builds skill',
      'Use the timer to keep sessions focused',
      'Track your average rating over time'
    ],
    he: [
      'תן לתמונה להטען לפני שאתה מתחין לנחש',
      'רשום רושמים לפני הצפייה — כנות היא המפתח',
      'דרג דיוק בכנות — זה מכייל את התפיסה שלך',
      'נסה יעדי תמונה ומאמר לגיוון',
      'שים לב אם סוגי יעדים מסוימים קלים יותר לך',
      'אל תכריח קשרים — תן לרושמים לזרום באופן טבעי',
      'השווה רושמים אחרי חשיפה — רשום הפתעות',
      'תרגל באופן סדיר — עקביות בונה מיומנות',
      'השתמש בטיימר כדי לשמור על סשנים ממוקדים',
      'עקוב אחר הדירוג הממוצע שלך לאורך זמן'
    ]
  },
  partner: {
    en: [
      'Clear communication with your partner is essential',
      'The holder should describe the target objectively',
      'The viewer should record impressions without filtering',
      'Compare results side-by-side for best insight',
      'Rate accuracy together — it builds trust',
      'Try switching roles each session',
      'Partner sessions reveal blind spots in perception',
      'Don\'t discuss the target until after impressions are recorded',
      'Use a neutral environment free from distractions',
      'Track your partner session accuracy over time'
    ],
    he: [
      'תקשורת ברורה עם השותף שלך היא חיונית',
      'המחזיק צריך לתאר את היעד באופן אובייקטיבי',
      'הצופה צריך לרשום רושמים ללא סינון',
      'השווה תוצאות זו לצד זו לתובנה הטובה ביותר',
      'דרג דיוק יחד — זה בונה אמון',
      'נסה להחליף תפקידים בכל סשן',
      'סשני שותפים חושפים נקודות עיוורון בתפיסה',
      'אל תדבר על היעד עד אחרי שרשמת רושמים',
      'השתמש בסביבה ניטרלית ללא הסחות דעת',
      'עקוב אחר דיוק סשני השותפים שלך לאורך זמן'
    ]
  },
  dial: {
    en: [
      'Ground yourself before starting — a calm mind influences better',
      'Visualize the pointer moving toward your target',
      'Don\'t watch the numbers — focus on the feeling of direction',
      'Emotion amplifies intent — feel the target position',
      'Aim for consistency, not perfection',
      'Above 50% toward ratio means you\'re doing something',
      'Try both +10 and -10 to compare your natural bias',
      'Short sessions (30s) are great for warm-up',
      'Long sessions (300s) reveal sustained influence',
      'Track your toward ratio over time to see progress'
    ],
    he: [
      'עגן את עצמך לפני ההתחלה — מוח רגוע משפיע טוב יותר',
      'דמיין את החץ נע לכיוון היעד שלך',
      'אל תסתכל על המספרים — התמקד בתחושת הכיוון',
      'רגש ממחזק כוונה — תפוס את מיקום היעד',
      'שאף לעקביות, לא למושלמות',
      'מעל 50% יחס לכיוון אומר שאתה עושה משהו',
      'נסה גם +10 וגם -10 כדי להשוות הטיה טבעית',
      'סשנים קצרים (30 שניות) מצוינים לחימום',
      'סשנים ארוכים (300 שניות) חושפים השפעה מתמשכת',
      'עקוב אחר יחס הכיוון לאורך זמן כדי לראות התקדמות'
    ]
  }
};

let lastTipIndex = {};

function getRandomTip(app) {
  const tips = TIPS[app]?.[currentLang] || TIPS[app]?.en || [];
  if (!tips.length) return '';
  if (!lastTipIndex[app]) lastTipIndex[app] = -1;
  let idx;
  do {
    idx = Math.floor(Math.random() * tips.length);
  } while (idx === lastTipIndex[app] && tips.length > 1);
  lastTipIndex[app] = idx;
  return tips[idx];
}

function highlightField(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.add('input-error');
    el.focus();
  }
}

function clearHighlight(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('input-error');
}

function showTip(app) {
  const tip = getRandomTip(app);
  // Find the tip element inside the currently active screen
  const activeScreen = document.querySelector('.screen.active');
  const el = activeScreen ? activeScreen.querySelector('.tip-text') : document.querySelector('.tip-text');
  if (el) el.textContent = tip || t('loading-tip');
}

function refreshTip(app) {
  showTip(app);
}

// ─── Storage Helpers ──────────────────────────────────────
function loadData(key) {
  const st = detectStorage();
  if (st === 'local') { try { const v = localStorage.getItem(key); if (v) return JSON.parse(v); } catch(e) {} }
  if (st === 'session') { try { const v = sessionStorage.getItem(key); if (v) return JSON.parse(v); } catch(e) {} }
  return null;
}
function saveData(key, data) {
  const st = detectStorage();
  if (st === 'local') { try { localStorage.setItem(key, JSON.stringify(data)); return; } catch(e) {} }
  if (st === 'session') { try { sessionStorage.setItem(key, JSON.stringify(data)); return; } catch(e) {} }
  console.warn('saveData: no storage available for', key);
}

// ─── Navigation ───────────────────────────────────────────
function showScreen(name) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const screen = document.getElementById('screen-' + name);
  if (screen) screen.classList.add('active');
}
function goHome() {
  window.location.href = 'index.html?lang=' + getStoredLang();
}

// ─── Timer ────────────────────────────────────────────────
let timerInterval = null;
let timerStart = null;

function startTimer() {
  timerStart = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}
function getTimerSeconds() {
  return timerStart ? Math.floor((Date.now() - timerStart) / 1000) : 0;
}
function formatDuration(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
function updateTimer() {
  const el = document.getElementById('timer');
  if (el) el.textContent = formatDuration(getTimerSeconds());
}

// ─── Utilities ────────────────────────────────────────────
function formatDate(ts) {
  return new Date(ts).toLocaleString();
}
function esc(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function generateCode() {
  return Array.from({length: 8}, () => randomInt(0, 9)).join('');
}

// ─── Modal ────────────────────────────────────────────────
function openModal(html) {
  document.getElementById('modal-content').innerHTML = html;
  document.getElementById('modal-overlay').classList.add('active');
}
function closeModal(e) {
  if (e && e.target !== e.currentTarget) return;
  document.getElementById('modal-overlay').classList.remove('active');
}

// ─── Streak Calculator ────────────────────────────────────
function calcStreak(dates) {
  if (!dates.length) return 0;
  const unique = [...new Set(dates.map(d => new Date(d).toDateString()))].sort().reverse();
  let streak = 0;
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const start = unique[0] === today || unique[0] === yesterday ? 0 : -1;
  if (start === -1) return 0;
  for (let i = 0; i < unique.length; i++) {
    const expected = new Date(Date.now() - (start + i) * 86400000).toDateString();
    if (unique[i] === expected) streak++;
    else break;
  }
  return streak;
}

// ═══════════════════════════════════════════════════════════
// Phase 1 — Gamification & Engagement Utilities
// ═══════════════════════════════════════════════════════════

// ─── Confetti ─────────────────────────────────────────────
function spawnConfetti(count = 40) {
  const container = document.createElement('div');
  container.className = 'confetti-container';
  document.body.appendChild(container);
  const colors = ['#7b68ee','#9d8df1','#4ade80','#fbbf24','#f87171','#60a5fa','#f472b6','#fb923c'];
  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--dur', (1 + Math.random() * 1) + 's');
    piece.style.setProperty('--rot', (360 + Math.random() * 720) + 'deg');
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    container.appendChild(piece);
  }
  setTimeout(() => container.remove(), 2500);
}

// ─── Encouraging Miss Messages ───────────────────────────
const MISS_MESSAGES = {
  en: [
    'Interesting! Your intuition pointed elsewhere. Every attempt strengthens your signal. 🔮',
    'Not this time — but your psychic muscles are getting stronger! 💪',
    'Close! Your inner sense is developing. Keep going! ✨',
    'The signal was subtle this time. Trust the process — it grows with practice. 🌱',
    'Your intuition said something different. That\'s valuable data! Keep tracking. 📊',
    'No match this round, but your awareness is expanding. That\'s progress! 🌟',
  ],
  he: [
    'מעניין! האינטואיציה שלך הובילה לכיוון אחר. כל ניסיון מחזק את האות שלך. 🔮',
    'לא הפעם — אבל השרירים הפסיכיים שלך מתחזקים! 💪',
    'קרוב! החוש הפנימי שלך מתפתח. המשך! ✨',
    'האות היה עדין הפעם. אמין בתהליך — הוא גדל עם תרגול. 🌱',
    'האינטואיציה שלך אמרה משהו אחר. זו נתונים חשובים! המשך לעקוב. 📊',
    'אין התאמה בסיבוב הזה, אבל המודעות שלך מתרחבת. זו התקדמות! 🌟',
  ]
};

function getMissMessage() {
  const msgs = MISS_MESSAGES[currentLang] || MISS_MESSAGES.en;
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function getHitMessage() {
  const msgs = currentLang === 'he'
    ? ['🎯 פגיעה! החוש הפנימי שלך עובד!', '🌟 מצוין! האות חזק!', '🔮 קשר פסיכי! המשך כך!']
    : ['🎯 Hit! Your inner sense is working!', '🌟 Excellent! Strong signal!', '🔮 Psychic connection! Keep it up!'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

function getNearMessage() {
  const msgs = currentLang === 'he'
    ? ['👀 קרוב! החוש שלך מתפתח', '✨ כמעט! המשך להתאמן', '🔮 כמעט פגיעה! האות מתחזק']
    : ['👀 Close! Your sense is developing', '✨ Almost! Keep training', '🔮 Near miss! Signal strengthening'];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

// ─── Streak System ────────────────────────────────────────
function getStreak() {
  const data = loadData('p101_streak');
  if (!data) return { current: 0, best: 0, lastDate: null };
  return data;
}

function updateStreak() {
  const today = new Date().toISOString().slice(0, 10);
  let data = loadData('p101_streak') || { current: 0, best: 0, lastDate: null };

  if (data.lastDate === today) return data; // already practiced today

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  if (data.lastDate === yesterday) {
    data.current++;
  } else if (data.lastDate !== today) {
    data.current = 1; // reset or start new
  }

  data.lastDate = today;
  data.best = Math.max(data.best, data.current);
  saveData('p101_streak', data);
  return data;
}

function renderStreak(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const data = getStreak();
  if (data.current < 1) {
    el.innerHTML = `<span style="font-size:0.8rem;color:var(--text-dim)">${t('streak-start') || 'Start practicing to build a streak!'}</span>`;
    return;
  }
  const flames = '🔥'.repeat(Math.min(data.current, 5));
  el.innerHTML = `
    <div class="streak-display">
      <span class="streak-flame">${flames}</span>
      <span class="streak-count">${data.current}</span>
      <span class="streak-label">${t('streak-days') || 'day streak'}</span>
    </div>`;
}

// ─── Daily Challenge ──────────────────────────────────────
const DAILY_CHALLENGES = {
  en: [
    { icon: '🎯', text: 'Roll the Intuition Dice 5 times', app: 'dial-trainer.html', key: 'challenge-mon' },
    { icon: '📓', text: 'Log a dream or synchronicity', app: 'journal.html', key: 'challenge-tue' },
    { icon: '🃏', text: 'Try the Card Guessing test', app: 'card-guess.html', key: 'challenge-wed' },
    { icon: '🌳', text: 'Complete a grounding session', app: 'grounding.html', key: 'challenge-thu' },
    { icon: '🧠', text: 'Try the Zener Symbol test — 10 rounds', app: 'zener.html', key: 'challenge-fri' },
    { icon: '🔮', text: 'Do a Remote Viewing session', app: 'rv-trainer.html', key: 'challenge-sat' },
    { icon: '📊', text: 'Review your Signal Line Analyzer', app: 'analyzer.html', key: 'challenge-sun' },
  ],
  he: [
    { icon: '🎯', text: 'התחל סשן במאמן המחוג', app: 'dial-trainer.html', key: 'challenge-mon' },
    { icon: '📓', text: 'רשום חלום או סינכרוניות', app: 'journal.html', key: 'challenge-tue' },
    { icon: '🃏', text: 'נסה את ניחוש הקלפים', app: 'card-guess.html', key: 'challenge-wed' },
    { icon: '🌳', text: 'השלם סשן עיגון', app: 'grounding.html', key: 'challenge-thu' },
    { icon: '🧠', text: 'נסה את סמלי זנר — 10 סיבובים', app: 'zener.html', key: 'challenge-fri' },
    { icon: '🔮', text: 'עשה סשן ראייה מרחוק', app: 'rv-trainer.html', key: 'challenge-sat' },
    { icon: '📊', text: 'סקור את מנתח קו האות', app: 'analyzer.html', key: 'challenge-sun' },
  ]
};

function getDailyChallenge() {
  const day = new Date().getDay(); // 0=Sun ... 6=Sat
  const challenges = DAILY_CHALLENGES[currentLang] || DAILY_CHALLENGES.en;
  return challenges[day];
}

function isChallengeDismissed() {
  const dismissed = loadData('p101_challenge_dismissed') || {};
  const today = new Date().toISOString().slice(0, 10);
  return dismissed.date === today;
}

function dismissChallenge() {
  saveData('p101_challenge_dismissed', { date: new Date().toISOString().slice(0, 10) });
}

function renderDailyChallenge(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  if (isChallengeDismissed()) { el.innerHTML = ''; return; }
  const challenge = getDailyChallenge();
  el.innerHTML = `
    <div class="challenge-banner">
      <span class="challenge-icon">${challenge.icon}</span>
      <span class="challenge-text"><strong>${t('challenge-title') || 'Today\'s Challenge'}:</strong> ${challenge.text}</span>
      <button class="challenge-dismiss" onclick="dismissChallengeBanner(this)">✕</button>
    </div>`;
}

function dismissChallengeBanner(btn) {
  dismissChallenge();
  const banner = btn.closest('.challenge-banner') || btn.parentElement;
  if (banner) banner.parentElement.innerHTML = '';
}

// ─── Time-of-Day Prompts ─────────────────────────────────
const TIME_PROMPTS = {
  en: [
    { min: 5, max: 10, icon: '🌅', text: 'Good morning! Did you dream last night? ', link: 'dream-tracker.html', linkText: 'Log it →' },
    { min: 10, max: 14, icon: '☀️', text: 'Morning intuition check! ', link: 'zener.html', linkText: 'Try the Zener test →' },
    { min: 14, max: 18, icon: '😴', text: 'Afternoon slump? ', link: 'grounding.html', linkText: 'Try a grounding session →' },
    { min: 18, max: 22, icon: '🌙', text: 'Peak psychic hours! ', link: 'rv-trainer.html', linkText: 'Try Remote Viewing →' },
    { min: 22, max: 5, icon: '📓', text: 'Evening reflection. ', link: 'journal.html', linkText: 'Journal your impressions →' },
  ],
  he: [
    { min: 5, max: 10, icon: '🌅', text: 'בוקר טוב! חלמת הלילה? ', link: 'dream-tracker.html', linkText: 'רשום את זה →' },
    { min: 10, max: 14, icon: '☀️', text: 'בדיקת אינטואיציה בוקר! ', link: 'zener.html', linkText: 'נסה את מבחן זנר →' },
    { min: 14, max: 18, icon: '😴', text: 'נפילה אחר הצהריים? ', link: 'grounding.html', linkText: 'נסה סשן עיגון →' },
    { min: 18, max: 22, icon: '🌙', text: 'שעות שיא פסיכיות! ', link: 'rv-trainer.html', linkText: 'נסה ראייה מרחוק →' },
    { min: 22, max: 5, icon: '📓', text: 'הרהור ערב. ', link: 'journal.html', linkText: 'רשום את הרושמים שלך →' },
  ]
};

function getTimePrompt() {
  const hour = new Date().getHours();
  const prompts = TIME_PROMPTS[currentLang] || TIME_PROMPTS.en;
  for (const p of prompts) {
    if (p.min < p.max) {
      if (hour >= p.min && hour < p.max) return p;
    } else {
      // wraps midnight (22-5)
      if (hour >= p.min || hour < p.max) return p;
    }
  }
  return prompts[0];
}

function renderTimePrompt(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const prompt = getTimePrompt();
  el.innerHTML = `
    <div class="time-prompt">
      <span class="time-prompt-icon">${prompt.icon}</span>
      <span class="time-prompt-text">${prompt.text}<a href="${prompt.link}">${prompt.linkText}</a></span>
    </div>`;
}

// ─── "Did You Know?" Facts ───────────────────────────────
const FUN_FACTS = {
  en: [
    'The US government ran a remote viewing program called Stargate from 1970-1995.',
    'Stanford researcher Robert Thorwald documented hundreds of verified RV sessions.',
    'AI cannot remote view — tested in 2026, all 5 major AIs failed completely.',
    'Emotional intelligence correlates with RV accuracy (PMC10275521).',
    'The 12 Principles of Remote Viewing were signed by Puthoff, Targ, Atwater, and others.',
    'Princeton\'s PEAR Lab ran 80,000+ ESP experiments over 25 years.',
    'Nobel laureate William Fowler called remote viewing "a real phenomenon".',
    'The Monroe Institute uses Hemi-Sync to alter brainwave states for exploration.',
    'Ancient Vedic texts describe "divya drishti" — divine sight — as a trainable ability.',
    'The IRVA now operates a formal research unit with CRVREG certification.',
    'Some RVers report "bilocating" — feeling present in two places at once.',
    'UAP investigators are re-examining Pat Price\'s 1973 RV papers on extraterrestrials.',
  ],
  he: [
    'ממשלת ארה"ב הפעילה תוכנית ראייה מרחוק בשם סטרגייט מ-1970 עד 1995.',
    'חוקר סטנפורד רוברט תורוולד תיעד מאות סשני RV מאומתים.',
    'בינה מלאכותית לא יכולה לראות מרחוק — נבדק ב-2026, כל 5 הבינות המובילות נכשלו.',
    'אינטליגנציה רגשית מתואמת עם דיוק RV (PMC10275521).',
    '12 העקרונות של ראייה מרחוק חוממו על ידי פוטוף, טארג, אטווור ואחרים.',
    'מעבדת PEAR של פרינסטון ביצעה יותר מ-80,000 ניסויי ESP לאורך 25 שנים.',
    'זוכה פרס נובל ויליאם פאולר כינה ראייה מרחוק "תופעה אמיתית".',
    'מכון מונרו משתמש ב-Hemi-Sync לשנות מצבי גלי מוח לחקר תודעה.',
    'מסמכים ודיים עתיקים מתארים "divya drishti" — ראייה אלוהית — כיכולת ניתנת לאימון.',
    'ה-IRVA מפעיל כעת יחידת מחקר רשמית עם תעודת CRVREG.',
    'חלק מצופי המרחוק מדווחים על "בילוקציה" — תחושת נוכחות בשני מקומות בו זמנית.',
    'חוקרי UAP סוקרים מחדש את מאמרי 1973 של פט פרייס על חייזרים.',
  ]
};

function getDailyFact() {
  const facts = FUN_FACTS[currentLang] || FUN_FACTS.en;
  // Rotate based on day of year so it changes daily but is consistent
  const start = new Date(new Date().getFullYear(), 0, 0);
  const dayOfYear = Math.floor((Date.now() - start) / 86400000);
  return facts[dayOfYear % facts.length];
}

function renderFunFact(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML = `
    <div class="fact-banner">
      <span class="tip-icon">💡</span>
      <span class="tip-text">${t('fact-title') || 'Did you know?'} ${getDailyFact()}</span>
    </div>`;
}

// ─── Language Selector HTML ───────────────────────────────
function langSelectorHTML() {
  // Always re-read in case it changed from another page
  currentLang = getStoredLang() || 'en';
  return `<div class="lang-selector">
    <span class="lang-label">${t('lang-label')}</span>
    <button class="lang-btn ${currentLang === 'en' ? 'active' : ''}" onclick="setLang('en')">EN</button>
    <button class="lang-btn ${currentLang === 'he' ? 'active' : ''}" onclick="setLang('he')">HE</button>
  </div>`;
}