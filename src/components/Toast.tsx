interface ToastProps {
  message: string;
  type: 'xp' | 'achievement' | 'level';
}

export function Toast({ message, type }: ToastProps) {
  return (
    <div className={`toast toast-${type}`} role="status" aria-live="polite">
      {message}
    </div>
  );
}
