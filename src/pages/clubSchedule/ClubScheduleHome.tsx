import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Body3 from '@components/Body3';
import Body4 from '@components/Body4';
import CustomCalendar from '@pages/clubSchedule/components/CustomCalendar';
import { useState } from 'react';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ClubScheduleHomePage = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  const formatDate = (date: Date) => {
    if (date === null) return '';

    const dayFormatter = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' });
    const day = dayFormatter.format(date);
    const dayOfMonth = date.getDate();

    return `${dayOfMonth}일 ${day}`;
  };

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
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

      <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

      <div className="flex flex-col gap-[20px] p-[20px]">
        <Body1 text={formatDate(selectedDate as Date)} />

        <div className="flex items-center gap-[16px]">
          <div className="h-[44px] w-[6px] rounded-[10px] bg-gray" />
          <div className="flex flex-col gap-[4px]">
            <Body2 text="행사1" />
            <Body4 text="0:20" className="text-darkGray" />
          </div>
        </div>

        <div className="flex items-center gap-[16px]">
          <div className="h-[44px] w-[6px] rounded-[10px] bg-gray" />
          <div className="flex flex-col gap-[4px]">
            <Body2 text="행사1" />
            <Body4 text="0:20" className="text-darkGray" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubScheduleHomePage;
