import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import formatDate from '@libs/util/formatDate';
import { ClubDuesResponseData } from 'types/dues';

const ListItem = ({ dues }: { dues: ClubDuesResponseData }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[2px]">
        <Body2 text={dues.clubAccountHistoryContent} />
        <Body4 text={formatDate(dues.clubAccountHistoryTranDate)} className="text-darkGray" />
      </div>
      <Body1
        text={`${dues.clubAccountHistoryTranAmount.toLocaleString()}원`}
        className={`${dues.clubAccountHistoryInOutType === 'DEPOSIT' ? 'text-primary' : 'text-[#E53935]'}`}
      />
    </div>
  );
};

export default ListItem;
