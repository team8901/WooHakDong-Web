import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getMemberInfo } from '@libs/api/member';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const MemberLayout = () => {
  const navigate = usePrefixedNavigate();

  useEffect(() => {
    const checkMemberInfo = async () => {
      const { memberPhoneNumber } = await getMemberInfo();
      if (!memberPhoneNumber) {
        navigate(ROUTE.MEMBER_REGISTER);
      }
    };
    checkMemberInfo();
  }, []);

  return <Outlet />;
};

export default MemberLayout;
