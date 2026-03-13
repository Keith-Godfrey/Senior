import type { ReactNode } from 'react';
import styles from './PhoneChrome.module.css';

interface Props {
  children: ReactNode;
}

export default function PhoneChrome({ children }: Props) {
  return (
    <div className={styles.shell}>
      <div className={styles.phone}>
        {/* Status bar */}
        <div className={styles.statusBar} aria-hidden="true">
          <span>12:00</span>
          <span>🔋</span>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
