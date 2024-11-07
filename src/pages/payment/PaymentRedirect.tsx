import LoadingSpinner from '@components/LoadingSpinner';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
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
  const navigate = useCustomNavigate();
  const { setToastMessage } = useToast();

  useEffect(() => {
    if (clubId === null || clubId === undefined || !impUid || !merchantUid) return;

    if (impSuccess !== 'true') {
      setToastMessage('결제에 실패했어요');
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
        setToastMessage('동아리 가입이 완료되었어요');
      } else {
        setToastMessage('동아리 가입에 실패했어요');
      }

      navigate(ROUTE.ROOT);
    };

    getData();
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default PaymentRedirectPage;
