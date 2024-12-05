import EmailIcon from '@assets/images/clubMember/EmailIcon';
import Caption1 from '@components/Caption1';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import Title2 from '@components/Title2';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { getClubsInfo } from '@libs/api/club';
// import { CLUB_LIST_DATA } from '@libs/constant/club';
import ROUTE from '@libs/constant/path';
import ClubCard from '@pages/club/components/ClubCard';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate } from 'react-router-dom';
import { ClubInfoResponseData } from 'types/club';

const ClubListPage = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState<ClubInfoResponseData[]>([]);
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { result } = await getClubsInfo();
        setClubs(result);
      } catch (error) {
        console.error(error);
        setToastMessage(`동아리 목록을 불러오는 중 오류가 발생했어요\n${error}`);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div className="flex h-full flex-col px-[20px] pt-[76px]">
      <div className="flex flex-col">
        {clubs.length === 0 ? (
          <>
            <Title2 text="아직 가입한 동아리가 없어요" />
            <Caption2 text="공유된 링크 및 QR코드를 통해 동아리에 가입해 주세요!" className="mt-[8px]" />
          </>
        ) : (
          <>
            <Title2 text="내가 가입한" />
            <Title2 text="동아리 목록이에요" />
          </>
        )}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-[12px] py-[20px]">
          <Skeleton width="100%" height={292} borderRadius={14} />
          <Skeleton width="100%" height={292} borderRadius={14} />
        </div>
      ) : (
        <ScrollView fadeTop className="grid grid-cols-2 gap-[12px]" style={{ paddingBottom: 80 }}>
          {clubs.map((club) => (
            <ClubCard key={club.clubId} club={club} onClick={() => navigate(`${ROUTE.CLUB}/${club.clubEnglishName}`)} />
          ))}
        </ScrollView>
      )}

      <div className="absolute bottom-[20px] right-[20px]">
        <button
          type="button"
          onClick={() => (location.href = 'mailto:sangjun1389@ajou.ac.kr')}
          className="flex items-center justify-center gap-[4px] rounded-[10px] bg-lightPrimary px-[12px] py-[8px] text-primary"
        >
          <EmailIcon />
          <Caption1 text="이메일로 서비스 문의하기" />
        </button>
      </div>
    </div>
  );
};

export default ClubListPage;
