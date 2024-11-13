type ClubAccountHistoryInOutType = 'DEPOSIT' | 'WITHDRAW';

type ClubDuesRequestData = {
  clubId: number;
  year: number;
  month: number;
};

type ClubDuesResponseData = {
  clubAccountHistoryId: number;
  clubAccountHistoryInOutType: ClubAccountHistoryInOutType;
  clubAccountHistoryTranDate: string;
  clubAccountHistoryBalanceAmount: number;
  clubAccountHistoryTranAmount: number;
  clubAccountHistoryContent: string;
};

type ClubDuesResultResponseData = {
  result: ClubDuesResponseData[];
};

type ClubAccountRequestData = {
  clubId: number;
};

type ClubAccountResponseData = {
  clubAccountId: number;
  clubAccountBankName: string;
  clubAccountNumber: string;
  clubAccountPinTechNumber: string;
  clubAccountLastUpdateDate: string;
  clubAccountBankCode: string;
  clubAccountBalance: number;
};

export type {
  ClubDuesRequestData,
  ClubDuesResponseData,
  ClubDuesResultResponseData,
  ClubAccountRequestData,
  ClubAccountResponseData,
};
