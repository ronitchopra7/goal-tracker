import { useState } from 'react';
import type { GoalCategory, GoalPriority } from '../types';
import { CATEGORY_META } from '../types';

interface GoalFormProps {
  onSubmit: (
    title: string,
    description: string,
    category: GoalCategory,
    priority: GoalPriority,
    targetDate?: string,
  ) => void;
}

export function GoalForm({ onSubmit }: GoalFormProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GoalCategory>('personal');
  const [priority, setPriority] = useState<GoalPriority>('medium');
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit(title.trim(), description.trim(), category, priority, targetDate || undefined);
    setTitle('');
    setDescription('');
    setCategory('personal');
    setPriority('medium');
    setTargetDate('');
    setOpen(false);
  };

  if (!open) {
    return (
      <button type="button" className="btn btn-primary btn-new-goal" onClick={() => setOpen(true)}>
        <span className="btn-icon">+</span>
        Start a New Quest
      </button>
    );
  }

  return (
    <form className="goal-form panel" onSubmit={handleSubmit}>
      <div className="panel-header">
        <h2>✨ New Quest</h2>
        <button type="button" className="btn-icon-only" onClick={() => setOpen(false)} aria-label="Close">
          ×
        </button>
      </div>

      <label className="field">
        <span>Quest name</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Run a 5K, Learn Spanish..."
          autoFocus
          required
        />
      </label>

      <label className="field">
        <span>Description (optional)</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Why does this matter to you?"
          rows={2}
        />
      </label>

      <div className="field-row">
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value as GoalCategory)}>
            {(Object.keys(CATEGORY_META) as GoalCategory[]).map((key) => (
              <option key={key} value={key}>
                {CATEGORY_META[key].icon} {CATEGORY_META[key].label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Priority</span>
          <select value={priority} onChange={(e) => setPriority(e.target.value as GoalPriority)}>
            <option value="low">Low (+10 XP)</option>
            <option value="medium">Medium (+20 XP)</option>
            <option value="high">High (+35 XP)</option>
          </select>
        </label>
      </div>

      <label className="field">
        <span>Target date (optional)</span>
        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
      </label>

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Create Quest
        </button>
      </div>
    </form>
  );
}
