import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Body4 from '@components/Body4';

const ListItem = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-[2px]">
        <Body2 text="회식비" />
        <Body4 text="8월 15일 오후 5:00" className="text-darkGray" />
      </div>
      <Body1 text="45,000원" />
    </div>
  );
};

export default ListItem;
