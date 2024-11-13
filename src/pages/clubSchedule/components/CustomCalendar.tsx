import { SelectedDate } from '@pages/clubSchedule/ClubScheduleHome';
import TileContent from '@pages/clubSchedule/components/TileContent';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { ClubScheduleResponseData } from 'types/clubSchedule';

const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
  scheduleList,
}: {
  selectedDate: SelectedDate;
  setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
  scheduleList: ClubScheduleResponseData[];
}) => {
  return (
    <Calendar
      value={selectedDate}
      onChange={setSelectedDate}
      showNeighboringMonth={false} // 이전, 이후 달의 날짜는 보이지 않도록 설정
      calendarType="gregory" // 그레고리력 사용. 일요일부터 시작
      view="month" // 월 단위로 보이도록 설정
      prev2Label={null} // 다음 연도로 이동하는 버튼은 보이지 않도록 설정
      next2Label={null} // 이전 연도로 이동하는 버튼은 보이지 않도록 설정
      onActiveStartDateChange={({ activeStartDate }) => setSelectedDate(activeStartDate)} // 달력의 시작 날짜가 바뀌면 selectedDate를 업데이트
      formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })} // 날짜 형식을 설정
      tileContent={({ date }) => <TileContent scheduleList={scheduleList} date={date} />}
    />
  );
};

export default CustomCalendar;
