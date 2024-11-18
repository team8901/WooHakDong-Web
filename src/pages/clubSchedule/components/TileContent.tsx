import isSameDateBetweenDateString from '@libs/util/isSameDateBetweenDateString';
import Dot from '@pages/clubSchedule/components/Dot';
import { ClubScheduleResponseData } from 'types/clubSchedule';

const TileContent = ({ scheduleList, date }: { scheduleList: ClubScheduleResponseData[]; date: Date }) => {
  return (
    <div className="flex items-center gap-[2px]">
      {scheduleList
        .filter((schedule) => isSameDateBetweenDateString(date, schedule.scheduleDateTime))
        .map((schedule) => (
          <div key={schedule.scheduleId} className="flex items-center justify-center">
            <Dot color={schedule.scheduleColor} />
          </div>
        ))}
    </div>
  );
};

export default TileContent;
