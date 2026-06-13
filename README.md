# QuestLog

A cozy, gamified goal tracker. Break goals into checklists, earn XP, build streaks, complete daily quests, and unlock achievements — all saved locally in your browser.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)

## What it does

### Quests & checklists

- Create **quests** (goals) with a title, optional description, category, priority, and optional target date
- Add checklist steps to each quest and check them off as you go
- Track per-quest progress with a progress bar
- **Archive** fully completed quests or **delete** them entirely
- View archived quests in a collapsible section at the bottom of the quest board

**Categories:** Health, Career, Learning, Personal, Creative

**Priorities:** Low, Medium, High (affects XP per task)

### Gamification

| Stat | Description |
|------|-------------|
| **XP & Level** | Earn XP from tasks and bonuses; level up when the XP bar fills. Each level requires more XP (`100 × 1.5^(level − 1)` per level). |
| **Streak** | Complete at least one task per day to grow your streak. Skip a day and it resets. |
| **Coins & Shop** | Earn coins from tasks, quests, and achievements. Spend them in the **Shop** tab on customization. |
| **Daily quests** | Three challenges that reset at midnight. Meet the target, then press **Claim**. |
| **Achievements** | 46 unlockable badges across 4 tiers (Common → Legendary), including secret hidden ones. |

### Rewards

Rewards are granted **once per task** — unchecking and re-checking a task does not farm XP, coins, or daily-quest progress. The same applies to the goal-completion bonus.

| Action | Reward |
|--------|--------|
| Complete a low-priority task | +10 XP, +5 coins |
| Complete a medium-priority task | +20 XP, +5 coins |
| Complete a high-priority task | +35 XP, +5 coins |
| Fully complete a quest (all steps done) | +100 bonus XP, +50 coins |
| Claim daily quest: Complete 3 tasks | +50 XP, +15 coins |
| Claim daily quest: Keep your streak alive | +30 XP, +15 coins |
| Claim daily quest: Finish a high-priority task | +40 XP, +15 coins |
| Unlock an achievement | +25–75 coins (tier-based) |

### Daily quests

Three quests are generated each day:

1. **Complete 3 tasks** — +50 XP
2. **Keep your streak alive** — +30 XP (complete any task that day)
3. **Finish a high-priority task** — +40 XP

### Achievements

**46 badges** across four tiers — Common, Rare, Epic, and Legendary. Higher tiers award more coins on unlock.

Categories include:

- **Getting started** — first task, first quest, building big checklists
- **Streaks** — 3 days up to a legendary 60-day personal best
- **Task volume** — 25 tasks up to 500 lifetime completions
- **Levels** — reach level 5, 10, 15, or 20
- **Quest completion** — finish quests, including mega 15-step sagas
- **Daily quests** — perfect days and total claims
- **Categories** — explore all five quest types and complete one in each
- **Priority & deadlines** — crush high-priority tasks, beat deadlines
- **Daily intensity** — 5, 8, or 12 tasks in a single day
- **Coins** — hoard 500, 1,000, or 2,500 coins
- **Playstyle** — juggle active quests, archive completed ones
- **Secret** — Night Owl (after 10 PM), Early Bird (before 7 AM), Weekend Warrior, Zero to Hero, and more — hidden until unlocked

### Shop (Marketplace)

Spend coins on **28 customization items** across five categories:

| Category | Examples |
|----------|----------|
| **Themes** | Midnight Study, Sakura Bloom, Nebula Dream — full app color palettes |
| **Scenes** | Aurora Sky, Campfire Glow, Rainy Window — mascot backdrop animations |
| **Frames** | Golden Ring, Crystal Edge, Prismatic Aura — border around your companion |
| **Checkmarks** | Sparkle Pop, Neon Glow, Petal Burst — styled task completion |
| **Title Badges** | Star Seeker, Quest Knight, Dragon Sigil — flair next to your name |

Starter items are free. Rarity tiers: Common → Legendary (prices from 60–400 coins). Buy once, equip anytime from the **Shop** tab.

### UI

- Warm, cozy color palette with soft background blobs
- Sidebar **mascot** with encouraging messages based on your progress
- **Stats bar** — level, XP bar, streak, coins, tasks completed today
- **Overview panel** — active quests, average progress, best streak, total tasks done
- **Help guide** — click the **?** button in the header for a full feature walkthrough
- **Shop** — spend coins on themes, mascot scenes, frames, checkmark styles, and title badges
- **Level-up modal** when you rank up
- Toast notifications for XP, achievements, and quest events
- Responsive layout for desktop and mobile

## Data & privacy

- All data is stored in **localStorage** under the key `questlog-data`
- No accounts, backend, or network requests for your goals
- Clearing browser data will reset your progress

## Project structure

```
goal-tracker/
├── index.html              # Entry HTML, fonts, page title
├── public/
│   └── favicon.svg
└── src/
    ├── App.tsx             # Main layout, tabs, routing between views
    ├── main.tsx            # React entry point
    ├── index.css           # Global styles & cozy theme
    ├── types/
    │   └── index.ts        # TypeScript types, categories, XP values
    ├── utils/
    │   └── gamification.ts # XP, levels, streaks, achievements, daily quests
    ├── hooks/
    │   ├── useAppState.ts  # App state, quest/task actions, reward logic
    │   └── useLocalStorage.ts
    └── components/
        ├── GoalCard.tsx        # Quest card with checklist
        ├── GoalForm.tsx        # Create-new-quest form
        ├── ChecklistItemRow.tsx
        ├── DailyQuests.tsx
        ├── StatsBar.tsx
        ├── Mascot.tsx
        ├── AchievementsPanel.tsx
        ├── HelpModal.tsx
        ├── LevelUpModal.tsx
        └── Toast.tsx
```

## Tech stack

- **React 19** + **TypeScript**
- **Vite 8** for dev server and bundling
- **ESLint** for linting
- **Google Fonts** — Fraunces (headings), DM Sans (body)
- Plain CSS (no UI framework)

## License

Private project — use and modify as you like locally.

