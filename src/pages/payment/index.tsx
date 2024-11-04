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
import { useParams } from 'react-router-dom';

const PaymentPage = () => {
  const navigate = useCustomNavigate();
  // 결제 버튼 인덱스를 저장하는 상태
  const [paymentButtonIndex, setPaymentButtonIndex] = useState(0);
  const [clubId, setClubId] = useState(0);
  const [clubName, setClubName] = useState('');
  const [clubDues, setClubDues] = useState(0);
  const [memberEmail, setMemberEmail] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberPhoneNumber, setMemberPhoneNumber] = useState('');
  const merchantUid = useRef('');
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  useEffect(() => {
    if (!clubEnglishName) return;

    merchantUid.current = `payment-${crypto.randomUUID()}`.slice(0, 40);
    console.log('merchantUid.current', merchantUid.current);

    const getData = async () => {
      const { memberEmail, memberName, memberPhoneNumber } = await getMemberInfo();
      const { clubName, clubId, clubDues } = await getClubInfo({
        clubEnglishName,
      });

      setClubId(clubId);
      setClubName(clubName);
      // setClubDues(20000);
      setClubDues(clubDues);
      setMemberEmail(memberEmail);
      setMemberName(memberName);
      setMemberPhoneNumber(memberPhoneNumber);
    };
    getData();
  }, []);

  const handlePostPortOne = async (pg: string) => {
    const pay_method = 'card';
    const name = `${clubName} 동아리원 등록하기`;
    const amount = clubDues;
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
    };

    await postPortOne(data);
    navigate(ROUTE.ROOT);
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
      <div className="masked-overflow flex h-full flex-col gap-[40px] pt-[20px] scrollbar-hide">
        <Title2 text="결제 방법을 선택해주세요" />
        <div className="grid grid-cols-2 flex-wrap justify-center gap-[20px]">
          {paymentMethods.map((method) => (
            <PaymentMethodButton
              key={method.id}
              onClick={() => handlePaymentMethodButtonClick(method.id)}
              icon={method.icon}
              className={`${paymentButtonIndex === method.id ? 'border-primary' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button text="결제하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default PaymentPage;
