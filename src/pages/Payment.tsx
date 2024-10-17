import { PortOneProps, postPortOne } from "@api/payment/postPortOne";
import Button from "@components/Button";
import PaymentMethodButton from "@components/payment/PaymentMethodButton";
import Title2 from "@components/Title2";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();
  // 결제 버튼 인덱스를 저장하는 상태
  const [paymentButtonIndex, setPaymentButtonIndex] = useState(0);

  const handlePostPortOne = async (data: PortOneProps) => {
    try {
      await postPortOne(data);

      alert("동아리 가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePaymentKakao = async () => {
    const pg = `kakaopay.TC0ONETIME`;
    const pay_method = "card";
    const name = "동아리원 등록하기";
    const amount = 20000;
    const buyer_email = "8901test@test.com";
    const buyer_name = "박박준";
    const buyer_tel = "010-4242-4242";

    const data: PortOneProps = {
      pg,
      pay_method,
      name,
      amount,
      buyer_email,
      buyer_name,
      buyer_tel,
    };
    await handlePostPortOne(data);
  };

  const handlePaymentToss = async () => {
    const pg = `tosspay.TC0ONETIME`;
    const pay_method = "card";
    const name = "동아리원 등록하기";
    const amount = 20000;
    const buyer_email = "8901test@test.com";
    const buyer_name = "박박준";
    const buyer_tel = "010-4242-4242";

    const data: PortOneProps = {
      pg,
      pay_method,
      name,
      amount,
      buyer_email,
      buyer_name,
      buyer_tel,
    };
    await handlePostPortOne(data);
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
        <div className="flex gap-[8px] flex-wrap justify-center">
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
