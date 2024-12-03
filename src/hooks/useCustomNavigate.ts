import ROUTE from '@libs/constant/path';
import { useNavigate, useParams } from 'react-router-dom';

const useCustomNavigate = () => {
  const navigate = useNavigate();
  const { clubEnglishName, groupId } = useParams<{ clubEnglishName: string; groupId: string }>();

  const customNavigate = (path: string, options?: { replace?: boolean; state?: Record<string, unknown> }) => {
    if (clubEnglishName && groupId) {
      navigate(`${ROUTE.CLUB}/${clubEnglishName}/${ROUTE.GROUP}/${groupId}${path}`, options);
      return;
    }

    if (clubEnglishName) {
      navigate(`${ROUTE.CLUB}/${clubEnglishName}${path}`, options);
      return;
    }

    navigate(path, options);
  };

  return customNavigate;
};

export default useCustomNavigate;
