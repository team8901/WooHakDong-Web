import Body1 from '@components/Body1';
import Button from '@components/Button';
import EmptyText from '@components/EmptyText';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import { useTerm } from '@contexts/TermContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getSchoolClubCount, getSchoolClubs, getSchoolItemCount, getSchoolMemberCount } from '@libs/api/admin';
import { TERMS_MENU } from '@libs/constant/admin';
import ROUTE from '@libs/constant/path';
import ChartPerTerm from '@pages/admin/components/ChartPerTerm';
import Dropdown from '@pages/admin/components/Dropdown';
import StatsSkeleton from '@pages/admin/components/StatsSkeleton';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AdminClubsResponseData, SchoolsResponseData } from 'types/admin';
import { ClubInfoResponseData } from 'types/club';

const StatsSchoolPage = () => {
  const { state } = useLocation();
  const school: SchoolsResponseData = state.school;
  const { schoolId } = school;
  const [clubCounts, setClubCounts] = useState<number[]>([]);
  const [memberCounts, setMemberCounts] = useState<number[]>([]);
  const [itemCounts, setItemCounts] = useState<number[]>([]);
  const [clubs, setClubs] = useState<AdminClubsResponseData[][]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const { selectedTermIdx, setSelectedTermIdx } = useTerm();
  const navigate = useCustomNavigate();

  const initData = () => {
    setClubCounts([]);
    setMemberCounts([]);
    setItemCounts([]);
    setClubs([]);
  };

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';

    (async () => {
      setIsLoading(true);
      initData();
      try {
        for (const { term } of TERMS_MENU) {
          const { count: clubCount } = await getSchoolClubCount({ schoolId, assignedTerm: term });
          const { count: memberCount } = await getSchoolMemberCount({ schoolId, assignedTerm: term });
          const { count: itemCount } = await getSchoolItemCount({ schoolId, assignedTerm: term });
          const { result: clubsResult } = await getSchoolClubs({ schoolId, assignedTerm: term });

          setClubCounts((prev) => [...prev, clubCount]);
          setMemberCounts((prev) => [...prev, memberCount]);
          setItemCounts((prev) => [...prev, itemCount]);
          setClubs((prev) => [...prev, clubsResult]);
        }
      } catch (error) {
        console.error(error);
        setToastMessage(`데이터를 불러오는데 실패했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleClubClick = (club: ClubInfoResponseData) => {
    navigate(`${ROUTE.ADMIN_STATS_CLUB}/${club.clubId}`, { state: { school, club } });
  };

  if (isLoading) return <StatsSkeleton />;
  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] overflow-auto px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="fixed left-[30px]">
        <Dropdown selectedTermIdx={selectedTermIdx} setSelectedTermIdx={setSelectedTermIdx} />
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text={`학교별 동아리 > ${school.schoolName}`} />
        <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
          <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
            <Body1 text="총 등록된 동아리 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${clubCounts[selectedTermIdx]}개`} />
          </div>
          <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
            <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${memberCounts[selectedTermIdx]}명`} />
          </div>
          <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
            <Body1 text="총 등록된 물품 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${itemCounts[selectedTermIdx]}개`} />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="동아리 목록" />
        {!clubs[selectedTermIdx] || clubs[selectedTermIdx].length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <EmptyText text="등록된 동아리가 없어요" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
            {clubs[selectedTermIdx].map((club) => (
              <ClubCard key={club.clubId} club={club} onClick={() => handleClubClick(club)} />
            ))}
          </div>
        )}
      </div>

      <div className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2">
        <ChartPerTerm
          type="bar"
          title="분기별 동아리 수"
          id="stats-club-count"
          seriesData={clubCounts}
          seriesName="동아리 수"
        />
        <ChartPerTerm
          type="bar"
          title="분기별 회원 수"
          id="stats-member-count"
          seriesData={memberCounts}
          seriesName="회원 수"
        />
        <ChartPerTerm
          type="bar"
          title="분기별 물품 수"
          id="stats-item-count"
          seriesData={itemCounts}
          seriesName="물품 수"
        />
      </div>

      <div className="fixed bottom-[20px] right-[30px] flex flex-col gap-[12px]">
        <Button text="문의 보기" onClick={() => navigate(ROUTE.ADMIN_INQUIRY)} className="w-[170px] px-[20px]" />
        <Button text="전체 통계 보기" onClick={() => navigate(ROUTE.ADMIN_STATS)} className="w-[170px] px-[20px]" />
      </div>
    </div>
  );
};

export default StatsSchoolPage;
