import { useState, useRef, useEffect } from 'react';

type UseBottomSheetProps = {
  onSelectOption: (selectedOptions: number | number[]) => void;
  multiple?: boolean;
};

const useBottomSheet = ({ onSelectOption, multiple = false }: Readonly<UseBottomSheetProps>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | number[]>(multiple ? [] : 0);
  const optionIdx = useRef<number | number[]>(multiple ? [] : -1);
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

    const isSelectOn = multiple
      ? (selectedOption as number[]).length !== (optionIdx.current as number[]).length ||
        (selectedOption as number[]).some((option, index) => option !== (optionIdx.current as number[])[index])
      : selectedOption !== optionIdx.current;

    if (isSelectOn) {
      onSelectOption(selectedOption);
      optionIdx.current = multiple ? [...(selectedOption as number[])] : selectedOption;
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
