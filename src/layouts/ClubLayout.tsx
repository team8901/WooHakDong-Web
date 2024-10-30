import { DrawerProvider } from '@contexts/DrawerContext';
import { SearchProvider } from '@contexts/SearchContext';
import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getClubsInfo } from '@libs/api/club';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ClubLayout = () => {
  const navigate = usePrefixedNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  useEffect(() => {
    const checkClubs = async () => {
      const { result } = await getClubsInfo();

      if (result.length === 0 || !result.find((club) => club.clubEnglishName === clubEnglishName)) {
        navigate(ROUTE.CLUB_REGISTER);
      }
    };

    checkClubs();
  }, []);

  return (
    <DrawerProvider>
      <SearchProvider>
        <Outlet />
      </SearchProvider>
    </DrawerProvider>
  );
};

export default ClubLayout;
