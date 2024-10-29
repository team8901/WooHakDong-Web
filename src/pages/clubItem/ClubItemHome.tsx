import AppBar from '@components/AppBar';
import Body3 from '@components/Body3';
import { useSearch } from '@contexts/SearchContext';
import { getClubInfo } from '@libs/api/club';
import { getClubItems } from '@libs/api/item';
import ListItem from '@pages/clubItem/components/ListItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Item, ItemCategory } from 'types/item';

const ClubItemHomePage = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [itemList, setItemList] = useState<Item[]>([]);
  const [clubId, setClubId] = useState<number | null>(null);
  const [filteredItemList, setFilteredItemList] = useState<Item[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery } = useSearch();

  const handleTabChange = (categoryName: string) => {
    setActiveTab(categoryName);
  };

  useEffect(() => {
    const getData = async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });
      setClubId(clubId);

      const { result } = await getClubItems({ clubId });
      setItemList(result);
      setFilteredItemList(result);
    };

    getData();
  }, []);

  useEffect(() => {
    const getSearchData = async () => {
      if (clubId === null) return;

      const { result } = await getClubItems({ clubId, keyword: searchQuery });
      setItemList(result);
      setFilteredItemList(result);
    };

    getSearchData();
  }, [searchQuery]);

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
