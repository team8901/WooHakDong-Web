import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import Title4 from '@components/Title4';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getClubCount, getClubs, getMemberCount, getSchoolCount, getSchools } from '@libs/api/admin';
import ROUTE from '@libs/constant/path';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AdminClubsResponseData, SchoolsResponseData } from 'types/admin';
import Chart from 'react-apexcharts';

const categories = ['23-1', '23-2', '24-1', '24-2'];

const StatsHomePage = () => {
  const [clubCount, setClubCount] = useState(0);
  const [schoolCount, setSchoolCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [schools, setSchools] = useState<SchoolsResponseData[]>([]);
  const [clubs, setClubs] = useState<AdminClubsResponseData[]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const navigate = useCustomNavigate();
  const [clubCounts, setClubCounts] = useState<number[]>([]);
  const [schoolCounts, setSchoolCounts] = useState<number[]>([]);
  const [memberCounts, setMemberCounts] = useState<number[]>([]);

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';

    (async () => {
      setIsLoading(true);
      try {
        const { count: clubCount } = await getClubCount({ assignedTerm: '2024-09-01' });
        const { count: schoolCount } = await getSchoolCount({ assignedTerm: '2024-09-01' });
        const { count: memberCount } = await getMemberCount({ assignedTerm: '2024-09-01' });
        const { result: schoolsResult } = await getSchools();
        const { result: clubsResult } = await getClubs();

        setClubCount(clubCount);
        setSchoolCount(schoolCount);
        setMemberCount(memberCount);
        setSchools(schoolsResult);
        setClubs(clubsResult);

        const { count: clubCount1 } = await getClubCount({ assignedTerm: '2023-03-01' });
        const { count: clubCount2 } = await getClubCount({ assignedTerm: '2023-09-01' });
        const { count: clubCount3 } = await getClubCount({ assignedTerm: '2024-03-01' });
        setClubCounts([clubCount1, clubCount2, clubCount3, clubCount]);

        const { count: schoolCount1 } = await getSchoolCount({ assignedTerm: '2023-03-01' });
        const { count: schoolCount2 } = await getSchoolCount({ assignedTerm: '2023-09-01' });
        const { count: schoolCount3 } = await getSchoolCount({ assignedTerm: '2024-03-01' });
        setSchoolCounts([schoolCount1, schoolCount2, schoolCount3, schoolCount]);

        const { count: memberCount1 } = await getMemberCount({ assignedTerm: '2023-03-01' });
        const { count: memberCount2 } = await getMemberCount({ assignedTerm: '2023-09-01' });
        const { count: memberCount3 } = await getMemberCount({ assignedTerm: '2024-03-01' });
        setMemberCounts([memberCount1, memberCount2, memberCount3, memberCount]);
      } catch (error) {
        console.error(error);
        setToastMessage(`데이터를 불러오는데 실패했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleSchoolClick = (school: SchoolsResponseData) => {
    navigate(`${ROUTE.ADMIN_STATS_SCHOOL}/${school.schoolId}`, { state: { school } });
  };

  const handleCardClick = () => {
    setToastMessage('서비스 준비 중이에요');
  };

  if (isLoading)
    return (
      <div className="px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={`${index}-schools`} height={100} borderRadius={14} />
          ))}
        </div>
        <Skeleton height={22} borderRadius={14} className="mt-[30px]" />
        <Skeleton height={66} borderRadius={14} className="mt-[12px]" />
        <Skeleton height={22} borderRadius={14} className="mt-[30px]" />
        <div className="mt-[12px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={`${index}-clubs`} height={290} borderRadius={14} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] overflow-auto px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 등록된 동아리 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${clubCount}개`} />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 등록된 학교 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${schoolCount}개`} />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${memberCount}명`} />
        </button>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="학교별 동아리" />
        {schools.map((school, index) => (
          <button
            key={`${school.schoolId}-${index}`}
            type="button"
            className="flex items-center justify-between rounded-[14px] border border-lightGray px-[32px] py-[20px]"
            onClick={() => handleSchoolClick(school)}
          >
            <div className="flex items-center gap-[50px]">
              <Title4 text={String(index + 1)} />
              <Title4 text={school.schoolName} />
            </div>
            <Title4 text={school.schoolDomain} />
          </button>
        ))}
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="전체 동아리 목록" />
        <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
          {clubs.map((club) => (
            <ClubCard key={club.clubId} club={club} onClick={handleCardClick} />
          ))}
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-[16px] md:grid-cols-2">
        <Chart
          options={{
            title: {
              text: '분기별 동아리 수',
            },
            chart: {
              id: 'stats-club-count',
            },
            xaxis: {
              categories,
            },
          }}
          series={[{ name: '동아리 수', data: clubCounts }]}
          type="bar"
        />
        <Chart
          options={{
            title: {
              text: '분기별 학교 수',
            },
            chart: {
              id: 'stats-school-count',
            },
            xaxis: {
              categories,
            },
          }}
          series={[{ name: '학교 수', data: schoolCounts }]}
          type="bar"
        />
        <Chart
          options={{
            title: {
              text: '분기별 회원 수',
            },
            chart: {
              id: 'stats-member-count',
            },
            xaxis: {
              categories,
            },
          }}
          series={[{ name: '회원 수', data: memberCounts }]}
          type="bar"
        />
      </div>
    </div>
  );
};

export default StatsHomePage;
