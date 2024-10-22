import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const NotAuthLayout = () => {
  const navigate = useNavigate();
  const isAuth = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (isAuth) navigate("/");
  }, [isAuth]);

  return !isAuth && <Outlet />;
};

export default NotAuthLayout;
