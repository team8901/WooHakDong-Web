import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useSearch } from '@contexts/SearchContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useTabNav from '@hooks/useTabNav';
import { getClubInfo } from '@libs/api/club';
import { getClubItems, getClubItemsMy } from '@libs/api/item';
// import { CLUB_ITEM_MY_DATA, CLUB_ITEM_DATA } from '@libs/constant/item';
import ROUTE from '@libs/constant/path';
import ListItem from '@pages/clubItem/components/ListItem';
import TabNav from '@pages/clubItem/components/TabNav';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubItemResponseData, ClubItemsMyResponseData } from 'types/item';

const ClubItemHomePage = () => {
  const [itemList, setItemList] = useState<ClubItemResponseData[]>([]);
  const [filteredItemList, setFilteredItemList] = useState<ClubItemResponseData[]>([]);
  const [myBorrowedItemList, setMyBorrowedItemList] = useState<ClubItemsMyResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { searchQuery } = useSearch();
  const navigate = useCustomNavigate();
  const { activeTab, handleTabChange } = useTabNav({ itemList, setFilteredItemList });

  const isMyBorrowedItem = (itemId: number) => {
    return myBorrowedItemList.findIndex((item) => item.itemId === itemId) !== -1;
  };

  const getBorrowedReturnDate = (itemId: number) => {
    const item = myBorrowedItemList.find((item) => item.itemId === itemId);

    return item?.itemBorrowedReturnDate;
  };

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      const { result } = await getClubItems({ clubId });
      setItemList(result);
      setFilteredItemList(result);

      const res = await getClubItemsMy({ clubId });
      setMyBorrowedItemList(res.result);
    })();

    /* 더미데이터 테스트 */
    // setItemList(CLUB_ITEM_DATA);
    // setFilteredItemList(CLUB_ITEM_DATA);
    // setMyBorrowedItemList(CLUB_ITEM_MY_DATA);
  }, []);

  useEffect(() => {
    if (!searchQuery) return;

    navigate(ROUTE.ITEM_SEARCH);
  }, [searchQuery]);

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu hasSearch />
      </div>

      <TabNav activeTab={activeTab} handleTabChange={handleTabChange} />

      <ScrollView fadeTop className="flex h-full flex-col gap-[20px] px-[20px]">
        {filteredItemList.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <EmptyText text="아직 등록된 물품이 없어요" />
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            <ListItem
              item={filteredItemList[0]}
              borrowedReturnDate={
                isMyBorrowedItem(filteredItemList[0].itemId)
                  ? getBorrowedReturnDate(filteredItemList[0].itemId)
                  : undefined
              }
            />
            {filteredItemList.slice(1).map((item) => (
              <div key={item.itemId} className="flex flex-col gap-[20px]">
                <div className="h-[0.6px] bg-lightGray" />
                <ListItem
                  item={item}
                  borrowedReturnDate={isMyBorrowedItem(item.itemId) ? getBorrowedReturnDate(item.itemId) : undefined}
                />
              </div>
            ))}
          </div>
        )}
      </ScrollView>
    </div>
  );
};

export default ClubItemHomePage;
