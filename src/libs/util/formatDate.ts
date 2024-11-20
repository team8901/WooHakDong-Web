// 8월 13일 오전 12:00
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
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

// 7일 목요일
const formatDateWithWeekday = (date: Date) => {
  if (date === null) return '';

  const dayFormatter = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' });
  const day = dayFormatter.format(date);
  const dayOfMonth = date.getDate();

  return `${dayOfMonth}일 ${day}`;
};

// 9월 17일 (화) 16:00
const formatDateDetail = (dateString: string) => {
  const date = new Date(dateString);
  const dayFormatter = new Intl.DateTimeFormat('ko-KR', { weekday: 'short' });
  const dayOfWeek = dayFormatter.format(date);
  const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
    month: 'long',
    day: 'numeric',
  });
  const datePart = dateFormatter.format(date);
  const timeFormatter = new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });
  const timePart = timeFormatter.format(date);

  return `${datePart} (${dayOfWeek}) ${timePart}`;
};

export { formatDate, formatDateWithWeekday, formatDateDetail };
