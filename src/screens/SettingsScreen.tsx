import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import styles from './SettingsScreen.module.css';

interface Props {
  onBack: () => void;
}

export default function SettingsScreen({ onBack }: Props) {
  const [textSize, setTextSize] = useState<'normal' | 'large' | 'extra-large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [toast, setToast] = useState('');

  function applyTextSize(size: typeof textSize) {
    setTextSize(size);
    const sizeMap = { 'normal': '22px', 'large': '26px', 'extra-large': '32px' };
    document.documentElement.style.setProperty('--font-size-base', sizeMap[size]);
    showToast('Text size updated ✓');
  }

  function toggleHighContrast() {
    const next = !highContrast;
    setHighContrast(next);
    if (next) {
      document.documentElement.style.setProperty('--color-text', '#000000');
      document.documentElement.style.setProperty('--color-text-secondary', '#000000');
      document.documentElement.style.setProperty('--color-surface', '#ffffff');
      document.documentElement.style.setProperty('--color-border', '#000000');
    } else {
      document.documentElement.style.setProperty('--color-text', '#111111');
      document.documentElement.style.setProperty('--color-text-secondary', '#444444');
      document.documentElement.style.setProperty('--color-surface', '#f5f5f5');
      document.documentElement.style.setProperty('--color-border', '#bbbbbb');
    }
    showToast(`High contrast ${next ? 'on' : 'off'} ✓`);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  }

  return (
    <div className={styles.screen}>
      <Header title="Settings" onBack={onBack} />
      <main className={styles.main}>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Text Size</h2>
          <div className={styles.row}>
            {(['normal', 'large', 'extra-large'] as const).map((s) => (
              <button
                key={s}
                className={`${styles.sizeBtn} ${textSize === s ? styles.active : ''}`}
                onClick={() => applyTextSize(s)}
                aria-pressed={textSize === s}
              >
                {s === 'normal' ? 'Normal' : s === 'large' ? 'Large' : 'Extra Large'}
              </button>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contrast</h2>
          <button
            className={`${styles.toggleBtn} ${highContrast ? styles.on : ''}`}
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
          >
            {highContrast ? '🌑 High Contrast: On' : '🌕 High Contrast: Off'}
          </button>
        </section>

      </main>
      {toast && <Toast message={toast} />}
    </div>
  );
}
