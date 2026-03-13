interface ToastProps {
  message: string;
  id: number;
}

export function Toast({ message, id }: ToastProps) {
  return (
    <div
      key={id}
      className="toast"
      role="status"
      aria-live="polite"
    >
      ✓ {message}
    </div>
  );
}
