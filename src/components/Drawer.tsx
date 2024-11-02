import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

type DrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Drawer = ({ isOpen, toggleDrawer }: Readonly<DrawerProps>) => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogRef.current) return;

    dialogRef.current.show();
  }, []);

  return (
    <>
      <dialog
        ref={dialogRef}
        aria-hidden={!isOpen}
        className={`absolute left-0 top-0 z-50 h-full w-[55%] transform bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}`}
      >
        <div className="flex flex-col gap-[20px] px-[20px] py-[103px]">
          <Title1 text={clubEnglishName || ''} />

          <button className="flex items-center justify-between">
            <Body1 text="회원" />
            <ChevronRightGrayIcon />
          </button>

          <div className="h-[1px] bg-lightGray" />

          <button className="flex items-center justify-between">
            <Body1 text="물품" />
            <ChevronRightGrayIcon />
          </button>
          <button className="flex items-center justify-between">
            <Body1 text="나의 대여 물품" />
            <ChevronRightGrayIcon />
          </button>

          <div className="h-[1px] bg-lightGray" />

          <button className="flex items-center justify-between">
            <Body1 text="회비" />
            <ChevronRightGrayIcon />
          </button>

          <div className="h-[1px] bg-lightGray" />

          <button className="flex items-center justify-between">
            <Body1 text="일정" />
            <ChevronRightGrayIcon />
          </button>
        </div>
      </dialog>
      <button
        className={`absolute left-0 top-0 z-40 h-full w-full bg-[#20202040] transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'} cursor-default`}
        onClick={toggleDrawer}
      />
    </>
  );
};

export default Drawer;
