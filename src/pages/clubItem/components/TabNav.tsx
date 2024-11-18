import Body3 from '@components/Body3';
import { CLIB_ITEM_CATEGORY_MENU } from '@libs/constant/item';
import { useRef } from 'react';
import { ClubItemCategory } from 'types/item';

type TabNavProps = {
  activeTab: ClubItemCategory | 'ALL';
  handleTabChange: (categoryName: ClubItemCategory | 'ALL') => void;
};

const TabNav = ({ activeTab, handleTabChange }: Readonly<TabNavProps>) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Adjust the scroll speed
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <button
      type="button"
      ref={containerRef}
      className="flex overflow-x-auto scrollbar-hide"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <button
        type="button"
        onClick={() => handleTabChange('ALL')}
        className={`flex h-[40px] flex-shrink-0 items-center justify-center border-b-2 px-[16px] ${activeTab === 'ALL' ? 'border-b-black' : 'border-b-white'}`}
      >
        <Body3 text={'전체'} />
      </button>
      {CLIB_ITEM_CATEGORY_MENU.map((menu) => (
        <button
          key={menu.category}
          type="button"
          onClick={() => handleTabChange(menu.category)}
          className={`flex h-[40px] flex-shrink-0 items-center justify-center border-b-2 px-[16px] ${menu.category === activeTab ? 'border-b-black' : 'border-b-white'}`}
        >
          <Body3 text={menu.label} />
        </button>
      ))}
    </button>
  );
};

export default TabNav;
