import { postPortOne } from "@api/payment/postPortOne";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const navigate = useNavigate();

  const handlePaymentKakao = async () => {
    const pg = `kakaopay.TC0ONETIME`;
    const pay_method = "card";
    const name = "동아리원 등록하기";
    const amount = 20000;
    const buyer_email = "8901test@test.com";
    const buyer_name = "박박준";
    const buyer_tel = "010-4242-4242";

    try {
      await postPortOne({
        pg,
        pay_method,
        name,
        amount,
        buyer_email,
        buyer_name,
        buyer_tel,
      });

      alert("동아리 가입이 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  //   const handlePaymentToss = async () => {};

  return (
    <div className="flex flex-col gap-4">
      <button onClick={handlePaymentKakao}>카카오페이로 결제하기</button>
      {/* <button onClick={handlePaymentToss}>토스페이로 결제하기</button> */}
    </div>
  );
};

export default PaymentPage;
