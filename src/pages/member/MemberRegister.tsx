import AppBar from '@components/AppBar';
import Button from '@components/Button';
import Title2 from '@components/Title2';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import { useNavigate } from 'react-router-dom';

const MemberRegisterPage = () => {
  const navigate = useNavigate();
  const customNavigate = useCustomNavigate();

  const handleButtonClick = () => {
    customNavigate(ROUTE.CLUB_JOIN_NOTICE);
  };

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[116px]">
      <div className="absolute left-0 top-0">
        <AppBar goBackCallback={() => navigate(-1)} />
      </div>

      <div className="flex flex-col">
        <Title2 text="동아리에 가입하기 전에" />
        <div>
          <Title2 text="우학동" className="text-primary" />
          <Title2 text="에 가입해야 해요" />
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="우학동 가입하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default MemberRegisterPage;
