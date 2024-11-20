import isSameDateBetweenDateString from '@libs/util/isSameDateBetweenDateString';
import Dot from '@pages/clubSchedule/components/Dot';
import { ClubScheduleResponseData } from 'types/clubSchedule';

const TileContent = ({ scheduleList, date }: { scheduleList: ClubScheduleResponseData[]; date: Date }) => {
  const filteredList = scheduleList.filter((schedule) => isSameDateBetweenDateString(date, schedule.scheduleDateTime));

  return (
    <div className="flex items-center gap-[2px]">
      {filteredList.length === 0 ? (
        <Dot />
      ) : (
        filteredList.map((schedule) => <Dot key={schedule.scheduleId} color={schedule.scheduleColor} />)
      )}
    </div>
  );
};

export default TileContent;
