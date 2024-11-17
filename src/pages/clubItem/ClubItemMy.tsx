import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { getClubInfo } from '@libs/api/club';
import { getClubItemsMy, getClubItemsMyHistory } from '@libs/api/item';
// import { CLUB_ITEM_MY_DATA } from '@libs/constant/item';
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
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const [clubId, setClubId] = useState(0);

  const handleRefresh = async () => {
    const { result } = await getClubItemsMy({ clubId });
    setItemList(result);

    const res = await getClubItemsMyHistory({ clubId });
    setHistoryItemList(res.result.filter((item) => item.itemReturnDate !== null));

    setToastMessage('물품 정보를 갱신했어요');
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

        const { result } = await getClubItemsMy({ clubId });
        setItemList(result);

        const res = await getClubItemsMyHistory({ clubId });
        setHistoryItemList(res.result.filter((item) => item.itemReturnDate !== null));
      } catch (error) {
        console.error(error);
        setToastMessage(`물품 정보를 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();

    /* 더미데이터 테스트 */
    // setItemList(CLUB_ITEM_MY_DATA);
    // setHistoryItemList(CLUB_ITEM_MY_DATA);
  }, []);

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
