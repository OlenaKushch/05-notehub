import { createPortal } from "react-dom";

import { useEffect } from "react";
import css from './Modal.module.css';


interface ModalProps {
  onClose: () => void,
  children: React.ReactNode;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;

export default function Modal({ onClose, children }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {onClose();}
  };

  return createPortal(
    <div
      className={css.backdrop}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}

    >
      <div className={css.modal}>
        {children}
      </div>
    </div>, modalRoot);
}
