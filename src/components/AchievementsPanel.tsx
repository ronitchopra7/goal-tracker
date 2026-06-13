import type { Achievement, AchievementTier } from '../types';
import { ACHIEVEMENTS } from '../utils/gamification';

interface AchievementsPanelProps {
  achievements: Achievement[];
}

const TIER_LABEL: Record<AchievementTier, string> = {
  common: 'Common',
  rare: 'Rare',
  epic: 'Epic',
  legendary: 'Legendary',
};

const TIER_ORDER: AchievementTier[] = ['legendary', 'epic', 'rare', 'common'];

export function AchievementsPanel({ achievements }: AchievementsPanelProps) {
  const unlockedIds = new Set(achievements.map((a) => a.id));
  const unlockedCount = achievements.length;
  const secretCount = ACHIEVEMENTS.filter((a) => a.secret).length;

  const grouped = TIER_ORDER.map((tier) => ({
    tier,
    items: ACHIEVEMENTS.filter((a) => (a.tier ?? 'common') === tier),
  })).filter((g) => g.items.length > 0);

  return (
    <section className="panel achievements-panel">
      <div className="panel-header">
        <h2>🏅 Achievements</h2>
        <span className="panel-badge">
          {unlockedCount}/{ACHIEVEMENTS.length}
        </span>
      </div>

      <p className="achievements-intro">
        {secretCount} secret badges are hidden until you unlock them. Higher tiers grant more coins!
      </p>

      {grouped.map(({ tier, items }) => (
        <div key={tier} className="achievement-tier-group">
          <h3 className={`achievement-tier-label tier-${tier}`}>{TIER_LABEL[tier]}</h3>
          <div className="achievement-grid">
            {items.map((def) => {
              const unlocked = unlockedIds.has(def.id);
              const achievement = achievements.find((a) => a.id === def.id);
              const hidden = def.secret && !unlocked;

              return (
                <div
                  key={def.id}
                  className={`achievement-card tier-${def.tier ?? 'common'} ${unlocked ? 'achievement-unlocked' : 'achievement-locked'} ${hidden ? 'achievement-secret' : ''}`}
                  title={hidden ? 'Secret achievement' : def.description}
                >
                  <span className="achievement-icon">{hidden ? '❓' : unlocked ? def.icon : '🔒'}</span>
                  <span className="achievement-title">{hidden ? '???' : def.title}</span>
                  <span className="achievement-desc">{hidden ? 'Keep playing to discover this one…' : def.description}</span>
                  {achievement?.unlockedAt && (
                    <span className="achievement-date">
                      {new Date(achievement.unlockedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </section>
  );
}
