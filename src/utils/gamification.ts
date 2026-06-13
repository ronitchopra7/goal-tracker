import type { Achievement, AppData, DailyQuest, GameState, Goal } from '../types';

export const ACHIEVEMENTS: Omit<Achievement, 'unlockedAt'>[] = [
  { id: 'first-step', title: 'First Step', description: 'Complete your first task', icon: '🌱' },
  { id: 'goal-setter', title: 'Goal Setter', description: 'Create your first goal', icon: '🎯' },
  { id: 'on-fire', title: 'On Fire', description: 'Reach a 3-day streak', icon: '🔥' },
  { id: 'week-warrior', title: 'Week Warrior', description: 'Reach a 7-day streak', icon: '⚡' },
  { id: 'task-master', title: 'Task Master', description: 'Complete 25 tasks', icon: '✅' },
  { id: 'centurion', title: 'Centurion', description: 'Complete 100 tasks', icon: '🏆' },
  { id: 'level-five', title: 'Rising Star', description: 'Reach level 5', icon: '⭐' },
  { id: 'level-ten', title: 'Legend', description: 'Reach level 10', icon: '👑' },
  { id: 'goal-crusher', title: 'Goal Crusher', description: 'Fully complete a goal', icon: '💎' },
  { id: 'daily-champion', title: 'Daily Champion', description: 'Complete all daily quests', icon: '🌅' },
];

export function xpForLevel(level: number): number {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

export function totalXpForLevel(level: number): number {
  let total = 0;
  for (let i = 1; i < level; i++) total += xpForLevel(i);
  return total;
}

export function levelFromXp(xp: number): number {
  let level = 1;
  let accumulated = 0;
  while (accumulated + xpForLevel(level) <= xp) {
    accumulated += xpForLevel(level);
    level++;
  }
  return level;
}

export function xpProgressInLevel(xp: number): { current: number; needed: number; percent: number } {
  const level = levelFromXp(xp);
  const base = totalXpForLevel(level);
  const current = xp - base;
  const needed = xpForLevel(level);
  return { current, needed, percent: Math.min(100, (current / needed) * 100) };
}

export function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function updateStreak(game: GameState): GameState {
  const today = todayKey();
  if (game.lastActiveDate === today) return game;

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = yesterday.toISOString().slice(0, 10);

  let streak = game.streak;
  if (game.lastActiveDate === yesterdayKey) {
    streak += 1;
  } else if (game.lastActiveDate !== today) {
    streak = 1;
  }

  return {
    ...game,
    streak,
    longestStreak: Math.max(game.longestStreak, streak),
    lastActiveDate: today,
    tasksCompletedToday: game.lastActiveDate === today ? game.tasksCompletedToday : 0,
  };
}

export function generateDailyQuests(date: string): DailyQuest[] {
  return [
    {
      id: `daily-tasks-${date}`,
      title: 'Complete 3 tasks',
      target: 3,
      progress: 0,
      xpReward: 50,
      date,
      claimed: false,
    },
    {
      id: `daily-streak-${date}`,
      title: 'Keep your streak alive',
      target: 1,
      progress: 0,
      xpReward: 30,
      date,
      claimed: false,
    },
    {
      id: `daily-focus-${date}`,
      title: 'Finish a high-priority task',
      target: 1,
      progress: 0,
      xpReward: 40,
      date,
      claimed: false,
    },
  ];
}

export function ensureDailyQuests(game: GameState): GameState {
  const today = todayKey();
  const hasToday = game.dailyQuests.some((q) => q.date === today);
  if (hasToday) return game;
  return { ...game, dailyQuests: generateDailyQuests(today) };
}

export function unlockAchievement(
  game: GameState,
  id: string,
): { game: GameState; unlocked: Achievement | null } {
  const existing = game.achievements.find((a) => a.id === id);
  if (existing?.unlockedAt) return { game, unlocked: null };

  const def = ACHIEVEMENTS.find((a) => a.id === id);
  if (!def) return { game, unlocked: null };

  const unlocked: Achievement = { ...def, unlockedAt: new Date().toISOString() };
  const achievements = game.achievements.some((a) => a.id === id)
    ? game.achievements.map((a) => (a.id === id ? unlocked : a))
    : [...game.achievements, unlocked];

  return {
    game: { ...game, achievements, coins: game.coins + 25 },
    unlocked,
  };
}

export function checkAchievements(game: GameState, goals: Goal[]): { game: GameState; newlyUnlocked: Achievement[] } {
  let current = game;
  const newlyUnlocked: Achievement[] = [];

  const tryUnlock = (id: string) => {
    const { game: next, unlocked } = unlockAchievement(current, id);
    if (unlocked) {
      current = next;
      newlyUnlocked.push(unlocked);
    }
  };

  if (goals.length >= 1) tryUnlock('goal-setter');
  if (current.totalTasksCompleted >= 1) tryUnlock('first-step');
  if (current.streak >= 3) tryUnlock('on-fire');
  if (current.streak >= 7) tryUnlock('week-warrior');
  if (current.totalTasksCompleted >= 25) tryUnlock('task-master');
  if (current.totalTasksCompleted >= 100) tryUnlock('centurion');
  if (current.level >= 5) tryUnlock('level-five');
  if (current.level >= 10) tryUnlock('level-ten');
  if (current.totalGoalsCompleted >= 1) tryUnlock('goal-crusher');

  const todayQuests = current.dailyQuests.filter((q) => q.date === todayKey());
  if (todayQuests.length > 0 && todayQuests.every((q) => q.claimed)) {
    tryUnlock('daily-champion');
  }

  return { game: current, newlyUnlocked };
}

export function isGoalComplete(goal: Goal): boolean {
  return goal.checklist.length > 0 && goal.checklist.every((item) => item.completed);
}

export function goalProgress(goal: Goal): number {
  if (goal.checklist.length === 0) return 0;
  return (goal.checklist.filter((i) => i.completed).length / goal.checklist.length) * 100;
}

export function createInitialGameState(): GameState {
  const today = todayKey();
  return {
    xp: 0,
    level: 1,
    streak: 0,
    longestStreak: 0,
    lastActiveDate: '',
    totalTasksCompleted: 0,
    totalGoalsCompleted: 0,
    coins: 0,
    achievements: ACHIEVEMENTS.map((a) => ({ ...a })),
    dailyQuests: generateDailyQuests(today),
    tasksCompletedToday: 0,
  };
}

/** Backfill reward flags for data saved before one-time XP tracking existed. */
export function migrateAppData(data: AppData): AppData {
  return {
    ...data,
    goals: data.goals.map((goal) => {
      const checklist = goal.checklist.map((item) => ({
        ...item,
        xpClaimed: item.xpClaimed ?? !!item.completedAt,
      }));
      const allComplete = checklist.length > 0 && checklist.every((i) => i.completed);
      return {
        ...goal,
        checklist,
        completionRewarded: goal.completionRewarded ?? allComplete,
      };
    }),
  };
}

export function mascotMood(game: GameState, goals: Goal[]): { emoji: string; message: string } {
  const activeGoals = goals.filter((g) => !g.archived);
  const todayDone = game.tasksCompletedToday;

  if (todayDone >= 5) return { emoji: '🦊', message: "You're on a roll today! Keep that momentum going." };
  if (game.streak >= 7) return { emoji: '🌟', message: `${game.streak}-day streak! You're building something amazing.` };
  if (activeGoals.length === 0) return { emoji: '🪴', message: 'Plant your first goal and watch it grow with every step.' };
  if (todayDone === 0) return { emoji: '☕', message: 'Cozy day ahead — pick one small task to start.' };
  if (todayDone >= 1) return { emoji: '🌸', message: 'Nice work today! Every checkbox counts.' };

  const avgProgress =
    activeGoals.reduce((sum, g) => sum + goalProgress(g), 0) / Math.max(activeGoals.length, 1);
  if (avgProgress >= 75) return { emoji: '🎉', message: 'So close on your goals — finish strong!' };

  return { emoji: '🐻', message: "One step at a time. You've got this." };
}
