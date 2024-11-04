import ChevronRightGrayIcon from '@assets/images/chevrons/ChevronRightGrayIcon';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import ROUTE from '@libs/constant/path';
import { ClubItem, ClubItemListProps } from 'types/item';

const SearchListItem = ({ item }: Readonly<ClubItemListProps>) => {
  const navigate = useCustomNavigate();

  const handleItemClick = (item: ClubItem) => {
    navigate(`${ROUTE.ITEM}/${item.itemId}`, { state: { item } });
  };

  return (
    <button className="flex w-full cursor-pointer items-center justify-between" onClick={() => handleItemClick(item)}>
      <div className="flex flex-col items-start gap-[2px]">
        <Body2 text={item.itemName} />
        <div className="flex items-center gap-[4px]">
          <Body4 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
          <div className="h-[8px] w-[1px] bg-gray" />
          <Body4
            text={item.itemUsing ? '대여 중' : '보관 중'}
            className={`${item.itemUsing ? 'text-primary' : 'text-darkGray'}`}
          />
        </div>
      </div>
      <ChevronRightGrayIcon />
    </button>
  );
};

export default SearchListItem;
