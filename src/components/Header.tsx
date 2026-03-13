import styles from './Header.module.css';

interface Props {
  title: string;
  onBack?: () => void;
}

export default function Header({ title, onBack }: Props) {
  return (
    <header className={styles.header}>
      {onBack ? (
        <button
          className={styles.backBtn}
          onClick={onBack}
          aria-label="Go back"
        >
          ← Back
        </button>
      ) : (
        <div className={styles.spacer} />
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.spacer} />
    </header>
  );
}
