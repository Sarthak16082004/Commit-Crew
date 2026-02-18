/* =========================================
   NEXDEV — interactions.js
   Kanban Drag & Drop + CI/CD Simulator
   ========================================= */

// ── KANBAN DRAG & DROP ───────────────────────
let dragId = null;

window.drag = function(e) {
  dragId = e.target.id;
  e.target.classList.add('dragging');
};

document.querySelectorAll('.k-card').forEach(card => {
  card.addEventListener('dragend', () => card.classList.remove('dragging'));
});

window.allowDrop = function(e) {
  e.preventDefault();
  e.currentTarget.classList.add('drag-over');
};

document.querySelectorAll('.kanban-col').forEach(col => {
  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
});

window.drop = function(e, colId) {
  e.preventDefault();
  e.currentTarget.classList.remove('drag-over');
  if (!dragId) return;

  const card = document.getElementById(dragId);
  const targetCards = e.currentTarget.querySelector('.k-cards');
  if (card && targetCards) {
    targetCards.appendChild(card);
    // Update done styling
    card.classList.toggle('done', colId === 'done');
    updateCounts();
    showToast(getToastMsg(colId));
  }
  dragId = null;
};

function updateCounts() {
  ['backlog','inprogress','review','done'].forEach(id => {
    const col = document.getElementById('col-' + id);
    const count = document.getElementById('count-' + id);
    if (col && count) count.textContent = col.querySelectorAll('.k-card').length;
  });
}

function getToastMsg(col) {
  const msgs = {
    backlog: '📋 Moved to Backlog',
    inprogress: '⚡ Moved to In Progress',
    review: '🔍 Ready for Review',
    done: '✅ Marked as Done!'
  };
  return msgs[col] || 'Card moved';
}

function showToast(msg) {
  let toast = document.getElementById('kanban-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'kanban-toast';
    toast.style.cssText = `
      position:fixed; bottom:2rem; right:2rem; z-index:500;
      background:#141420; border:1px solid rgba(127,255,110,.3);
      color:#f0f0f8; padding:.8rem 1.5rem; border-radius:8px;
      font-family:'JetBrains Mono',monospace; font-size:12px;
      transform:translateY(20px); opacity:0;
      transition:all .25s ease;
      box-shadow:0 8px 30px rgba(0,0,0,.4);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.style.transform = 'translateY(0)';
  toast.style.opacity = '1';
  clearTimeout(toast._t);
  toast._t = setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
  }, 2500);
}

// ── CI/CD PIPELINE SIMULATOR ─────────────────
let pipelineRunning = false;

window.runPipeline = async function() {
  if (pipelineRunning) return;
  pipelineRunning = true;
  document.getElementById('run-btn').disabled = true;
  document.getElementById('run-btn').innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation:spin360 1s linear infinite"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg> <span>Running...</span>';

  const steps = ['pipe1','pipe2','pipe3','pipe4'];
  const lines = document.querySelectorAll('.pipe-flow');

  // Reset first
  resetPipeline(false);
  await sleep(300);

  for (let i = 0; i < steps.length; i++) {
    const step = document.getElementById(steps[i]);
    const statusEl = step.querySelector('.pipe-status');

    // Animate flow line before this step (except first)
    if (i > 0 && lines[i-1]) {
      lines[i-1].classList.add('flowing');
      await sleep(600);
    }

    // Start step
    step.classList.add('running');
    statusEl.className = 'pipe-status running';
    statusEl.textContent = 'Running...';
    step.querySelector('.pipe-icon').style.animation = 'none';

    await sleep(1000 + Math.random() * 800);

    // Complete step
    step.classList.remove('running');
    step.classList.add('success');
    statusEl.className = 'pipe-status success';
    statusEl.textContent = i === steps.length - 1 ? '🌐 Live!' : '✓ Passed';
  }

  document.getElementById('run-btn').style.display = 'none';
  document.getElementById('reset-btn').style.display = 'inline-flex';
  showToast('🚀 Deployed to GitHub Pages!');
  pipelineRunning = false;
};

window.resetPipeline = function(showButtons = true) {
  pipelineRunning = false;
  ['pipe1','pipe2','pipe3','pipe4'].forEach(id => {
    const s = document.getElementById(id);
    s.className = 'pipe-step';
    const st = s.querySelector('.pipe-status');
    st.className = 'pipe-status idle';
    st.textContent = 'Waiting';
  });
  document.querySelectorAll('.pipe-flow').forEach(l => {
    l.classList.remove('flowing');
    l.style.transform = 'translateX(-100%)';
  });
  if (showButtons) {
    document.getElementById('run-btn').style.display = 'inline-flex';
    document.getElementById('run-btn').disabled = false;
    document.getElementById('run-btn').innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg><span>Simulate Pipeline Run</span>';
    document.getElementById('reset-btn').style.display = 'none';
  }
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// CSS for spin animation
const style = document.createElement('style');
style.textContent = '@keyframes spin360 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }';
document.head.appendChild(style);
