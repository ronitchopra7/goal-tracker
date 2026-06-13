import type { Achievement } from '../types';
import { ACHIEVEMENTS } from '../utils/gamification';

interface AchievementsPanelProps {
  achievements: Achievement[];
}

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  const unlockedIds = new Set(achievements.map((a) => a.id));

  return (
    <section className="panel achievements-panel">
      <div className="panel-header">
        <h2>🏅 Achievements</h2>
        <span className="panel-badge">
          {achievements.length}/{ACHIEVEMENTS.length}
        </span>
      </div>
      <div className="achievement-grid">
        {ACHIEVEMENTS.map((def) => {
          const unlocked = unlockedIds.has(def.id);
          const achievement = achievements.find((a) => a.id === def.id);

          return (
            <div
              key={def.id}
              className={`achievement-card ${unlocked ? 'achievement-unlocked' : 'achievement-locked'}`}
              title={def.description}
            >
              <span className="achievement-icon">{unlocked ? def.icon : '🔒'}</span>
              <span className="achievement-title">{def.title}</span>
              <span className="achievement-desc">{def.description}</span>
              {achievement?.unlockedAt && (
                <span className="achievement-date">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
