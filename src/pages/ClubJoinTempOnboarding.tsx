import Button from "@components/Button";
import Title3 from "@components/Title3";
import { useNavigate } from "react-router-dom";

const ClubJoinTempOnboardingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/payment");
  };

  return (
    <div className="h-full pt-[113px] pb-[100px] px-[20px] relative">
      <div className="flex flex-col">
        <Title3 text="Doit 동아리 임시 가입 상태예요" />
        <Title3
          text="정식 동아리 회원이 되어서 함께 즐겨요!"
          className="text-primary"
        />
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="회비 납부하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinTempOnboardingPage;
