import { DropDownProvider } from '@contexts/DropDownContext';
import { TermProvider } from '@contexts/TermContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { Outlet } from 'react-router';

const AdminLayout = () => {
  const navigate = useCustomNavigate();
  const isAdmin = !!localStorage.getItem('admin');

  useEffect(() => {
    if (!isAdmin) navigate(ROUTE.LOGIN_REGISTER);
  }, [isAdmin]);

  return (
    isAdmin && (
      <TermProvider>
        <DropDownProvider>
          <Outlet />
        </DropDownProvider>
      </TermProvider>
    )
  );
};

export default AdminLayout;
