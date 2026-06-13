import type { GameState, Goal } from '../types';
import { mascotMood } from '../utils/gamification';

interface MascotProps {
  game: GameState;
  goals: Goal[];
}

export function Mascot({ game, goals }: MascotProps) {
  const { emoji, message } = mascotMood(game, goals);

  return (
    <div className="mascot-card">
      <div className="mascot-scene" aria-hidden="true">
        <div className="mascot-window">
          <div className="mascot-moon" />
          <div className="mascot-star mascot-star-1" />
          <div className="mascot-star mascot-star-2" />
          <div className="mascot-star mascot-star-3" />
        </div>
        <div className="mascot-ground" />
        <div className="mascot-plant mascot-plant-left" />
        <div className="mascot-plant mascot-plant-right" />
      </div>
      <div className="mascot-body">
        <span className="mascot-emoji" role="img" aria-label="mascot">
          {emoji}
        </span>
        <p className="mascot-message">{message}</p>
      </div>
    </div>
  );
}
