import useCustomNavigate from '@hooks/useCustomNavigate';
import { getGroupInfoByGroupId } from '@libs/api/group';
import ROUTE from '@libs/constant/path';
import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

const GroupLayout = () => {
  const navigate = useCustomNavigate();
  const { groupId } = useParams<{ groupId: string }>();
  const [isGroup, setIsGroup] = useState(false);

  useEffect(() => {
    if (!groupId) {
      navigate(ROUTE.ROOT);
      return;
    }

    (async () => {
      try {
        const res = await getGroupInfoByGroupId({ groupId: Number(groupId) });
        if (!res.groupIsActivated) {
          navigate(ROUTE.ROOT);
          return;
        }
        setIsGroup(true);
      } catch (error) {
        console.error(error);
        navigate(ROUTE.ROOT);
      }
    })();
  }, []);

  return isGroup && <Outlet />;
};

export default GroupLayout;
