import { getClubsInfo } from "@api/club/getClubsInfo";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import ROUTE from "@libs/constant/path";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const ClubLayout = () => {
  const navigate = usePrefixedNavigate();

  useEffect(() => {
    const checkClubs = async () => {
      const { result } = await getClubsInfo();
      if (result.length === 0) {
        navigate(ROUTE.MEMBER_REGISTER);
      } else {
        navigate(ROUTE.ROOT);
      }
    };
    checkClubs();
  }, []);

  return <Outlet />;
};

export default ClubLayout;
