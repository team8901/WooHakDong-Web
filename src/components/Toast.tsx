import Caption2 from '@components/Caption2';
import { useEffect } from 'react';

type ToastProps = { toastMessage: string; setToastMessage: (toastMessage: string) => void };

const Toast = ({ toastMessage, setToastMessage }: Readonly<ToastProps>) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 1500);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <>
      {toastMessage !== '' && (
        <div className="absolute left-1/2 top-1/2 z-50 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center p-[40px]">
          <div className="flex items-center justify-center rounded-[30px] bg-[#6C6E75CC] px-[12px] py-[8px]">
            <Caption2 text={toastMessage} className="text-center text-white" />
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
