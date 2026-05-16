# Developer Productivity MVP

A full-stack web app that turns raw DORA-style engineering metrics into human-readable insights and actionable recommendations — built as an intern assignment MVP.

---

## What it does

Developers and managers often see numbers but not stories. This MVP bridges that gap:

- **IC Dashboard** — pick a developer, see their 5 key metrics, understand what those numbers likely mean, and get 1–2 concrete next steps
- **Manager Dashboard** — team-level summary showing averages and top performer at a glance
- **Trend Chart** — month-over-month lead time and bug rate visualised with Recharts

---

## Tech stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 16 · React 19 · Tailwind 4  |
| Charts   | Recharts                            |
| Backend  | Node.js · Express                   |
| Data     | Static JSON (mock source tables)    |

---

## The 5 metrics

| Metric                | Definition used in this project                                            |
|-----------------------|----------------------------------------------------------------------------|
| Lead Time for Changes | Avg days from PR opened → successful production deployment                 |
| Cycle Time            | Avg days from issue moved to In Progress → issue marked Done               |
| Bug Rate              | Production bugs found this month ÷ issues completed this month             |
| Deployment Frequency  | Count of successful production deployments in the month                    |
| PR Throughput         | Count of merged pull requests in the month                                 |

---

## Project structure

```
developer-productivity-mvp/
├── backend/
│   ├── data/
│   │   ├── developers.json     # 8 developers across 3 teams
│   │   └── metrics.json        # per-developer metrics + 2-month trend
│   ├── routes/
│   │   ├── metrics.js          # GET /api/metrics/:id
│   │   └── manager.js          # GET /api/manager
│   ├── services/
│   │   └── insightService.js   # rule-based insight + suggestion logic
│   └── server.js               # Express app on port 5000
└── frontend/
    └── src/app/
        ├── page.js             # IC dashboard (developer view)
        └── manager/page.js     # Manager summary view
```

---

## Running locally

**Backend**

```bash
cd backend
npm install
node server.js
# Running on http://localhost:5000
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
# Running on http://localhost:3000
```

Open `http://localhost:3000` for the IC view, or click **Manager View** to switch.

---

## Key design decisions

**Why rule-based insights instead of an LLM?**  
The goal was a focused, explainable MVP. A simple threshold check (`leadTime > 4`, `bugRate > 0.1`) is fast, deterministic, and easy to reason about in an interview. An LLM layer could be added on top later.

**Why static JSON instead of a real database?**  
The assignment prioritised product thinking over infrastructure. JSON files act like mock API responses from real systems (Jira, GitHub, CI/CD pipelines), keeping the focus on the data model and user journey.

**Why one IC view first?**  
Following the assignment's recommended scope: nail one clear user journey (IC profile → interpretation → next steps) before expanding. The manager page was added as a lightweight bonus view.

---

## Insight logic

`insightService.js` checks three thresholds and returns plain-English findings:

| Condition                     | Insight generated                                         | Suggestion                                          |
|-------------------------------|-----------------------------------------------------------|-----------------------------------------------------|
| `leadTime > 4` days           | PR reviews or deployments may be slowing delivery         | Break large PRs into smaller changes                |
| `bugRate > 10%`               | Possible testing gaps                                     | Improve automated testing before deployment         |
| `deploymentFrequency < 10`    | Low release cadence may slow feature delivery             | Increase release frequency with smaller deployments |

If none of the conditions fire, the developer's metrics are within acceptable range and no alerts are shown.

---

## Sample data

8 developers across 3 teams:

| Team           | Members                        |
|----------------|--------------------------------|
| Payments API   | Ava Chen, Noah Patel, Ishan Mehta |
| Checkout Web   | Mia Lopez, Lucas Reed, Zara Khan |
| Mobile Growth  | Emma Roy, Owen Brooks          |

Trend data covers **March → April** for each developer.
