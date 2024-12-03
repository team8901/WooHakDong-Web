import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import convertColor from '@libs/util/convertColor';
import { formatDateDetail } from '@libs/util/formatDate';
import formatTime from '@libs/util/formatTime';
import { ClubScheduleResponseData } from 'types/clubSchedule';

const ListItem = ({ schedule, isDetailDate }: { schedule: ClubScheduleResponseData; isDetailDate?: boolean }) => {
  const navigate = useCustomNavigate();

  const handleItemClick = (schedule: ClubScheduleResponseData) => {
    navigate(`${ROUTE.SCHEDULE}/${schedule.scheduleId}`, { state: { schedule } });
  };

  return (
    <button className="flex items-center gap-[16px]" onClick={() => handleItemClick(schedule)}>
      <div
        className="h-[44px] w-[6px] rounded-[10px]"
        style={{ backgroundColor: convertColor(schedule.scheduleColor) }}
      />
      <div className="flex flex-col items-start gap-[4px]">
        <Body2 text={schedule.scheduleTitle} />
        <Body4
          text={isDetailDate ? formatDateDetail(schedule.scheduleDateTime) : formatTime(schedule.scheduleDateTime)}
          className="text-darkGray"
        />
      </div>
    </button>
  );
};

export default ListItem;
