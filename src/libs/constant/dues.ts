import { ClubDuesResponseData } from 'types/dues';

const CLUB_DUES_DATA: ClubDuesResponseData[] = [
  {
    clubAccountHistoryId: 0,
    clubAccountHistoryInOutType: 'WITHDRAW',
    clubAccountHistoryTranDate: '2024-10-31T10:55:14.694Z',
    clubAccountHistoryBalanceAmount: 1000,
    clubAccountHistoryTranAmount: 45000,
    clubAccountHistoryContent: '회식비',
  },
  {
    clubAccountHistoryId: 1,
    clubAccountHistoryInOutType: 'DEPOSIT',
    clubAccountHistoryTranDate: '2024-10-31T10:55:14.694Z',
    clubAccountHistoryBalanceAmount: 1000,
    clubAccountHistoryTranAmount: 20000,
    clubAccountHistoryContent: '신규 회원비 납부',
  },
  {
    clubAccountHistoryId: 2,
    clubAccountHistoryInOutType: 'WITHDRAW',
    clubAccountHistoryTranDate: '2024-10-31T10:55:14.694Z',
    clubAccountHistoryBalanceAmount: 1000,
    clubAccountHistoryTranAmount: 25000,
    clubAccountHistoryContent: '모니터 수리비',
  },
  {
    clubAccountHistoryId: 3,
    clubAccountHistoryInOutType: 'DEPOSIT',
    clubAccountHistoryTranDate: '2024-10-31T10:55:14.694Z',
    clubAccountHistoryBalanceAmount: 1000,
    clubAccountHistoryTranAmount: 45000,
    clubAccountHistoryContent: '회식비',
  },
];

const CLUB_DUES_SORT_OPTIONS = [
  { label: '전체', value: 'ALL', id: 0 },
  { label: '입금', value: 'DEPOSIT', id: 1 },
  { label: '출금', value: 'WITHDRAW', id: 2 },
];

export { CLUB_DUES_DATA, CLUB_DUES_SORT_OPTIONS };
