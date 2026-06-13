import { useState } from 'react';
import { AchievementsPanel } from './components/AchievementsPanel';
import { DailyQuests } from './components/DailyQuests';
import { GoalCard } from './components/GoalCard';
import { GoalForm } from './components/GoalForm';
import { HelpModal } from './components/HelpModal';
import { LevelUpModal } from './components/LevelUpModal';
import { Mascot } from './components/Mascot';
import { StatsBar } from './components/StatsBar';
import { Toast } from './components/Toast';
import { useAppState } from './hooks/useAppState';
import { goalProgress } from './utils/gamification';

type Tab = 'quests' | 'achievements';

function App() {
  const {
    data,
    activeGoals,
    archivedGoals,
    todayQuests,
    unlockedAchievements,
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
  } = useAppState();

  const [tab, setTab] = useState<Tab>('quests');
  const [showArchived, setShowArchived] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const overallProgress =
    activeGoals.length === 0
      ? 0
      : Math.round(activeGoals.reduce((sum, g) => sum + goalProgress(g), 0) / activeGoals.length);

  return (
    <div className="app">
      <div className="app-bg" aria-hidden="true">
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
        <div className="bg-blob bg-blob-3" />
      </div>

      <header className="site-header">
        <div className="brand">
          <span className="brand-icon">📔</span>
          <div>
            <h1>QuestLog</h1>
            <p className="brand-tagline">Cozy goals, real progress</p>
          </div>
        </div>
        <div className="header-actions">
          <nav className="tab-nav" aria-label="Main navigation">
            <button
              type="button"
              className={`tab-btn ${tab === 'quests' ? 'tab-active' : ''}`}
              onClick={() => setTab('quests')}
            >
              My Quests
            </button>
            <button
              type="button"
              className={`tab-btn ${tab === 'achievements' ? 'tab-active' : ''}`}
              onClick={() => setTab('achievements')}
            >
              Achievements
            </button>
          </nav>
          <button
            type="button"
            className="help-btn"
            onClick={() => setShowHelp(true)}
            aria-label="How QuestLog works"
            title="How QuestLog works"
          >
            ?
          </button>
        </div>
      </header>

      <StatsBar
        level={data.game.level}
        xp={data.game.xp}
        streak={data.game.streak}
        coins={data.game.coins}
        tasksToday={data.game.tasksCompletedToday}
      />

      <main className="main-layout">
        {tab === 'quests' ? (
          <>
            <aside className="sidebar">
              <Mascot game={data.game} goals={activeGoals} />
              <DailyQuests quests={todayQuests} onClaim={claimDailyQuest} />

              <section className="panel overview-panel">
                <div className="panel-header">
                  <h2>📊 Overview</h2>
                </div>
                <div className="overview-stats">
                  <div className="overview-stat">
                    <span className="overview-value">{activeGoals.length}</span>
                    <span className="overview-label">Active quests</span>
                  </div>
                  <div className="overview-stat">
                    <span className="overview-value">{overallProgress}%</span>
                    <span className="overview-label">Avg progress</span>
                  </div>
                  <div className="overview-stat">
                    <span className="overview-value">{data.game.longestStreak}d</span>
                    <span className="overview-label">Best streak</span>
                  </div>
                  <div className="overview-stat">
                    <span className="overview-value">{data.game.totalTasksCompleted}</span>
                    <span className="overview-label">Tasks done</span>
                  </div>
                </div>
              </section>
            </aside>

            <section className="quests-section">
              <div className="quests-header">
                <h2>Your Quest Board</h2>
                <GoalForm onSubmit={addGoal} />
              </div>

              {activeGoals.length === 0 ? (
                <div className="empty-state panel">
                  <span className="empty-icon">🗺️</span>
                  <h3>No quests yet</h3>
                  <p>Create your first goal and break it into small, doable steps. Each checkbox earns XP!</p>
                </div>
              ) : (
                <div className="goal-grid">
                  {activeGoals.map((goal) => (
                    <GoalCard
                      key={goal.id}
                      goal={goal}
                      onAddItem={(text) => addChecklistItem(goal.id, text)}
                      onToggleItem={(itemId) => toggleChecklistItem(goal.id, itemId)}
                      onDeleteItem={(itemId) => deleteChecklistItem(goal.id, itemId)}
                      onArchive={() => archiveGoal(goal.id)}
                      onDelete={() => deleteGoal(goal.id)}
                    />
                  ))}
                </div>
              )}

              {archivedGoals.length > 0 && (
                <div className="archived-section">
                  <button
                    type="button"
                    className="archived-toggle"
                    onClick={() => setShowArchived(!showArchived)}
                  >
                    {showArchived ? '▼' : '▶'} Completed & archived ({archivedGoals.length})
                  </button>
                  {showArchived && (
                    <div className="goal-grid goal-grid-archived">
                      {archivedGoals.map((goal) => (
                        <GoalCard
                          key={goal.id}
                          goal={goal}
                          onAddItem={(text) => addChecklistItem(goal.id, text)}
                          onToggleItem={(itemId) => toggleChecklistItem(goal.id, itemId)}
                          onDeleteItem={(itemId) => deleteChecklistItem(goal.id, itemId)}
                          onArchive={() => {}}
                          onDelete={() => deleteGoal(goal.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </>
        ) : (
          <div className="achievements-page">
            <AchievementsPanel achievements={unlockedAchievements} />
          </div>
        )}
      </main>

      <footer className="site-footer">
        <p>Progress saved locally · Complete tasks to earn XP, streaks & achievements</p>
      </footer>

      {toast && <Toast message={toast.message} type={toast.type} />}
      {levelUp && <LevelUpModal level={levelUp} onClose={() => setLevelUp(null)} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}
    </div>
  );
}

export default App;
