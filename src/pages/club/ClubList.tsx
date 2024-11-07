import ScrollView from '@components/ScrollView';
import Title2 from '@components/Title2';
import { CLUB_LIST_DATA } from '@libs/constant/club';
import ROUTE from '@libs/constant/path';
import ClubCard from '@pages/club/components/ClubCard';
import { useNavigate } from 'react-router-dom';

const ClubListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col px-[20px] pt-[76px]">
      <div className="flex flex-col">
        <div className="flex">
          <Title2 text="우학동" className="text-primary" />
          <Title2 text="과 함께 하는" />
        </div>
        <Title2 text="아주대학교 동아리 목록이에요" />
      </div>

      <ScrollView fadeTop className="grid grid-cols-2 gap-[12px] py-[20px]">
        {CLUB_LIST_DATA.map((club) => (
          <ClubCard key={club.clubId} club={club} onClick={() => navigate(`${ROUTE.CLUB}/${club.clubEnglishName}`)} />
        ))}
      </ScrollView>
    </div>
  );
};

export default ClubListPage;
