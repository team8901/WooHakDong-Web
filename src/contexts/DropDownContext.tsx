import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type DropDownContextProps = {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
};

const DropDownContext = createContext<DropDownContextProps>({} as DropDownContextProps);

export const useDropDown = () => {
  return useContext(DropDownContext);
};

export const DropDownProvider = ({ children }: { children: ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const contextValue = useMemo(() => ({ isDropdownOpen, toggleDropdown }), [isDropdownOpen]);

  return <DropDownContext.Provider value={contextValue}>{children}</DropDownContext.Provider>;
};
