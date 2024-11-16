import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body3 from '@components/Body3';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { getClubInfo } from '@libs/api/club';
import { getClubSchedules } from '@libs/api/clubSchedule';
import convertDate from '@libs/util/convertDate';
import { formatDateWithWeekday } from '@libs/util/formatDate';
// import { CLUB_SCHEDULE_DATA } from '@libs/constant/clubSchedule';
import isSameDateBetweenDateString from '@libs/util/isSameDateBetweenDateString';
import CustomCalendar from '@pages/clubSchedule/components/CustomCalendar';
import ListItem from '@pages/clubSchedule/components/ListItem';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import { ClubScheduleResponseData } from 'types/clubSchedule';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ClubScheduleHomePage = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [scheduleList, setScheduleList] = useState<ClubScheduleResponseData[]>([]);
  const [filteredScheduleList, setFilteredScheduleList] = useState<ClubScheduleResponseData[]>([]);
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [clubId, setClubId] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  const filterList = (list: ClubScheduleResponseData[], date: Date) => {
    const filteredSchedule = list.filter((schedule) => isSameDateBetweenDateString(date, schedule.scheduleDateTime));

    setFilteredScheduleList(filteredSchedule);
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

        if (!selectedDate) return;

        const { result } = await getClubSchedules({ clubId, date: convertDate(selectedDate as Date) });

        setScheduleList(result);
        filterList(result, selectedDate as Date);
      } catch (error) {
        console.error(error);
        setToastMessage(`일정을 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();

    /* 더미데이터 테스트 */
    // setScheduleList(CLUB_SCHEDULE_DATA);

    // const filteredSchedule = CLUB_SCHEDULE_DATA.filter((schedule) =>
    //   isSameDateBetweenDateString(selectedDate as Date, schedule.scheduleDateTime),
    // );

    // setFilteredScheduleList(filteredSchedule);
  }, []);

  useEffect(() => {
    (async () => {
      if (!clubId || !selectedDate) return;

      setIsLoading(true);
      try {
        const { result } = await getClubSchedules({ clubId, date: convertDate(selectedDate as Date) });

        setScheduleList(result);
        filterList(result, selectedDate as Date);
      } catch (error) {
        console.error(error);
        setToastMessage(`일정을 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [currentMonth]);

  useEffect(() => {
    if (!selectedDate || scheduleList.length === 0) return;

    filterList(scheduleList, selectedDate as Date);
  }, [selectedDate]);

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <button
        type="button"
        onClick={() => setSelectedDate(new Date())}
        className="absolute right-0 top-0 flex items-center justify-center px-[20px] py-[16px]"
      >
        <Body3 text="오늘" />
      </button>
      {scheduleList && (
        <CustomCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          scheduleList={scheduleList}
          setCurrentMonth={setCurrentMonth}
        />
      )}

      <Body1 text={formatDateWithWeekday(selectedDate as Date)} className="inline-block px-[20px] pt-[20px]" />

      {isLoading ? (
        <div className="px-[20px]">
          <Skeleton height={46} count={3} borderRadius={14} className="mt-[20px]" />
        </div>
      ) : (
        <ScrollView
          fadeTop
          className="h-full flex-col gap-[20px] px-[20px] pb-[350px]"
          style={{ paddingBottom: '350px' }}
        >
          {filteredScheduleList.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <EmptyText text="아직 등록된 일정이 없어요" />
            </div>
          ) : (
            <div className="flex flex-col gap-[20px]">
              <ListItem schedule={filteredScheduleList[0]} />
              {filteredScheduleList.slice(1).map((schedule) => (
                <div key={schedule.scheduleId} className="flex flex-col gap-[20px]">
                  <div className="h-[0.6px] bg-lightGray" />
                  <ListItem key={schedule.scheduleId} schedule={schedule} />
                </div>
              ))}
            </div>
          )}
        </ScrollView>
      )}
    </div>
  );
};

export default ClubScheduleHomePage;
