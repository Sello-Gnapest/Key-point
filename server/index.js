* {
  box-sizing: border-box;
}

:root {
  --bg: #f4f5f8;
  --panel: rgba(255, 255, 255, 0.88);
  --panel-strong: #ffffff;
  --primary: #1b4d8a;
  --primary-soft: #dfeafc;
  --ink: #11233b;
  --muted: #596c86;
  --line: rgba(17, 35, 59, 0.08);
  --success: #1d8f72;
  --warning: #d77b2e;
  --danger: #b33a3a;
  --shadow: 0 18px 45px rgba(23, 34, 61, 0.08);
}

html {
  color-scheme: light;
}

body {
  margin: 0;
  background: linear-gradient(180deg, #ecf1f8 0%, #f8f8fa 100%);
  color: var(--ink);
  font-family: 'Manrope', sans-serif;
}

button, input, textarea, select {
  font: inherit;
}

button {
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

input, select, textarea {
  width: 100%;
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.74);
  border-radius: 12px;
  padding: 0.8rem 0.95rem;
  color: var(--ink);
}

textarea {
  min-height: 88px;
  resize: vertical;
}

.app-shell {
  max-width: 1360px;
  margin: 0 auto;
  padding: 2.25rem 1.25rem 4rem;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 2rem;
}

.eyebrow {
  margin: 0 0 0.2rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  font-size: 0.74rem;
}

h1 {
  margin: 0;
  font-size: clamp(2.1rem, 4vw, 3rem);
}

.header-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.primary,
.secondary,
.ghost,
.danger,
.text-button {
  padding: 0.8rem 1rem;
  font-weight: 700;
}

.primary {
  background: var(--primary);
  color: white;
  box-shadow: var(--shadow);
}

.secondary {
  background: rgba(27, 77, 138, 0.08);
  color: var(--primary);
}

.ghost {
  background: rgba(83, 107, 137, 0.08);
  color: var(--ink);
}

.danger {
  background: rgba(179, 58, 58, 0.08);
  color: var(--danger);
}

.text-button {
  background: transparent;
  padding: 0;
  color: var(--primary);
}

.stats-grid,
.forms-grid,
.workspace-grid,
.lower-grid {
  display: grid;
  gap: 1.1rem;
}

.stats-grid {
  grid-template-columns: repeat(4, minmax(180px, 1fr));
  margin-bottom: 1.2rem;
}

.forms-grid {
  grid-template-columns: repeat(3, minmax(220px, 1fr));
  margin-bottom: 1.2rem;
}

.workspace-grid,
.lower-grid {
  grid-template-columns: 1.4fr 1fr;
  margin-bottom: 1.2rem;
}

.stat-card,
.panel {
  background: var(--panel);
  border: 1px solid var(--line);
  border-radius: 20px;
  box-shadow: var(--shadow);
  backdrop-filter: blur(12px);
}

.stat-card {
  padding: 1.15rem 1.2rem;
}

.stat-card span {
  display: block;
  color: var(--muted);
  font-size: 0.82rem;
  margin-bottom: 0.4rem;
}

.stat-card strong {
  font-size: clamp(1.6rem, 2vw, 2.3rem);
}

.panel {
  padding: 1.2rem;
}

.panel form {
  display: grid;
  gap: 0.8rem;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.section-heading h3,
.panel h3 {
  margin: 0;
}

.section-heading span {
  color: var(--muted);
  font-size: 0.8rem;
}

.stack {
  display: grid;
  gap: 0.9rem;
}

.property-card,
.person-card,
.key-detail-card,
.activity-item {
  border: 1px solid var(--line);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.55);
}

.property-card,
.person-card,
.key-detail-card {
  padding: 0.9rem 1rem;
}

.property-header,
.card-actions,
.detail-row,
.list-row,
.activity-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
}

.property-header {
  margin-bottom: 0.7rem;
}

h4 {
  margin: 0;
}

small {
  color: var(--muted);
}

.mini-list {
  display: grid;
  gap: 0.6rem;
}

.list-row {
  border-top: 1px solid var(--line);
  padding-top: 0.6rem;
  font-size: 0.9rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  padding: 0.35rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

.badge.available {
  background: rgba(29, 143, 114, 0.12);
  color: var(--success);
}

.badge.in-use {
  background: rgba(215, 123, 46, 0.12);
  color: var(--warning);
}

.empty-state {
  margin: 0;
  color: var(--muted);
  font-size: 0.9rem;
}

.activity-panel {
  margin-top: 1rem;
}

.activity-list {
  display: grid;
  gap: 0.9rem;
}

.activity-item {
  padding: 0.9rem 1rem;
}

.activity-item strong {
  display: block;
  margin-bottom: 0.2rem;
}

.activity-item small {
  display: block;
  color: var(--muted);
}

.detail-stack {
  max-height: 410px;
  overflow-y: auto;
}

.detail-row {
  border-bottom: 1px solid var(--line);
  padding: 0.6rem 0;
}

.detail-row:last-child {
  border-bottom: none;
}

.loading-shell {
  display: grid;
  place-items: center;
  min-height: 100vh;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--primary);
}

@media (max-width: 980px) {
  .stats-grid,
  .forms-grid,
  .workspace-grid,
  .lower-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
}
