interface LevelUpModalProps {
  level: number;
  onClose: () => void;
}

export function LevelUpModal({ level, onClose }: LevelUpModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose} role="presentation">
      <div className="modal level-up-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="level-up-sparkles" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="sparkle" style={{ '--i': i } as React.CSSProperties} />
          ))}
        </div>
        <span className="level-up-icon">⭐</span>
        <h2>Level Up!</h2>
        <p className="level-up-number">Level {level}</p>
        <p className="level-up-text">Your dedication is paying off. Keep going!</p>
        <button type="button" className="btn btn-primary" onClick={onClose}>
          Continue
        </button>
      </div>
    </div>
  );
}
