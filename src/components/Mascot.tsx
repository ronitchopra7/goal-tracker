import type { GameState, Goal } from '../types';
import { mascotMood } from '../utils/gamification';

interface MascotProps {
  game: GameState;
  goals: Goal[];
  sceneId: string;
  frameId: string;
}

export function Mascot({ game, goals, sceneId, frameId }: MascotProps) {
  const { emoji, message } = mascotMood(game, goals);

  return (
    <div className={`mascot-card ${frameId !== 'frame-none' ? frameId : ''}`}>
      <div className={`mascot-scene ${sceneId}`} aria-hidden="true">
        <div className="mascot-window">
          <div className="mascot-moon" />
          <div className="mascot-star mascot-star-1" />
          <div className="mascot-star mascot-star-2" />
          <div className="mascot-star mascot-star-3" />
        </div>
        <div className="mascot-ground" />
        <div className="mascot-plant mascot-plant-left" />
        <div className="mascot-plant mascot-plant-right" />
        {sceneId === 'scene-campfire' && <div className="scene-campfire-glow" />}
        {sceneId === 'scene-rain' && (
          <>
            <div className="scene-rain-drop scene-rain-1" />
            <div className="scene-rain-drop scene-rain-2" />
            <div className="scene-rain-drop scene-rain-3" />
          </>
        )}
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
