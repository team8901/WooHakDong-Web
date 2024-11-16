import Body3 from '@components/Body3';
import { CLIB_ITEM_CATEGORY_MENU } from '@libs/constant/item';
import { ClubItemCategory } from 'types/item';

type TabNavProps = {
  activeTab: ClubItemCategory | 'ALL';
  handleTabChange: (categoryName: ClubItemCategory | 'ALL') => void;
};

const TabNav = ({ activeTab, handleTabChange }: Readonly<TabNavProps>) => {
  return (
    <div className="flex overflow-x-auto scrollbar-hide">
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
    </div>
  );
};

export default TabNav;
