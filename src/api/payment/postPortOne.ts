import { getGroupInfo } from "@api/group/getGroupInfo";
import { postGroupJoin } from "@api/payment/postGroupJoin";
import { postGroupJoinConfirm } from "@api/payment/postGroupJoinConfirm";
import { IMPResponse } from "types/iamport";

export type PortOneProps = {
  pg: string;
  pay_method: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
};

type PortOneRequestData = {
  pg: string;
  pay_method: string;
  merchant_uid: string;
  name: string;
  amount: number;
  buyer_email: string;
  buyer_name: string;
  buyer_tel: string;
  buyer_addr: string;
  buyer_postcode: string;
};

window.IMP.init("imp06661826");

export const postPortOne = async ({
  pg,
  pay_method,
  name,
  amount,
  buyer_email,
  buyer_name,
  buyer_tel,
}: Readonly<PortOneProps>) => {
  return new Promise((resolve, reject) => {
    // try {
    const merchantUid = `payment-${crypto.randomUUID()}`.slice(0, 40);
    const data: PortOneRequestData = {
      pg,
      pay_method,
      merchant_uid: merchantUid, // 주문번호
      name, // gatheringName or gatheringDescription
      amount, // gatheringAmount
      buyer_email, // memberEmail
      buyer_name, // memberName
      buyer_tel, // memberPhoneNumber
      buyer_addr: "", // 생략
      buyer_postcode: "", // 생략
    };
    window.IMP.request_pay(data, async (response: IMPResponse) => {
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

      const clubId = 1; // 따로 또 받아와야 함
      const { groupId } = await getGroupInfo({ clubId });
      console.log("groupId", groupId);
      const orderId = await postGroupJoin({ merchantUid, groupId });
      // console.log(merchantUid, orderId);
      if (orderId) {
        await postGroupJoinConfirm({ merchantUid, groupId, impUid, orderId });
        resolve("동아리 가입이 완료되었습니다.");
      } else {
        reject(new Error("orderId를 받아오는 데 실패했습니다."));
      }
    });
    // } catch (error) {
    //   reject(error);
    // }
  });
};
