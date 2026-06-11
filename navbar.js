/* ════════════════════════════════════════════════════════════════
   EAR CANDY — Smart Sidebar Navbar
   Auto-switches between logged-out (Login/Sign Up) and
   logged-in (profile avatar) based on Supabase auth state.

   Requires on the page, in this order:
     <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
     <script src="auth.js"></script>
     <script src="navbar.js"></script>
═══════════════════════════════════════════════════════════════ */
(function () {
  const SIDEBAR_WIDTH = 92;

  const style = document.createElement('style');
  style.textContent = `
    :root { --ec-nav-width: ${SIDEBAR_WIDTH}px; }
    body { padding-left: var(--ec-nav-width) !important; }

    .ec-sidebar {
      position: fixed; top: 0; left: 0; bottom: 0;
      width: var(--ec-nav-width);
      background: #0c0c14; border-right: 1.5px solid #1e1e2e;
      display: flex; flex-direction: column; align-items: center; justify-content: space-between;
      padding: 18px 8px; z-index: 1000; font-family: 'DM Sans', sans-serif;
    }
    .ec-top { display: flex; flex-direction: column; gap: 10px; width: 100%; align-items: center; }

    .ec-btn {
      width: 100%; border: none; border-radius: 12px; padding: 10px 4px;
      font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600;
      letter-spacing: 0.04em; cursor: pointer; text-decoration: none; text-align: center;
      display: flex; flex-direction: column; align-items: center; gap: 4px;
      transition: all 0.2s ease; line-height: 1.1;
    }
    .ec-btn-icon { font-size: 16px; }

    .ec-signup { background: linear-gradient(135deg, #ff2d55, #ff6b35); color: #fff; box-shadow: 0 4px 14px rgba(255,45,85,0.3); }
    .ec-signup:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,45,85,0.45); }
    .ec-login { background: #1a1a26; color: #9a9ab0; border: 1.5px solid #2a2a3a; }
    .ec-login:hover { border-color: #6b6b85; color: #f0f0f8; }

    .ec-games-wrap { width: 100%; position: relative; }
    .ec-games-btn { width: 100%; background: #14141f; color: #9a9ab0; border: 1.5px solid #2a2a3a; }
    .ec-games-btn:hover { border-color: #ff2d55; color: #ff2d55; }

    .ec-dropdown {
      position: absolute; left: calc(100% + 8px); top: 0; width: 200px;
      background: #14141f; border: 1.5px solid #2a2a3a; border-radius: 14px;
      padding: 8px; display: none; flex-direction: column; gap: 4px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    }
    .ec-dropdown.open { display: flex; animation: ecFade 0.2s ease both; }
    @keyframes ecFade { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }

    .ec-drop-item {
      display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px;
      font-size: 13px; font-weight: 500; color: #f0f0f8; text-decoration: none; transition: background 0.15s;
    }
    .ec-drop-item:hover { background: #1f1f2e; }
    .ec-drop-item.locked { color: #55556a; cursor: not-allowed; }
    .ec-drop-item.locked:hover { background: transparent; }
    .ec-drop-emoji { font-size: 16px; }
    .ec-drop-tag { margin-left: auto; font-size: 9px; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 7px; border-radius: 20px; }
    .ec-tag-live { background: rgba(48,209,88,0.15); color: #30d158; }
    .ec-tag-soon { background: rgba(255,255,255,0.06); color: #55556a; }

    .ec-profile-wrap { width: 100%; position: relative; display: flex; justify-content: center; }
    .ec-avatar {
      width: 48px; height: 48px; border-radius: 50%; cursor: pointer;
      border: 2px solid #2a2a3a; background: linear-gradient(135deg, #ff2d55, #ff6b35);
      display: flex; align-items: center; justify-content: center;
      font-family: 'DM Sans', sans-serif; font-weight: 700; font-size: 17px; color: #fff;
      overflow: hidden; transition: all 0.2s ease;
    }
    .ec-avatar:hover { border-color: #ff2d55; transform: scale(1.06); }
    .ec-avatar img { width: 100%; height: 100%; object-fit: cover; }

    .ec-profile-menu {
      position: absolute; left: calc(100% + 8px); top: 0; width: 180px;
      background: #14141f; border: 1.5px solid #2a2a3a; border-radius: 14px;
      padding: 8px; display: none; flex-direction: column; gap: 4px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    }
    .ec-profile-menu.open { display: flex; animation: ecFade 0.2s ease both; }
    .ec-profile-name {
      padding: 8px 12px 10px; font-size: 13px; font-weight: 600; color: #f0f0f8;
      border-bottom: 1px solid #2a2a3a; margin-bottom: 4px;
    }
    .ec-profile-name small { display: block; color: #55556a; font-weight: 400; font-size: 11px; margin-top: 2px; }
    .ec-profile-item {
      display: flex; align-items: center; gap: 10px; padding: 9px 12px; border-radius: 10px;
      font-size: 13px; font-weight: 500; color: #f0f0f8; text-decoration: none;
      transition: background 0.15s; cursor: pointer;
    }
    .ec-profile-item:hover { background: #1f1f2e; }
    .ec-profile-item.logout { color: #ff453a; }

    .ec-logo { display: flex; flex-direction: column; align-items: center; gap: 1px; user-select: none; }
    .ec-logo-letter { font-family: 'Bebas Neue', sans-serif; font-size: 28px; line-height: 1; letter-spacing: 0.05em; color: #ff2d55; }
    .ec-logo-gap { height: 12px; }

    .ec-return { background: #14141f; color: #9a9ab0; border: 1.5px solid #2a2a3a; width: 100%; }
    .ec-return:hover { border-color: #f0f0f8; color: #f0f0f8; transform: translateY(-2px); }

    @media (max-width: 560px) {
      :root { --ec-nav-width: 72px; }
      .ec-logo-letter { font-size: 22px; }
      .ec-btn { font-size: 9px; }
      .ec-avatar { width: 40px; height: 40px; font-size: 14px; }
    }
  `;
  document.head.appendChild(style);

  const gamesHTML = `
    <div class="ec-games-wrap">
      <button class="ec-btn ec-games-btn" id="ec-games-toggle"><span class="ec-btn-icon">🎮</span>Games</button>
      <div class="ec-dropdown" id="ec-dropdown">
        <a href="name-that-tune.html" class="ec-drop-item">
          <span class="ec-drop-emoji">🎵</span> Name That Tune
          <span class="ec-drop-tag ec-tag-live">Live</span>
        </a>
        <div class="ec-drop-item locked"><span class="ec-drop-emoji">🔒</span> Coming Soon <span class="ec-drop-tag ec-tag-soon">Soon</span></div>
        <div class="ec-drop-item locked"><span class="ec-drop-emoji">🔒</span> Coming Soon <span class="ec-drop-tag ec-tag-soon">Soon</span></div>
      </div>
    </div>`;

  const logoHTML = `
    <div class="ec-logo">
      <span class="ec-logo-letter">E</span><span class="ec-logo-letter">A</span><span class="ec-logo-letter">R</span>
      <span class="ec-logo-gap"></span>
      <span class="ec-logo-letter">C</span><span class="ec-logo-letter">A</span><span class="ec-logo-letter">N</span><span class="ec-logo-letter">D</span><span class="ec-logo-letter">Y</span>
    </div>`;

  const returnHTML = `<a href="index.html" class="ec-btn ec-return"><span class="ec-btn-icon">←</span>Return</a>`;

  function initials(name) {
    return (name || 'P').trim().split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase() || 'P';
  }

  function buildSidebar(loggedIn, username) {
    const nav = document.createElement('div');
    nav.className = 'ec-sidebar';

    if (loggedIn) {
      nav.innerHTML = `
        <div class="ec-top">
          ${gamesHTML}
          <div class="ec-profile-wrap">
            <div class="ec-avatar" id="ec-avatar">${initials(username)}</div>
            <div class="ec-profile-menu" id="ec-profile-menu">
              <div class="ec-profile-name">${username || 'Player'}<small>Signed in</small></div>
              <a href="profile.html" class="ec-profile-item"><span>👤</span> My Profile</a>
              <a href="stats.html" class="ec-profile-item"><span>📊</span> My Stats</a>
              <div class="ec-profile-item logout" id="ec-logout"><span>↩</span> Log Out</div>
            </div>
          </div>
        </div>
        ${logoHTML}
        ${returnHTML}`;
    } else {
      nav.innerHTML = `
        <div class="ec-top">
          ${gamesHTML}
          <a href="signup.html" class="ec-btn ec-signup"><span class="ec-btn-icon">✦</span>Sign Up</a>
          <a href="login.html" class="ec-btn ec-login"><span class="ec-btn-icon">→]</span>Login</a>
        </div>
        ${logoHTML}
        ${returnHTML}`;
    }

    document.body.appendChild(nav);

    const gamesToggle = document.getElementById('ec-games-toggle');
    const gamesDropdown = document.getElementById('ec-dropdown');
    gamesToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      gamesDropdown.classList.toggle('open');
      const pm = document.getElementById('ec-profile-menu');
      if (pm) pm.classList.remove('open');
    });

    if (loggedIn) {
      const avatar = document.getElementById('ec-avatar');
      const menu = document.getElementById('ec-profile-menu');
      avatar.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.classList.toggle('open');
        gamesDropdown.classList.remove('open');
      });
      document.getElementById('ec-logout').addEventListener('click', async () => {
        if (typeof ecLogOut === 'function') await ecLogOut();
        window.location.href = 'index.html';
      });
    }

    document.addEventListener('click', () => {
      gamesDropdown.classList.remove('open');
      const pm = document.getElementById('ec-profile-menu');
      if (pm) pm.classList.remove('open');
    });
  }

  async function render() {
    let loggedIn = false;
    let username = null;
    try {
      if (typeof ecCurrentUser === 'function') {
        const user = await ecCurrentUser();
        if (user) {
          loggedIn = true;
          username = (typeof ecCurrentUsername === 'function') ? await ecCurrentUsername() : (user.user_metadata && user.user_metadata.username) || 'Player';
        }
      }
    } catch (e) {
      console.warn('Navbar auth check failed, showing logged-out bar:', e);
    }
    buildSidebar(loggedIn, username);
  }

  render();
})();
