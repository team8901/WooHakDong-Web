import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import ItemRentalTime from '@pages/clubItem/components/ItemRentalTime';
import ItemTitle from '@pages/clubItem/components/ItemTitle';
import ItemUnavailable from '@pages/clubItem/components/ItemUnavailable';
import ItemUsing from '@pages/clubItem/components/ItemUsing';
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
        <ItemTitle item={item} />
        <div className="flex items-center gap-[4px] self-end">
          <ItemUnavailable item={item} />
          <ItemUsing item={item} />
          <ItemRentalTime item={item} />
        </div>
      </div>
    </button>
  );
};

export default ListItem;
