import Body1 from "@components/Body1";
import Button from "@components/Button";
import Subtitle from "@components/Subtitle";
import Title1 from "@components/Title1";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect, useState } from "react";
// import { getClubInfo } from "@api/club/getClubInfo";
import { landingPageURLs } from "@hooks/useAuthRedirect";

const ClubJoinTempCompletePage = () => {
  const navigate = usePrefixedNavigate();
  const [clubName, setClubName] = useState("");
  const [clubDues, setClubDues] = useState(0);
  const [clubDescription, setClubDescription] = useState("");
  const [clubRoom, setClubRoom] = useState("");

  const handleButtonClick = () => {
    navigate("/payment");
  };

  useEffect(() => {
    const firstSegment = location.pathname.split("/")[1];
    const isClubURL = !landingPageURLs.includes(firstSegment);

    if (!isClubURL) return;
    const clubName = firstSegment;
    setClubName(clubName);
    setClubDues(20000);
    setClubDescription(
      "아주대학교 프로그래밍 동아리 DoiT!의 이름은 Dream of interworking Team!의 약자입니다. 여기서 'interworking'이라는 단어는 '정보 연결이 가능하다', '두 시스템이 대화하기 위하여 필요한 프로세스' 등의 뜻을 가지고 있습니다."
    );
    setClubRoom("구학생회관 234호");

    // const checkClub = async () => {
    //   try {
    //     const { clubDues, clubDescription, clubRoom } = await getClubInfo({
    //       clubName,
    //     });
    //     setClubDues(clubDues);
    //     setClubDescription(clubDescription);
    //     setClubRoom(clubRoom);
    //   } catch (error) {
    //     alert(error);
    //   }
    // };
    // checkClub();
  }, []);

  // 숫자 3자리마다 콤마 찍는 함수
  const numberWithCommas = (x: number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <Title1
          text={`이제 ${clubName}에 가입할 수 있어요! 🥳`}
          className="text-primary"
        />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Subtitle text="동아리 회비" />
            <div className="py-[14px] px-[16px] rounded-[14px] border border-lightGray">
              <Body1 text={`${numberWithCommas(clubDues)}원`} />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Subtitle text="동아리 설명" />
            <div className="py-[14px] px-[16px] rounded-[14px] border border-lightGray text-justify">
              <Body1 text={clubDescription} />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Subtitle text="동아리 방" />
            <div className="py-[14px] px-[16px] rounded-[14px] border border-lightGray">
              <Body1 text={clubRoom} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="회비 납부하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinTempCompletePage;
