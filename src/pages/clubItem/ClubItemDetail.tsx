import AppBar from '@components/AppBar';
import Body1 from '@components/Body1';
import Body2 from '@components/Body2';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import Title3 from '@components/Title3';
import { useToast } from '@contexts/ToastContext';
import useModal from '@hooks/useModal';
import { getClubInfo } from '@libs/api/club';
import { postClubItemBorrow, postClubItemReturn } from '@libs/api/item';
import { getS3ImageUrl, putImageToS3 } from '@libs/api/util';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import Modal from '@pages/clubItem/components/Modal';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { ClubItemResponseData } from 'types/item';

const ClubItemDetailPage = () => {
  const { state } = useLocation();
  const item: ClubItemResponseData = state.item;
  const borrowedReturnDate: string | undefined = state.borrowedReturnDate;
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { setToastMessage } = useToast();
  const { isModalOpen, openModal, closeModal, modalRef } = useModal();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [fileBytes, setFileBytes] = useState<ArrayBuffer | null>(null);
  const [isReturned, setIsReturned] = useState(false);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [clubId, setClubId] = useState<number | null>(null);

  useEffect(() => {
    if (!clubEnglishName) return;

    (async () => {
      const { clubId } = await getClubInfo({
        clubEnglishName,
      });

      setClubId(clubId);
    })();
  }, []);

  const handleBorrow = async () => {
    if (!clubId) return;

    if (isReturned) {
      setToastMessage('이미 반납이 완료되었어요');
      return;
    }

    if (borrowedReturnDate) return;

    if (!item.itemAvailable || item.itemUsing) {
      setToastMessage('대여가능한 물품이 아니에요');
      return;
    }

    try {
      await postClubItemBorrow({ clubId, itemId: item.itemId });

      setToastMessage('대여 신청이 완료되었어요');
      setIsBorrowed(true);
    } catch (error) {
      console.error(error);
      setToastMessage('대여 신청 중 오류가 발생했어요');
    }
  };

  const handleReturn = async () => {
    if (!clubId) return;

    if (isReturned) {
      setToastMessage('이미 반납이 완료되었어요');
      return;
    }

    if (!fileBytes) return;

    const imageCount = 1;

    const { result } = await getS3ImageUrl({ imageCount });
    const { imageUrl } = result[0];

    try {
      await putImageToS3({ s3ImageUrl: imageUrl, fileBytes });
      await postClubItemReturn({ clubId, itemId: item.itemId, itemReturnImage: imageUrl.split('?')[0] });

      closeModal();
      setToastMessage('반납이 완료되었어요');
      setIsReturned(true);
    } catch (error) {
      console.error(error);
      setToastMessage(`반납 중 오류가 발생했어요\n${error}`);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE_LENGTH = 1;
    const files = e.target.files;

    if (!files) return;

    if (files.length > MAX_IMAGE_LENGTH) {
      setToastMessage('이미지는 한 개만 등록 가능해요');
      return;
    }

    const file = files[0];

    if (!file) return;

    // 파일 업로드 시 모든 파일 (*.*) 선택 방지 위해 이미지 type을 한 번 더 검증
    if (file.type !== 'image/jpeg' && file.type !== 'image/jpg' && file.type !== 'image/png') {
      setToastMessage('JPG 혹은 PNG 확장자의 이미지만 등록 가능해요');
      return;
    }

    readFileForPreview(file);
    readFileForBytes(file);
  };

  // 파일을 Base64 인코딩하기
  const readFileForPreview = (file: File) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (!reader.result) return;

      setImagePreviewUrl(reader.result as string);
    };
  };

  // 파일을 바이너리 데이터로 읽기
  const readFileForBytes = (file: File) => {
    const reader = new FileReader();

    reader.readAsArrayBuffer(file);

    reader.onload = () => {
      if (!reader.result) return;

      setFileBytes(reader.result as ArrayBuffer);
    };
  };

  const getButtonText = (item: ClubItemResponseData) => {
    if (isReturned) {
      return '반납 완료';
    }

    if (isBorrowed || borrowedReturnDate) {
      return '반납하기';
    }

    if (!item.itemAvailable) {
      return '대여 불가';
    }

    if (item.itemUsing) {
      return '대여 중';
    }

    return '대여하기';
  };

  const getButtonBgColor = (item: ClubItemResponseData) => {
    if (isReturned) {
      return 'var(--color-lightGray)';
    }

    if (isBorrowed || borrowedReturnDate) {
      return 'var(--color-primary)';
    }

    if (!item.itemAvailable) {
      return 'var(--color-lightRed)';
    }

    if (item.itemUsing) {
      return 'var(--color-lightGray)';
    }

    return 'var(--color-primary)';
  };

  const getTextColor = (item: ClubItemResponseData) => {
    if (isReturned) {
      return 'var(--color-darkGray)';
    }

    if (isBorrowed || borrowedReturnDate) {
      return 'white';
    }

    if (!item.itemAvailable) {
      return 'var(--color-red)';
    }

    if (item.itemUsing) {
      return 'var(--color-darkGray)';
    }

    return 'white';
  };

  return (
    <div className="relative h-full pb-[70px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar />
      </div>

      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px] px-[20px]">
        <div className="flex flex-col items-center gap-[20px]">
          <img
            alt="물품"
            src={item.itemPhoto || '/logo.svg'}
            // src={'/logo.svg'}
            className="h-[192px] w-[192px] rounded-[14px] border border-lightGray"
          />
          <div className="flex flex-col items-center gap-[8px]">
            <Body2 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
            <Title3 text={item.itemName} className="text-center" />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="물품 설명" className="text-darkGray" />
            <div className="rounded-[14px] border border-lightGray p-[16px]">
              <Body1 text={item.itemDescription} className="text-justify" />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="물품 위치 및 대여 가능 일 수" className="text-darkGray" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <Body1 text={item.itemLocation} />
              <Body1 text={`${item.itemRentalMaxDay}일`} />
            </div>
          </div>
        </div>
      </ScrollView>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button
          text={getButtonText(item)}
          onClick={!isReturned && (isBorrowed || borrowedReturnDate) ? openModal : handleBorrow}
          // disabled={!item.itemAvailable || item.itemUsing}
          bgColor={getButtonBgColor(item)}
          textColor={getTextColor(item)}
        />
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalRef={modalRef}
        handleImageChange={handleImageChange}
        imagePreviewUrl={imagePreviewUrl}
        handleReturn={handleReturn}
      />
    </div>
  );
};

export default ClubItemDetailPage;
