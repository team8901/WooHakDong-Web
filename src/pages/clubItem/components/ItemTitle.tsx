import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import ItemUnavailable from '@pages/clubItem/components/ItemUnavailable';
import { ClubItemResponseData } from 'types/item';

const ItemTitle = ({ item }: { item: ClubItemResponseData }) => {
  return (
    <div className="flex flex-col items-start gap-[2px]">
      <div className="flex items-center gap-[4px]">
        <Body2 text={item.itemName} className="line-clamp-1 text-start" />
        <ItemUnavailable item={item} />
      </div>
      <div className="flex items-center gap-[4px]">
        <Body4 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
        <div className="h-[8px] w-[1px] bg-gray" />
        <Body4 text={item.itemLocation} className="text-darkGray" />
      </div>
    </div>
  );
};

export default ItemTitle;
