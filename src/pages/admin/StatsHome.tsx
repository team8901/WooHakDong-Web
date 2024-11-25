import Body1 from '@components/Body1';
import EmptyText from '@components/EmptyText';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import Title4 from '@components/Title4';
import { useTerm } from '@contexts/TermContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getClubCount, getClubPayments, getClubs, getMemberCount, getSchoolCount, getSchools } from '@libs/api/admin';
import { SLICED_TERMS_LABEL, TERMS_MENU } from '@libs/constant/admin';
import ROUTE from '@libs/constant/path';
import Dropdown from '@pages/admin/components/Dropdown';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Skeleton from 'react-loading-skeleton';
import { AdminClubsResponseData, SchoolsResponseData } from 'types/admin';

const StatsHomePage = () => {
  const [schools, setSchools] = useState<SchoolsResponseData[][]>([]);
  const [clubs, setClubs] = useState<AdminClubsResponseData[][]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const navigate = useCustomNavigate();
  const [clubCounts, setClubCounts] = useState<number[]>([]);
  const [schoolCounts, setSchoolCounts] = useState<number[]>([]);
  const [memberCounts, setMemberCounts] = useState<number[]>([]);
  const [payments, setPayments] = useState<number[]>([]);
  const { selectedTermIdx, setSelectedTermIdx } = useTerm();

  const initData = () => {
    setClubCounts([]);
    setSchoolCounts([]);
    setMemberCounts([]);
    setPayments([]);
    setSchools([]);
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
          const { count: clubCount } = await getClubCount({ assignedTerm: term });
          const { count: schoolCount } = await getSchoolCount({ assignedTerm: term });
          const { count: memberCount } = await getMemberCount({ assignedTerm: term });
          const { clubPayment: payment } = await getClubPayments({ assignedTerm: term });
          const { result: schoolsResult } = await getSchools({ assignedTerm: term });
          const { result: clubsResult } = await getClubs({ assignedTerm: term });

          setClubCounts((prev) => [...prev, clubCount]);
          setSchoolCounts((prev) => [...prev, schoolCount]);
          setMemberCounts((prev) => [...prev, memberCount]);
          setPayments((prev) => [...prev, payment]);
          setSchools((prev) => [...prev, schoolsResult]);
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
      <div className="fixed left-[30px]">
        <Dropdown selectedTermIdx={selectedTermIdx} setSelectedTermIdx={setSelectedTermIdx} />
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 등록된 동아리 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${clubCounts[selectedTermIdx]}개`} />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 등록된 학교 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${schoolCounts[selectedTermIdx]}개`} />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${memberCounts[selectedTermIdx]}명`} />
        </button>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="학교별 동아리" />
        {!schools[selectedTermIdx] || schools[selectedTermIdx].length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <EmptyText text="등록된 학교가 없어요" />
          </div>
        ) : (
          schools[selectedTermIdx].map((school, index) => (
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
          ))
        )}
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="전체 동아리 목록" />
        {!clubs[selectedTermIdx] || clubs[selectedTermIdx].length === 0 ? (
          <div className="flex w-full items-center justify-center">
            <EmptyText text="등록된 동아리가 없어요" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
            {clubs[selectedTermIdx].map((club) => (
              <ClubCard key={club.clubId} club={club} onClick={handleCardClick} />
            ))}
          </div>
        )}
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
              categories: SLICED_TERMS_LABEL,
            },
          }}
          series={[{ name: '동아리 수', data: clubCounts.slice(0, -1) }]}
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
              categories: SLICED_TERMS_LABEL,
            },
          }}
          series={[{ name: '학교 수', data: schoolCounts.slice(0, -1) }]}
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
              categories: SLICED_TERMS_LABEL,
            },
          }}
          series={[{ name: '회원 수', data: memberCounts.slice(0, -1) }]}
          type="bar"
        />
        <Chart
          options={{
            title: {
              text: '분기별 동아리 결제금액',
            },
            chart: {
              id: 'stats-payments',
            },
            xaxis: {
              categories: SLICED_TERMS_LABEL,
            },
          }}
          series={[{ name: '결제금액', data: payments.slice(0, -1) }]}
          type="bar"
        />
      </div>
    </div>
  );
};

export default StatsHomePage;
