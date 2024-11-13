const isSameDateBetweenDateString = (date: Date, dateString: string): boolean => {
  const date1String = date.toISOString().split('T')[0];
  const date2String = new Date(dateString).toISOString().split('T')[0];

  return date1String === date2String;
};

export default isSameDateBetweenDateString;
