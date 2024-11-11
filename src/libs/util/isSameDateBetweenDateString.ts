import convertDate from '@libs/util/convertDate';

const isSameDateBetweenDateString = (date: Date, dateString: string): boolean => {
  const date1String = convertDate(date);
  const date2String = convertDate(new Date(dateString));

  return date1String === date2String;
};

export default isSameDateBetweenDateString;
