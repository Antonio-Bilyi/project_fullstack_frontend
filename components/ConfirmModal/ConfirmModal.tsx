'use client';

import React, { useEffect, useState } from 'react';
import styles from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title,
  description,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  onClose,
}) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Анімація відкриття/закриття
  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      setTimeout(() => setVisible(true), 10);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setMounted(false), 400); // Під час анімації
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape + блокування скролу
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const handleAction = (callback: () => void) => {
    callback();
    onClose();
  };

  return (
    <div
      className={`${styles.modalOverlay} ${visible ? styles.modalOverlayVisible : ''}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className={`${styles.modalContent} ${visible ? styles.modalContentVisible : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          type="button"
          aria-label="Закрити модальне вікно"
        >
          <div className={styles.closeIcon} />
        </button>

        <header className={styles.modalHeader}>
          <h2 id="modal-title" className={styles.modalTitle}>{title}</h2>
          <p id="modal-description" className={styles.modalDescription}>{description}</p>
        </header>

        <footer className={styles.modalButtons}>
          <button
            className={styles.modalButton}
            onClick={() => handleAction(onCancel)}
            type="button"
          >
            {cancelButtonText}
          </button>
          <button
            className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
            onClick={() => handleAction(onConfirm)}
            type="button"
          >
            {confirmButtonText}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmModal;
