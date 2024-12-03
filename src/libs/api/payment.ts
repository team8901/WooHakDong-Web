import { getGroupInfo, postGroupOrder, postGroupJoinConfirm } from '@libs/api/group';
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
  groupId,
}: Readonly<PortOneProps>) => {
  return new Promise((resolve, reject) => {
    const m_redirect_url = `${import.meta.env.VITE_WEB_URL}${ROUTE.CLUB}/${clubEnglishName}${ROUTE.PAYMENT_REDIRECT}?clubId=${clubId}&groupId=${groupId}`;

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
        resolve('cancel');
        return;
      }
      const impUid = response.imp_uid;

      try {
        const { groupId: clubGroupId } = await getGroupInfo({ clubId });
        const paymentGroupId = groupId || clubGroupId;

        const orderId = await postGroupOrder({ merchantUid, groupId: paymentGroupId });

        setTimeout(async () => {
          await postGroupJoinConfirm({ merchantUid, groupId: paymentGroupId, impUid, orderId });
          resolve('success');
        }, 500);
      } catch (error) {
        console.error(error);
        // reject(new Error(`결제 중 오류가 발생했어요\n${error}`));
        reject(error);
      }
    };

    window.IMP.request_pay(data, paymentCallback);
  });
};

export { postPortOne };
