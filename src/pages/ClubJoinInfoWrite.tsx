import AppBar from "@components/AppBar";
import Body1 from "@components/Body1";
import Button from "@components/Button";
import Input from "@components/Input";
import Subtitle from "@components/Subtitle";
import Title2 from "@components/Title2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClubJoinInfoWritePage = () => {
  const navigate = useNavigate();
  const [school, setSchool] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("남성");
  const [department, setDepartment] = useState("");
  const [studentId, setStudentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    setSchool("아주대학교");
    setEmail("mancity@ajou.ac.kr");
    setName("김덕배");
  }, []);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentId(e.target.value);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleButtonClick = () => {
    const data = {
      school,
      email,
      name,
      gender,
      department,
      studentId,
      phoneNumber,
    };
    navigate("/clubJoinInfoConfirm", { state: data });
  };

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="absolute top-0 left-0">
        <AppBar />
      </div>

      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <Title2 text="회원님의 정보를 알려주세요" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <Subtitle text="학교" />
            <Body1
              text={school}
              className="py-[9px] border-b border-lightGray"
            />
          </div>
          <div className="flex flex-col">
            <Subtitle text="이메일 주소" />
            <Body1
              text={email}
              className="py-[9px] border-b border-lightGray"
            />
          </div>
          <div className="flex flex-col">
            <Subtitle text="이름" />
            <Body1 text={name} className="py-[9px] border-b border-lightGray" />
          </div>

          <div className="flex flex-col">
            <Subtitle text="성별" />
            <div className="flex gap-[8px] items-center py-[9px]">
              <button
                className={`rounded-[14px] border ${
                  gender === "남성"
                    ? "border-primary text-primary bg-lightPrimary"
                    : "border-lightGray text-gray"
                } py-[4px] px-[16px] font-semiBold`}
                onClick={() => setGender("남성")}
              >
                남성
              </button>
              <button
                className={`rounded-[14px] border ${
                  gender === "여성"
                    ? "border-primary text-primary bg-lightPrimary"
                    : "border-lightGray text-gray"
                } py-[4px] px-[16px] font-semiBold`}
                onClick={() => setGender("여성")}
              >
                여성
              </button>
            </div>
          </div>
          <Input
            placeholder="학과"
            value={department}
            onChange={handleDepartmentChange}
          />
          <Input
            placeholder="학번"
            value={studentId}
            onChange={handleStudentIdChange}
          />
          <Input
            placeholder="휴대폰 번호"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="다음" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinInfoWritePage;
