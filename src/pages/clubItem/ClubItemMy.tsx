import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubItemsMy from '@hooks/item/useGetClubItemsMy';
import useGetClubItemsMyHistory from '@hooks/item/useGetClubItemsMyHistory';
import ListItem from '@pages/clubItem/components/ListItem';
import ListItemHistory from '@pages/clubItem/components/ListItemHistory';
import MyTabNav from '@pages/clubItem/components/TabNavMy';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubItemsMyHistoryResponseData, ClubItemsMyResponseData } from 'types/item';

const ClubItemMyPage = () => {
  const [itemList, setItemList] = useState<ClubItemsMyResponseData[]>([]);
  const [historyItemList, setHistoryItemList] = useState<ClubItemsMyHistoryResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [activeTab, setActiveTab] = useState<'CURRENT' | 'ALL'>('CURRENT');
  const { setToastMessage } = useToast();
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: clubItemsMyData,
    isError: isClubItemsMyError,
    isLoading: isClubItemsMyLoading,
    refetch: refetchClubItemsMy,
  } = useGetClubItemsMy({ clubId: clubId ?? 0 });
  const {
    data: clubItemsMyHistoryData,
    isError: isClubItemsMyHistoryError,
    isLoading: isClubItemsMyHistoryLoading,
    refetch: refetchClubItemsMyHistory,
  } = useGetClubItemsMyHistory({ clubId: clubId ?? 0 });

  const handleRefresh = async () => {
    const { data: clubItemsMyData } = await refetchClubItemsMy();
    if (!clubItemsMyData) return;
    setItemList(clubItemsMyData.result);

    const { data: clubItemsMyHistoryData } = await refetchClubItemsMyHistory();
    if (!clubItemsMyHistoryData) return;
    setHistoryItemList(clubItemsMyHistoryData.result.filter((item) => item.itemReturnDate !== null));

    setToastMessage('물품 정보를 갱신했어요');
  };

  useEffect(() => {
    if (!clubItemsMyData) return;

    const { result } = clubItemsMyData;
    setItemList(result);
  }, [clubItemsMyData]);

  useEffect(() => {
    if (!clubItemsMyHistoryData) return;

    const { result } = clubItemsMyHistoryData;
    setHistoryItemList(result.filter((item) => item.itemReturnDate !== null));
  }, [clubItemsMyHistoryData]);

  useEffect(() => {
    if (isClubIdError || isClubItemsMyError || isClubItemsMyHistoryError) {
      setToastMessage(`물품 정보를 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError, isClubItemsMyError, isClubItemsMyHistoryError]);

  const isLoading = isClubIdLoading || isClubItemsMyLoading || isClubItemsMyHistoryLoading;

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <MyTabNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {isLoading ? (
        <div className="flex flex-col gap-[20px] px-[20px]">
          <Skeleton height={72} count={5} borderRadius={14} className="mt-[20px]" />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-[20px] px-[20px] pt-[20px]">
          <CustomPullToRefresh onRefresh={handleRefresh}>
            {activeTab === 'CURRENT' ? (
              <>
                {itemList.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <EmptyText text="아직 대여한 물품이 없어요" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-[20px] pb-[50px]">
                    <ListItem item={itemList[0]} borrowedReturnDate={itemList[0].itemBorrowedReturnDate} myPage />
                    {itemList.slice(1).map((item) => (
                      <div key={item.itemId} className="flex flex-col gap-[20px]">
                        <div className="h-[0.6px] bg-lightGray" />
                        <ListItem item={item} borrowedReturnDate={item.itemBorrowedReturnDate} myPage />
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <>
                {historyItemList.length === 0 ? (
                  <div className="flex h-full items-center justify-center">
                    <EmptyText text="아직 대여한 물품이 없어요" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-[20px] pb-[50px]">
                    <ListItemHistory item={historyItemList[0]} />
                    {historyItemList.slice(1).map((item) => (
                      <div key={`${item.itemId}-${item.itemRentalDate}-history`} className="flex flex-col gap-[20px]">
                        <div className="h-[0.6px] bg-lightGray" />
                        <ListItemHistory item={item} />
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CustomPullToRefresh>
        </div>
      )}
    </div>
  );
};

export default ClubItemMyPage;
