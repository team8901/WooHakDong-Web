import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body3 from '@components/Body3';
import EmptyText from '@components/EmptyText';
import ScrollView from '@components/ScrollView';
import { CLUB_SCHEDULE_DATA } from '@libs/constant/clubSchedule';
import isSameDateBetweenDateString from '@libs/util/isSameDateBetweenDateString';
import CustomCalendar from '@pages/clubSchedule/components/CustomCalendar';
import ListItem from '@pages/clubSchedule/components/ListItem';
import { useEffect, useState } from 'react';
import { ClubScheduleResponseData } from 'types/clubSchedule';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ClubScheduleHomePage = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  const [scheduleList, setScheduleList] = useState<ClubScheduleResponseData[]>([]);
  const [filteredScheduleList, setFilteredScheduleList] = useState<ClubScheduleResponseData[]>([]);

  useEffect(() => {
    setScheduleList(CLUB_SCHEDULE_DATA);

    const filteredSchedule = CLUB_SCHEDULE_DATA.filter((schedule) =>
      isSameDateBetweenDateString(selectedDate as Date, schedule.scheduleDateTime),
    );

    setFilteredScheduleList(filteredSchedule);
  }, [selectedDate]);

  const formatDate = (date: Date) => {
    if (date === null) return '';

    const dayFormatter = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' });
    const day = dayFormatter.format(date);
    const dayOfMonth = date.getDate();

    return `${dayOfMonth}일 ${day}`;
  };

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
        <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} scheduleList={scheduleList} />
      )}

      <Body1 text={formatDate(selectedDate as Date)} className="inline-block px-[20px] pt-[20px]" />

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
    </div>
  );
};

export default ClubScheduleHomePage;
