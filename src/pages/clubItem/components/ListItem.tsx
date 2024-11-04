import HistoryIcon from '@assets/images/item/HistoryIcon';
import LockIcon from '@assets/images/item/LockIcon';
import LockOpenIcon from '@assets/images/item/LockOpenIcon';
import UnavailableIcon from '@assets/images/item/UnavailableIcon';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import ROUTE from '@libs/constant/path';
import { ClubItem, ClubItemListProps } from 'types/item';

const ListItem = ({ item }: Readonly<ClubItemListProps>) => {
  const navigate = useCustomNavigate();

  const handleItemClick = (item: ClubItem) => {
    navigate(`${ROUTE.ITEM}/${item.itemId}`, { state: { item } });
  };

  return (
    <button className="flex cursor-pointer gap-[12px]" onClick={() => handleItemClick(item)}>
      <img
        alt="물품"
        // src={item.itemPhoto || '/logo.svg'}
        src={'/logo.svg'}
        className="h-[72px] w-[72px] flex-shrink-0 rounded-[14px] border border-lightGray"
      />
      <div className="flex w-full flex-col items-start gap-[4px]">
        <div className="flex flex-col items-start gap-[2px]">
          <Body2 text={item.itemName} className="line-clamp-1 text-start" />
          <div className="flex items-center gap-[4px]">
            <Body4 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
            <div className="h-[8px] w-[1px] bg-gray" />
            <Body4 text={item.itemLocation} className="text-darkGray" />
          </div>
        </div>
        <div className="flex items-center gap-[4px] self-end">
          {!item.itemAvailable && (
            <div className="flex items-center gap-[2px]">
              <UnavailableIcon />
              <span className="text-red text-[1.2rem]">대여 불가</span>
            </div>
          )}
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
    </button>
  );
};

export default ListItem;
