import { xpProgressInLevel } from '../utils/gamification';

interface StatsBarProps {
  level: number;
  xp: number;
  streak: number;
  coins: number;
  tasksToday: number;
}

export function StatsBar({ level, xp, streak, coins, tasksToday }: StatsBarProps) {
  const progress = xpProgressInLevel(xp);

  return (
    <div className="stats-bar">
      <div className="stat-pill stat-level">
        <span className="stat-icon">⚔️</span>
        <div className="stat-content">
          <span className="stat-label">Level</span>
          <span className="stat-value">{level}</span>
        </div>
      </div>

      <div className="stat-xp-wrap">
        <div className="stat-xp-header">
          <span className="stat-label">Experience</span>
          <span className="stat-xp-text">
            {progress.current} / {progress.needed} XP
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill progress-fill-xp" style={{ width: `${progress.percent}%` }} />
        </div>
      </div>

      <div className="stat-pill stat-streak">
        <span className="stat-icon">🔥</span>
        <div className="stat-content">
          <span className="stat-label">Streak</span>
          <span className="stat-value">{streak}d</span>
        </div>
      </div>

      <div className="stat-pill stat-coins">
        <span className="stat-icon">🪙</span>
        <div className="stat-content">
          <span className="stat-label">Coins</span>
          <span className="stat-value">{coins}</span>
        </div>
      </div>

      <div className="stat-pill stat-today">
        <span className="stat-icon">✓</span>
        <div className="stat-content">
          <span className="stat-label">Today</span>
          <span className="stat-value">{tasksToday}</span>
        </div>
      </div>
    </div>
  );
}
