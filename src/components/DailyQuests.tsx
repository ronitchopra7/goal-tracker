import type { DailyQuest } from '../types';

interface DailyQuestsProps {
  quests: DailyQuest[];
  onClaim: (id: string) => void;
}

export function DailyQuests({ quests, onClaim }: DailyQuestsProps) {
  if (quests.length === 0) return null;

  return (
    <section className="panel daily-quests">
      <div className="panel-header">
        <h2>🌅 Daily Quests</h2>
        <span className="panel-badge">Resets at midnight</span>
      </div>
      <ul className="quest-list">
        {quests.map((quest) => {
          const done = quest.progress >= quest.target;
          const percent = Math.min(100, (quest.progress / quest.target) * 100);

          return (
            <li key={quest.id} className={`quest-item ${quest.claimed ? 'quest-claimed' : ''}`}>
              <div className="quest-info">
                <span className="quest-title">{quest.title}</span>
                <span className="quest-progress-text">
                  {quest.progress}/{quest.target}
                </span>
              </div>
              <div className="progress-track progress-track-sm">
                <div className="progress-fill progress-fill-quest" style={{ width: `${percent}%` }} />
              </div>
              <div className="quest-actions">
                <span className="quest-reward">+{quest.xpReward} XP</span>
                <button
                  type="button"
                  className="btn btn-sm btn-claim"
                  disabled={!done || quest.claimed}
                  onClick={() => onClaim(quest.id)}
                >
                  {quest.claimed ? 'Claimed' : done ? 'Claim' : 'In progress'}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
