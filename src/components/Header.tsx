import { useClock } from '../hooks/useClock';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  showClock?: boolean;
}

export function Header({ title, onBack, showClock = true }: HeaderProps) {
  const time = useClock();

  return (
    <header className="header">
      {onBack && (
        <button
          className="header__back"
          onClick={onBack}
          aria-label="Go back"
          style={{ width: 52, minHeight: 52 }}
        >
          ◀
        </button>
      )}
      <span className="header__title">{title}</span>
      {showClock && <span className="header__time" aria-label={`Time: ${time}`}>{time}</span>}
    </header>
  );
}
