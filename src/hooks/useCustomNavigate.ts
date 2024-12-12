import ROUTE from '@libs/constant/path';
import { useNavigate, useParams } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  const customNavigate = (path: string, options?: { replace?: boolean; state?: Record<string, unknown> }) => {
    if (clubEnglishName) {
      navigate(`${ROUTE.CLUB}/${clubEnglishName}${path}`, options);
      return;
    }

    navigate(path, options);
  };

  return customNavigate;
};

export default useCustomNavigate;
