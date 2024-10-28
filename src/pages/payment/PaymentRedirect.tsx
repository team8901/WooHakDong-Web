import usePrefixedNavigate from '@hooks/usePrefixedNavigate';
import { getGroupInfo, postGroupJoin, postGroupJoinConfirm } from '@libs/api/group';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentRedirectPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clubId = searchParams.get('clubId');
  const impUid = searchParams.get('imp_uid');
  const merchantUid = searchParams.get('merchant_uid');
  const impSuccess = searchParams.get('imp_success');
  const navigate = usePrefixedNavigate();

  useEffect(() => {
    if (!clubId || !impUid || !merchantUid) return;

    if (impSuccess !== 'true') {
      alert('결제에 실패했습니다.');
      navigate(ROUTE.ROOT);
      return;
    }

    const getData = async () => {
      const { groupId } = await getGroupInfo({ clubId: +clubId });
      console.log('groupId', groupId);
      const orderId = await postGroupJoin({ merchantUid, groupId });
      // console.log(merchantUid, orderId);
      if (orderId) {
        await postGroupJoinConfirm({ merchantUid, groupId, impUid, orderId });
        alert('동아리 가입이 완료되었습니다.');
      } else {
        alert('orderId를 받아오는 데 실패했습니다.');
      }

      navigate(ROUTE.ROOT);
    };

    getData();
  }, []);

  return <h1>결제 성공!</h1>;
};

export default PaymentRedirectPage;
