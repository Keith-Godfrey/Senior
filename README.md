# Senior Phone

A smartphone web app designed to be easy for senior citizens to use.

## Design Principles

- **Large visual targets** — big buttons (80px+ height), large text (20px base), high contrast colors
- **Reduced complexity** — four main screens, fewer choices per view, clear visual hierarchy
- **Predictable navigation** — consistent back button in the top-left, live clock in the top-right on every screen
- **Error forgiveness** — confirmation dialogs before calls/deletions, easy cancel on all actions
- **Confidence building** — clear toast feedback messages, plain language, no jargon

## Screens

| Screen | Description |
|--------|-------------|
| 🏠 Home | 2×2 grid of large colour-coded buttons for Phone, Messages, Emergency, Settings |
| 📞 Phone | Contact list with large tap targets; confirmation dialog before dialling |
| 💬 Messages | Inbox with unread badges; read, reply, delete with confirmation |
| 🆘 Emergency | Large SOS button with two-step confirmation; emergency tips and numbers |
| ⚙️ Settings | Toggle text size (Normal / Large) and contrast (Normal / High) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
Resize to a mobile viewport (e.g. 390 × 844) for the best experience.

## Build

```bash
npm run build
npm run preview
```

## Accessibility

- All interactive elements have `aria-label` attributes
- Confirmation modals use `role="dialog"` and `aria-modal`
- Status toasts use `aria-live="polite"` for screen-reader announcements
- `aria-pressed` reflects toggle button state in Settings
- All colour pairs meet WCAG contrast requirements; High Contrast mode exceeds WCAG AAA
