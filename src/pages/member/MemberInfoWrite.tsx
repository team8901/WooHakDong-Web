import AppBar from '@components/AppBar';
import Button from '@components/Button';
import Input from '@components/Input';
import Caption2 from '@components/Caption2';
import Title2 from '@components/Title2';
import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import InputBox from '@components/InputBox';
import GenderSelection from '@pages/member/components/GenderSelection';
import { Gender } from 'types/member';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';

const MemberInfoWritePage = () => {
  const navigate = usePrefixedNavigate();
  const [school, setSchool] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState<Gender>('MAN');
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
    const input = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    setPhoneNumber(input);
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
          <div className="flex flex-col gap-[12px]">
            <Caption2 text="기본 정보" />
            <InputBox text={name} />
            <GenderSelection gender={gender} setGender={setGender} />
            <Input
              inputMode="numeric"
              label="휴대폰 번호"
              placeholder="휴대폰 번호를 '-' 없이 입력해 주세요"
              value={formatPhoneNumber(phoneNumber)}
              onChange={handlePhoneNumberChange}
            />
            <InputBox text={email} />
          </div>

          <div className="flex flex-col gap-[12px]">
            <Caption2 text="학교 정보" />
            <InputBox text={school} />
            <Input label="학과" placeholder="학과를 입력해 주세요" value={major} onChange={handleMajorChange} />
            <Input
              type="number"
              inputMode="numeric"
              label="학번"
              placeholder="학번을 입력해 주세요"
              value={studentNumber}
              onChange={handleStudentNumberChange}
            />
          </div>
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
