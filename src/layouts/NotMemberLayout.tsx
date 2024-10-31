import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const NotMemberLayout = () => {
  const navigate = usePrefixedNavigate();
  const [isMember, setIsMember] = useState(true);

  useEffect(() => {
    const checkMemberInfo = async () => {
      const { memberPhoneNumber } = await getMemberInfo();

      if (memberPhoneNumber) {
        navigate(ROUTE.CLUB_REGISTER);
        return;
      }

      setIsMember(false);
    };

    checkMemberInfo();
  }, []);

  return !isMember && <Outlet />;
};

export default NotMemberLayout;
