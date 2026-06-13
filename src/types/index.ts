export type GoalCategory = 'health' | 'career' | 'learning' | 'personal' | 'creative';
export type GoalPriority = 'low' | 'medium' | 'high';

export type { EquippedItems, Inventory, ShopCategory, ShopItem, ShopRarity } from './marketplace';
export { CATEGORY_LABELS, DEFAULT_EQUIPPED } from './marketplace';

import type { Inventory } from './marketplace';

export interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
  completedAt?: string;
  /** Once true, XP and daily-quest credit are never awarded again for this task. */
  xpClaimed?: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: GoalCategory;
  priority: GoalPriority;
  checklist: ChecklistItem[];
  createdAt: string;
  targetDate?: string;
  archived: boolean;
  /** Once true, the goal-completion bonus is never awarded again. */
  completionRewarded?: boolean;
}

export type AchievementTier = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  tier?: AchievementTier;
  secret?: boolean;
  unlockedAt?: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  target: number;
  progress: number;
  xpReward: number;
  date: string;
  claimed: boolean;
}

export interface GameState {
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalTasksCompleted: number;
  totalGoalsCompleted: number;
  coins: number;
  achievements: Achievement[];
  dailyQuests: DailyQuest[];
  tasksCompletedToday: number;
  inventory: Inventory;
}

export interface AppData {
  goals: Goal[];
  game: GameState;
}

export const CATEGORY_META: Record<GoalCategory, { label: string; icon: string; color: string }> = {
  health: { label: 'Health', icon: '🌿', color: '#6B9E7A' },
  career: { label: 'Career', icon: '💼', color: '#C4846A' },
  learning: { label: 'Learning', icon: '📚', color: '#7B8EC4' },
  personal: { label: 'Personal', icon: '✨', color: '#B08BBE' },
  creative: { label: 'Creative', icon: '🎨', color: '#D4A574' },
};

export const PRIORITY_XP: Record<GoalPriority, number> = {
  low: 10,
  medium: 20,
  high: 35,
};
