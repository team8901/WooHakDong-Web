import Body3 from '@components/Body3';
import Caption2 from '@components/Caption2';
import Title1 from '@components/Title1';
import GoogleLoginButton from '@pages/login/components/GoogleLoginButton';
import { useParams } from 'react-router-dom';

const LoginRegisterPage = () => {
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  return (
    <div className="relative h-full px-[20px] pb-[40px] pt-[116px]">
      <div className="flex flex-col gap-[4px]">
        <div>
          <Title1 text={clubEnglishName || ''} />
          <div>
            <Title1 text="우학동" className="text-primary" />
            <Title1 text="으로 이용하기" />
          </div>
        </div>
        <div className="flex flex-col">
          <Caption2 text="우리 동아리 인원, 물품, 회비 그리고 일정을" className="text-darkGray" />
          <Caption2 text="한 눈에 살펴보고 이용하게 해드릴게요!" className="text-darkGray" />
        </div>
      </div>

      <div className="absolute bottom-[60px] left-0 w-full px-[20px]">
        <div className="flex flex-col items-center justify-center gap-[12px]">
          <Body3 text="학교 계정으로 로그인해 주세요" className="text-primary" />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterPage;
