import { ClubScheduleColor } from 'types/clubSchedule';

const Dot = ({ color }: { color: ClubScheduleColor }) => {
  return <div className="h-[7px] w-[7px] rounded-[50%]" style={{ backgroundColor: color }} />;
};

export default Dot;
