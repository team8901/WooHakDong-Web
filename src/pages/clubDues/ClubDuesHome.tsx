import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import Caption2 from '@components/Caption2';
import Title1 from '@components/Title1';
import ListItem from '@pages/clubDues/components/ListItem';

const ClubDuesHomePage = () => {
  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />
      </div>

      <div className="flex flex-col items-end gap-[4px] px-[20px] pb-[16px]">
        <Caption2 text="현재 남은 회비" />
        <Title1 text="1,240,000원" />
      </div>

      <div className="h-[5px] bg-lightGray" />

      <button className="flex items-center gap-[4px] px-[20px] pt-[16px]">
        <Body4 text="전체" className="text-darkGray" />
        <ChevronBottomGrayIcon />
      </button>

      <div className="masked-overflow flex h-full flex-col gap-[16px] px-[20px] py-[16px] scrollbar-hide">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
};

export default ClubDuesHomePage;
