import { getClubsInfo } from "@api/club/getClubsInfo";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const invalidClubEnglishNames = [
  "",
  "home",
  "loginRegister",
  "clubJoinOnboarding",
  "clubJoinNotice",
  "clubJoinInfoWrite",
  "clubJoinInfoConfirm",
  "clubJoinTempComplete",
  "payment",
];

const useAuthRedirect = () => {
  const navigate = usePrefixedNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem("accessToken");

    // Extract the first segment of the path
    const firstSegment = location.pathname.split("/")[1];
    const isClubURL = !invalidClubEnglishNames.includes(firstSegment);

    if (!isClubURL) {
      if (!isLoggedIn) {
        navigate(`/loginRegister`);
      } else {
        navigate(`/home`);
      }
      return;
    }

    if (!isLoggedIn) {
      navigate(`/loginRegister`);
      return;
    }

    const checkClubs = async () => {
      const { result } = await getClubsInfo();
      if (result.length === 0) {
        navigate(`/clubJoinOnboarding`);
      } else {
        navigate(`/`);
      }
    };
    checkClubs();
  }, []);
};

export default useAuthRedirect;
