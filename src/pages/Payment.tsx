import { getClubInfo } from "@api/club/getClubInfo";
import { getMemberInfo } from "@api/member/getMemberInfo";
import { PortOneProps, postPortOne } from "@api/payment/postPortOne";
import Button from "@components/Button";
import PaymentMethodButton from "@components/payment/PaymentMethodButton";
import Title2 from "@components/Title2";
import usePrefixedNavigate from "@hooks/usePrefixedNavigate";
import { useEffect, useRef, useState } from "react";

const PaymentPage = () => {
  const navigate = usePrefixedNavigate();
  // 결제 버튼 인덱스를 저장하는 상태
  const [paymentButtonIndex, setPaymentButtonIndex] = useState(0);
  const [clubId, setClubId] = useState(0);
  const [clubName, setClubName] = useState("");
  const [clubDues, setClubDues] = useState(0);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberPhoneNumber, setMemberPhoneNumber] = useState("");
  const merchantUid = useRef("");

  useEffect(() => {
    merchantUid.current = `payment-${crypto.randomUUID()}`.slice(0, 40);
    console.log("merchantUid.current", merchantUid.current);

    const getData = async () => {
      const { memberEmail, memberName, memberPhoneNumber } =
        await getMemberInfo();
      const clubEnglishName = location.pathname.split("/")[1];
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
    const pay_method = "card";
    const name = `${clubName} 동아리원 등록하기`;
    const amount = clubDues;
    const buyer_email = memberEmail || "8901test@test.com";
    const buyer_name = memberName || "박박준";
    const buyer_tel = memberPhoneNumber || "010-4242-4242";

    const data: PortOneProps = {
      clubId,
      pg,
      pay_method,
      merchantUid: merchantUid.current,
      name,
      amount,
      buyer_email,
      buyer_name,
      buyer_tel,
    };

    await postPortOne(data);
    navigate("/");
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
      alt: "카카오페이로 결제하기",
      src: "/assets/images/payment/kakaoPay.svg",
    },
    { alt: "토스페이로 결제하기", src: "/assets/images/payment/tossPay.svg" },
  ];

  return (
    <div className="h-full pt-[56px] pb-[100px] px-[20px] relative">
      <div className="h-full flex flex-col gap-[40px] pt-[20px] scrollbar-hide masked-overflow">
        <Title2 text="결제 방법을 선택해주세요" />
        <div className="grid grid-cols-2 gap-[20px] flex-wrap justify-center">
          {paymentMethods.map((method, index) => (
            <PaymentMethodButton
              key={index}
              alt={method.alt}
              onClick={() => handlePaymentMethodButtonClick(index)}
              src={method.src}
              className={`${
                paymentButtonIndex === index ? "border-primary" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full absolute bottom-[20px] left-0 px-[20px]">
        <Button text="결제하기" onClick={handleButtonClick} />
      </div>
    </div>
  );
};

export default PaymentPage;
