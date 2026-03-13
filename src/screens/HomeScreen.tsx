import Header from '../components/Header';
import styles from './HomeScreen.module.css';

export type Screen = 'home' | 'phone' | 'messages' | 'emergency' | 'settings';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const tiles: { id: Screen; emoji: string; label: string; variant: 'primary' | 'danger' | 'secondary' }[] = [
  { id: 'phone',     emoji: '📞', label: 'Phone',     variant: 'primary' },
  { id: 'messages',  emoji: '💬', label: 'Messages',  variant: 'primary' },
  { id: 'emergency', emoji: '🆘', label: 'Emergency', variant: 'danger' },
  { id: 'settings',  emoji: '⚙️', label: 'Settings',  variant: 'secondary' },
];

export default function HomeScreen({ onNavigate }: Props) {
  return (
    <div className={styles.screen}>
      <Header title="Home" />
      <main className={styles.main}>
        <p className={styles.greeting}>Good morning! 👋</p>
        <div className={styles.grid}>
          {tiles.map((t) => (
            <button
              key={t.id}
              className={`${styles.tile} ${styles[t.variant]}`}
              onClick={() => onNavigate(t.id)}
              aria-label={t.label}
            >
              <span className={styles.emoji} aria-hidden="true">{t.emoji}</span>
              <span className={styles.label}>{t.label}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
