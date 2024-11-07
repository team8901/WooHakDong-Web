import { SelectedDate } from '@pages/clubSchedule/ClubScheduleHome';
import Dot from '@pages/clubSchedule/components/Dot';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: SelectedDate;
  setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
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
      formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })} // 날짜 형식을 설정
      tileContent={() => {
        return (
          <div className="flex items-center justify-center">
            <Dot />
          </div>
        );
      }}
    />
  );
};

export default CustomCalendar;
