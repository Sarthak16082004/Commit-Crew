# CommitCrew — Team Portfolio Website

> A production-grade team portfolio demonstrating Git branching strategy, Agile workflow, interactive Kanban board, and CI/CD automation via GitHub Actions.

[![CI/CD Pipeline](https://github.com/YOUR-USERNAME/commitcrew/actions/workflows/deploy.yml/badge.svg)](https://github.com/YOUR-USERNAME/commitcrew/actions)
[![GitHub Pages](https://img.shields.io/badge/hosted-GitHub%20Pages-green)](https://YOUR-USERNAME.github.io/commitcrew)

---

## 🌐 Live Demo
**[https://Sarthak16082004.github.io/Commit-Crew](https://sarthak16082004.github.io/Commit-Crew/)**

---

## ✨ Features

| Feature | Implementation |
|---|---|
| Git Branch Workflow | Each member: `feat/name` → PR → merge to `main` |
| Interactive Kanban | Drag & drop board (simulates GitHub Projects) |
| CI/CD Pipeline | GitHub Actions → validate → auto-deploy |
| Git Cheatsheet | Tabbed, copy-to-clipboard reference guide |
| Branch Visualizer | Animated canvas showing real Git branch structure |
| CI/CD Simulator | Animated step-by-step pipeline walkthrough |
| Custom cursor | Smooth animated cursor with hover effects |
| Animated loader | Git-themed loading screen on page entry |
| Particle background | Canvas particle field on hero section |
| Animated counters | Stats count up on scroll into view |
| Terminal typewriter | Live-typing terminal commands in hero |
| Scroll reveal | Elements animate in as you scroll |
| Responsive | Fully mobile-optimized |

---

## 🛠 Tech Stack
**No frameworks. No build tools. Pure web platform.**

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JavaScript** — Canvas API, IntersectionObserver, Drag & Drop API, Clipboard API
- **GitHub Actions** — CI/CD (HTMLHint + Stylelint + GitHub Pages deploy)

---

## 🚀 Setup & Run

### Prerequisites
- [Git for Windows](https://git-scm.com/download/win)
- [Node.js LTS](https://nodejs.org) (for dev server + linting)
- [VS Code](https://code.visualstudio.com) (recommended)

### Steps

```bash
# 1. Clone
git clone https://github.com/YOUR-USERNAME/commitcrew.git
cd commitcrew

# 2. Install dev tools
npm install

# 3. Open in browser (with live reload)
npm start
# → Opens at http://localhost:3000
```

> **Windows tip:** If `npm` isn't found, open a new terminal after installing Node.js.

---

## ⎇ Git Workflow

### How each member contributes

```bash
# 1. Get latest main
git checkout main
git pull origin main

# 2. Create your branch
git checkout -b feat/your-name

# 3. Edit members/your-name.html
# Add your skills, projects, bio

# 4. Commit (use Conventional Commits!)
git add .
git commit -m "feat: add sarah fullstack portfolio page"

# 5. Push
git push origin feat/your-name

# 6. Open Pull Request on GitHub
# → Fill in the PR template
# → Request a review
# → Merge after approval
```

### Branch naming convention
```
feat/member-name     ← new member page
fix/broken-nav       ← bug fix
style/card-hover     ← CSS changes
docs/update-readme   ← documentation
```

### Commit message convention (Conventional Commits)
```
feat:   new feature or page section
fix:    bug fix
style:  CSS / design changes (no logic change)
docs:   README or comment updates
chore:  config, CI, maintenance
```

---

## 📋 Agile Workflow

### Sprint Structure (2-week sprints)
```
Monday     → Sprint Planning: pick tasks from backlog, assign issues
Daily      → 15-min standup: Done? Doing? Blocked?
End of wk1 → Mid-sprint check: on track?
Friday wk2 → Sprint Review: demo to stakeholders
Friday wk2 → Retrospective: what went well / improve
```

### GitHub Projects Kanban Columns
```
📋 Backlog      → Ideas and future tasks
⚡ In Progress  → Currently being worked on  
🔍 In Review    → PR opened, waiting for approval
✅ Done         → Merged to main and deployed
```

### Linking issues to PRs
In your PR description, add:
```
Closes #42
```
This auto-closes the issue when the PR merges.

---

## 🔁 CI/CD Pipeline

Every `git push` triggers `.github/workflows/deploy.yml`:

```
git push
    │
    ▼
[Trigger] GitHub Actions starts
    │
    ▼
[Job 1] 🔍 Validate (all branches)
    ├── HTMLHint: checks HTML syntax
    └── Stylelint: checks CSS quality
    │
    ▼ (only if on main branch)
[Job 2] 🚀 Deploy
    ├── Upload files to GitHub Pages
    └── 🌐 Site live at your GitHub Pages URL
```

### Setup GitHub Pages
1. Push code to GitHub
2. Go to **Settings → Pages**
3. Source: **GitHub Actions**
4. Save — next push to `main` deploys automatically!

---

## 📁 Project Structure

```
commitcrew/
├── index.html                    ← Homepage
├── css/
│   └── style.css                 ← All styles (~700 lines)
├── js/
│   ├── main.js                   ← Loader, cursor, counters, tabs, copy
│   ├── canvas.js                 ← Particle hero + branch visualizer
│   └── interactions.js           ← Kanban drag-drop + pipeline simulator
├── members/
│   ├── alex.html                 ← Alex (feat/alex-chen)
│   ├── maya.html                 ← Maya (feat/maya-patel)
│   ├── jordan.html               ← Jordan (feat/jordan-kim)
│   └── sam.html                  ← Sam (feat/sam-rivera)
├── .github/
│   ├── workflows/deploy.yml      ← CI/CD pipeline
│   └── pull_request_template.md  ← PR checklist
├── .htmlhintrc                   ← HTML linting rules
├── .stylelintrc                  ← CSS linting rules
├── .gitignore
├── package.json
└── README.md
```

---

## 👥 Team Members

| # | Name | Role | Branch | Page |
|---|---|---|---|---|
| 01 | Alex Chen | Frontend Engineer | `feat/alex-chen` | [View →](members/alex.html) |
| 02 | Maya Patel | Backend Engineer | `feat/maya-patel` | [View →](members/maya.html) |
| 03 | Jordan Kim | Fullstack Engineer | `feat/jordan-kim` | [View →](members/jordan.html) |
| 04 | Sam Rivera | DevOps Engineer | `feat/sam-rivera` | [View →](members/sam.html) |

---

## ➕ Adding Yourself

1. `git checkout -b feat/your-name`
2. Copy `members/alex.html` → `members/your-name.html`
3. Update name, role, bio, skills, projects
4. Add your card to `index.html` team grid
5. Open a Pull Request and fill in the template

---

## 📜 License
MIT — Use freely as a portfolio template or learning resource.
