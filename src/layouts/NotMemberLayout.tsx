import useCustomNavigate from '@hooks/useCustomNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const NotMemberLayout = () => {
  const navigate = useCustomNavigate();
  const [isMember, setIsMember] = useState(true);

  useEffect(() => {
    (async () => {
      const { memberPhoneNumber } = await getMemberInfo();

      if (memberPhoneNumber) {
        navigate(ROUTE.CLUB_REGISTER);
        return;
      }

      setIsMember(false);
    })();
  }, []);

  return !isMember && <Outlet />;
};

export default NotMemberLayout;
