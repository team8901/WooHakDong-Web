import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  const navigate = usePrefixedNavigate();
  const isAuth = !!localStorage.getItem('accessToken');

  useEffect(() => {
    if (!isAuth) navigate(ROUTE.LOGIN_REGISTER);
  }, [isAuth]);

  return isAuth && <Outlet />;
};

export default AuthLayout;
