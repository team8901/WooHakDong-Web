import HistoryIcon from '@assets/images/item/HistoryIcon';
import LockIcon from '@assets/images/item/LockIcon';
import LockOpenIcon from '@assets/images/item/LockOpenIcon';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import { CATEGORY_MENU } from '@libs/constant/item';
import { Item } from 'types/item';

type ListItemProps = {
  item: Item;
};

const ListItem = ({ item }: Readonly<ListItemProps>) => {
  return (
    <div className="flex cursor-pointer gap-[12px]">
      <img
        alt="물품"
        src={item.itemPhoto || '/logo.svg'}
        className="h-[72px] w-[72px] rounded-[14px] border border-lightGray"
      />
      <div className="flex w-full flex-col gap-[4px]">
        <div className="flex flex-col gap-[2px]">
          <Body2 text={item.itemName} />
          <div className="flex items-center gap-[4px]">
            <Body4 text={CATEGORY_MENU[item.itemCategory]} className="text-darkGray" />
            <div className="h-[8px] w-[1px] bg-gray"></div>
            <Body4 text={item.itemLocation} className="text-darkGray" />
          </div>
        </div>
        <div className="flex items-center gap-[4px] self-end">
          <div className="flex items-center gap-[2px]">
            {item.itemUsing ? <LockIcon /> : <LockOpenIcon />}
            <span className={`text-[1.2rem] ${item.itemUsing ? 'text-primary' : 'text-gray'}`}>
              {item.itemUsing ? '대여 중' : '보관 중'}
            </span>
          </div>
          <div className="flex items-center gap-[2px]">
            <HistoryIcon />
            <span className="text-[1.2rem] text-gray">{item.itemRentalTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
