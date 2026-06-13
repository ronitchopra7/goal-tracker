interface HelpModalProps {
  onClose: () => void;
}

const SECTIONS = [
  {
    icon: '🎯',
    title: 'Quests & Checklists',
    body: 'Create a quest for any goal, then break it into small steps. Check off each step as you finish it — progress saves automatically in your browser.',
  },
  {
    icon: '⚔️',
    title: 'XP & Levels',
    body: 'Each task earns XP based on priority: Low +10, Medium +20, High +35. XP fills your level bar — higher levels need more XP. You only earn XP the first time you complete a task (unchecking and redoing won’t farm XP).',
  },
  {
    icon: '🔥',
    title: 'Streaks',
    body: 'Complete at least one task each day to grow your streak. Missing a day resets it to zero. Your best streak is tracked in the Overview panel.',
  },
  {
    icon: '🪙',
    title: 'Coins & Shop',
    body: 'Earn +5 coins per task, +50 when you fully finish a quest, +15 when you claim a daily quest, and +25 to +75 from achievements. Spend coins in the Shop tab on themes, mascot scenes, frames, checkmark styles, and title badges!',
  },
  {
    icon: '🌅',
    title: 'Daily Quests',
    body: 'Three bonus challenges refresh every day: complete tasks, keep your streak, and finish a high-priority task. Hit the target, then press Claim to collect bonus XP.',
  },
  {
    icon: '🏅',
    title: 'Achievements',
    body: 'Unlock 46 badges across Common, Rare, Epic, and Legendary tiers — streaks, task milestones, secret time-based feats, and more. Some are hidden until you discover them. Higher tiers award more coins!',
  },
  {
    icon: '💎',
    title: 'Finishing a Quest',
    body: 'When every step on a quest is checked off, you get +100 bonus XP and +50 coins. Archive it to move it out of your active board.',
  },
  {
    icon: '🪴',
    title: 'Your Mascot',
    body: 'The cozy companion in the sidebar reacts to your progress — encouraging you when you’re starting out and celebrating when you’re on a roll.',
  },
];

export function HelpModal({ onClose }: HelpModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div
        className="modal help-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-title"
      >
        <div className="help-modal-header">
          <div>
            <h2 id="help-title">How QuestLog Works</h2>
            <p className="help-modal-subtitle">Everything you need to stay on track</p>
          </div>
          <button type="button" className="btn-icon-only" onClick={onClose} aria-label="Close help">
            ×
          </button>
        </div>

        <div className="help-sections">
          {SECTIONS.map((section) => (
            <div key={section.title} className="help-section">
              <span className="help-section-icon" aria-hidden="true">
                {section.icon}
              </span>
              <div>
                <h3>{section.title}</h3>
                <p>{section.body}</p>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="btn btn-primary help-close-btn" onClick={onClose}>
          Got it!
        </button>
      </div>
    </div>
  );
}
