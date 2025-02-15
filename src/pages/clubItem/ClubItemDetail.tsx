import LocationIcon from '@assets/images/item/LocationIcon';
import RemainingTimeIcon from '@assets/images/item/RemainingTimeIcon';
import InfoIcon from '@assets/images/schedule/InfoIcon';
import AppBar from '@components/AppBar';
import Body2 from '@components/Body2';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import IconText from '@components/IconText';
import InputBox from '@components/InputBox';
import Title3 from '@components/Title3';
import Title4 from '@components/Title4';
import { useToast } from '@contexts/ToastContext';
import useGetClubId from '@hooks/club/useGetClubId';
import useGetClubItems from '@hooks/item/useGetClubItems';
import useGetClubItemsMy from '@hooks/item/useGetClubItemsMy';
import useGetClubItemsMyHistory from '@hooks/item/useGetClubItemsMyHistory';
import useLoading from '@hooks/useLoading';
import useModal from '@hooks/useModal';
import { postClubItemBorrow, postClubItemReturn } from '@libs/api/item';
import { getS3ImageUrl, putImageToS3 } from '@libs/api/util';
import { CLUB_ITEM_CATEGORY } from '@libs/constant/item';
import getItemImage from '@libs/util/getItemImage';
import getRemainingDays from '@libs/util/getRemainingDays';
import Modal from '@pages/clubItem/components/Modal';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ClubItemResponseData } from 'types/item';

const ClubItemDetailPage = () => {
  const { state } = useLocation();
  const item: ClubItemResponseData = state.item;
  const borrowedReturnDate: string | undefined = state.borrowedReturnDate;
  const { clubEnglishName } = useParams<{ clubEnglishName: string }>();
  const { isModalOpen, openModal, closeModal, modalRef } = useModal();
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [fileBytes, setFileBytes] = useState<ArrayBuffer | null>(null);
  const { isLoading: isBorrowLoading, setIsLoading: setIsBorrowLoading } = useLoading();
  const { isLoading: isReturnLoading, setIsLoading: setIsReturnLoading } = useLoading();
  const { setToastMessage } = useToast();
  const navigate = useNavigate();
  const {
    data: clubId,
    isError: isClubIdError,
    isLoading: isClubIdLoading,
  } = useGetClubId({ clubEnglishName: clubEnglishName || '' });
  const { refetch: refetchClubItems } = useGetClubItems({ clubId: clubId ?? 0 });
  const { refetch: refetchClubItemsMy } = useGetClubItemsMy({ clubId: clubId ?? 0 });
  const { refetch: refetchClubItemsMyHistory } = useGetClubItemsMyHistory({ clubId: clubId ?? 0 });

  useEffect(() => {
    if (isClubIdError) {
      setToastMessage(`물품 상세 정보를 불러오는 중 오류가 발생했어요`);
    }
  }, [isClubIdError]);

  const handleBorrow = async () => {
    if (!clubId || borrowedReturnDate) return;

    if (!item.itemAvailable || item.itemUsing) {
      setToastMessage('대여가능한 물품이 아니에요');
      return;
    }

    setIsBorrowLoading(true);
    try {
      await postClubItemBorrow({ clubId, itemId: item.itemId });

      setToastMessage('대여 신청이 완료되었어요');
      await refetchClubItems();
      await refetchClubItemsMy();
      await refetchClubItemsMyHistory();
      navigate(-1);
    } catch (error) {
      console.error(error);
      setToastMessage(
        (error as AxiosError).message === 'item using'
          ? '이미 대여 완료된 물품이에요'
          : `대여 신청 중 오류가 발생했어요`,
      );
      navigate(-1);
    } finally {
      setIsBorrowLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!clubId || !fileBytes) return;

    const imageCount = 1;

    const { result } = await getS3ImageUrl({ imageCount });
    const { imageUrl } = result[0];

    setIsReturnLoading(true);
    try {
      await putImageToS3({ s3ImageUrl: imageUrl, fileBytes });
      await postClubItemReturn({ clubId, itemId: item.itemId, itemReturnImage: imageUrl.split('?')[0] });

      closeModal();
      setToastMessage('반납이 완료되었어요');
      await refetchClubItems();
      await refetchClubItemsMy();
      await refetchClubItemsMyHistory();
      navigate(-1);
    } catch (error) {
      console.error(error);
      setToastMessage(`반납 중 오류가 발생했어요\n${error}`);
    } finally {
      setIsReturnLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const MAX_IMAGE_LENGTH = 1;
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
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

    // 파일 용량 제한 검증
    if (file.size > MAX_FILE_SIZE) {
      setToastMessage('이미지 파일 용량은 5MB 이하만 등록 가능해요');
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
    if (borrowedReturnDate) {
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
    if (borrowedReturnDate) {
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
    if (borrowedReturnDate) {
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

  const isLoading = isClubIdLoading;

  return (
    <div className="relative h-full pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar goBackCallback={() => navigate(-1)} />
      </div>

      {isLoading ? (
        <div className="flex flex-col px-[20px]">
          <div className="flex flex-col items-center">
            <Skeleton width={192} height={192} borderRadius={14} className="mt-[20px]" />
            <Skeleton width={100} height={22} borderRadius={14} className="mt-[20px]" />
            <Skeleton width={100} height={22} borderRadius={14} className="mt-[8px]" />
          </div>
          <Skeleton width={100} height={22} borderRadius={14} className="mt-[40px]" />
          <Skeleton height={58} borderRadius={14} className="mt-[8px]" />
          <Skeleton width={100} height={22} borderRadius={14} className="mt-[20px]" />
          <Skeleton height={58} borderRadius={14} className="mt-[8px]" />
        </div>
      ) : (
        <div className="flex h-full flex-col gap-[20px] overflow-y-auto pb-[100px] scrollbar-hide">
          <img
            alt="물품"
            src={item.itemPhoto || getItemImage(item.itemCategory)}
            className="aspect-square w-full object-cover"
          />

          <div className="flex flex-col gap-[40px] px-[20px]">
            <div className="flex flex-col items-start gap-[8px]">
              <Body2 text={CLUB_ITEM_CATEGORY[item.itemCategory]} className="text-darkGray" />
              <Title3 text={item.itemName} className="line-clamp-1" />
              {borrowedReturnDate && (
                <div
                  className={`flex h-[30px] items-center justify-center rounded-[7px] ${getRemainingDays(borrowedReturnDate) > 0 ? 'bg-lightPrimary text-primary' : 'bg-lightRed text-red'} px-[6px]`}
                >
                  <Title4
                    text={
                      getRemainingDays(borrowedReturnDate) > 0
                        ? `반납 ${getRemainingDays(borrowedReturnDate)}일 남음`
                        : `연체 ${-getRemainingDays(borrowedReturnDate)}일 경과`
                    }
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-[20px]">
              <div className="flex flex-col gap-[8px]">
                <Caption2 text="물품 설명" className="text-darkGray" />
                <InputBox icon={<InfoIcon />} text={item.itemDescription} />
              </div>
              <div className="flex flex-col gap-[8px]">
                <Caption2 text="물품 추가 정보" className="text-darkGray" />
                <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
                  <IconText icon={<LocationIcon />} text={item.itemLocation} />
                  <IconText icon={<RemainingTimeIcon />} text={`${item.itemRentalMaxDay}일 대여 가능`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        <Button
          text={getButtonText(item)}
          onClick={borrowedReturnDate ? openModal : handleBorrow}
          // disabled={!item.itemAvailable || item.itemUsing}
          bgColor={getButtonBgColor(item)}
          textColor={getTextColor(item)}
          isLoading={isBorrowLoading || isReturnLoading}
        />
      </div>

      <Modal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalRef={modalRef}
        handleImageChange={handleImageChange}
        imagePreviewUrl={imagePreviewUrl}
        handleReturn={handleReturn}
        isLoading={isReturnLoading}
      />
    </div>
  );
};

export default ClubItemDetailPage;
