interface ChecklistItemRowProps {
  text: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export function ChecklistItemRow({ text, completed, onToggle, onDelete }: ChecklistItemRowProps) {
  return (
    <li className={`checklist-item ${completed ? 'checklist-done' : ''}`}>
      <button
        type="button"
        className="checklist-check"
        onClick={onToggle}
        aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
      >
        <span className="checklist-box">{completed && '✓'}</span>
      </button>
      <span className="checklist-text">{text}</span>
      <button
        type="button"
        className="btn-icon-only checklist-delete"
        onClick={onDelete}
        aria-label="Delete task"
      >
        ×
      </button>
    </li>
  );
}
