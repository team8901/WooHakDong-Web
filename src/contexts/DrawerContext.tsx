import { createContext, useContext, useState, ReactNode } from "react";

interface DrawerContextProps {
  open: boolean;
  toggleDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextProps>(
  {} as DrawerContextProps
);

export const useDrawer = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <DrawerContext.Provider value={{ open, toggleDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};
