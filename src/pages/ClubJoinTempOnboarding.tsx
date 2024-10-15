import Button from "@components/Button";
import Title2 from "@components/Title2";
import { useNavigate } from "react-router-dom";

const ClubJoinTempOnboardingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/payment");
  };

  return (
    <div className="h-full pt-[113px] pb-[100px] px-[20px] relative">
      <Title2
        lines={[
          {
            segments: [{ text: "Doit 동아리 임시 가입 상태예요" }],
          },
          {
            segments: [
              {
                text: "정식 동아리 회원이 되어서 함께 즐겨요!",
                color: "var(--color-primary)",
              },
            ],
          },
        ]}
      />

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="회비 납부하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinTempOnboardingPage;
