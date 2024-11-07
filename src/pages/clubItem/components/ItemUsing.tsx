import LockIcon from '@assets/images/item/LockIcon';
import LockOpenIcon from '@assets/images/item/LockOpenIcon';
import { ClubItem } from 'types/item';

const ItemUsing = ({ item }: { item: ClubItem }) => {
  return (
    <div className="flex items-center gap-[2px]">
      {item.itemUsing ? <LockIcon /> : <LockOpenIcon />}
      <span className={`text-[1.2rem] ${item.itemUsing ? 'text-primary' : 'text-gray'}`}>
        {item.itemUsing ? '대여 중' : '보관 중'}
      </span>
    </div>
  );
};

export default ItemUsing;
