const convertDate = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  const dateOffset = new Date(date.getTime() - offset);

  return dateOffset.toISOString().split('T')[0];
};

export default convertDate;
