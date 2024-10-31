const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formattedDate = date.toLocaleString('ko-KR', options);

  return formattedDate.replace('오전', '오전 ').replace('오후', '오후 ');
};

export default formatDate;
