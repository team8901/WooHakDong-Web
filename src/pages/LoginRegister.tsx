import Body3 from "@components/Body3";
import GoogleLoginButton from "@components/GoogleLoginButton";
import Subtitle from "@components/Subtitle";
import Title1 from "@components/Title1";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginResgisterPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("accessToken");
    if (isLoggedIn) {
      navigate("/clubJoinTempOnboarding");
    }
  }, [navigate]);

  return (
    <div className="h-full pt-[116px] pb-[40px] px-[20px] relative">
      <div className="flex flex-col gap-[4px]">
        <div>
          <Title1 text="Doit" />
          <div>
            <Title1 text="우학동" className="text-primary" />
            <Title1 text="으로 이용하기" />
          </div>
        </div>
        <div className="flex flex-col">
          <Subtitle text="우리 동아리 인원, 물품, 회비 그리고 일정을" />
          <Subtitle text="한 눈에 살펴보고 이용하게 해드릴게요!" />
        </div>
      </div>

      <div className="w-full absolute bottom-[60px] left-0 px-[20px]">
        <div className="flex flex-col gap-[12px] justify-center items-center">
          <Body3
            text="학교 계정으로 로그인해 주세요"
            className="text-primary"
          />
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginResgisterPage;
