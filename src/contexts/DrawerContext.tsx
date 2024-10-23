import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface DrawerContextProps {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps>({} as DrawerContextProps);

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const contextValue = useMemo(() => ({ open, toggleDrawer }), [open]);

  return <DrawerContext.Provider value={contextValue}>{children}</DrawerContext.Provider>;
};
