import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getClubsInfo } from '@libs/api/club';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const NotClubLayout = () => {
  const navigate = usePrefixedNavigate();

  useEffect(() => {
    const checkClubs = async () => {
      const { result } = await getClubsInfo();
      if (result.length > 0) {
        navigate(ROUTE.ROOT);
      }
    };
    checkClubs();
  }, []);

  return <Outlet />;
};

export default NotClubLayout;
