import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import Title1 from '@components/Title1';
import { useAuth } from '@contexts/AuthContext';
import ROUTE from '@libs/constant/path';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('accessToken'));
  const { logout } = useAuth();

  return (
    <div className="relative flex h-full flex-col px-[20px] pb-[100px] pt-[116px]">
      <div className="flex flex-col gap-[4px]">
        <div className="flex">
          <Title1 text="우학동" className="text-primary" />
          <Title1 text=": 우리 학교 동아리" />
        </div>
        <div className="flex flex-col">
          <Caption2 text="우리 동아리 인원, 물품, 회비 그리고 일정을" className="text-darkGray" />
          <Caption2 text="한 눈에 살펴보고 이용하게 해드릴게요!" className="text-darkGray" />
        </div>
      </div>

      <div className="absolute bottom-[60px] left-0 flex w-full flex-col gap-[20px] px-[20px]">
        {isAuth ? (
          <div className="flex flex-col gap-[16px]">
            <Button
              text="로그아웃하기"
              onClick={() => {
                logout();
                setIsAuth(false);
              }}
              bgColor="var(--color-lightGray)"
              textColor="var(--color-black)"
            />
            <Button text="동아리 둘러보기" onClick={() => navigate(ROUTE.CLUB_LIST)} />
          </div>
        ) : (
          <Button text="로그인하기" onClick={() => navigate(ROUTE.LOGIN_REGISTER)} />
        )}
      </div>
    </div>
  );
};

export default LandingPage;
