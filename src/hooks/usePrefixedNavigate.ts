import ROUTE from '@libs/constant/path';
import { useNavigate, useParams } from 'react-router-dom';

const usePrefixedNavigate = () => {
  const navigate = useNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  const prefixedNavigate = (path: string, options?: { replace?: boolean; state?: any }) => {
    if (clubEnglishName) {
      navigate(`${ROUTE.CLUB}/${clubEnglishName}${path}`, options);
    } else {
      navigate(path, options);
    }
  };

  return prefixedNavigate;
};

export default usePrefixedNavigate;
