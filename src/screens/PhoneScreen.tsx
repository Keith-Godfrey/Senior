import { useState } from 'react';
import Header from '../components/Header';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import styles from './PhoneScreen.module.css';

interface Contact {
  name: string;
  number: string;
  emoji: string;
}

const CONTACTS: Contact[] = [
  { name: 'Jane (Daughter)', number: '555-0101', emoji: '👩' },
  { name: 'Tom (Son)',        number: '555-0102', emoji: '👨' },
  { name: 'Dr. Smith',       number: '555-0200', emoji: '🩺' },
  { name: 'Mary (Friend)',   number: '555-0303', emoji: '👵' },
];

interface Props {
  onBack: () => void;
}

export default function PhoneScreen({ onBack }: Props) {
  const [calling, setCalling] = useState<Contact | null>(null);
  const [toast, setToast] = useState('');

  function startCall(contact: Contact) {
    setCalling(contact);
  }

  function confirmCall() {
    const name = calling!.name;
    setCalling(null);
    setToast(`Calling ${name}…`);
    setTimeout(() => setToast(''), 3000);
  }

  return (
    <div className={styles.screen}>
      <Header title="Phone" onBack={onBack} />
      <main className={styles.main}>
        <p className={styles.hint}>Tap a name to call</p>
        <ul className={styles.list} role="list">
          {CONTACTS.map((c) => (
            <li key={c.number}>
              <button
                className={styles.contact}
                onClick={() => startCall(c)}
                aria-label={`Call ${c.name}`}
              >
                <span className={styles.avatar} aria-hidden="true">{c.emoji}</span>
                <span className={styles.info}>
                  <span className={styles.name}>{c.name}</span>
                  <span className={styles.number}>{c.number}</span>
                </span>
                <span className={styles.callIcon} aria-hidden="true">📞</span>
              </button>
            </li>
          ))}
        </ul>
      </main>

      {calling && (
        <ConfirmDialog
          message={`Call ${calling.name}?`}
          confirmLabel="Yes, Call Now"
          cancelLabel="No, Go Back"
          onConfirm={confirmCall}
          onCancel={() => setCalling(null)}
        />
      )}

      {toast && <Toast message={toast} />}
    </div>
  );
}
