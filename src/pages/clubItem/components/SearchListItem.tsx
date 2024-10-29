import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import { ITEM_CATEGORY } from '@libs/constant/item';
import { Item } from 'types/item';

type ListItemProps = {
  item: Item;
};

const SearchListItem = ({ item }: Readonly<ListItemProps>) => {
  return (
    <div className="flex w-full cursor-pointer items-center justify-between">
      <div className="flex flex-col gap-[2px]">
        <Body2 text={item.itemName} />
        <div className="flex items-center gap-[4px]">
          <Body4 text={ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
          <div className="h-[8px] w-[1px] bg-gray" />
          <Body4
            text={item.itemUsing ? '대여 중' : '보관 중'}
            className={`${item.itemUsing ? 'text-primary' : 'text-darkGray'}`}
          />
        </div>
      </div>
      <ChevronRightGrayIcon />
    </div>
  );
};

export default SearchListItem;
