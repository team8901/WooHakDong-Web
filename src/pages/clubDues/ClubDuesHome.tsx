import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import AppBar from '@components/AppBar';
import Body4 from '@components/Body4';
import Caption2 from '@components/Caption2';
import Title1 from '@components/Title1';
import { getClubInfo } from '@libs/api/club';
import { getClubDues } from '@libs/api/dues';
// import { CLUB_DUES_DATA } from '@libs/constant/dues';
import ListItem from '@pages/clubDues/components/ListItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClubDuesResponseData } from 'types/dues';

const ClubDuesHomePage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const [duesList, setDuesList] = useState<ClubDuesResponseData[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (!clubEnglishName) return;

      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1;

      const { result } = await getClubDues({ clubId, year, month });
      setDuesList(result);
    };

    getData();
    // setDuesList(CLUB_DUES_DATA);
  }, []);

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
        {duesList.map((dues) => (
          <ListItem key={dues.clubAccountHistoryId} dues={dues} />
        ))}
      </div>
    </div>
  );
};

export default ClubDuesHomePage;
