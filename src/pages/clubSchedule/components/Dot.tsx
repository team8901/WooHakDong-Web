import convertColor from '@libs/util/convertColor';
import { ClubScheduleColor } from 'types/clubSchedule';

const Dot = ({ color }: { color: ClubScheduleColor }) => {
  return <div className="h-[7px] w-[7px] rounded-[50%]" style={{ backgroundColor: convertColor(color) }} />;
};

export default Dot;
