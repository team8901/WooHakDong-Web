import { landingPageURLs } from "@hooks/useAuthRedirect";
import { useNavigate, useLocation } from "react-router-dom";

const usePrefixedNavigate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const prefixedNavigate = (
    path: string,
    options?: { replace?: boolean; state?: any }
  ) => {
    // Check if the current path includes a prefix
    const firstSegment = location.pathname.split("/")[1];
    const isClubURL = !landingPageURLs.includes(firstSegment);
    if (isClubURL) {
      navigate(`/${firstSegment}${path}`, options);
    } else {
      navigate(path, options);
    }
  };

  return prefixedNavigate;
};

export default usePrefixedNavigate;
