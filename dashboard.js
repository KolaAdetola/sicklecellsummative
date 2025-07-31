/* ========= Config (adjust endpoints if needed) ========= */
const USE_COOKIES = true; // true if your API auth uses HTTP-only cookies; false if you store JWT in localStorage
const isProdHost = location.hostname.endsWith('github.io') || location.hostname.endsWith('onrender.com');
const API_BASE = isProdHost
  ? 'https://sicklecellsummative.onrender.com'   // your Render API
  : 'http://localhost:3000';                     // local API

// GitHub Pages base path handling
const BASE_PATH = isProdHost ? '/sicklecellsummative' : '';
const MAIN_PAGE = `${BASE_PATH}/main.html`; // change if your main page path differs
const LOGIN_PAGE = `${BASE_PATH}/index.html`; // change if your login page path differs

/* ========= Helpers ========= */
function setStatus(msg){ const el = document.getElementById('status'); if(el) el.textContent = msg || ''; }

function authHeaders(){
  if (USE_COOKIES) return {}; // cookies sent via credentials: 'include'
  const token = localStorage.getItem('auth_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function apiGet(path){
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: { 'Accept':'application/json', ...authHeaders() },
    credentials: USE_COOKIES ? 'include' : 'same-origin'
  });
  if (res.status === 401) {
    redirectToLogin();
    return null;
  }
  if (!res.ok) {
    const text = await res.text().catch(()=> '');
    throw new Error(`GET ${path} failed: ${res.status} ${text}`);
  }
  return res.json();
}

function redirectToLogin(){
  setStatus('Not authenticated. Redirecting to login…');
  setTimeout(() => { window.location.assign(LOGIN_PAGE); }, 800);
}

function navigateToMain(){
  window.location.assign(MAIN_PAGE);
}

function setAvatar(url){
  const el = document.getElementById('avatar');
  if(!el) return;
  if(url) el.style.backgroundImage = `url("${url}")`;
}

/* ========= Renderers ========= */
function renderUser(user){
  document.getElementById('userName').textContent = user?.name || '—';
  document.getElementById('userEmail').textContent = user?.email || '—';
  const parts = [];
  if (user?.profile?.scdType) parts.push(`SCD: ${user.profile.scdType}`);
  if (user?.profile?.dob) parts.push(`DOB: ${new Date(user.profile.dob).toLocaleDateString()}`);
  document.getElementById('userMeta').textContent = parts.join(' • ') || '—';
  if (user?.profile?.photoUrl) setAvatar(user.profile.photoUrl);
}

function renderPainLogs(logs){
  const box = document.getElementById('painLogs');
  if (!logs || logs.length === 0){
    box.innerHTML = `<div class="empty">No pain logs yet.</div>`;
    return;
  }
  box.innerHTML = logs.slice(0,5).map(l => `
    <div class="item">
      <div><strong>${new Date(l.date).toLocaleDateString()}</strong> — Intensity ${l.intensity}</div>
      <div class="meta">${(l.location || '—')} • ${l.notes ? escapeHtml(l.notes) : 'No notes'}</div>
    </div>
  `).join('');
}

function renderCaretaker(c){
  const box = document.getElementById('caretaker');
  if (!c){
    box.innerHTML = `<div class="empty">No caretaker on file.</div>`;
    return;
  }
  box.innerHTML = `
    <div class="item">
      <div><strong>${escapeHtml(c.name || '—')}</strong> (${escapeHtml(c.relation || '—')})</div>
      <div class="meta">${escapeHtml(c.phone || '—')} • ${escapeHtml(c.email || '—')}</div>
      ${c.notes ? `<div class="meta">${escapeHtml(c.notes)}</div>` : ''}
    </div>
  `;
}

function escapeHtml(str=''){
  return String(str)
    .replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;')
    .replaceAll("'","&#039;");
}

/* ========= Logout ========= */
async function logout(){
  try{
    // If your server supports a logout endpoint that clears cookie:
    if (USE_COOKIES) {
      await fetch(`${API_BASE}/api/auth/logout`, { method:'POST', credentials:'include' }).catch(()=>{});
    }
  } finally {
    localStorage.removeItem('auth_token');
    window.location.assign(LOGIN_PAGE);
  }
}

/* ========= Boot ========= */
document.addEventListener('DOMContentLoaded', async () => {
  // Wire buttons/links
  document.getElementById('toMain').setAttribute('href', MAIN_PAGE);
  document.getElementById('viewMainDetails').setAttribute('href', MAIN_PAGE);
  document.getElementById('viewAllPainLogs').addEventListener('click', navigateToMain);
  document.getElementById('manageCaretaker').addEventListener('click', navigateToMain);
  document.getElementById('logoutBtn').addEventListener('click', logout);

  try{
    setStatus('Loading your data…');

    // ---- Adjust these endpoints to match your API ----
    // Current user
    const user = await apiGet('/api/auth/me');           // <- e.g., returns { name,email,profile:{...} }
    if (!user) return; // redirected if 401
    renderUser(user);

    // Recent pain logs (use your own query options/limit)
    const logs = await apiGet('/api/pain-logs?limit=5'); // <- or '/api/pain-logs'
    renderPainLogs(Array.isArray(logs) ? logs : (logs?.items || []));

    // Caretaker (single) or list; adjust path as needed
    // If your API returns an array, pick first or render multiple
    let caretaker = null;
    try {
      caretaker = await apiGet('/api/caregiver'); // <- change to '/api/caregivers' if that’s your route
    } catch (e) {
      // optional: fallback to list
      // const list = await apiGet('/api/caregivers');
      // caretaker = Array.isArray(list) ? list[0] : list;
    }
    renderCaretaker(caretaker);

    setStatus('Ready.');
  } catch (err){
    console.error(err);
    setStatus('Failed to load data. Please try again.');
  }
});
