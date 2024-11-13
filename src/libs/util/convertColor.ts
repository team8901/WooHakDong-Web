import { ClubScheduleColor } from 'types/clubSchedule';

const convertColor = (color: ClubScheduleColor) => {
  return `#${color.slice(2)}`;
};

export default convertColor;
