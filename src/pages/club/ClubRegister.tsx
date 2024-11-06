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

const ClubRegisterPage = () => {
  const navigate = useCustomNavigate();
  const [clubName, setClubName] = useState('');
  const [clubDues, setClubDues] = useState(0);
  const [clubDescription, setClubDescription] = useState('');
  const [clubRoom, setClubRoom] = useState('');
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  const handleButtonClick = () => {
    navigate(ROUTE.PAYMENT);
  };

  useEffect(() => {
    if (!clubEnglishName) return;
    // setClubName(clubEnglishName);
    // setClubDues(20000);
    // setClubDescription(
    //   "아주대학교 프로그래밍 동아리 DoiT!의 이름은 Dream of interworking Team!의 약자입니다. 여기서 'interworking'이라는 단어는 '정보 연결이 가능하다', '두 시스템이 대화하기 위하여 필요한 프로세스' 등의 뜻을 가지고 있습니다."
    // );
    // setClubRoom("구학생회관 234호");

    const checkClub = async () => {
      try {
        const { clubName, clubDues, clubDescription, clubRoom } = await getClubInfo({
          clubEnglishName,
        });

        setClubName(clubName);
        setClubDues(clubDues);
        setClubDescription(clubDescription);
        setClubRoom(clubRoom);
      } catch (error) {
        alert(`동아리 정보를 불러오는 중 오류가 발생했습니다. ${error}`);
        location.replace(ROUTE.CLUB_LIST);
      }
    };

    checkClub();
  }, []);

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px] pt-[20px]">
        <Title1 text={`${clubName}과 함께해요! 🥳`} className="text-primary" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="동아리 회비" />
            <InputBox text={`${clubDues.toLocaleString()} 원`} />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="동아리 설명" />
            <InputBox
              text={clubDescription || '등록된 정보가 없습니다.'}
              className={`${clubDescription === '' ? 'text-darkGray' : ''}`}
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="동아리 방" />
            <InputBox
              text={clubRoom || '등록된 정보가 없습니다.'}
              className={`${clubRoom === '' ? 'text-darkGray' : ''}`}
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
