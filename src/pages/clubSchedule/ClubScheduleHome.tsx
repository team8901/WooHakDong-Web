import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body3 from '@components/Body3';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubSchedules from '@hooks/schedule/useGetClubSchedules';
import convertDate from '@libs/util/convertDate';
import { formatDateWithWeekday } from '@libs/util/formatDate';
import isSameDateBetweenDateString from '@libs/util/isSameDateBetweenDateString';
import CustomCalendar from '@pages/clubSchedule/components/CustomCalendar';
import ListItem from '@pages/clubSchedule/components/ListItem';
import { useEffect, useRef, useState } from 'react';
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
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const { setToastMessage } = useToast();
  const calendarRef = useRef();
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: clubSchedulesData,
    isError: isClubSchedulesError,
    isLoading: isClubSchedulesLoading,
  } = useGetClubSchedules({ clubId: clubId || 0, date: convertDate(selectedDate as Date), currentMonth });

  const handleTodayClick = () => {
    const today = new Date();
    setSelectedDate(today);

    const calendar = calendarRef.current;
    if (!calendar) return;

    const firstDayOfTodaysMonth = new Date(today.getFullYear(), today.getMonth(), 1); // 현재 월의 첫 번째 날을 생성
    (calendar as any).setActiveStartDate(firstDayOfTodaysMonth);
  };

  const filterList = (list: ClubScheduleResponseData[], date: Date) => {
    const filteredSchedule = list.filter((schedule) => isSameDateBetweenDateString(date, schedule.scheduleDateTime));
    setFilteredScheduleList(filteredSchedule);
  };

  useEffect(() => {
    if (!selectedDate || scheduleList.length === 0) return;

    filterList(scheduleList, selectedDate as Date);
  }, [selectedDate]);

  useEffect(() => {
    if (!clubSchedulesData) return;

    const { result } = clubSchedulesData;
    setScheduleList(result);
    filterList(result, selectedDate as Date);
  }, [clubSchedulesData, currentMonth]);

  useEffect(() => {
    if (isClubIdError || isClubSchedulesError) {
      setToastMessage(`일정을 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError, isClubSchedulesError]);

  const isLoading = isClubIdLoading || isClubSchedulesLoading;

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <button
        type="button"
        onClick={handleTodayClick}
        className="absolute right-0 top-0 flex items-center justify-center px-[20px] py-[16px]"
      >
        <Body3 text="오늘" />
      </button>
      {scheduleList && (
        <CustomCalendar
          calendarRef={calendarRef}
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
              {filteredScheduleList.map((schedule, index) => (
                <div key={schedule.scheduleId} className="flex flex-col gap-[20px]">
                  {index > 0 && <div className="h-[0.6px] bg-lightGray" />}
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
