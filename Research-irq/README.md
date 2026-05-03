# منتدى سياسات الشرق الأوسط

A static Arabic-language research forum website covering public policy, international relations, and history in the Middle East region.

**Live site:** https://zzin-irq.github.io/research/

## Stack

| Layer    | Technology                                    |
| -------- | --------------------------------------------- |
| Frontend | React 18 + Vite + React Router + Tailwind CSS |
| Content  | Static JSON files in `frontend/src/data/`     |
| Hosting  | GitHub Pages (deployed via GitHub Actions)    |

## Repository layout

```
Research-irq/
├── frontend/          React SPA (all source code)
│   ├── src/
│   │   ├── data/      Static content (research.json, people.json, events.json, topics.json)
│   │   ├── pages/     Public pages
│   │   └── components/
│   └── public/        Static assets (images)
├── backend/           Minimal Express health-check (not deployed)
└── .github/workflows/ GitHub Actions deploy pipeline
```

## Local development

```bash
cd frontend
npm install
npm run dev
```

Site runs at `http://localhost:5173`.

## Adding content

All content lives in `frontend/src/data/`. Edit the JSON files directly:

- `research.json` — research articles
- `people.json` — expert profiles
- `events.json` — upcoming events
- `topics.json` — topic categories

After editing, commit and push — GitHub Actions will rebuild and redeploy automatically.

## Deployment

Deployments are automatic on every push to `main` via GitHub Actions.

To enable GitHub Pages on first setup:
1. Go to **Settings → Pages**
2. Set **Source** to **GitHub Actions**
3. Push any commit — the site will be live at `https://zzin-irq.github.io/research/`

## Contact

zzinchicago@gmail.com
