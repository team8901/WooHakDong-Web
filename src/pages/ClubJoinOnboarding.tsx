import AppBar from "@components/AppBar";
import Button from "@components/Button";
import Title2 from "@components/Title2";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect } from "react";
import { getMemberInfo } from "@api/member/getMemberInfo";

const ClubJoinOnboardingPage = () => {
  const navigate = usePrefixedNavigate();

  const handleButtonClick = () => {
    navigate("/clubJoinNotice");
  };

  useEffect(() => {
    const checkMemberInfo = async () => {
      const res = await getMemberInfo();
      if (res.memberPhoneNumber) {
        navigate(`/clubJoinTempComplete`);
      } else {
        navigate(`/clubJoinOnboarding`);
      }
    };
    checkMemberInfo();
  }, []);

  return (
    <div className="h-full pt-[116px] pb-[100px] px-[20px] relative">
      <div className="absolute top-0 left-0">
        <AppBar />
      </div>

      <div className="flex flex-col">
        <Title2 text="동아리에 가입하기 전에" />
        <div>
          <Title2 text="우학동" className="text-primary" />
          <Title2 text="에 가입해야 해요" />
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="우학동 가입하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default ClubJoinOnboardingPage;
