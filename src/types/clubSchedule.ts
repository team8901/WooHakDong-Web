type ClubScheduleColor =
  | 'FFC5C6C7'
  | 'FFD77A77'
  | 'FFE9A77B'
  | 'FFF2E394'
  | 'FFA8C686'
  | 'FFA3B7D9'
  | 'FF6B7A8F'
  | 'FFB49AC6';

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
