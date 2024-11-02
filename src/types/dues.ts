type ClubDuesProps = {
  clubId: number;
  year: number;
  month: number;
};

type ClubAccountHistoryInOutType = 'DEPOSIT' | 'WITHDRAW';

type ClubDuesResponseData = {
  clubAccountHistoryId: number;
  clubAccountHistoryInOutType: ClubAccountHistoryInOutType;
  clubAccountHistoryTranDate: string;
  clubAccountHistoryBalanceAmount: number;
  clubAccountHistoryTranAmount: number;
  clubAccountHistoryContent: string;
};

type ClubsDuesResponseData = {
  result: ClubDuesResponseData[];
};

export type { ClubDuesProps, ClubDuesResponseData, ClubsDuesResponseData };
