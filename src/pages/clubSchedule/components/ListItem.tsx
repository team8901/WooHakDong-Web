import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import formatTime from '@libs/util/formatTime';
import { ClubScheduleResponseData } from 'types/clubSchedule';

const ListItem = ({ schedule }: { schedule: ClubScheduleResponseData }) => {
  const navigate = useCustomNavigate();

  const handleItemClick = (schedule: ClubScheduleResponseData) => {
    navigate(`${ROUTE.SCHEDULE}/${schedule.scheduleId}`, { state: { schedule } });
  };

  return (
    <button className="flex items-center gap-[16px]" onClick={() => handleItemClick(schedule)}>
      <div className="h-[44px] w-[6px] rounded-[10px]" style={{ backgroundColor: schedule.scheduleColor }} />
      <div className="flex flex-col items-start gap-[4px]">
        <Body2 text={schedule.scheduleTitle} />
        <Body4 text={formatTime(schedule.scheduleDateTime)} className="text-darkGray" />
      </div>
    </button>
  );
};

export default ListItem;
