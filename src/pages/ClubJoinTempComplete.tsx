import Button from "@components/Button";
import Subtitle from "@components/Subtitle";
import Title1 from "@components/Title1";
import Title3 from "@components/Title3";
import { useLocation, useNavigate } from "react-router-dom";

const ClubJoinTempCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name } = location.state;

  const handleButtonClick = () => {
    navigate("/payment");
  };

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <Title1
          lines={[
            {
              segments: [
                {
                  text: "Doit에 임시 가입 되었어요! 🎉",
                  color: "var(--color-primary)",
                },
              ],
            },
          ]}
        />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <Title3 text="동아리 정보 SMS 전송" />
              <Subtitle
                text={`${name}님의 이메일 주소로 동아리 정보를 보냈어요`}
              />
            </div>
            <div className="py-[14px] px-[16px] rounded-[14px] border border-lightGray">
              <span className="text-[1.4rem] leading-[2rem]">{email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <Title3 text="동아리 회비 납부" />
              <Subtitle
                text={[
                  "동아리 회비를 납부해야 정식 동아리 회원이 될 수 있어요",
                  "지금 납부하지 않아도 이메일로 전송된 주소로 나중에 납부할 수 있어요",
                ]}
              />
            </div>
            <div className="py-[14px] px-[16px] rounded-[14px] border border-lightGray">
              <span className="text-[1.4rem] leading-[2rem]">20,000원</span>
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
