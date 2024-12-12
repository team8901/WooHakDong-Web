// import UnavailableIcon from '@assets/images/item/UnavailableIcon';
import { ClubItemResponseData } from 'types/item';

const ItemUnavailable = ({ item }: { item: ClubItemResponseData }) => {
  return (
    <>
      {!item.itemAvailable && (
        <div className="flex items-center gap-[2px] rounded-[8px] bg-lightRed px-[6px] py-[1px]">
          {/* <UnavailableIcon /> */}
          <span className="text-[1.2rem] text-red">대여 불가</span>
        </div>
      )}
    </>
  );
};

export default ItemUnavailable;
