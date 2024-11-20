import SearchGrayIcon from '@assets/images/item/SearchGray';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import ItemRentalTime from '@pages/clubItem/components/ItemRentalTime';
import ItemTitle from '@pages/clubItem/components/ItemTitle';
import ItemUnavailable from '@pages/clubItem/components/ItemUnavailable';
import ItemUsing from '@pages/clubItem/components/ItemUsing';
import { ClubItemListProps } from '@pages/clubItem/components/ListItem';
import { ClubItemResponseData } from 'types/item';

const SearchListItem = ({ item }: Readonly<ClubItemListProps>) => {
  const navigate = useCustomNavigate();

  const handleItemClick = (item: ClubItemResponseData) => {
    navigate(`${ROUTE.ITEM}/${item.itemId}`, { state: { item } });
  };

  return (
    <button
      className="flex w-full cursor-pointer items-center justify-between gap-[12px]"
      onClick={() => handleItemClick(item)}
    >
      <div className="flex items-center gap-[12px]">
        <div className="rounded-[30px] bg-lightGray p-[6px]">
          <SearchGrayIcon />
        </div>
        <ItemTitle item={item} />
      </div>
      <div className="flex flex-shrink-0 flex-col gap-[2px]">
        <ItemUnavailable item={item} />
        <ItemUsing item={item} />
        <ItemRentalTime item={item} />
      </div>
    </button>
  );
};

export default SearchListItem;
