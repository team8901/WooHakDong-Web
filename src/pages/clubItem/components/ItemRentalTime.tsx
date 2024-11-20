import HistoryIcon from '@assets/images/item/HistoryIcon';
import { ClubItemResponseData } from 'types/item';

const ItemRentalTime = ({ item }: { item: ClubItemResponseData }) => {
  return (
    <div className="flex items-center gap-[2px]">
      <HistoryIcon />
      <span className="text-[1.2rem] text-gray">{item.itemRentalTime}</span>
    </div>
  );
};

export default ItemRentalTime;
