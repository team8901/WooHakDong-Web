import Toast from '@components/Toast';
import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface ToastContextProps {
  toastMessage: string;
  setToastMessage: (toastMessage: string) => void;
}

const ToastContext = createContext<ToastContextProps>({} as ToastContextProps);

export const useToast = () => {
  return useContext(ToastContext);
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState('');

  const contextValue = useMemo(() => ({ toastMessage, setToastMessage }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      <Toast toastMessage={toastMessage} setToastMessage={setToastMessage} />
      {children}
    </ToastContext.Provider>
  );
};
