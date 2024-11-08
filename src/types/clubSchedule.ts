type ClubScheduleColor = '#C5C6C7' | '#D77A77' | '#E9A77B' | '#F2E394' | '#A8C686' | '#A3B7D9' | '#6B7A8F' | '#B49AC6';

type ClubScheduleRequestData = {
  clubId: number;
  date: string;
};

type ClubScheduleResponseData = {
  scheduleId: number;
  scheduleTitle: string;
  scheduleContent: string;
  scheduleDateTime: string;
  scheduleColor: ClubScheduleColor;
};

type ClubScheduleResultResponseData = {
  result: ClubScheduleResponseData[];
};

export type { ClubScheduleColor, ClubScheduleRequestData, ClubScheduleResponseData, ClubScheduleResultResponseData };
