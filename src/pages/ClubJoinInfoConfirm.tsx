import AppBar from "@components/AppBar";
import Button from "@components/Button";
import { useLocation, useNavigate } from "react-router-dom";

const ClubJoinInfoConfirmPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { school, email, name, gender, department, studentId, phoneNumber } =
    location.state;

  const handleButtonClick = () => {
    const data = { email, name };
    navigate("/clubJoinTempComplete", { state: data });
  };

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="absolute top-0 left-0">
        <AppBar />
      </div>

      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <span className="font-semiBold text-[2.4rem] leading-[3.2rem]">
          회원님의 정보가 맞으신가요?
        </span>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">학교</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {school}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">이메일 주소</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {email}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">이름</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {name}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">성별</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {gender}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">학과</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {department}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">학번</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {studentId}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-darkGray text-[1.4rem]">휴대폰 번호</span>
            <span className="leading-[2.2rem] py-[9px] font-semiBold">
              {phoneNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="다음" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinInfoConfirmPage;
