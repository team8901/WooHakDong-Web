import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useSearch } from '@contexts/SearchContext';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubItems from '@hooks/item/useGetClubItems';
import useGetClubItemsMy from '@hooks/item/useGetClubItemsMy';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useTabNav from '@hooks/useTabNav';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
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
  const { setToastMessage } = useToast();
  const {
    data: clubId,
    isError: isClubInfoError,
    isLoading: isClubInfoLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName || '' });
  const {
    data: clubItemsData,
    refetch: clubItemsRefetch,
    isError: isClubItemsError,
    isLoading: isClubItemsLoading,
  } = useGetClubItems({ clubId: clubId || 0 });
  const {
    data: clubItemsMyData,
    isError: isClubItemsMyError,
    isLoading: isClubItemsMyLoading,
  } = useGetClubItemsMy({ clubId: clubId || 0 });

  const isMyBorrowedItem = (itemId: number) => myBorrowedItemList.some((item) => item.itemId === itemId);

  const getBorrowedReturnDate = (itemId: number) => {
    const item = myBorrowedItemList.find((item) => item.itemId === itemId);
    return item?.itemBorrowedReturnDate;
  };

  const handleRefresh = async () => {
    const { data } = await clubItemsRefetch();
    if (!data) return;

    const { result } = data;
    setItemList(result);

    if (activeTab === 'ALL') {
      setFilteredItemList(result);
      setToastMessage('물품 정보를 갱신했어요');
    } else {
      const filteredResult = result.filter((item) => item.itemCategory === activeTab);
      setFilteredItemList(filteredResult);
      setToastMessage(`${CLUB_ITEM_CATEGORY[activeTab]} 카테고리의 물품 정보를 갱신했어요`);
    }
  };

  useEffect(() => {
    if (!clubItemsData) return;

    const { result } = clubItemsData;

    setItemList(result);
    setFilteredItemList(result);
  }, [clubItemsData]);

  useEffect(() => {
    if (!clubItemsMyData) return;

    const { result } = clubItemsMyData;

    setMyBorrowedItemList(result);
  }, [clubItemsMyData]);

  useEffect(() => {
    if (!searchQuery) return;

    navigate(ROUTE.ITEM_SEARCH);
  }, [searchQuery]);

  useEffect(() => {
    if (isClubInfoError || isClubItemsError || isClubItemsMyError) {
      setToastMessage('물품 정보를 불러오는 중 오류가 발생했어요');
    }
  }, [isClubInfoError, isClubItemsError, isClubItemsMyError]);

  const isLoading = isClubInfoLoading || isClubItemsLoading || isClubItemsMyLoading;

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
                {filteredItemList.map((item, index) => (
                  <div key={item.itemId} className="flex flex-col gap-[20px]">
                    {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
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
