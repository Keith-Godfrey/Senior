import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import styles from './EmergencyScreen.module.css';

interface Props {
  onBack: () => void;
}

export default function EmergencyScreen({ onBack }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [toast, setToast] = useState('');

  function triggerSOS() {
    setConfirming(false);
    setToast('🚨 Emergency services called! Help is on the way.');
    setTimeout(() => setToast(''), 5000);
  }

  return (
    <div className={styles.screen}>
      <Header title="Emergency" onBack={onBack} />
      <main className={styles.main}>
        <p className={styles.info}>
          Press the button below to immediately call emergency services (911).
        </p>
        <button
          className={styles.sosBtn}
          onClick={() => setConfirming(true)}
          aria-label="Call emergency services"
        >
          🆘
          <span>CALL 911</span>
        </button>
        <div className={styles.cards}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>👩</span>
            <span className={styles.cardLabel}>Jane (Daughter)</span>
            <span className={styles.cardNumber}>555-0101</span>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🩺</span>
            <span className={styles.cardLabel}>Dr. Smith</span>
            <span className={styles.cardNumber}>555-0200</span>
          </div>
        </div>
      </main>

      {confirming && (
        <ConfirmDialog
          message="Call 911 now? This will alert emergency services."
          confirmLabel="Yes, Call 911"
          cancelLabel="No, Cancel"
          onConfirm={triggerSOS}
          onCancel={() => setConfirming(false)}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}
