import Button from "@components/Button";
import Subtitle from "@components/Subtitle";
import Title1 from "@components/Title1";
import Title3 from "@components/Title3";
import { useNavigate } from "react-router-dom";

const ClubJoinOnboardingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/clubJoinNotice");
  };

  return (
    <div className="h-full pt-[50px] pb-[100px] px-[20px] relative">
      <div className="h-full flex flex-col gap-[34px] scrollbar-hide pt-[20px] masked-overflow">
        <Title1
          lines={[
            { segments: [{ text: "아직 동아리 회원이 아니에요" }] },
            {
              segments: [
                {
                  text: "새로 가입 신청해볼까요?",
                  color: "var(--color-primary)",
                },
              ],
            },
          ]}
        />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[4px]">
            <Subtitle text="동아리 이름" />
            <Title3 text="Doit" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <Subtitle text="동아리 설명" />
            <Title3
              text="아주대학교 프로그래밍 동아리 DoiT!의 이름은 Dream of interworking
              Team!의 약자입니다. 여기서 'interworking'이라는 단어는 '정보
              연결이 가능하다', '두 시스템이 대화하기 위하여 필요한 프로세스'
              등의 뜻을 가지고 있습니다."
              className="text-justify"
            />
          </div>
          <div className="flex flex-col gap-[4px]">
            <Subtitle text="동아리 방" />
            <Title3 text="구학생회관 234호" />
          </div>
          <div className="flex flex-col gap-[4px]">
            <Subtitle text="동아리 회비" />
            <Title3 text="20,000원" />
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="동아리 가입 신청하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinOnboardingPage;
