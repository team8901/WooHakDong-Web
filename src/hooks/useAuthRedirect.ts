import { getClubsInfo } from "@api/club/getClubsInfo";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const invalidClubEnglishNames = [
  "",
  "home",
  "loginRegister",
  "memberRegister",
  "clubJoinNotice",
  "clubJoinInfoWrite",
  "clubJoinInfoConfirm",
  "clubRegister",
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

    if (!isLoggedIn) {
      navigate(`/loginRegister`);
      return;
    }

    if (!isClubURL) {
      navigate(`/home`);
      return;
    }

    const checkClubs = async () => {
      const { result } = await getClubsInfo();
      if (result.length === 0) {
        navigate(`/memberRegister`);
      } else {
        navigate(`/`);
      }
    };
    checkClubs();
  }, []);
};

export default useAuthRedirect;
