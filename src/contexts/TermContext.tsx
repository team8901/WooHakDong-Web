import { TERMS_MENU } from '@libs/constant/admin';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

type TermContextProps = {
  selectedTermIdx: number;
  setSelectedTermIdx: (idx: number) => void;
};

const TermContext = createContext<TermContextProps>({} as TermContextProps);

export const useTerm = () => {
  return useContext(TermContext);
};

export const TermProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTermIdx, setSelectedTermIdx] = useState(TERMS_MENU.length - 1);

  const contextValue = useMemo(() => ({ selectedTermIdx, setSelectedTermIdx }), [selectedTermIdx]);

  return <TermContext.Provider value={contextValue}>{children}</TermContext.Provider>;
};
