import { useState, useRef, useEffect } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (!modalRef.current) return;

    modalRef.current.addEventListener('click', (e) => {
      if (e.target === modalRef.current) {
        setIsModalOpen(false);
      }
    });
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
    modalRef,
  };
};

export default useModal;
