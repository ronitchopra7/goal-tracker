import { useState } from 'react';
import type { Goal } from '../types';
import { CATEGORY_META, PRIORITY_XP } from '../types';
import { goalProgress, isGoalComplete } from '../utils/gamification';
import { ChecklistItemRow } from './ChecklistItemRow';

interface GoalCardProps {
  goal: Goal;
  onAddItem: (text: string) => void;
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onArchive: () => void;
  onDelete: () => void;
}

export function GoalCard({
  goal,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onArchive,
  onDelete,
}: GoalCardProps) {
  const [newTask, setNewTask] = useState('');
  const [expanded, setExpanded] = useState(true);

  const meta = CATEGORY_META[goal.category];
  const progress = goalProgress(goal);
  const complete = isGoalComplete(goal);
  const doneCount = goal.checklist.filter((i) => i.completed).length;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    onAddItem(newTask.trim());
    setNewTask('');
  };

  const daysLeft = goal.targetDate
    ? Math.ceil((new Date(goal.targetDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <article
      className={`goal-card ${complete ? 'goal-complete' : ''}`}
      style={{ '--category-color': meta.color } as React.CSSProperties}
    >
      <header className="goal-header">
        <button
          type="button"
          className="goal-expand"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          <span className="goal-category-badge">
            {meta.icon} {meta.label}
          </span>
          <h3 className="goal-title">{goal.title}</h3>
          {complete && <span className="goal-complete-badge">Complete!</span>}
        </button>
        <div className="goal-meta">
          <span className={`priority-tag priority-${goal.priority}`}>
            {goal.priority} · +{PRIORITY_XP[goal.priority]} XP
          </span>
          {daysLeft !== null && (
            <span className={`deadline-tag ${daysLeft < 0 ? 'deadline-overdue' : daysLeft <= 3 ? 'deadline-soon' : ''}`}>
              {daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : daysLeft === 0 ? 'Due today' : `${daysLeft}d left`}
            </span>
          )}
        </div>
      </header>

      {goal.description && <p className="goal-description">{goal.description}</p>}

      <div className="goal-progress-wrap">
        <div className="goal-progress-header">
          <span>
            {doneCount}/{goal.checklist.length} tasks
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill progress-fill-goal" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {expanded && (
        <div className="goal-body">
          <ul className="checklist">
            {goal.checklist.map((item) => (
              <ChecklistItemRow
                key={item.id}
                text={item.text}
                completed={item.completed}
                onToggle={() => onToggleItem(item.id)}
                onDelete={() => onDeleteItem(item.id)}
              />
            ))}
          </ul>

          <form className="checklist-add" onSubmit={handleAdd}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a step..."
            />
            <button type="submit" className="btn btn-sm btn-secondary" disabled={!newTask.trim()}>
              Add
            </button>
          </form>

          <div className="goal-actions">
            {complete && (
              <button type="button" className="btn btn-sm btn-ghost" onClick={onArchive}>
                Archive
              </button>
            )}
            <button type="button" className="btn btn-sm btn-danger-ghost" onClick={onDelete}>
              Delete quest
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
