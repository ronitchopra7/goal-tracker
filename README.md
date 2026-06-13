# QuestLog — Cozy Goal Tracker

A gamified goal accountability app with a warm, cozy aesthetic. Break goals into checklists, earn XP, build streaks, and unlock achievements.

## Features

- **Quest board** — Create goals with categories, priorities, deadlines, and step-by-step checklists
- **Gamification** — XP, levels, coins, daily streaks, and 10 unlockable achievements
- **Daily quests** — Three fresh challenges each day with bonus XP rewards
- **Cozy UI** — Warm palette, night-scene mascot, smooth animations, fully responsive
- **Local persistence** — All progress saved in your browser (no account needed)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Build for production

```bash
npm run build
npm run preview
```

## How it works

| Action | Reward |
|--------|--------|
| Complete a low-priority task | +10 XP, +5 coins |
| Complete a medium-priority task | +20 XP, +5 coins |
| Complete a high-priority task | +35 XP, +5 coins |
| Fully complete a goal | +100 bonus XP, +50 coins |
| Claim a daily quest | +30–50 XP, +15 coins |
| Unlock an achievement | +25 coins |

Levels scale exponentially — keep checking off tasks to level up!
