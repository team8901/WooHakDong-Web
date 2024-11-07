import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

const NotAuthLayout = () => {
  const navigate = useCustomNavigate();
  const isAuth = !!localStorage.getItem('accessToken');

  useEffect(() => {
    if (isAuth) navigate(ROUTE.ROOT);
  }, [isAuth]);

  return !isAuth && <Outlet />;
};

export default NotAuthLayout;
