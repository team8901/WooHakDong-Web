import { useState, useRef, useEffect } from 'react';

const useBottomSheet = ({ onSelectOption }: Readonly<{ onSelectOption: () => void }>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const optionIdx = useRef(-1);
  const bottomSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bottomSheetRef.current) return;
    const bottomSheetNode = bottomSheetRef.current;

    const handleClickOutside = (e: MouseEvent) => {
      if (e.target === bottomSheetNode) {
        setIsOpen(false);
      }
    };

    bottomSheetNode.addEventListener('click', handleClickOutside);

    return () => {
      bottomSheetNode.removeEventListener('click', handleClickOutside);
    };
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
