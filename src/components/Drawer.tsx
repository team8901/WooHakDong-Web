import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import useGetClubName from '@hooks/club/useGetClubName';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

type DrawerProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Drawer = ({ isOpen, toggleDrawer }: Readonly<DrawerProps>) => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useCustomNavigate();
  const { data: clubName } = useGetClubName({ clubEnglishName: clubEnglishName ?? '' });

  useEffect(() => {
    if (!dialogRef.current) return;

    dialogRef.current.setAttribute('open', 'true');
  }, []);

  const handleNavigate = (path: string) => {
    navigate(path);
    toggleDrawer();
  };

  const DRAWER_MENU = [
    { label: '홈', path: ROUTE.ROOT },
    { divider: true },
    { label: '회원', path: ROUTE.MEMBER },
    { divider: true },
    { label: '물품', path: ROUTE.ITEM },
    { label: '나의 대여 물품', path: ROUTE.ITEM_MY },
    { divider: true },
    { label: '회비', path: ROUTE.DUES },
    { divider: true },
    { label: '일정', path: ROUTE.SCHEDULE },
    { label: '모임', path: ROUTE.GROUP },
    { divider: true },
    { label: '설정', path: ROUTE.SETTING },
  ];

  return (
    <>
      <dialog
        ref={dialogRef}
        className={`absolute left-0 top-0 z-50 h-full w-[55%] transform bg-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0 shadow-lg' : '-translate-x-full'}`}
      >
        <div className="flex flex-col gap-[20px] px-[20px] py-[103px]">
          <Title1 text={clubName ?? ''} />

          {DRAWER_MENU.map((menu, index) => (
            <div className="flex flex-col gap-[20px]" key={index}>
              {menu.divider ? (
                <div className="h-[1px] bg-lightGray" />
              ) : (
                <button className="flex items-center justify-between" onClick={() => handleNavigate(menu.path!)}>
                  <Body1 text={menu.label!} />
                  <ChevronRightGrayIcon />
                </button>
              )}
            </div>
          ))}
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
