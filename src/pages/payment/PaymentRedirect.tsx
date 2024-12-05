import LoadingSpinner from '@components/LoadingSpinner';
import { useToast } from '@contexts/ToastContext';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { getGroupInfo, postGroupOrder, postGroupJoinConfirm } from '@libs/api/group';
import ROUTE from '@libs/constant/path';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PaymentRedirectPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const clubId = searchParams.get('clubId');
  const impUid = searchParams.get('imp_uid');
  const merchantUid = searchParams.get('merchant_uid');
  const impSuccess = searchParams.get('imp_success');
  const groupId = Number(searchParams.get('groupId'));
  const navigate = useCustomNavigate();
  const { setToastMessage } = useToast();

  useEffect(() => {
    if (clubId === null || clubId === undefined || !impUid || !merchantUid) return;

    if (impSuccess !== 'true') {
      setToastMessage('결제에 실패했어요');
      navigate(ROUTE.ROOT);
      return;
    }

    (async () => {
      try {
        const { groupId: clubGroupId } = await getGroupInfo({ clubId: Number(clubId) });
        const paymentGroupId = groupId || clubGroupId;
        const orderId = await postGroupOrder({ merchantUid, groupId: paymentGroupId });

        await postGroupJoinConfirm({ merchantUid, groupId: paymentGroupId, impUid, orderId });

        if (groupId) {
          setToastMessage('모임에 참가했어요');
          navigate(ROUTE.GROUP);
          return;
        }
        setToastMessage('동아리 가입이 완료되었어요');
        navigate(ROUTE.ROOT);
      } catch (error) {
        console.error(error);
        setToastMessage(
          (error as AxiosError).message === 'club group already joined'
            ? '이미 참가한 모임이에요'
            : '결제 중 오류가 발생했어요',
        );
        if (groupId) {
          navigate(ROUTE.GROUP);
          return;
        }
        navigate(ROUTE.PAYMENT);
      }
    })();
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default PaymentRedirectPage;
