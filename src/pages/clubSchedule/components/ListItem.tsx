import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import formatTime from '@libs/util/formatTime';
import { ClubScheduleResponseData } from 'types/clubSchedule';

const ListItem = ({ schedule }: { schedule: ClubScheduleResponseData }) => {
  return (
    <div className="flex items-center gap-[16px]">
      <div className="h-[44px] w-[6px] rounded-[10px]" style={{ backgroundColor: schedule.scheduleColor }} />
      <div className="flex flex-col gap-[4px]">
        <Body2 text={schedule.scheduleTitle} />
        <Body4 text={formatTime(schedule.scheduleDateTime)} className="text-darkGray" />
      </div>
    </div>
  );
};

export default ListItem;
