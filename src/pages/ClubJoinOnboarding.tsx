import Button from "@components/Button";
import { useNavigate } from "react-router-dom";

const ClubJoinOnboardingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/clubJoinNotice");
  };

  return (
    <div className="h-full pt-[50px] pb-[110px] px-[20px] relative">
      <div className="h-full flex flex-col gap-[34px] scrollbar-hide pt-[20px] masked-overflow">
        <span className="font-semiBold text-[2.4rem] leading-[3.2rem]">
          아직 동아리 회원이 아니에요
          <br />
          <span className="text-primary">새로 가입 신청해볼까요?</span>
        </span>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[-4px]">
            <span className="text-darkGray text-[1.4rem]">동아리 이름</span>
            <span className="py-[9px] font-semiBold">Doit</span>
          </div>
          <div className="flex flex-col gap-[-4px]">
            <span className="text-darkGray text-[1.4rem]">동아리 설명</span>
            <span className="py-[9px] font-semiBold">
              아주대학교 프로그래밍 동아리 DoiT!의 이름은 Dream of interworking
              Team!의 약자입니다. 여기서 'interworking'이라는 단어는 '정보
              연결이 가능하다', '두 시스템이 대화하기 위하여 필요한 프로세스'
              등의 뜻을 가지고 있습니다.
            </span>
          </div>
          <div className="flex flex-col gap-[-4px]">
            <span className="text-darkGray text-[1.4rem]">동아리 방</span>
            <span className="py-[9px] font-semiBold">구학생회관 234호</span>
          </div>
          <div className="flex flex-col gap-[-4px]">
            <span className="text-darkGray text-[1.4rem]">동아리 회비</span>
            <span className="py-[9px] font-semiBold">20,000원</span>
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[40px] left-0 px-[20px]">
        <Button text="동아리 가입 신청하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinOnboardingPage;
