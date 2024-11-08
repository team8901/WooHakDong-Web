import useCustomNavigate from '@hooks/useCustomNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const MemberLayout = () => {
  const navigate = useCustomNavigate();
  const [isMember, setIsMember] = useState(false);

  useEffect(() => {
    (async () => {
      const { memberPhoneNumber } = await getMemberInfo();

      if (!memberPhoneNumber) {
        navigate(ROUTE.MEMBER_REGISTER);
        return;
      }

      setIsMember(true);
    })();
  }, []);

  return isMember && <Outlet />;
};

export default MemberLayout;
