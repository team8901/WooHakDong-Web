import BorrowIcon from '@assets/images/item/BorrowIcon';
import ReturnIcon from '@assets/images/item/ReturnIcon';
import Body2 from '@components/Body2';
import Caption2 from '@components/Caption2';
import { formatDateDetail } from '@libs/util/formatDate';
import { ClubItemsMyHistoryResponseData } from 'types/item';

type ClubItemHistoryListProps = {
  item: ClubItemsMyHistoryResponseData;
};

const ListItemHistory = ({ item }: Readonly<ClubItemHistoryListProps>) => {
  return (
    <div className="flex gap-[12px]">
      <img
        alt="반납한 물품"
        src={item.itemReturnImage || '/logo.svg'}
        // src={'/logo.svg'}
        className="h-[72px] w-[72px] flex-shrink-0 rounded-[14px] border border-lightGray object-cover"
      />
      <div className="flex w-full flex-col items-start justify-center gap-[4px]">
        <Body2 text={item.itemName} className="line-clamp-1" />
        <div className="flex items-center gap-[2px]">
          <BorrowIcon />
          <Caption2 text={formatDateDetail(item.itemRentalDate)} className="text-darkGray" />
        </div>
        <div className="flex items-center gap-[2px]">
          <ReturnIcon />
          <Caption2 text={formatDateDetail(item.itemReturnDate)} className="text-darkGray" />
        </div>
      </div>
    </div>
  );
};

export default ListItemHistory;
