import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Button from '@components/Button';
import Input from '@components/Input';
import Subtitle from '@components/Subtitle';
import Title2 from '@components/Title2';
import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';

const MemberInfoWritePage = () => {
  const navigate = usePrefixedNavigate();
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState('남성');
  const [major, setMajor] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // setSchool("아주대학교");
    // setEmail("mancity@ajou.ac.kr");
    // setName("김덕배");

    const checkMemberInfo = async () => {
      const { memberName, memberEmail, memberSchool } = await getMemberInfo();
      setSchool(memberSchool);
      setEmail(memberEmail);
      setName(memberName);
    };
    checkMemberInfo();
  }, []);

  const handleMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMajor(e.target.value);
  };

  const handleStudentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentNumber(e.target.value);
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
      major,
      studentNumber,
      phoneNumber,
    };
    navigate(ROUTE.MEMBER_INFO_CONFIRM, { state: data });
  };

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0">
        <AppBar />
      </div>

      <div className="masked-overflow flex h-full flex-col gap-[40px] pt-[20px] scrollbar-hide">
        <Title2 text="회원님의 정보를 알려주세요" />

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col">
            <Subtitle text="이름" />
            <Body1 text={name} className="border-b border-lightGray py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="성별" />
            <div className="flex items-center gap-[8px] pt-[9px]">
              <button
                className={`rounded-[14px] border ${
                  gender === '남성' ? 'border-primary bg-lightPrimary text-primary' : 'border-lightGray text-gray'
                } px-[16px] py-[4px] font-semiBold`}
                onClick={() => setGender('남성')}
              >
                남성
              </button>
              <button
                className={`rounded-[14px] border ${
                  gender === '여성' ? 'border-primary bg-lightPrimary text-primary' : 'border-lightGray text-gray'
                } px-[16px] py-[4px] font-semiBold`}
                onClick={() => setGender('여성')}
              >
                여성
              </button>
            </div>
          </div>
          <Input
            label="휴대폰 번호"
            placeholder="휴대폰 번호를 '-' 없이 입력해 주세요"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <div className="flex flex-col">
            <Subtitle text="이메일 주소" />
            <Body1 text={email} className="border-b border-lightGray py-[9px]" />
          </div>
          <div className="flex flex-col">
            <Subtitle text="학교" />
            <Body1 text={school} className="border-b border-lightGray py-[9px]" />
          </div>
          <Input label="학과" placeholder="소프트웨어학과" value={major} onChange={handleMajorChange} />
          <Input label="학번" placeholder="202412345" value={studentNumber} onChange={handleStudentNumberChange} />
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button
          text="다음"
          onClick={handleButtonClick}
          disabled={!major.trim() || !studentNumber.trim() || !phoneNumber.trim()}
        />
      </div>
    </div>
  );
};

export default MemberInfoWritePage;
