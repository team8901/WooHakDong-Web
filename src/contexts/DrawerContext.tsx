import Drawer from '@components/Drawer';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface DrawerContextProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps>({} as DrawerContextProps);

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const contextValue = useMemo(() => ({ isOpen, toggleDrawer }), [isOpen]);

  return (
    <DrawerContext.Provider value={contextValue}>
      <Drawer isOpen={isOpen} toggleDrawer={toggleDrawer} />
      {children}
    </DrawerContext.Provider>
  );
};
