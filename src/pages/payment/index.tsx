import Button from '@components/Button';
import PaymentMethodButton from '@pages/payment/components/PaymentMethodButton';
import Title2 from '@components/Title2';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { useEffect, useRef, useState } from 'react';
import ROUTE from '@libs/constant/path';
import { getMemberInfo } from '@libs/api/member';
import { getClubInfo } from '@libs/api/club';
import { PortOneProps } from 'types/payment';
import { postPortOne } from '@libs/api/payment';
import KakaoPayIcon from '@assets/images/payment/KakaoPayIcon';
import TossPayIcon from '@assets/images/payment/TossPayIcon';
import { useLocation, useParams } from 'react-router-dom';
import ScrollView from '@components/ScrollView';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import Skeleton from 'react-loading-skeleton';
import { AxiosError } from 'axios';

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useCustomNavigate();
  const [paymentButtonIndex, setPaymentButtonIndex] = useState(0);
  const [clubId, setClubId] = useState(0);
  const [clubName, setClubName] = useState('');
  const [clubDues, setClubDues] = useState(0);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPhoneNumber, setMemberPhoneNumber] = useState('');
  const merchantUid = useRef('');
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { isLoading: isClubInfoLoading, setIsLoading: setIsClubInfoLoading } = useLoading();
  const { isLoading: isPaymentLoading, setIsLoading: setIsPaymentLoading } = useLoading();
  const { setToastMessage } = useToast();

  useEffect(() => {
    if (!clubEnglishName) return;

    merchantUid.current = `payment-${crypto.randomUUID()}`.slice(0, 40);

    (async () => {
      setIsClubInfoLoading(true);
      try {
        const { memberEmail, memberName, memberPhoneNumber } = await getMemberInfo();
        const { clubName, clubId, clubDues } = await getClubInfo({
          clubEnglishName,
        });

        setClubId(clubId);
        setClubName(clubName);
        setClubDues(clubDues);
        setMemberEmail(memberEmail);
        setMemberName(memberName);
        setMemberPhoneNumber(memberPhoneNumber);
      } catch (error) {
        console.error(error);
        setToastMessage('동아리 정보를 불러오는 중 오류가 발생했어요');
      } finally {
        setIsClubInfoLoading(false);
      }
    })();
  }, []);

  const handlePostPortOne = async (pg: string) => {
    const pay_method = 'card';
    const name = `${clubName} ${state?.groupName || '동아리원 등록하기'}`;
    const amount = state?.groupAmount || clubDues;
    const buyer_email = memberEmail || '8901test@test.com';
    const buyer_name = memberName || '박박준';
    const buyer_tel = memberPhoneNumber || '010-4242-4242';

    const data: PortOneProps = {
      clubId,
      pg,
      pay_method,
      name,
      amount,
      buyer_email,
      buyer_name,
      buyer_tel,
      merchantUid: merchantUid.current,
      clubEnglishName: clubEnglishName || '',
      groupId: Number(state?.groupId),
    };

    setIsPaymentLoading(true);
    try {
      const res = await postPortOne(data);

      if (res === 'cancel') {
        setIsPaymentLoading(false);
        return;
      }

      if (state?.groupId) {
        setToastMessage('모임에 참가했어요');
        navigate(ROUTE.GROUP);
        return;
      }
      setToastMessage(`${clubName}에 가입되었어요`);
      navigate(ROUTE.ROOT);
    } catch (error) {
      console.error(error);
      setToastMessage(
        (error as AxiosError).message === 'club group already joined'
          ? '이미 참가한 모임이에요'
          : '결제 중 오류가 발생했어요',
      );
      navigate(ROUTE.GROUP);
    } finally {
      setIsPaymentLoading(false);
    }
  };

  const handlePaymentKakao = async () => {
    const pg = `kakaopay.TC0ONETIME`;
    await handlePostPortOne(pg);
  };

  const handlePaymentToss = async () => {
    const pg = `tosspay.tosstest`;
    await handlePostPortOne(pg);
  };

  const handlePaymentMethodButtonClick = (index: number) => {
    setPaymentButtonIndex(index);
  };

  const handleButtonClick = () => {
    if (paymentButtonIndex === 0) {
      handlePaymentKakao();
    } else if (paymentButtonIndex === 1) {
      handlePaymentToss();
    }
  };

  const paymentMethods = [
    {
      id: 0,
      icon: <KakaoPayIcon className="w-[66px]" />,
    },
    {
      id: 1,
      icon: <TossPayIcon className="w-[66px]" />,
    },
  ];

  return (
    <div className="relative h-full px-[20px] pb-[100px] pt-[56px]">
      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px]">
        <Title2 text="결제 방법을 선택해주세요" />

        {isClubInfoLoading ? (
          <div className="grid grid-cols-2 gap-[20px]">
            <Skeleton width="100%" height={56} borderRadius={14} />
            <Skeleton width="100%" height={56} borderRadius={14} />
          </div>
        ) : (
          <div className="grid grid-cols-2 flex-wrap justify-center gap-[20px] pb-[50px]">
            {paymentMethods.map((method) => (
              <PaymentMethodButton
                key={method.id}
                onClick={() => {
                  if (method.id === 1) {
                    setToastMessage('준비중인 결제 수단이에요');
                    return;
                  }
                  handlePaymentMethodButtonClick(method.id);
                }}
                icon={method.icon}
                className={`${paymentButtonIndex === method.id ? 'border-primary' : ''}`}
              />
            ))}
          </div>
        )}
      </ScrollView>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="결제하기" onClick={handleButtonClick} isLoading={isPaymentLoading} />
      </div>
    </div>
  );
};

export default PaymentPage;
