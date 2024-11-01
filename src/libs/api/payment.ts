import { getGroupInfo, postGroupJoin, postGroupJoinConfirm } from '@libs/api/group';
import ROUTE from '@libs/constant/path';
import { IMPResponse } from 'types/iamport';
import { PortOneProps, PortOneRequestData } from 'types/payment';

window.IMP.init('imp06661826');

const postPortOne = async ({
  clubEnglishName,
  clubId,
  pg,
  pay_method,
  merchantUid,
  name,
  amount,
  buyer_email,
  buyer_name,
  buyer_tel,
}: Readonly<PortOneProps>) => {
  return new Promise((resolve, reject) => {
    const m_redirect_url = `${import.meta.env.VITE_WEB_URL}${ROUTE.CLUB}/${clubEnglishName}${ROUTE.PAYMENT_REDIRECT}?clubId=${clubId}`;

    const data: PortOneRequestData = {
      pg,
      pay_method,
      merchant_uid: merchantUid, // 주문번호
      name, // gatheringName or gatheringDescription
      amount, // gatheringAmount
      buyer_email, // memberEmail
      buyer_name, // memberName
      buyer_tel, // memberPhoneNumber
      buyer_addr: '', // 생략
      buyer_postcode: '', // 생략
      m_redirect_url, // 모바일에서 결제 완료 시 리다이렉트되는 URL
    };

    const paymentCallback = async (response: IMPResponse) => {
      // console.log(response);
      // if (response.error_code != null) {
      //   return alert(
      //     `결제에 실패하였습니다. 에러 내용: ${response.error_msg}`
      //   );
      // }
      if (!response.success) {
        return;
      }
      const impUid = response.imp_uid;

      const { groupId } = await getGroupInfo({ clubId });
      const orderId = await postGroupJoin({ merchantUid, groupId });

      if (orderId) {
        await postGroupJoinConfirm({ merchantUid, groupId, impUid, orderId });
        resolve('동아리 가입이 완료되었습니다.');
      } else {
        reject(new Error('orderId를 받아오는 데 실패했습니다.'));
      }
    };

    window.IMP.request_pay(data, paymentCallback);
  });
};

export { postPortOne };
