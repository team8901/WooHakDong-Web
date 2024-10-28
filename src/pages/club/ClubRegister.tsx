import Body1 from '@components/Body1';
import Button from '@components/Button';
import Subtitle from '@components/Subtitle';
import Title1 from '@components/Title1';
import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { useEffect, useState } from 'react';
import ROUTE from '@libs/constant/path';
import { getClubInfo } from '@libs/api/club';
import { useParams } from 'react-router-dom';

const ClubRegisterPage = () => {
  const navigate = usePrefixedNavigate();
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
      const { clubName, clubDues, clubDescription, clubRoom } = await getClubInfo({
        clubEnglishName,
      });

      setClubName(clubName);
      setClubDues(clubDues);
      setClubDescription(clubDescription);
      setClubRoom(clubRoom);
    };

    checkClub();
  }, []);

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <div className="masked-overflow flex h-full flex-col gap-[40px] pt-[20px] scrollbar-hide">
        <Title1 text={`이제 ${clubName}에 가입할 수 있어요! 🥳`} className="text-primary" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Subtitle text="동아리 회비" />
            <div className="rounded-[14px] border border-lightGray px-[16px] py-[14px]">
              <Body1 text={`${clubDues.toLocaleString()}원`} />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Subtitle text="동아리 설명" />
            <div className="rounded-[14px] border border-lightGray px-[16px] py-[14px] text-justify">
              <Body1 text={clubDescription} />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Subtitle text="동아리 방" />
            <div className="rounded-[14px] border border-lightGray px-[16px] py-[14px]">
              <Body1 text={clubRoom} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="회비 납부하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubRegisterPage;
