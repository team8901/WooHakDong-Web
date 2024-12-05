/*
2024년 1학기 = 2024년 3월 1일 ~ 8월 31일
2024년 2학기 = 2024년 9월 1일 ~ 2025년 2월 마지막날
*/
const calculateClubAssignedTerm = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (month >= 3 && month <= 8) {
    return `${year}-03-01`;
  }
  return `${year}-09-01`;
};

const getTermRange = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();

  if (month >= 3 && month <= 8) {
    return { startDate: `${year}-03-01`, endDate: `${year}-08-31` };
  }
  return { startDate: `${year}-09-01`, endDate: `${year + 1}-02-30` };
};

export { calculateClubAssignedTerm, getTermRange };
