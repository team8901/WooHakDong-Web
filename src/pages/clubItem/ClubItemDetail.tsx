import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Body3 from '@components/Body3';
import Caption2 from '@components/Caption2';
import Title3 from '@components/Title3';
import { getClubInfo } from '@libs/api/club';
import { postClubItemBorrow } from '@libs/api/item';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import { useLocation, useParams } from 'react-router-dom';
import { ClubItem } from 'types/item';

const ClubItemDetailPage = () => {
  const { state } = useLocation();
  const item: ClubItem = state.item;
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();

  const handleBorrow = async () => {
    if (!clubEnglishName) return;

    if (!item.itemAvailable) {
      alert('대여가능한 물품이 아닙니다.');
      return;
    }

    const { clubId } = await getClubInfo({
      clubEnglishName,
    });

    try {
      await postClubItemBorrow({ clubId, itemId: item.itemId });
      alert('대여 신청이 완료되었습니다.');
    } catch (error) {
      alert(`대여 신청 중 오류가 발생했습니다. ${error}`);
    }
  };

  return (
    <div className="relative h-full pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar />
      </div>

      <div className="masked-overflow flex h-full flex-col gap-[40px] p-[20px] scrollbar-hide">
        <div className="flex flex-col items-center gap-[20px]">
          <img
            alt="물품"
            src={item.itemPhoto || '/logo.svg'}
            className="h-[192px] w-[192px] rounded-[14px] border border-lightGray"
          />
          <div className="flex flex-col items-center gap-[8px]">
            <Body2 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
            <Title3 text={item.itemName} />
            <button
              type="button"
              className={`flex items-center justify-center rounded-[7px] px-[8px] py-[4px] ${item.itemAvailable ? 'bg-primary text-white' : 'bg-lightGray text-darkGray'}`}
              onClick={handleBorrow}
            >
              <Body3 text="대여 하기" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="물품 설명" />
            <div className="rounded-[14px] border border-lightGray p-[16px]">
              <Body1 text={item.itemDescription} className="text-justify" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="물품 위치 및 대여 가능 일 수" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <Body1 text={item.itemLocation} />
              <Body1 text={`${item.itemRentalMaxDay}일`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubItemDetailPage;
