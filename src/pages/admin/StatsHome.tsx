import Body1 from '@components/Body1';
import Title1 from '@components/Title1';
import Title3 from '@components/Title3';
import Title4 from '@components/Title4';
import { CLUB_LIST_DATA } from '@libs/constant/club';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect } from 'react';

const StatsHomePage = () => {
  useEffect(() => {
    document.body.style.minWidth = '100%';
    document.body.style.maxWidth = '100%';
  }, []);

  const handleCardClick = () => {};

  return (
    <div className="flex h-full w-full flex-col items-center gap-[30px] overflow-auto px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
        >
          <Body1 text="총 등록된 동아리 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text="4개" />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
        >
          <Body1 text="총 등록된 학교 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text="2개" />
        </button>
        <button
          type="button"
          className="flex w-full flex-col justify-center gap-[4px] rounded-[14px] border border-lightGray p-[20px]"
        >
          <Body1 text="총 등록된 물품 수" className="text-[1.8rem] text-darkGray" />
          <Title1 text="13개" />
        </button>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="학교별 동아리" />
        <button
          type="button"
          className="flex items-center justify-between rounded-[14px] border border-lightGray px-[32px] py-[20px]"
        >
          <div className="flex items-center gap-[50px]">
            <Title4 text="1" />
            <Title4 text="아주대학교" />
          </div>
          <Title4 text="4개" />
        </button>
        <button
          type="button"
          className="flex items-center justify-between rounded-[14px] border border-lightGray px-[32px] py-[20px]"
        >
          <div className="flex items-center gap-[50px]">
            <Title4 text="2" />
            <Title4 text="서울대학교" />
          </div>
          <Title4 text="2개" />
        </button>
      </div>

      <div className="flex w-full flex-col gap-[12px]">
        <Title3 text="전체 동아리 목록" />
        <div className="grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
          {CLUB_LIST_DATA.map((club) => (
            <ClubCard key={club.clubId} club={club} onClick={handleCardClick} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsHomePage;
