import Body1 from '@components/Body1';
import Button from '@components/Button';
import EmptyText from '@components/EmptyText';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import Title4 from '@components/Title4';
import { useTerm } from '@contexts/TermContext';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import useLoading from '@hooks/useLoading';
import {
  getClubCount,
  getClubItemCount,
  getClubPayments,
  getClubPaymentsByClubId,
  getClubs,
  getClubStatsMembers,
  getMemberCount,
  getSchoolCount,
  getSchools,
} from '@libs/api/admin';
import { TERMS_MENU } from '@libs/constant/admin';
import ROUTE from '@libs/constant/path';
import ChartPerCategory from '@pages/admin/components/ChartPerCategory';
import ChartPerTerm from '@pages/admin/components/ChartPerTerm';
import Dropdown from '@pages/admin/components/Dropdown';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AdminClubsResponseData, SchoolsResponseData } from 'types/admin';
import { ClubInfoResponseData } from 'types/club';

const StatsHomePage = () => {
  const [schools, setSchools] = useState<SchoolsResponseData[][]>([]);
  const [clubs, setClubs] = useState<AdminClubsResponseData[][]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();
  const navigate = useCustomNavigate();
  const [clubCounts, setClubCounts] = useState<number[]>([]);
  const [schoolCounts, setSchoolCounts] = useState<number[]>([]);
  const [memberCounts, setMemberCounts] = useState<number[]>([]);
  const [memberCountsPerClub, setMemberCountsPerClub] = useState<{ [clubId: number]: number }[]>([]);
  const [payments, setPayments] = useState<number[]>([]);
  const [paymentsPerClub, setPaymentsPerClub] = useState<{ [clubId: number]: number }[]>([]);
  const [itemCountsPerClub, setItemCountsPerClub] = useState<{ [clubId: number]: number }[]>([]);
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

          const clubIds = clubsResult.map((club) => club.clubId);
          const paymentsPerClubObj: { [clubId: number]: number } = {};
          const memberCountsPerClubObj: { [clubId: number]: number } = {};
          const itemCountsPerClubObj: { [clubId: number]: number } = {};

          for (const clubId of clubIds) {
            const { clubPayment } = await getClubPaymentsByClubId({ clubId, assignedTerm: term });
            paymentsPerClubObj[clubId] = clubPayment;

            const { result: membersResult } = await getClubStatsMembers({ clubId, assignedTerm: term });
            memberCountsPerClubObj[clubId] = membersResult.length;

            const { count: itemCount } = await getClubItemCount({ clubId, assignedTerm: term });
            itemCountsPerClubObj[clubId] = itemCount;
          }
          // [{ [clubId: number]: number }]
          setPaymentsPerClub((prev) => [...prev, paymentsPerClubObj]);
          setMemberCountsPerClub((prev) => [...prev, memberCountsPerClubObj]);
          setItemCountsPerClub((prev) => [...prev, itemCountsPerClubObj]);
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

  const handleClubClick = (club: ClubInfoResponseData) => {
    navigate(`${ROUTE.ADMIN_STATS_CLUB}/${club.clubId}`, { state: { club } });
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
        <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
          <Body1 text="총 등록된 동아리 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${clubCounts[selectedTermIdx]}개`} />
        </div>
        <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
          <Body1 text="총 등록된 학교 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${schoolCounts[selectedTermIdx]}개`} />
        </div>
        <div className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]">
          <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text={`${memberCounts[selectedTermIdx]}명`} />
        </div>
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
          title="분기별 학교 수"
          id="stats-school-count"
          seriesData={schoolCounts}
          seriesName="학교 수"
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
          title="분기별 동아리 결제금액"
          id="stats-payments"
          seriesData={payments}
          seriesName="결제금액"
        />
        <ChartPerCategory
          type="bar"
          title="동아리별 결제금액"
          id="stats-payments-per-club"
          xaxisCategories={(paymentsPerClub[selectedTermIdx] ? Object.keys(paymentsPerClub[selectedTermIdx]) : []).map(
            (clubId) => clubs[selectedTermIdx].find((club) => club.clubId === Number(clubId))!.clubName,
          )}
          seriesData={paymentsPerClub[selectedTermIdx] ? Object.values(paymentsPerClub[selectedTermIdx]) : []}
          seriesName="결제금액"
        />
        <ChartPerCategory
          type="bar"
          title="동아리별 회원 수"
          id="stats-member-count-per-club"
          xaxisCategories={(memberCountsPerClub[selectedTermIdx]
            ? Object.keys(memberCountsPerClub[selectedTermIdx])
            : []
          ).map((clubId) => clubs[selectedTermIdx].find((club) => club.clubId === Number(clubId))!.clubName)}
          seriesData={memberCountsPerClub[selectedTermIdx] ? Object.values(memberCountsPerClub[selectedTermIdx]) : []}
          seriesName="회원 수"
        />
        <ChartPerCategory
          type="bar"
          title="동아리별 물품 수"
          id="stats-item-count-per-club"
          xaxisCategories={(itemCountsPerClub[selectedTermIdx]
            ? Object.keys(itemCountsPerClub[selectedTermIdx])
            : []
          ).map((clubId) => clubs[selectedTermIdx].find((club) => club.clubId === Number(clubId))!.clubName)}
          seriesData={itemCountsPerClub[selectedTermIdx] ? Object.values(itemCountsPerClub[selectedTermIdx]) : []}
          seriesName="물품 수"
        />
      </div>

      <div className="fixed bottom-[20px] right-[30px] flex flex-col gap-[12px]">
        <Button text="문의 보기" onClick={() => navigate(ROUTE.ADMIN_INQUIRY)} className="w-[170px] px-[20px]" />
      </div>
    </div>
  );
};

export default StatsHomePage;
