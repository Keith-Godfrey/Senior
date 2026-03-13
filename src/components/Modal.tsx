import type { ReactNode } from 'react';

interface ModalProps {
  title: string;
  body?: string;
  children?: ReactNode;
  onClose?: () => void;
}

export function Modal({ title, body, children, onClose }: ModalProps) {
  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <p id="modal-title" className="modal__title">{title}</p>
        {body && <p className="modal__body">{body}</p>}
        <div className="modal__actions">{children}</div>
      </div>
    </div>
  );
}
