import Body3 from '@components/Body3';

type TabNavMyProps = {
  activeTab: 'CURRENT' | 'ALL';
  setActiveTab: React.Dispatch<React.SetStateAction<'CURRENT' | 'ALL'>>;
};

const TabNavMy = ({ activeTab, setActiveTab }: Readonly<TabNavMyProps>) => {
  return (
    <div className="flex">
      <button
        type="button"
        onClick={() => setActiveTab('CURRENT')}
        className={`flex h-[40px] flex-1 flex-shrink-0 items-center justify-center border-b-2 px-[16px] ${activeTab === 'CURRENT' ? 'border-b-black' : 'border-b-white'}`}
      >
        <Body3 text="현재 나의 대여 물품" />
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('ALL')}
        className={`flex h-[40px] flex-1 flex-shrink-0 items-center justify-center border-b-2 px-[16px] ${activeTab === 'ALL' ? 'border-b-black' : 'border-b-white'}`}
      >
        <Body3 text="과거에 대여한 물품" />
      </button>
    </div>
  );
};

export default TabNavMy;
