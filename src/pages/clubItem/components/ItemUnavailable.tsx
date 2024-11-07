import UnavailableIcon from '@assets/images/item/UnavailableIcon';
import { ClubItem } from 'types/item';

const ItemUnavailable = ({ item }: { item: ClubItem }) => {
  return (
    <>
      {!item.itemAvailable && (
        <div className="flex items-center gap-[2px]">
          <UnavailableIcon />
          <span className="text-[1.2rem] text-red">대여 불가</span>
        </div>
      )}
    </>
  );
};

export default ItemUnavailable;
