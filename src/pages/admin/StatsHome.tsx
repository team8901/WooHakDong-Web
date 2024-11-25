import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import Title4 from '@components/Title4';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import { getClubCount, getClubPayments, getClubs, getMemberCount, getSchoolCount, getSchools } from '@libs/api/admin';
import ROUTE from '@libs/constant/path';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AdminClubsResponseData, SchoolsResponseData } from 'types/admin';
import Chart from 'react-apexcharts';
import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';

const TERMS_MENU = [
  { term: '', label: '전체' },
  { term: '2024-09-01', label: '24-2' },
  { term: '2024-03-01', label: '24-1' },
  { term: '2023-09-01', label: '23-2' },
  { term: '2023-03-01', label: '23-1' },
];

const TERMS = TERMS_MENU.slice(1)
  .map(({ label }) => label)
  .reverse();

const StatsHomePage = () => {
  const [schools, setSchools] = useState<SchoolsResponseData[]>([]);
  const [clubs, setClubs] = useState<AdminClubsResponseData[]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const navigate = useCustomNavigate();
  const [clubCounts, setClubCounts] = useState<number[]>([]);
  const [schoolCounts, setSchoolCounts] = useState<number[]>([]);
  const [memberCounts, setMemberCounts] = useState<number[]>([]);
  const [payments, setPayments] = useState<number[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';

    (async () => {
      setIsLoading(true);
      try {
        const { count: clubCount } = await getClubCount({});
        const { count: clubCount1 } = await getClubCount({ assignedTerm: '2023-03-01' });
        const { count: clubCount2 } = await getClubCount({ assignedTerm: '2023-09-01' });
        const { count: clubCount3 } = await getClubCount({ assignedTerm: '2024-03-01' });
        const { count: clubCount4 } = await getClubCount({ assignedTerm: '2024-09-01' });
        setClubCounts([clubCount, clubCount4, clubCount3, clubCount2, clubCount1]);

        const { count: schoolCount } = await getSchoolCount({});
        const { count: schoolCount1 } = await getSchoolCount({ assignedTerm: '2023-03-01' });
        const { count: schoolCount2 } = await getSchoolCount({ assignedTerm: '2023-09-01' });
        const { count: schoolCount3 } = await getSchoolCount({ assignedTerm: '2024-03-01' });
        const { count: schoolCount4 } = await getSchoolCount({ assignedTerm: '2024-09-01' });
        setSchoolCounts([schoolCount, schoolCount4, schoolCount3, schoolCount2, schoolCount1]);

        const { count: memberCount } = await getMemberCount({});
        const { count: memberCount1 } = await getMemberCount({ assignedTerm: '2023-03-01' });
        const { count: memberCount2 } = await getMemberCount({ assignedTerm: '2023-09-01' });
        const { count: memberCount3 } = await getMemberCount({ assignedTerm: '2024-03-01' });
        const { count: memberCount4 } = await getMemberCount({ assignedTerm: '2024-09-01' });
        setMemberCounts([memberCount, memberCount4, memberCount3, memberCount2, memberCount1]);

        const { clubPayment: payment } = await getClubPayments({});
        const { clubPayment: payment1 } = await getClubPayments({ assignedTerm: '2023-03-01' });
        const { clubPayment: payment2 } = await getClubPayments({ assignedTerm: '2023-09-01' });
        const { clubPayment: payment3 } = await getClubPayments({ assignedTerm: '2024-03-01' });
        const { clubPayment: payment4 } = await getClubPayments({ assignedTerm: '2024-09-01' });
        setPayments([payment, payment4, payment3, payment2, payment1]);

        const { result: schoolsResult } = await getSchools({});
        const { result: clubsResult } = await getClubs({});

        setSchools(schoolsResult);
        setClubs(clubsResult);
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
      <div className="fixed left-[50px]">
        <div className="relative inline-block text-left">
          <button
            type="button"
            className="text-gray-900 hover:bg-gray-50 inline-flex w-[90px] items-center justify-between gap-x-1.5 rounded-md bg-white px-4 py-2 font-semiBold shadow-sm ring-1 ring-inset ring-gray-300"
            onClick={toggleDropdown}
          >
            <span>{TERMS_MENU[selectedIdx].label}</span>
            <ChevronBottomGrayIcon className={`transform transition-all ${isDropdownOpen && '-rotate-180'}`} />
          </button>

          <div
            className={`absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${isDropdownOpen ? '' : 'hidden'}`}
          >
            <div className="py-1">
              {TERMS_MENU.map(({ term, label }, index) => (
                <button
                  key={term}
                  type="button"
                  className={`${index === selectedIdx ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'} block w-full px-4 py-2 text-left`}
                  onClick={() => {
                    setSelectedIdx(index);
                    toggleDropdown();
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 등록된 동아리 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${clubCounts[selectedIdx]}개`} />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 등록된 학교 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${schoolCounts[selectedIdx]}개`} />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
          onClick={handleCardClick}
        >
          <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${memberCounts[selectedIdx]}명`} />
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
              categories: TERMS,
            },
          }}
          series={[{ name: '동아리 수', data: clubCounts.slice(1) }]}
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
              categories: TERMS,
            },
          }}
          series={[{ name: '학교 수', data: schoolCounts.slice(1) }]}
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
              categories: TERMS,
            },
          }}
          series={[{ name: '회원 수', data: memberCounts.slice(1) }]}
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
              categories: TERMS,
            },
          }}
          series={[{ name: '결제금액', data: payments.slice(1) }]}
          type="bar"
        />
      </div>
    </div>
  );
};

export default StatsHomePage;
