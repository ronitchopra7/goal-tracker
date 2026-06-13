import { useCallback, useMemo, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { getShopItem } from '../data/marketplace';
import type { Achievement, AppData, ChecklistItem, Goal, GoalCategory, GoalPriority } from '../types';
import { PRIORITY_XP } from '../types';
import {
  checkAchievements,
  createInitialGameState,
  ensureDailyQuests,
  isGoalComplete,
  levelFromXp,
  todayKey,
  updateStreak,
  xpProgressInLevel,
} from '../utils/gamification';

function uid(): string {
  return crypto.randomUUID();
}

const STORAGE_KEY = 'questlog-data';

function createDefaultData(): AppData {
  return { goals: [], game: createInitialGameState() };
}

export function useAppState() {
  const [data, setData] = useLocalStorage<AppData>(STORAGE_KEY, createDefaultData());
  const [toast, setToast] = useState<{ message: string; type: 'xp' | 'achievement' | 'level' } | null>(null);
  const [levelUp, setLevelUp] = useState<number | null>(null);

  const showToast = useCallback((message: string, type: 'xp' | 'achievement' | 'level' = 'xp') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3200);
  }, []);

  const processGameUpdate = useCallback(
    (updater: (prev: AppData) => AppData) => {
      setData((prev) => {
        let next = updater(prev);
        next = {
          ...next,
          game: ensureDailyQuests(updateStreak(next.game)),
        };
        const { game: withAchievements, newlyUnlocked } = checkAchievements(next.game, next.goals);
        next = { ...next, game: withAchievements };

        newlyUnlocked.forEach((a) => {
          setTimeout(() => showToast(`${a.icon} Achievement unlocked: ${a.title}!`, 'achievement'), 100);
        });

        return next;
      });
    },
    [setData, showToast],
  );

  const addGoal = useCallback(
    (title: string, description: string, category: GoalCategory, priority: GoalPriority, targetDate?: string) => {
      const goal: Goal = {
        id: uid(),
        title,
        description,
        category,
        priority,
        checklist: [],
        createdAt: new Date().toISOString(),
        targetDate,
        archived: false,
      };
      processGameUpdate((prev) => ({ ...prev, goals: [goal, ...prev.goals] }));
      showToast('🎯 New quest added!');
    },
    [processGameUpdate, showToast],
  );

  const deleteGoal = useCallback(
    (goalId: string) => {
      processGameUpdate((prev) => ({
        ...prev,
        goals: prev.goals.filter((g) => g.id !== goalId),
      }));
    },
    [processGameUpdate],
  );

  const archiveGoal = useCallback(
    (goalId: string) => {
      processGameUpdate((prev) => ({
        ...prev,
        goals: prev.goals.map((g) => (g.id === goalId ? { ...g, archived: true } : g)),
      }));
    },
    [processGameUpdate],
  );

  const addChecklistItem = useCallback(
    (goalId: string, text: string) => {
      const item: ChecklistItem = { id: uid(), text, completed: false };
      processGameUpdate((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.id === goalId ? { ...g, checklist: [...g.checklist, item] } : g,
        ),
      }));
    },
    [processGameUpdate],
  );

  const toggleChecklistItem = useCallback(
    (goalId: string, itemId: string) => {
      setData((prev) => {
        const goal = prev.goals.find((g) => g.id === goalId);
        const item = goal?.checklist.find((i) => i.id === itemId);
        if (!goal || !item) return prev;

        const completing = !item.completed;
        const today = todayKey();

        let game = ensureDailyQuests(updateStreak(prev.game));
        game = { ...game, lastActiveDate: today };

        const firstTimeComplete = completing && !item.xpClaimed;

        if (firstTimeComplete) {
          const xpGain = PRIORITY_XP[goal.priority];
          const prevLevel = levelFromXp(game.xp);
          game = {
            ...game,
            xp: game.xp + xpGain,
            totalTasksCompleted: game.totalTasksCompleted + 1,
            tasksCompletedToday: game.tasksCompletedToday + 1,
            coins: game.coins + 5,
          };
          const newLevel = levelFromXp(game.xp);
          if (newLevel > prevLevel) {
            game = { ...game, level: newLevel };
            setLevelUp(newLevel);
          } else {
            game = { ...game, level: newLevel };
          }

          game = {
            ...game,
            dailyQuests: game.dailyQuests.map((q) => {
              if (q.date !== today || q.claimed) return q;
              if (q.id.startsWith('daily-tasks')) {
                return { ...q, progress: Math.min(q.target, q.progress + 1) };
              }
              if (q.id.startsWith('daily-streak')) {
                return { ...q, progress: 1 };
              }
              if (q.id.startsWith('daily-focus') && goal.priority === 'high') {
                return { ...q, progress: 1 };
              }
              return q;
            }),
          };

          showToast(`+${xpGain} XP — task complete!`, 'xp');
        }

        let goalCompletionBonus = false;

        const updatedGoals = prev.goals.map((g) => {
          if (g.id !== goalId) return g;
          const checklist = g.checklist.map((i) =>
            i.id === itemId
              ? {
                  ...i,
                  completed: completing,
                  completedAt: completing ? new Date().toISOString() : undefined,
                  xpClaimed: i.xpClaimed || firstTimeComplete,
                }
              : i,
          );
          const updated = { ...g, checklist };
          if (
            firstTimeComplete &&
            isGoalComplete(updated) &&
            !g.completionRewarded
          ) {
            goalCompletionBonus = true;
            return { ...updated, completionRewarded: true };
          }
          return updated;
        });

        if (goalCompletionBonus) {
          game = {
            ...game,
            totalGoalsCompleted: game.totalGoalsCompleted + 1,
            xp: game.xp + 100,
            coins: game.coins + 50,
          };
          const newLevel = levelFromXp(game.xp);
          if (newLevel > game.level) setLevelUp(newLevel);
          game = { ...game, level: newLevel };
          showToast('💎 Goal complete! +100 bonus XP', 'xp');
        }

        let next: AppData = { goals: updatedGoals, game };
        const { game: withAchievements, newlyUnlocked } = checkAchievements(next.game, next.goals);
        next = { ...next, game: withAchievements };
        newlyUnlocked.forEach((a) => {
          setTimeout(() => showToast(`${a.icon} Achievement: ${a.title}!`, 'achievement'), 200);
        });

        return next;
      });
    },
    [setData, showToast],
  );

  const deleteChecklistItem = useCallback(
    (goalId: string, itemId: string) => {
      processGameUpdate((prev) => ({
        ...prev,
        goals: prev.goals.map((g) =>
          g.id === goalId ? { ...g, checklist: g.checklist.filter((i) => i.id !== itemId) } : g,
        ),
      }));
    },
    [processGameUpdate],
  );

  const claimDailyQuest = useCallback(
    (questId: string) => {
      processGameUpdate((prev) => {
        const quest = prev.game.dailyQuests.find((q) => q.id === questId);
        if (!quest || quest.claimed || quest.progress < quest.target) return prev;

        const prevLevel = levelFromXp(prev.game.xp);
        const game = {
          ...prev.game,
          xp: prev.game.xp + quest.xpReward,
          coins: prev.game.coins + 15,
          dailyQuests: prev.game.dailyQuests.map((q) =>
            q.id === questId ? { ...q, claimed: true } : q,
          ),
        };
        const newLevel = levelFromXp(game.xp);
        if (newLevel > prevLevel) setLevelUp(newLevel);

        showToast(`+${quest.xpReward} XP — daily quest claimed!`, 'xp');
        return { ...prev, game: { ...game, level: newLevel } };
      });
    },
    [processGameUpdate, showToast],
  );

  const purchaseItem = useCallback(
    (itemId: string) => {
      setData((prev) => {
        const item = getShopItem(itemId);
        if (!item || item.starter) return prev;
        if (prev.game.inventory.owned.includes(itemId)) return prev;
        if (prev.game.coins < item.price) return prev;

        showToast(`${item.icon} Purchased ${item.name}!`, 'xp');
        return {
          ...prev,
          game: {
            ...prev.game,
            coins: prev.game.coins - item.price,
            inventory: {
              ...prev.game.inventory,
              owned: [...prev.game.inventory.owned, itemId],
            },
          },
        };
      });
    },
    [setData, showToast],
  );

  const equipItem = useCallback(
    (itemId: string) => {
      setData((prev) => {
        const item = getShopItem(itemId);
        if (!item) return prev;
        if (!prev.game.inventory.owned.includes(itemId) && !item.starter) return prev;

        const slot = item.category === 'mascot' ? 'mascot' : item.category;
        showToast(`${item.icon} Equipped ${item.name}!`, 'xp');
        return {
          ...prev,
          game: {
            ...prev.game,
            inventory: {
              ...prev.game.inventory,
              equipped: { ...prev.game.inventory.equipped, [slot]: itemId },
            },
          },
        };
      });
    },
    [setData, showToast],
  );

  const xpProgress = useMemo(() => xpProgressInLevel(data.game.xp), [data.game.xp]);

  const activeGoals = useMemo(() => data.goals.filter((g) => !g.archived), [data.goals]);
  const archivedGoals = useMemo(() => data.goals.filter((g) => g.archived), [data.goals]);
  const todayQuests = useMemo(
    () => data.game.dailyQuests.filter((q) => q.date === todayKey()),
    [data.game.dailyQuests],
  );
  const unlockedAchievements = useMemo(
    () => data.game.achievements.filter((a) => a.unlockedAt) as Achievement[],
    [data.game.achievements],
  );

  return {
    data,
    activeGoals,
    archivedGoals,
    todayQuests,
    unlockedAchievements,
    xpProgress,
    toast,
    levelUp,
    setLevelUp,
    addGoal,
    deleteGoal,
    archiveGoal,
    addChecklistItem,
    toggleChecklistItem,
    deleteChecklistItem,
    claimDailyQuest,
    purchaseItem,
    equipItem,
  };
}
