import { useAuth } from "@contexts/AuthContext";
import ROUTE from "@libs/constant/path";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("accessToken"));
  const { logout } = useAuth();

  return (
    <div className="flex flex-col items-center h-[100vh] justify-center gap-[40px]">
      <h1 className="font-semiBold text-[2.4rem]">
        안녕하세요. 우학동 랜딩페이지입니다.
      </h1>
      {isAuth ? (
        <div className="flex gap-4">
          <button
            className="w-[150px] h-[150px] rounded-[20px] shadow-md flex justify-center items-center bg-lightPrimary"
            onClick={() => {
              logout();
              setIsAuth(false);
            }}
          >
            <span className="font-semiBold text-[2rem]">로그아웃하기</span>
          </button>
          <button
            className="w-[150px] h-[150px] rounded-[20px] shadow-md flex justify-center items-center bg-lightPrimary"
            onClick={() => navigate(ROUTE.CLUB_LIST)}
          >
            <span className="font-semiBold text-[2rem]">동아리 둘러보기</span>
          </button>
        </div>
      ) : (
        <button
          className="w-[150px] h-[150px] rounded-[20px] shadow-md flex justify-center items-center bg-lightPrimary"
          onClick={() => navigate(ROUTE.LOGIN_REGISTER)}
        >
          <span className="font-semiBold text-[2rem]">로그인하기</span>
        </button>
      )}
    </div>
  );
};

export default LandingPage;
