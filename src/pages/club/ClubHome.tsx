import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import AppBar from '@components/AppBar';
import EmptyText from '@components/EmptyText';
import CustomPullToRefresh from '@components/PullToRefresh';
import Title3 from '@components/Title3';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubItemsMy from '@hooks/item/useGetClubItemsMy';
import useGetClubSchedules from '@hooks/schedule/useGetClubSchedules';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import convertDate from '@libs/util/convertDate';
import { default as ItemListItem } from '@pages/clubItem/components/ListItem';
import { default as ScheduleListItem } from '@pages/clubSchedule/components/ListItem';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubScheduleResponseData } from 'types/clubSchedule';
import { ClubItemsMyResponseData } from 'types/item';

const ClubHomePage = () => {
  const [itemList, setItemList] = useState<ClubItemsMyResponseData[]>([]);
  const [scheduleList, setScheduleList] = useState<ClubScheduleResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { setToastMessage } = useToast();
  const { data: clubId, isError: isClubIdError } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: clubItemsMyData,
    isError: isClubItemsMyError,
    isLoading: isClubItemsMyLoading,
    refetch: refetchClubItemsMy,
  } = useGetClubItemsMy({ clubId: clubId ?? 0 });
  const today = new Date();
  const {
    data: clubSchedulesData,
    isError: isClubSchedulesError,
    isLoading: isClubSchedulesLoading,
    refetch: refetchClubSchedule,
  } = useGetClubSchedules({ clubId: clubId || 0, date: convertDate(today), currentMonth: today.getMonth() + 1 });
  const navigate = useCustomNavigate();

  const handleRefreshItem = async () => {
    const { data: clubItemsMyData } = await refetchClubItemsMy();
    if (!clubItemsMyData) return;
    setItemList(clubItemsMyData.result);
    setToastMessage('물품 정보를 갱신했어요');
  };

  const handleRefreshSchedule = async () => {
    const { data: clubSchedulesData } = await refetchClubSchedule();
    if (!clubSchedulesData) return;
    setScheduleList(clubSchedulesData.result);
    setToastMessage('일정 정보를 갱신했어요');
  };

  useEffect(() => {
    if (!clubItemsMyData) return;

    const { result } = clubItemsMyData;
    setItemList(result);
  }, [clubItemsMyData]);

  useEffect(() => {
    if (!clubSchedulesData) return;

    const { result } = clubSchedulesData;
    setScheduleList(result);
  }, [clubSchedulesData]);

  useEffect(() => {
    if (isClubIdError || isClubItemsMyError || isClubSchedulesError) {
      setToastMessage(`정보를 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError, isClubItemsMyError, isClubSchedulesError]);

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <div className="flex flex-col gap-[20px] py-[20px]">
        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between px-[20px]">
            <Title3 text="빌린 물품" />
            <button type="button" onClick={() => navigate(ROUTE.ITEM_MY)}>
              <ChevronRightGrayIcon />
            </button>
          </div>
          <div>
            {isClubItemsMyLoading ? (
              <div className="flex flex-col gap-[20px] px-[20px]">
                <Skeleton height={72} count={5} borderRadius={14} className="mt-[20px]" />
              </div>
            ) : (
              <div className="flex h-full flex-col gap-[20px] px-[20px]">
                <CustomPullToRefresh onRefresh={handleRefreshItem}>
                  <div className="flex flex-col gap-[20px] pb-[20px]">
                    {itemList.sort((a, b) => (a.itemBorrowedReturnDate! < b.itemBorrowedReturnDate! ? -1 : 1))
                      .length === 0 ? (
                      <div className="flex h-full min-h-[90px] items-center justify-center">
                        <EmptyText text="아직 대여한 물품이 없어요" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[20px]">
                        {itemList.slice(0, 3).map((item, index) => (
                          <div key={item.itemId} className="flex flex-col gap-[20px]">
                            {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                            <ItemListItem item={item} borrowedReturnDate={item.itemBorrowedReturnDate} myPage />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CustomPullToRefresh>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex items-center justify-between px-[20px]">
            <Title3 text="이번 달 일정" />
            <button type="button" onClick={() => navigate(ROUTE.SCHEDULE)}>
              <ChevronRightGrayIcon />
            </button>
          </div>
          <div>
            {isClubSchedulesLoading ? (
              <div className="flex flex-col gap-[20px] px-[20px]">
                <Skeleton height={72} count={5} borderRadius={14} className="mt-[20px]" />
              </div>
            ) : (
              <div className="flex h-full flex-col gap-[20px] px-[20px]">
                <CustomPullToRefresh onRefresh={handleRefreshSchedule}>
                  <div className="flex flex-col gap-[20px] pb-[80px]">
                    {scheduleList.length === 0 ? (
                      <div className="flex h-full min-h-[90px] items-center justify-center">
                        <EmptyText text="아직 등록된 일정이 없어요" />
                      </div>
                    ) : (
                      <div className="flex flex-col gap-[20px]">
                        {scheduleList.slice(0, 3).map((schedule, index) => (
                          <div key={schedule.scheduleId} className="flex flex-col gap-[20px]">
                            {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
                            <ScheduleListItem key={schedule.scheduleId} schedule={schedule} isDetailDate />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CustomPullToRefresh>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubHomePage;
