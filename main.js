/* =========================================
   COMMIT-CREW — main.js
   Loader · Cursor · Scroll · Counter · Terminal
   ========================================= */

// ── LOADER ──────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loader-fill');
  const status = document.getElementById('loader-status');
  const statuses = [
    'Cloning into \'portfolio\'...',
    'Receiving objects: 100% (48/48)',
    'Resolving deltas: 100%',
    'Checking out files...',
    'Done. ✓'
  ];
  let pct = 0;
  let si = 0;
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 8;
    if (pct >= 100) { pct = 100; clearInterval(interval); }
    fill.style.width = pct + '%';
    si = Math.floor((pct / 100) * (statuses.length - 1));
    status.textContent = statuses[si];
    if (pct === 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        initPage();
      }, 400);
    }
  }, 120);
});

function initPage() {
  initCursor();
  initNav();
  initReveal();
  initCounters();
  initTerminal();
}

// ── CURSOR ───────────────────────────────────
function initCursor() {
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .k-card, .git-cmd').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(2)';
      dot.style.background = '#fff';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform = 'translate(-50%,-50%) scale(1)';
      dot.style.background = 'var(--green)';
    });
  });
}

// ── NAV SCROLL ───────────────────────────────
function initNav() {
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ── SCROLL REVEAL ────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = i * 80;
    obs.observe(el);
  });

  // Also animate member cards
  const cardObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.style.opacity = '1';
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.member-card').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity .5s ease ${i * 0.1}s, transform .5s ease ${i * 0.1}s, border-color .25s, box-shadow .25s`;
    cardObs.observe(el);
    // Simple trigger
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 200 + i * 100);
  });
}

// ── NUMBER COUNTERS ──────────────────────────
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = true;
        countUp(e.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric-num').forEach(el => obs.observe(el));
}

function countUp(el) {
  const target = parseInt(el.dataset.target);
  const dur = 1200;
  const step = 16;
  const increments = Math.ceil(dur / step);
  let count = 0;
  const timer = setInterval(() => {
    count++;
    el.textContent = Math.round((count / increments) * target);
    if (count >= increments) { el.textContent = target; clearInterval(timer); }
  }, step);
}

// ── TERMINAL TYPEWRITER ──────────────────────
function initTerminal() {
  const cmds = [
    'git status',
    'git checkout -b feat/new-member',
    'git push origin HEAD',
    'gh pr create --fill'
  ];
  let ci = 0;
  const typingEl = document.getElementById('typing-cmd');
  if (!typingEl) return;

  function typeCmd(cmd) {
    let i = 0;
    typingEl.textContent = '';
    const t = setInterval(() => {
      typingEl.textContent += cmd[i++];
      if (i >= cmd.length) {
        clearInterval(t);
        setTimeout(() => eraseCmd(cmd), 1800);
      }
    }, 65);
  }
  function eraseCmd(cmd) {
    let i = cmd.length;
    const t = setInterval(() => {
      typingEl.textContent = cmd.slice(0, --i);
      if (i <= 0) {
        clearInterval(t);
        ci = (ci + 1) % cmds.length;
        setTimeout(() => typeCmd(cmds[ci]), 400);
      }
    }, 35);
  }

  setTimeout(() => typeCmd(cmds[0]), 800);
}

// ── GIT TABS ─────────────────────────────────
document.querySelectorAll('.git-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.git-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.git-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// ── COPY COMMANDS ─────────────────────────────
document.querySelectorAll('.git-cmd').forEach(cmd => {
  cmd.addEventListener('click', () => {
    const text = cmd.dataset.copy;
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const btn = cmd.querySelector('.cmd-copy');
      btn.textContent = '✓ Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
    }).catch(() => {});
  });
});

console.log('%c Commit-Crew Portfolio 🚀', 'background:#080810; color:#7fff6e; font-family:monospace; font-size:14px; padding:8px 16px; border:1px solid #7fff6e; border-radius:4px;');
console.log('%c https://github.com/Sarthak16082004/Commit-Crew', 'color:#6eb5ff; font-family:monospace; font-size:12px;');
