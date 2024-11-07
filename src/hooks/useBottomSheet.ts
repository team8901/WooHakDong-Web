import { useState, useRef, useEffect } from 'react';

const useBottomSheet = (onSelectOption: () => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const optionIdx = useRef(-1);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    bottomSheetRef.current.addEventListener('click', (e) => {
      if (e.target === bottomSheetRef.current) {
        setIsOpen(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isOpen) return;

    const isSelectOn = selectedOption !== optionIdx.current;

    if (isSelectOn) {
      onSelectOption();
      optionIdx.current = selectedOption;
    }
  }, [isOpen]);

  return {
    isOpen,
    selectedOption,
    bottomSheetRef,
    setIsOpen,
    setSelectedOption,
  };
};

export default useBottomSheet;
