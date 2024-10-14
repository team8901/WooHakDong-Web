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
    <div className="h-full pt-[113px] pb-[40px] px-[20px] relative">
      <div className="flex flex-col gap-[4px]">
        <Title1
          lines={[
            { segments: [{ text: "Doit" }] },
            {
              segments: [
                { text: "우학동", color: "var(--color-primary)" },
                { text: "으로 이용하기" },
              ],
            },
          ]}
        />
        <Subtitle
          text={[
            "우리 동아리 인원, 물품, 회비 그리고 일정을",
            "한 눈에 살펴보고 이용하게 해드릴게요!",
          ]}
        />
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <div className="flex flex-col gap-[12px] justify-center items-center">
          <span className="font-semiBold text-[1.4rem] text-primary">
            학교 계정으로 로그인해 주세요
          </span>
          <GoogleLoginButton />
        </div>
      </div>
    </div>
  );
};

export default LoginResgisterPage;
