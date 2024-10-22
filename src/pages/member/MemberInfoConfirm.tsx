import {
  MemberInfoRequestData,
  postMemberInfo,
} from "@api/member/postMemberInfo";
import AppBar from "@components/AppBar";
import Body1 from "@components/Body1";
import Button from "@components/Button";
import Subtitle from "@components/Subtitle";
import Title2 from "@components/Title2";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import ROUTE from "@libs/constant/path";
import { useLocation } from "react-router-dom";

const MemberInfoConfirmPage = () => {
  const navigate = usePrefixedNavigate();
  const location = useLocation();
  const { school, email, name, gender, major, studentNumber, phoneNumber } =
    location.state;

  const handleButtonClick = async () => {
    const postData: MemberInfoRequestData = {
      memberPhoneNumber: phoneNumber,
      memberMajor: major,
      memberStudentNumber: studentNumber,
      memberGender: gender === "남성" ? "MAN" : "WOMAN",
    };
    await postMemberInfo(postData);

    navigate(ROUTE.CLUB_REGISTER);
  };

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="absolute top-0 left-0">
        <AppBar />
      </div>

      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <Title2 text="회원님의 정보가 맞으신가요?" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <Subtitle text="이름" />
            <Body1 text={name} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="성별" />
            <Body1 text={gender} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="휴대폰 번호" />
            <Body1 text={phoneNumber} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="이메일 주소" />
            <Body1 text={email} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="학교" />
            <Body1 text={school} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="학과" />
            <Body1 text={major} className="py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="학번" />
            <Body1 text={studentNumber} className="py-[9px]" />
          </div>
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="맞아요" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default MemberInfoConfirmPage;
