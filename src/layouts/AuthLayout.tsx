import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect } from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  const navigate = usePrefixedNavigate();
  const isAuth = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isAuth) navigate("/loginRegister");
  }, [isAuth]);

  return isAuth && <Outlet />;
};

export default AuthLayout;
