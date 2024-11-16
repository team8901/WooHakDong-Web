import Button from '@components/Button';
import Title1 from '@components/Title1';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { useEffect, useState } from 'react';
import ROUTE from '@libs/constant/path';
import { getClubInfo } from '@libs/api/club';
import { useParams } from 'react-router-dom';
import Caption2 from '@components/Caption2';
import InputBox from '@components/InputBox';
import ScrollView from '@components/ScrollView';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { josa } from 'es-hangul';

const ClubRegisterPage = () => {
  const navigate = useCustomNavigate();
  const [clubName, setClubName] = useState('');
  const [clubDues, setClubDues] = useState(0);
  const [clubDescription, setClubDescription] = useState('');
  const [clubRoom, setClubRoom] = useState('');
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { isLoading, setIsLoading } = useLoading();
  const { setToastMessage } = useToast();

  const handleButtonClick = () => {
    navigate(ROUTE.PAYMENT);
  };

  useEffect(() => {
    if (!clubEnglishName) return;

    (async () => {
      setIsLoading(true);
      try {
        const { clubName, clubDues, clubDescription, clubRoom } = await getClubInfo({
          clubEnglishName,
        });

        setClubName(clubName);
        setClubDues(clubDues);
        setClubDescription(clubDescription);
        setClubRoom(clubRoom);
      } catch (error) {
        console.error(error);
        setToastMessage('동아리 정보를 불러오는 중 오류가 발생했어요');
        location.replace(ROUTE.CLUB_LIST);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) return <div>로딩 중...</div>;
  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px]">
        <Title1 text={`${josa(clubName, '와/과')} 함께해요! 🥳`} className="text-primary" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="동아리 회비" />
            <InputBox text={`${clubDues.toLocaleString()} 원`} />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="동아리 설명" />
            <InputBox
              text={clubDescription || '등록된 정보가 없어요'}
              className={`${clubDescription === '' ? 'text-[1.4rem] text-darkGray' : ''}`}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="동아리 방" />
            <InputBox
              text={clubRoom || '등록된 정보가 없어요'}
              className={`${clubRoom === '' ? 'text-[1.4rem] text-darkGray' : ''}`}
            />
          </div>
        </div>
      </ScrollView>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="회비 납부하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubRegisterPage;
