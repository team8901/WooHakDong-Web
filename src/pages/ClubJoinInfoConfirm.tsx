import AppBar from "@components/AppBar";
import Button from "@components/Button";
import Subtitle from "@components/Subtitle";
import Title2 from "@components/Title2";
import Title3 from "@components/Title3";
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
        <Title2
          lines={[
            {
              segments: [{ text: "회원님의 정보가 맞으신가요?" }],
            },
          ]}
        />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <Subtitle text="학교" />
            <Title3 text={school} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="이메일 주소" />
            <Title3 text={email} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="이름" />
            <Title3 text={name} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="성별" />
            <Title3 text={gender} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="학과" />
            <Title3 text={department} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="학번" />
            <Title3 text={studentId} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="휴대폰 번호" />
            <Title3 text={phoneNumber} className="py-[9px]" />
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="맞아요" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinInfoConfirmPage;
