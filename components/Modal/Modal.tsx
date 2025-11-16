"use client";

import { ReactNode, useEffect } from "react";
import styles from "./Modal.module.css";

interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary";
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  children?: ReactNode;
  buttons?: ModalButton[];
  showCloseButton?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  children,
  buttons = [],
  showCloseButton = true,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {showCloseButton && (
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            ×
          </button>
        )}

        {title && <h2 className={styles.modalTitle}>{title}</h2>}

        {message && <p className={styles.modalMessage}>{message}</p>}

        {children}

        {buttons.length > 0 && (
          <div className={styles.modalButtons}>
            {buttons.map((button, index) => (
              <button
                key={index}
                className={
                  button.variant === "primary"
                    ? styles.modalButton
                    : styles.modalButtonSecondary
                }
                onClick={button.onClick}
              >
                {button.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}