import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import { formatDate } from '@libs/util/formatDate';
import { ClubDuesResponseData } from 'types/dues';

const ListItem = ({ dues }: { dues: ClubDuesResponseData }) => {
  return (
    <div className="flex flex-col gap-[4px]">
      <div className="flex flex-col gap-[2px]">
        <Body4 text={formatDate(dues.clubAccountHistoryTranDate)} className="text-darkGray" />
        <Body2 text={dues.clubAccountHistoryContent} className="text-[1.8rem]" />
      </div>
      <div className="flex flex-col items-end gap-[2px] self-end">
        <Body1
          text={`${dues.clubAccountHistoryInOutType === 'DEPOSIT' ? '+' : '-'}${dues.clubAccountHistoryTranAmount.toLocaleString()}원`}
          className={`${dues.clubAccountHistoryInOutType === 'DEPOSIT' ? 'text-primary' : 'text-red'}`}
        />
        <Body4 text={`${dues.clubAccountHistoryBalanceAmount.toLocaleString()}원`} className="text-darkGray" />
      </div>
    </div>
  );
};

export default ListItem;
