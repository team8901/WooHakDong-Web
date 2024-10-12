import Button from "@components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const ClubJoinTempCompletePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, name } = location.state;

  const handleButtonClick = () => {
    console.log("회비 납부하기");
    navigate("/clubMemberHome");
  };

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <span className="font-semiBold text-[2.4rem] leading-[3.2rem] text-primary">
          Doit에 임시 가입 되었어요! 🎉
        </span>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="leading-[2.2rem] font-semiBold">
                동아리 정보 SMS 전송
              </span>
              <span className="text-darkGray text-[1.2rem]">
                {name}님의 이메일 주소로 동아리 정보를 보냈어요
              </span>
            </div>
            <div className="py-[14px] px-[16px] rounded-[14px] border border-lightGray">
              <span className="text-[1.4rem] leading-[2rem]">{email}</span>
            </div>
          </div>

          <div className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <span className="leading-[2.2rem] font-semiBold">
                동아리 회비 납부
              </span>
              <span className="text-darkGray text-[1.2rem] text-justify">
                동아리 회비를 납부해야 정식 동아리 회원이 될 수 있어요
                <br />
                지금 납부하지 않아도 이메일로 전송된 주소로 나중에 납부할 수
                있어요
              </span>
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
