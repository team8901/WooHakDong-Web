import AppBar from '@components/AppBar';
import Body3 from '@components/Body3';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useSearch } from '@contexts/SearchContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { getClubInfo } from '@libs/api/club';
import { getClubItemsMy } from '@libs/api/item';
import { CLIB_ITEM_CATEGORY_MENU } from '@libs/constant/item';
// import { CLUB_ITEM_MY_DATA } from '@libs/constant/item';
import ROUTE from '@libs/constant/path';
import ListItem from '@pages/clubItem/components/ListItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubItemsMyResponseData } from 'types/item';

const ClubItemMyPage = () => {
  const [activeTab, setActiveTab] = useState('ALL');
  const [itemList, setItemList] = useState<ClubItemsMyResponseData[]>([]);
  const [filteredItemList, setFilteredItemList] = useState<ClubItemsMyResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery } = useSearch();
  const navigate = useCustomNavigate();

  const handleTabChange = (categoryName: string) => {
    setActiveTab(categoryName);
  };

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      const { result } = await getClubItemsMy({ clubId });
      setItemList(result);
      setFilteredItemList(result);
    })();

    /* 더미데이터 테스트 */
    // setItemList(CLUB_ITEM_MY_DATA);
    // setFilteredItemList(CLUB_ITEM_MY_DATA);
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    navigate(ROUTE.ITEM_SEARCH);
  }, [searchQuery]);

  useEffect(() => {
    if (activeTab === 'ALL') {
      setFilteredItemList(itemList);
    } else {
      const filteredItem = itemList.filter((item) => item.itemCategory === activeTab);
      setFilteredItemList(filteredItem);
    }
  }, [activeTab]);

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

      <ScrollView fadeTop className="flex h-full flex-col gap-[20px] px-[20px]">
        {filteredItemList.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <EmptyText text="아직 대여한 물품이 없어요" />
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <ListItem
              item={filteredItemList[0]}
              borrowedReturnDate={filteredItemList[0].itemBorrowedReturnDate}
              myPage
            />
            {filteredItemList.slice(1).map((item) => (
              <div key={item.itemId} className="flex flex-col gap-[20px]">
                <div className="h-[0.6px] bg-lightGray" />
                <ListItem item={item} borrowedReturnDate={item.itemBorrowedReturnDate} myPage />
              </div>
            ))}
          </div>
        )}
      </ScrollView>
    </div>
  );
};

export default ClubItemMyPage;
