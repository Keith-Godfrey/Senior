import styles from './Toast.module.css';

interface Props {
  message: string;
}

export default function Toast({ message }: Props) {
  return (
    <div className={styles.toast} role="status" aria-live="polite">
      {message}
    </div>
  );
}
