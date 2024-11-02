import AppBar from '@components/AppBar';
import Body3 from '@components/Body3';
import ListItem from '@pages/clubItem/components/ListItem';
import { useEffect, useState } from 'react';
import { Item, ItemCategory } from 'types/item';

const ClubItemHomePage = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [itemList, setItemList] = useState<Item[]>([]);
  const [filteredItemList, setFilteredItemList] = useState<Item[]>([]);

  const listData: Item[] = [
    {
      itemId: 0,
      itemName: '27인치 모니터',
      itemPhoto: '/logo.svg',
      itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
      itemLocation: '동아리 방',
      itemCategory: 'DIGITAL',
      itemRentalMaxDay: 0,
      itemAvailable: true,
      itemUsing: false,
      itemRentalDate: '2024-10-29T05:56:14.799Z',
      itemRentalTime: 0,
    },
    {
      itemId: 1,
      itemName: '농구공',
      itemPhoto: '/logo.svg',
      itemDescription: '따끈따끈한 농구공이다.',
      itemLocation: '동아리 방',
      itemCategory: 'SPORT',
      itemRentalMaxDay: 0,
      itemAvailable: true,
      itemUsing: true,
      itemRentalDate: '2024-10-29T05:56:14.799Z',
      itemRentalTime: 4,
    },
    {
      itemId: 2,
      itemName: '스테이플러',
      itemPhoto: '/logo.svg',
      itemDescription: '따끈따끈한 농구공이다.',
      itemLocation: '동아리 방',
      itemCategory: 'ETC',
      itemRentalMaxDay: 0,
      itemAvailable: true,
      itemUsing: false,
      itemRentalDate: '2024-10-29T05:56:14.799Z',
      itemRentalTime: 1,
    },
    {
      itemId: 3,
      itemName: '하둡의 프로그래밍',
      itemPhoto: '/logo.svg',
      itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
      itemLocation: '동아리 방',
      itemCategory: 'BOOK',
      itemRentalMaxDay: 0,
      itemAvailable: true,
      itemUsing: false,
      itemRentalDate: '2024-10-29T05:56:14.799Z',
      itemRentalTime: 3,
    },
    {
      itemId: 4,
      itemName: '아이폰 충전기',
      itemPhoto: '/logo.svg',
      itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
      itemLocation: '동아리 방',
      itemCategory: 'DIGITAL',
      itemRentalMaxDay: 0,
      itemAvailable: true,
      itemUsing: true,
      itemRentalDate: '2024-10-29T05:56:14.799Z',
      itemRentalTime: 14,
    },
    {
      itemId: 5,
      itemName: '스피커',
      itemPhoto: '/logo.svg',
      itemDescription: '하둡 프로그래밍에 대해서 알려주는 책이다. 하둡 프로그래밍이 뭔지 알 수 있다.',
      itemLocation: '동아리 방',
      itemCategory: 'DIGITAL',
      itemRentalMaxDay: 0,
      itemAvailable: true,
      itemUsing: false,
      itemRentalDate: '2024-10-29T05:56:14.799Z',
      itemRentalTime: 2,
    },
  ];

  const handleTabChange = (categoryName: string) => {
    setActiveTab(categoryName);
  };

  useEffect(() => {
    setItemList(listData);
    setFilteredItemList(listData);
  }, []);

  useEffect(() => {
    if (activeTab === 'ALL') {
      setFilteredItemList(itemList);
    } else {
      const filteredItem = itemList.filter((item) => item.itemCategory === activeTab);
      setFilteredItemList(filteredItem);
    }
  }, [activeTab]);

  const CATEGORY_MENU: { label: string; category: ItemCategory }[] = [
    { label: '디지털', category: 'DIGITAL' },
    { label: '스포츠', category: 'SPORT' },
    { label: '도서', category: 'BOOK' },
    { label: '의류', category: 'CLOTHES' },
    { label: '문구류', category: 'STATIONERY' },
    { label: '기타', category: 'ETC' },
  ];

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu hasSearch />
      </div>

      <div className="flex overflow-x-auto scrollbar-hide">
        <button
          type="button"
          onClick={() => handleTabChange('ALL')}
          className={`flex h-[40px] flex-shrink-0 items-center justify-center border-b-2 px-[16px] ${activeTab === 'ALL' ? 'border-b-black' : 'border-b-white'}`}
        >
          <Body3 text={'전체'} />
        </button>
        {CATEGORY_MENU.map((menu) => (
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

      <div className="masked-overflow flex h-full flex-col gap-[20px] p-[20px] scrollbar-hide">
        {filteredItemList.length === 0 ? (
          <div className="flex h-full items-center justify-center">아직 등록된 물품이 없습니다.</div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <ListItem item={filteredItemList[0]} />
            {filteredItemList.slice(1).map((item) => (
              <div key={item.itemId} className="flex flex-col gap-[20px]">
                <div className="h-[0.6px] bg-lightGray" />
                <ListItem item={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubItemHomePage;
