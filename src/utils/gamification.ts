import type { Achievement, AppData, DailyQuest, GameState, Goal, GoalCategory } from '../types';
import { getStarterOwnedIds } from '../data/marketplace';
import { DEFAULT_EQUIPPED } from '../types/marketplace';

type AchievementDef = Omit<Achievement, 'unlockedAt'>;

export const ACHIEVEMENTS: AchievementDef[] = [
  // ── Getting started ──
  { id: 'first-step', title: 'First Step', description: 'Complete your first task', icon: '🌱', tier: 'common' },
  { id: 'goal-setter', title: 'Goal Setter', description: 'Create your first quest', icon: '🎯', tier: 'common' },
  { id: 'list-lover', title: 'List Lover', description: 'Add 5 steps to a single quest', icon: '📝', tier: 'common' },
  { id: 'marathon', title: 'Marathon Mindset', description: 'Have 20+ checklist steps across all quests', icon: '🏃', tier: 'common' },

  // ── Streaks ──
  { id: 'on-fire', title: 'On Fire', description: 'Reach a 3-day streak', icon: '🔥', tier: 'common' },
  { id: 'week-warrior', title: 'Week Warrior', description: 'Reach a 7-day streak', icon: '⚡', tier: 'rare' },
  { id: 'fortnight-fury', title: 'Fortnight Fury', description: 'Reach a 14-day streak', icon: '🌩️', tier: 'rare' },
  { id: 'month-monarch', title: 'Month Monarch', description: 'Reach a 30-day streak', icon: '📅', tier: 'epic' },
  { id: 'immortal-flame', title: 'Immortal Flame', description: 'Set a personal best streak of 60 days', icon: '☄️', tier: 'legendary' },

  // ── Task volume ──
  { id: 'task-master', title: 'Task Master', description: 'Complete 25 tasks', icon: '✅', tier: 'rare' },
  { id: 'centurion', title: 'Centurion', description: 'Complete 100 tasks', icon: '🏆', tier: 'epic' },
  { id: 'task-titan', title: 'Task Titan', description: 'Complete 250 tasks', icon: '🗿', tier: 'legendary' },
  { id: 'checkbox-deity', title: 'Checkbox Deity', description: 'Complete 500 tasks', icon: '👁️', tier: 'legendary' },

  // ── Levels ──
  { id: 'level-five', title: 'Rising Star', description: 'Reach level 5', icon: '⭐', tier: 'rare' },
  { id: 'level-ten', title: 'Legend', description: 'Reach level 10', icon: '👑', tier: 'epic' },
  { id: 'level-fifteen', title: 'Mythic Hero', description: 'Reach level 15', icon: '🦄', tier: 'epic' },
  { id: 'level-twenty', title: 'Transcendent', description: 'Reach level 20', icon: '🌌', tier: 'legendary' },

  // ── Quest completion ──
  { id: 'goal-crusher', title: 'Goal Crusher', description: 'Fully complete a quest', icon: '💎', tier: 'common' },
  { id: 'quest-rush', title: 'Quest Rush', description: 'Fully complete 3 quests', icon: '🚀', tier: 'rare' },
  { id: 'goal-hoarder', title: 'Quest Hoarder', description: 'Fully complete 5 quests', icon: '📦', tier: 'rare' },
  { id: 'saga-finisher', title: 'Saga Finisher', description: 'Fully complete 10 quests', icon: '📜', tier: 'epic' },
  { id: 'deep-focus', title: 'Deep Focus', description: 'Complete a quest with 8 or more steps', icon: '🧠', tier: 'rare' },
  { id: 'mega-quest', title: 'Mega Quest', description: 'Complete a quest with 15 or more steps', icon: '🏔️', tier: 'legendary' },

  // ── Daily quests ──
  { id: 'daily-champion', title: 'Daily Champion', description: 'Claim all three daily quests in one day', icon: '🌅', tier: 'common' },
  { id: 'daily-devotee', title: 'Daily Devotee', description: 'Claim all daily quests on 7 separate days', icon: '🕯️', tier: 'epic' },
  { id: 'ritual-master', title: 'Ritual Master', description: 'Claim all daily quests on 30 separate days', icon: '🔮', tier: 'legendary' },
  { id: 'daily-grinder', title: 'Daily Grinder', description: 'Claim 50 daily quests total', icon: '⚙️', tier: 'epic' },

  // ── Categories ──
  { id: 'jack-of-trades', title: 'Jack of All Trades', description: 'Create quests in 3 different categories', icon: '🃏', tier: 'rare' },
  { id: 'renaissance', title: 'Renaissance Soul', description: 'Create quests in all 5 categories', icon: '🎭', tier: 'epic' },
  { id: 'well-rounded', title: 'Well Rounded', description: 'Complete a quest in every category', icon: '🌈', tier: 'legendary' },

  // ── Priority & deadlines ──
  { id: 'boss-mode', title: 'Boss Mode', description: 'Complete 10 high-priority tasks', icon: '💥', tier: 'epic' },
  { id: 'crunch-time', title: 'Beat the Clock', description: 'Complete a quest on or before its deadline', icon: '⏰', tier: 'rare' },
  { id: 'priority-king', title: 'Priority King', description: 'Complete 25 high-priority tasks', icon: '♔', tier: 'legendary' },

  // ── Daily intensity ──
  { id: 'power-hour', title: 'Power Hour', description: 'Complete 5 tasks in a single day', icon: '💨', tier: 'rare' },
  { id: 'overachiever', title: 'Overachiever', description: 'Complete 8 tasks in a single day', icon: '🦸', tier: 'epic' },
  { id: 'blitz', title: 'Blitz Mode', description: 'Complete 12 tasks in a single day', icon: '⚔️', tier: 'legendary' },

  // ── Coins ──
  { id: 'piggy-bank', title: 'Piggy Bank', description: 'Accumulate 500 coins', icon: '🐷', tier: 'rare' },
  { id: 'treasure-chest', title: 'Treasure Chest', description: 'Accumulate 1,000 coins', icon: '💰', tier: 'epic' },
  { id: 'dragon-hoard', title: "Dragon's Hoard", description: 'Accumulate 2,500 coins', icon: '🐉', tier: 'legendary' },

  // ── Playstyle ──
  { id: 'juggling-act', title: 'Juggling Act', description: 'Have 5 active quests at the same time', icon: '🤹', tier: 'rare' },
  { id: 'the-archivist', title: 'The Archivist', description: 'Archive 5 completed quests', icon: '🗄️', tier: 'rare' },
  { id: 'completionist', title: 'Completionist', description: 'Archive 15 completed quests', icon: '🏛️', tier: 'legendary' },

  // ── Secret / time-based ──
  { id: 'night-owl', title: 'Night Owl', description: 'Complete a task after 10 PM', icon: '🦉', tier: 'rare', secret: true },
  { id: 'early-bird', title: 'Early Bird', description: 'Complete a task before 7 AM', icon: '🐦', tier: 'rare', secret: true },
  { id: 'weekend-warrior', title: 'Weekend Warrior', description: 'Complete 5 tasks on a Saturday or Sunday', icon: '🎸', tier: 'epic', secret: true },
  { id: 'zero-to-hero', title: 'Zero to Hero', description: 'Go from level 1 to level 10 without archiving any quest', icon: '🎰', tier: 'legendary', secret: true },
];

const ALL_CATEGORIES: GoalCategory[] = ['health', 'career', 'learning', 'personal', 'creative'];

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

function tasksCompletedByDay(goals: Goal[]): Map<string, number> {
  const byDay = new Map<string, number>();
  for (const goal of goals) {
    for (const item of goal.checklist) {
      if (item.completedAt) {
        const day = item.completedAt.slice(0, 10);
        byDay.set(day, (byDay.get(day) ?? 0) + 1);
      }
    }
  }
  return byDay;
}

function maxTasksInOneDay(goals: Goal[]): number {
  const counts = [...tasksCompletedByDay(goals).values()];
  return counts.length === 0 ? 0 : Math.max(...counts);
}

function weekendTasksCompleted(goals: Goal[]): number {
  let maxWeekend = 0;
  const byDay = tasksCompletedByDay(goals);
  for (const [day, count] of byDay) {
    const dow = new Date(`${day}T12:00:00`).getDay();
    if (dow === 0 || dow === 6) maxWeekend = Math.max(maxWeekend, count);
  }
  return maxWeekend;
}

function countDailyPerfectDays(dailyQuests: DailyQuest[]): number {
  const byDate = new Map<string, DailyQuest[]>();
  for (const q of dailyQuests) {
    const list = byDate.get(q.date) ?? [];
    list.push(q);
    byDate.set(q.date, list);
  }
  let count = 0;
  for (const quests of byDate.values()) {
    if (quests.length >= 3 && quests.every((q) => q.claimed)) count++;
  }
  return count;
}

function totalDailyQuestsClaimed(dailyQuests: DailyQuest[]): number {
  return dailyQuests.filter((q) => q.claimed).length;
}

function categoriesWithQuests(goals: Goal[]): Set<GoalCategory> {
  return new Set(goals.map((g) => g.category));
}

function categoriesWithCompletedQuests(goals: Goal[]): Set<GoalCategory> {
  const set = new Set<GoalCategory>();
  for (const goal of goals) {
    if (goal.completionRewarded) set.add(goal.category);
  }
  return set;
}

function highPriorityTasksCompleted(goals: Goal[]): number {
  let count = 0;
  for (const goal of goals) {
    if (goal.priority !== 'high') continue;
    count += goal.checklist.filter((i) => i.xpClaimed).length;
  }
  return count;
}

function largestCompletedQuestSize(goals: Goal[]): number {
  let max = 0;
  for (const goal of goals) {
    if (goal.completionRewarded) max = Math.max(max, goal.checklist.length);
  }
  return max;
}

function hasQuestWithMinSteps(goals: Goal[], min: number): boolean {
  return goals.some((g) => g.checklist.length >= min);
}

function totalChecklistItems(goals: Goal[]): number {
  return goals.reduce((sum, g) => sum + g.checklist.length, 0);
}

function completedBeforeDeadline(goals: Goal[]): boolean {
  for (const goal of goals) {
    if (!goal.completionRewarded || !goal.targetDate) continue;
    const lastCompletion = goal.checklist
      .filter((i) => i.completedAt)
      .map((i) => i.completedAt!)
      .sort()
      .at(-1);
    if (lastCompletion && lastCompletion.slice(0, 10) <= goal.targetDate) return true;
  }
  return false;
}

function hasTaskCompletedInHourRange(goals: Goal[], startHour: number, endHour: number): boolean {
  for (const goal of goals) {
    for (const item of goal.checklist) {
      if (!item.completedAt) continue;
      const hour = new Date(item.completedAt).getHours();
      if (startHour <= endHour) {
        if (hour >= startHour && hour < endHour) return true;
      } else if (hour >= startHour || hour < endHour) {
        return true;
      }
    }
  }
  return false;
}

function activeQuestCount(goals: Goal[]): number {
  return goals.filter((g) => !g.archived).length;
}

function archivedCount(goals: Goal[]): number {
  return goals.filter((g) => g.archived).length;
}

function zeroToHeroEligible(game: GameState, goals: Goal[]): boolean {
  if (game.level < 10) return false;
  return goals.every((g) => !g.archived);
}

export function mergeAchievements(saved: Achievement[]): Achievement[] {
  return ACHIEVEMENTS.map((def) => {
    const existing = saved.find((a) => a.id === def.id);
    if (existing) {
      return {
        ...def,
        unlockedAt: existing.unlockedAt,
      };
    }
    return { ...def };
  });
}

export function unlockAchievement(
  game: GameState,
  id: string,
): { game: GameState; unlocked: Achievement | null } {
  const existing = game.achievements.find((a) => a.id === id);
  if (existing?.unlockedAt) return { game, unlocked: null };

  const def = ACHIEVEMENTS.find((a) => a.id === id);
  if (!def) return { game, unlocked: null };

  const coinBonus = def.tier === 'legendary' ? 75 : def.tier === 'epic' ? 50 : def.tier === 'rare' ? 35 : 25;
  const unlocked: Achievement = { ...def, unlockedAt: new Date().toISOString() };
  const achievements = game.achievements.some((a) => a.id === id)
    ? game.achievements.map((a) => (a.id === id ? unlocked : a))
    : [...game.achievements, unlocked];

  return {
    game: { ...game, achievements, coins: game.coins + coinBonus },
    unlocked,
  };
}

export function checkAchievements(game: GameState, goals: Goal[]): { game: GameState; newlyUnlocked: Achievement[] } {
  let current = game;
  const newlyUnlocked: Achievement[] = [];

  const tryUnlock = (id: string, condition: boolean) => {
    if (!condition) return;
    const { game: next, unlocked } = unlockAchievement(current, id);
    if (unlocked) {
      current = next;
      newlyUnlocked.push(unlocked);
    }
  };

  const maxDay = maxTasksInOneDay(goals);
  const perfectDays = countDailyPerfectDays(current.dailyQuests);
  const dailyClaimed = totalDailyQuestsClaimed(current.dailyQuests);
  const questCategories = categoriesWithQuests(goals);
  const completedCategories = categoriesWithCompletedQuests(goals);
  const hiPriTasks = highPriorityTasksCompleted(goals);
  const biggestDone = largestCompletedQuestSize(goals);
  const todayPerfect =
    current.dailyQuests.filter((q) => q.date === todayKey()).length >= 3 &&
    current.dailyQuests.filter((q) => q.date === todayKey()).every((q) => q.claimed);

  // Getting started
  tryUnlock('first-step', current.totalTasksCompleted >= 1);
  tryUnlock('goal-setter', goals.length >= 1);
  tryUnlock('list-lover', hasQuestWithMinSteps(goals, 5));
  tryUnlock('marathon', totalChecklistItems(goals) >= 20);

  // Streaks
  tryUnlock('on-fire', current.streak >= 3);
  tryUnlock('week-warrior', current.streak >= 7);
  tryUnlock('fortnight-fury', current.streak >= 14);
  tryUnlock('month-monarch', current.streak >= 30);
  tryUnlock('immortal-flame', current.longestStreak >= 60);

  // Task volume
  tryUnlock('task-master', current.totalTasksCompleted >= 25);
  tryUnlock('centurion', current.totalTasksCompleted >= 100);
  tryUnlock('task-titan', current.totalTasksCompleted >= 250);
  tryUnlock('checkbox-deity', current.totalTasksCompleted >= 500);

  // Levels
  tryUnlock('level-five', current.level >= 5);
  tryUnlock('level-ten', current.level >= 10);
  tryUnlock('level-fifteen', current.level >= 15);
  tryUnlock('level-twenty', current.level >= 20);

  // Quest completion
  tryUnlock('goal-crusher', current.totalGoalsCompleted >= 1);
  tryUnlock('quest-rush', current.totalGoalsCompleted >= 3);
  tryUnlock('goal-hoarder', current.totalGoalsCompleted >= 5);
  tryUnlock('saga-finisher', current.totalGoalsCompleted >= 10);
  tryUnlock('deep-focus', biggestDone >= 8);
  tryUnlock('mega-quest', biggestDone >= 15);

  // Daily quests
  tryUnlock('daily-champion', todayPerfect);
  tryUnlock('daily-devotee', perfectDays >= 7);
  tryUnlock('ritual-master', perfectDays >= 30);
  tryUnlock('daily-grinder', dailyClaimed >= 50);

  // Categories
  tryUnlock('jack-of-trades', questCategories.size >= 3);
  tryUnlock('renaissance', questCategories.size >= ALL_CATEGORIES.length);
  tryUnlock('well-rounded', ALL_CATEGORIES.every((c) => completedCategories.has(c)));

  // Priority & deadlines
  tryUnlock('boss-mode', hiPriTasks >= 10);
  tryUnlock('priority-king', hiPriTasks >= 25);
  tryUnlock('crunch-time', completedBeforeDeadline(goals));

  // Daily intensity
  tryUnlock('power-hour', maxDay >= 5);
  tryUnlock('overachiever', maxDay >= 8);
  tryUnlock('blitz', maxDay >= 12);

  // Coins
  tryUnlock('piggy-bank', current.coins >= 500);
  tryUnlock('treasure-chest', current.coins >= 1000);
  tryUnlock('dragon-hoard', current.coins >= 2500);

  // Playstyle
  tryUnlock('juggling-act', activeQuestCount(goals) >= 5);
  tryUnlock('the-archivist', archivedCount(goals) >= 5);
  tryUnlock('completionist', archivedCount(goals) >= 15);

  // Secret / time-based
  tryUnlock('night-owl', hasTaskCompletedInHourRange(goals, 22, 24));
  tryUnlock('early-bird', hasTaskCompletedInHourRange(goals, 0, 7));
  tryUnlock('weekend-warrior', weekendTasksCompleted(goals) >= 5);
  tryUnlock('zero-to-hero', zeroToHeroEligible(current, goals));

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
    inventory: {
      owned: getStarterOwnedIds(),
      equipped: { ...DEFAULT_EQUIPPED },
    },
  };
}

/** Backfill reward flags for data saved before one-time XP tracking existed. */
export function migrateAppData(data: AppData): AppData {
  return {
    ...data,
    game: {
      ...data.game,
      achievements: mergeAchievements(data.game.achievements),
      inventory: data.game.inventory
        ? {
            owned: [...new Set([...getStarterOwnedIds(), ...data.game.inventory.owned])],
            equipped: { ...DEFAULT_EQUIPPED, ...data.game.inventory.equipped },
          }
        : {
            owned: getStarterOwnedIds(),
            equipped: { ...DEFAULT_EQUIPPED },
          },
    },
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
