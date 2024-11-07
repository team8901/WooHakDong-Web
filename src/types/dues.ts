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
  ClubDuesProps,
  ClubDuesResponseData,
  ClubsDuesResponseData,
  ClubAccountRequestData,
  ClubAccountResponseData,
};
