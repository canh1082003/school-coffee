// Modal.tsx
import React, { useEffect, useState } from 'react';

export const Modal: React.FC = () => {
  const [modal, setModal] = useState<HTMLElement | null>(null);
  const [btn, setBtn] = useState<HTMLElement | null>(null);
  const [span, setSpan] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const modalElement = document.getElementById('myModal');
    const btnElement = document.getElementById('openModalButton');
    const spanElement = document.getElementById('closeModalButton');

    setModal(modalElement);
    setBtn(btnElement);
    setSpan(spanElement);
  }, []);

  const openModal = () => {
    if (modal) {
      modal.style.display = 'block';
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.style.display = 'none';
    }
  };

  useEffect(() => {
    if (btn) {
      btn.onclick = openModal;
    }

    if (span) {
      span.onclick = closeModal;
    }

    window.onclick = (event: MouseEvent) => {
      if (modal && event.target === modal) {
        modal.style.display = 'none';
      }
    };

    return () => {
      if (btn) {
        btn.onclick = null;
      }

      if (span) {
        span.onclick = null;
      }
    };
  }, [modal, btn, span]);

  return null;
};
