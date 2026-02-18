/* =========================================
   NEXDEV — canvas.js
   Hero particle field + Branch visualizer
   ========================================= */

// ── HERO CANVAS PARTICLES ────────────────────
(function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', () => { resize(); initParticles(); });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.7 ? '#7fff6e' : Math.random() > 0.5 ? '#6eb5ff' : '#ffffff';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initParticles() {
    const count = Math.floor((W * H) / 12000);
    particles = Array.from({ length: count }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(127,255,110,0.04)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  initParticles();
  animate();
})();

// ── BRANCH VISUALIZER ────────────────────────
(function initBranchCanvas() {
  const canvas = document.getElementById('branch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    draw();
  }

  const branches = [
    { name: 'main',           color: '#7fff6e', y: 0.5,  commits: [0.05, 0.28, 0.55, 0.72, 0.90, 0.97] },
    { name: 'feat/alex-chen',  color: '#6eb5ff', y: 0.22, commits: [0.12, 0.22, 0.32], start: 0.08, end: 0.55 },
    { name: 'feat/maya-patel', color: '#7fff6e', y: 0.72, commits: [0.38, 0.48, 0.58], start: 0.30, end: 0.72 },
    { name: 'feat/jordan-kim', color: '#ff6eb5', y: 0.35, commits: [0.62, 0.70],        start: 0.58, end: 0.90 },
    { name: 'feat/sam-rivera', color: '#ffb86e', y: 0.65, commits: [0.15, 0.25],        start: 0.10, end: 0.28 },
  ];

  let progress = 0;

  function draw() {
    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    branches.forEach((branch, bi) => {
      const y = branch.y * H;
      const col = branch.color;

      if (bi === 0) {
        // main branch — full horizontal line
        ctx.beginPath();
        ctx.moveTo(W * 0.02, y);
        ctx.lineTo(W * (0.02 + 0.96 * progress), y);
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;
      } else {
        const startX = branch.start * W;
        const endX = branch.end * W;
        const visEnd = Math.min(endX, W * (0.02 + 0.96 * progress));

        if (startX > visEnd) return;

        // Fork curve from main to branch
        const mainY = branches[0].y * H;
        ctx.beginPath();
        ctx.moveTo(startX, mainY);
        ctx.bezierCurveTo(startX + 20, mainY, startX + 20, y, startX + 40, y);
        ctx.lineTo(Math.min(visEnd - 20, visEnd), y);
        if (visEnd >= endX - 5) {
          // Merge back
          ctx.bezierCurveTo(visEnd, y, visEnd + 10, mainY, visEnd + 30, mainY);
        }
        ctx.strokeStyle = col;
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // Commits
      branch.commits.forEach(cx => {
        const x = cx * W;
        const bY = branch.y * H;
        if (x > W * (0.02 + 0.96 * progress)) return;

        // Glow
        const grd = ctx.createRadialGradient(x, bY, 0, x, bY, 14);
        grd.addColorStop(0, col + '40');
        grd.addColorStop(1, 'transparent');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(x, bY, 14, 0, Math.PI * 2);
        ctx.fill();

        // Circle
        ctx.beginPath();
        ctx.arc(x, bY, 5, 0, Math.PI * 2);
        ctx.fillStyle = col;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(x, bY, 5, 0, Math.PI * 2);
        ctx.strokeStyle = col;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      // Label
      if (branches[0].commits[0] * W < W * (0.02 + 0.96 * progress)) {
        ctx.font = `500 11px "JetBrains Mono", monospace`;
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.8;
        ctx.fillText(branch.name, W * 0.015, branch.y * H - 10);
        ctx.globalAlpha = 1;
      }
    });
  }

  function animate() {
    if (progress < 1) {
      progress += 0.006;
      draw();
      requestAnimationFrame(animate);
    }
  }

  window.addEventListener('resize', resize);
  resize();

  // Start animation when in view
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { progress = 0; animate(); obs.disconnect(); }
    });
  }, { threshold: 0.3 });
  obs.observe(canvas);
})();
