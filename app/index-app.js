// ─── App registry for activity summary ────────────────────
const APPS = [
  { key: 'rv_sessions', label: 'analyzer-rv', icon: '🔮', scoreFn: (arr) => arr.length ? (arr.reduce((s,e) => s + (e.rating||0), 0) / arr.length).toFixed(1) + '⭐' : '—' },
  { key: 'rv_history', label: 'analyzer-random', icon: '🌍', scoreFn: (arr) => arr.length ? (arr.reduce((s,e) => s + (e.rating||0), 0) / arr.length).toFixed(1) + '⭐' : '—' },
  { key: 'partner_history', label: 'analyzer-partner', icon: '👥', scoreFn: (arr) => arr.length ? (arr.reduce((s,e) => s + (e.rating||0), 0) / arr.length).toFixed(1) + '⭐' : '—' },
  { key: 'card_guess_history', label: 'analyzer-card', icon: '🃏', scoreFn: (arr) => arr.length ? Math.round(arr.reduce((s,e) => s + (e.accuracy||0), 0) / arr.length) + '%' : '—' },
  { key: 'zener_history', label: 'analyzer-zener', icon: '⭕', scoreFn: (arr) => arr.length ? Math.round(arr.reduce((s,e) => s + (e.accuracy||0), 0) / arr.length) + '%' : '—' },
  { key: 'dial_history', label: 'analyzer-dial', icon: '🎯', scoreFn: (arr) => arr.length ? (arr.reduce((s,e) => s + (e.towardRatio||0), 0) / arr.length).toFixed(0) + '%' : '—' },
  { key: 'journal_entries', label: 'analyzer-journal', icon: '📓', scoreFn: (arr) => arr.length ? arr.length + ' ' + t('hub-entries') : '—' },
  { key: 'dream_entries', label: 'analyzer-dream', icon: '🌙', scoreFn: (arr) => arr.length ? arr.length + ' ' + t('hub-entries') : '—' },
  { key: 'grounding_history', label: 'analyzer-grounding', icon: '🌳', scoreFn: (arr) => arr.length ? arr.length + ' ' + t('hub-sessions') : '—' },
];

function renderActivity() {
  const list = document.getElementById('activity-list');
  let items = [];

  APPS.forEach(app => {
    const data = loadData(app.key) || [];
    if (!data.length) return;
    const last = data[data.length - 1];
    const dateStr = last.timestamp ? formatDate(last.timestamp) : '—';
    const score = app.scoreFn(data);
    items.push({
      icon: app.icon,
      label: t(app.label),
      count: data.length,
      score: score,
      date: dateStr
    });
  });

  if (!items.length) {
    list.innerHTML = '<div class="card" style="text-align:center;color:var(--text-dim);padding:1.5rem">' + (t('hub-no-activity') || 'No activity yet. Start a session!') + '</div>';
    return;
  }

  list.innerHTML = items.map(item => `
    <div class="activity-item">
      <span class="activity-icon">${item.icon}</span>
      <span class="activity-label">${item.label}</span>
      <span class="activity-score">${item.score}</span>
      <span class="activity-meta">${item.count} ${t('hub-sessions')} · ${item.date}</span>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('lang-selector').innerHTML = langSelectorHTML();
  applyTranslations();
  renderActivity();
  // Append ?lang=XX to all app links so language persists across pages
  document.querySelectorAll('.app-card').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.endsWith('.html')) {
        const sep = href.includes('?') ? '&' : '?';
        a.setAttribute('href', href + sep + 'lang=' + getStoredLang());
      }
    });
  });
});
