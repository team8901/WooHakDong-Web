import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { getSchoolClubCount, getSchoolClubs, getSchoolItemCount, getSchoolMemberCount } from '@libs/api/admin';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation } from 'react-router-dom';
import { AdminClubsResponseData, SchoolsResponseData } from 'types/admin';

const StatsSchoolPage = () => {
  const { state } = useLocation();
  const school: SchoolsResponseData = state.school;
  const { schoolId } = school;
  const [clubCount, setClubCount] = useState(0);
  const [memberCount, setMemberCount] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [clubs, setClubs] = useState<AdminClubsResponseData[]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';

    (async () => {
      setIsLoading(true);
      try {
        const { count: clubCount } = await getSchoolClubCount({ schoolId });
        const { count: memberCount } = await getSchoolMemberCount({ schoolId });
        const { count: itemCount } = await getSchoolItemCount({ schoolId });
        const { result: clubsResult } = await getSchoolClubs({ schoolId });

        setClubCount(clubCount);
        setMemberCount(memberCount);
        setItemCount(itemCount);
        setClubs(clubsResult);
      } catch (error) {
        console.error(error);
        setToastMessage(`데이터를 불러오는데 실패했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const handleCardClick = () => {
    setToastMessage('서비스 준비 중이에요');
  };

  if (isLoading)
    return (
      <div className="px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={`${index}-top`} height={100} borderRadius={14} />
          ))}
        </div>
        <Skeleton height={22} borderRadius={14} className="mt-[30px]" />
        <div className="mt-[12px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} height={290} borderRadius={14} />
          ))}
        </div>
      </div>
    );
  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] overflow-auto px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text={`학교별 동아리 > ${school.schoolName}`} />
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
            <Body1 text="총 가입한 회원 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${memberCount}명`} />
          </button>
          <button
            type="button"
            className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
            onClick={handleCardClick}
          >
            <Body1 text="총 등록된 물품 수" className="text-[1.8rem] text-darkGray" />
            <Title1 text={`${itemCount}개`} />
          </button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="동아리 목록" />
        <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
          {clubs.map((club) => (
            <ClubCard key={club.clubId} club={club} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSchoolPage;
