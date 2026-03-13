import styles from './ConfirmDialog.module.css';

interface Props {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  message,
  confirmLabel = 'Yes',
  cancelLabel = 'No, Go Back',
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Confirmation">
      <div className={styles.box}>
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={styles.confirmBtn} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
