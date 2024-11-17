import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useSearch } from '@contexts/SearchContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import useTabNav from '@hooks/useTabNav';
import { getClubInfo } from '@libs/api/club';
import { getClubItems, getClubItemsMy } from '@libs/api/item';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
// import { CLUB_ITEM_MY_DATA, CLUB_ITEM_DATA } from '@libs/constant/item';
import ROUTE from '@libs/constant/path';
import ListItem from '@pages/clubItem/components/ListItem';
import TabNav from '@pages/clubItem/components/TabNav';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
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
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const [clubId, setClubId] = useState(0);

  const isMyBorrowedItem = (itemId: number) => {
    return myBorrowedItemList.findIndex((item) => item.itemId === itemId) !== -1;
  };

  const getBorrowedReturnDate = (itemId: number) => {
    const item = myBorrowedItemList.find((item) => item.itemId === itemId);

    return item?.itemBorrowedReturnDate;
  };

  const handleRefresh = async () => {
    const { result } = await getClubItems({ clubId });
    setItemList(result);

    if (activeTab === 'ALL') {
      setFilteredItemList(result);
    } else {
      const filteredResult = result.filter((item) => item.itemCategory === activeTab);
      setFilteredItemList(filteredResult);
    }

    setToastMessage(
      `${activeTab === 'ALL' ? '' : `${CLUB_ITEM_CATEGORY[activeTab]} 카테고리의 `}물품 정보를 갱신했어요`,
    );
  };

  useEffect(() => {
    (async () => {
      if (!clubEnglishName) return;

      setIsLoading(true);
      try {
        const { clubId } = await getClubInfo({
          clubEnglishName,
        });
        setClubId(clubId);

        const { result } = await getClubItems({ clubId });
        setItemList(result);
        setFilteredItemList(result);

        const res = await getClubItemsMy({ clubId });
        setMyBorrowedItemList(res.result);
      } catch (error) {
        console.error(error);
        setToastMessage(`물품 정보를 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
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

      {isLoading ? (
        <div className="flex flex-col gap-[20px] px-[20px]">
          <Skeleton height={72} count={5} borderRadius={14} className="mt-[20px]" />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-[20px] px-[20px] pt-[20px]">
          <CustomPullToRefresh onRefresh={handleRefresh}>
            {filteredItemList.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <EmptyText
                  text={`${activeTab === 'ALL' ? '아직' : `${CLUB_ITEM_CATEGORY[activeTab]} 카테고리에`} 등록된 물품이 없어요`}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-[20px] pb-[50px]">
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
                      borrowedReturnDate={
                        isMyBorrowedItem(item.itemId) ? getBorrowedReturnDate(item.itemId) : undefined
                      }
                    />
                  </div>
                ))}
              </div>
            )}
          </CustomPullToRefresh>
        </div>
      )}
    </div>
  );
};

export default ClubItemHomePage;
