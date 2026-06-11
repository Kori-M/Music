/* ════════════════════════════════════════════════════════════════
   EAR CANDY — Reusable Sidebar Navbar
   Drop into any page with:  <script src="navbar.js"></script>
   It injects a fixed, full-height left sidebar and shifts page
   content right so nothing is covered.
═══════════════════════════════════════════════════════════════ */
(function () {
  const SIDEBAR_WIDTH = 92; // px

  // ── Inject styles ──
  const style = document.createElement('style');
  style.textContent = `
    :root { --ec-nav-width: ${SIDEBAR_WIDTH}px; }

    /* push page content right so the sidebar never covers it */
    body { padding-left: var(--ec-nav-width) !important; }

    .ec-sidebar {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: var(--ec-nav-width);
      background: #0c0c14;
      border-right: 1.5px solid #1e1e2e;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 18px 8px;
      z-index: 1000;
      font-family: 'DM Sans', sans-serif;
    }

    /* ── TOP: signup + login + games ── */
    .ec-top { display: flex; flex-direction: column; gap: 10px; width: 100%; align-items: center; }

    .ec-btn {
      width: 100%;
      border: none;
      border-radius: 12px;
      padding: 10px 4px;
      font-family: 'DM Sans', sans-serif;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      transition: all 0.2s ease;
      line-height: 1.1;
    }
    .ec-btn-icon { font-size: 16px; }

    .ec-signup {
      background: linear-gradient(135deg, #ff2d55, #ff6b35);
      color: #fff;
      box-shadow: 0 4px 14px rgba(255,45,85,0.3);
    }
    .ec-signup:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,45,85,0.45); }

    .ec-login {
      background: #1a1a26;
      color: #9a9ab0;
      border: 1.5px solid #2a2a3a;
    }
    .ec-login:hover { border-color: #6b6b85; color: #f0f0f8; }

    /* ── Games dropdown ── */
    .ec-games-wrap { width: 100%; position: relative; }
    .ec-games-btn {
      width: 100%;
      background: #14141f;
      color: #9a9ab0;
      border: 1.5px solid #2a2a3a;
    }
    .ec-games-btn:hover { border-color: #ff2d55; color: #ff2d55; }

    .ec-dropdown {
      position: absolute;
      left: calc(100% + 8px);
      top: 0;
      width: 200px;
      background: #14141f;
      border: 1.5px solid #2a2a3a;
      border-radius: 14px;
      padding: 8px;
      display: none;
      flex-direction: column;
      gap: 4px;
      box-shadow: 0 12px 40px rgba(0,0,0,0.5);
    }
    .ec-dropdown.open { display: flex; animation: ecFade 0.2s ease both; }
    @keyframes ecFade { from { opacity:0; transform:translateX(-6px); } to { opacity:1; transform:translateX(0); } }

    .ec-drop-item {
      display: flex; align-items: center; gap: 10px;
      padding: 10px 12px;
      border-radius: 10px;
      font-size: 13px; font-weight: 500;
      color: #f0f0f8;
      text-decoration: none;
      transition: background 0.15s;
    }
    .ec-drop-item:hover { background: #1f1f2e; }
    .ec-drop-item.locked { color: #55556a; cursor: not-allowed; }
    .ec-drop-item.locked:hover { background: transparent; }
    .ec-drop-emoji { font-size: 16px; }
    .ec-drop-tag {
      margin-left: auto; font-size: 9px; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 2px 7px; border-radius: 20px;
    }
    .ec-tag-live { background: rgba(48,209,88,0.15); color: #30d158; }
    .ec-tag-soon { background: rgba(255,255,255,0.06); color: #55556a; }

    /* ── MIDDLE: vertical logo ── */
    .ec-logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1px;
      user-select: none;
    }
    .ec-logo-letter {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 28px;
      line-height: 1;
      letter-spacing: 0.05em;
      color: #ffffff;
    }
    .ec-logo-gap { height: 12px; }

    /* ── BOTTOM: return ── */
    .ec-return {
      background: #14141f;
      color: #9a9ab0;
      border: 1.5px solid #2a2a3a;
      width: 100%;
    }
    .ec-return:hover { border-color: #f0f0f8; color: #f0f0f8; transform: translateY(-2px); }

    @media (max-width: 560px) {
      :root { --ec-nav-width: 72px; }
      .ec-logo-letter { font-size: 22px; }
      .ec-btn { font-size: 9px; }
    }
  `;
  document.head.appendChild(style);

  // ── Build sidebar ──
  const nav = document.createElement('div');
  nav.className = 'ec-sidebar';
  nav.innerHTML = `
    <!-- TOP -->
    <div class="ec-top">
      <div class="ec-games-wrap">
        <button class="ec-btn ec-games-btn" id="ec-games-toggle">
          <span class="ec-btn-icon">🎮</span>Games
        </button>
        <div class="ec-dropdown" id="ec-dropdown">
          <a href="name-that-tune.html" class="ec-drop-item">
            <span class="ec-drop-emoji">🎵</span> Name That Tune
            <span class="ec-drop-tag ec-tag-live">Live</span>
          </a>
          <div class="ec-drop-item locked">
            <span class="ec-drop-emoji">🔒</span> Coming Soon
            <span class="ec-drop-tag ec-tag-soon">Soon</span>
          </div>
          <div class="ec-drop-item locked">
            <span class="ec-drop-emoji">🔒</span> Coming Soon
            <span class="ec-drop-tag ec-tag-soon">Soon</span>
          </div>
        </div>
      </div>
      <a href="signup.html" class="ec-btn ec-signup">
        <span class="ec-btn-icon">✦</span>Sign Up
      </a>
      <a href="login.html" class="ec-btn ec-login">
        <span class="ec-btn-icon">→]</span>Login
      </a>
    </div>

    <!-- MIDDLE: vertical logo -->
    <div class="ec-logo">
      <span class="ec-logo-letter">E</span>
      <span class="ec-logo-letter">A</span>
      <span class="ec-logo-letter">R</span>
      <span class="ec-logo-gap"></span>
      <span class="ec-logo-letter">C</span>
      <span class="ec-logo-letter">A</span>
      <span class="ec-logo-letter">N</span>
      <span class="ec-logo-letter">D</span>
      <span class="ec-logo-letter">Y</span>
    </div>

    <!-- BOTTOM: return -->
    <a href="index.html" class="ec-btn ec-return">
      <span class="ec-btn-icon">←</span>Return
    </a>
  `;
  document.body.appendChild(nav);

  // ── Dropdown toggle ──
  const toggle = document.getElementById('ec-games-toggle');
  const dropdown = document.getElementById('ec-dropdown');
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => dropdown.classList.remove('open'));
})();
