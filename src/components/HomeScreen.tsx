import './HomeScreen.css';
import { Header } from './Header';

type Screen = 'home' | 'phone' | 'messages' | 'emergency' | 'settings';

interface HomeScreenProps {
  onNavigate: (screen: Screen) => void;
}

const HOME_BUTTONS: { id: Screen; label: string; icon: string; color: string; ariaLabel: string }[] = [
  { id: 'phone',     label: 'Phone',     icon: '📞', color: 'var(--color-phone)',     ariaLabel: 'Open Phone and Contacts' },
  { id: 'messages',  label: 'Messages',  icon: '💬', color: 'var(--color-messages)',  ariaLabel: 'Open Text Messages' },
  { id: 'emergency', label: 'Emergency', icon: '🆘', color: 'var(--color-emergency)', ariaLabel: 'Open Emergency Help screen' },
  { id: 'settings',  label: 'Settings',  icon: '⚙️', color: 'var(--color-settings)',  ariaLabel: 'Open Settings' },
];

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="screen">
      <Header title="Home" showClock />

      <div className="content home-content">
        <p className="home-date" aria-label={`Today is ${today}`}>{today}</p>

        <div className="home-grid" role="list">
          {HOME_BUTTONS.map(({ id, label, icon, color, ariaLabel }) => (
            <button
              key={id}
              className="home-btn"
              style={{ background: color }}
              onClick={() => onNavigate(id)}
              aria-label={ariaLabel}
              role="listitem"
            >
              <span className="home-btn__icon" aria-hidden="true">{icon}</span>
              <span className="home-btn__label">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
