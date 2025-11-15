'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './ConfirmModal.module.css';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void | Promise<void>;
  onClose: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  onClose,
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 0);

      const unmountTimer = setTimeout(() => {
        setMounted(false);
      }, 400);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(unmountTimer);
      };
    }

    const mountTimer = setTimeout(() => {
      setMounted(true);
    }, 0);

    const showTimer = setTimeout(() => {
      setVisible(true);
      contentRef.current?.focus();
    }, 10);

    return () => {
      clearTimeout(mountTimer);
      clearTimeout(showTimer);
    };
  }, [isOpen]);

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') {
      return;
    }

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  const handleAction = useCallback(
    async (callback: () => void | Promise<void>) => {
      try {
        await callback();
        onClose();
      } catch (error) {
        console.error('Modal action error:', error);
      }
    },
    [onClose]
  );

  if (!mounted || typeof window === 'undefined') {
    return null;
  }

  const modalContent = (
    <div
      className={`${css.modalOverlay} ${visible ? css.modalOverlayVisible : ''}`}
      onClick={onClose}
      role='presentation'
    >
      <div
        className={`${css.modalContent} ${visible ? css.modalContentVisible : ''}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role='dialog'
        aria-modal='true'
        aria-labelledby='modal-title'
        aria-describedby='modal-description'
        tabIndex={-1}
        ref={contentRef}
      >
        <button
          className={css.closeButton}
          onClick={onClose}
          type='button'
          aria-label='Закрити модальне вікно'
        >
          <div className={css.closeIcon} />
        </button>

        <header className={css.modalHeader}>
          <h2 id='modal-title' className={css.modalTitle}>
            {title}
          </h2>
          <p id='modal-description' className={css.modalDescription}>
            {description}
          </p>
        </header>

        <footer className={css.modalButtons}>
          <button
            className={css.modalButton}
            onClick={() => {
              handleAction(onCancel);
            }}
            type='button'
          >
            {cancelButtonText}
          </button>
          <button
            className={`${css.modalButton} ${css.modalButtonPrimary}`}
            onClick={() => {
              handleAction(onConfirm);
            }}
            type='button'
          >
            {confirmButtonText}
          </button>
        </footer>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
