import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import InputBox from '@components/InputBox';
import ScrollView from '@components/ScrollView';
import Title1 from '@components/Title1';
import { useToast } from '@contexts/ToastContext';
import useGetClubName from '@hooks/club/useGetClubName';
import useGetGroupInfoByGroupId from '@hooks/group/useGetGroupInfoByGroupId';
import useCustomNavigate from '@hooks/useCustomNavigate';
import { postGroupJoin } from '@libs/api/group';
import ROUTE from '@libs/constant/path';
import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';

const GroupRegisterPage = () => {
  const navigate = useNavigate();
  const customNavigate = useCustomNavigate();
  const { clubEnglishName, groupId } = useParams<{ clubEnglishName: string; groupId: string }>();
  const { setToastMessage } = useToast();
  const {
    data: clubName,
    isLoading: isClubNameLoading,
    isError: isClubNameError,
  } = useGetClubName({ clubEnglishName: clubEnglishName ?? '' });
  const {
    data: groupInfoData,
    isLoading: isGroupInfoLoading,
    isError: isGroupInfoError,
  } = useGetGroupInfoByGroupId({ groupId: Number(groupId) });

  const handleGroupJoin = async () => {
    try {
      await postGroupJoin({ groupId: Number(groupId) });
      setToastMessage('모임에 참가했어요');
    } catch (error) {
      console.error(error);
      setToastMessage('모임 참가 중 오류가 발생했어요');
    }
    customNavigate(ROUTE.GROUP);
  };

  const handlePay = () => {
    navigate(`${ROUTE.CLUB}/${clubEnglishName}${ROUTE.GROUP}/${groupId}${ROUTE.PAYMENT}`, {
      state: { groupName: groupInfoData?.groupName, groupAmount: groupInfoData?.groupAmount, groupId: Number(groupId) },
    });
  };

  useEffect(() => {
    if (isClubNameError || isGroupInfoError) {
      setToastMessage('그룹 정보를 불러오는 중 오류가 발생했어요');
      customNavigate(ROUTE.GROUP);
    }
  }, [isClubNameError, isGroupInfoError]);

  const isLoading = isClubNameLoading || isGroupInfoLoading;

  return (
    <div className="relative h-full px-[20px] pt-[56px]">
      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[40px]">
        <Title1 text={`${clubName} - ${groupInfoData?.groupName ?? ''}`} className="text-primary" />

        {isLoading ? (
          <div>
            <Skeleton width={100} height={16} count={1} borderRadius={14} />
            <Skeleton height={47} borderRadius={14} className="mt-[8px]" />
            <Skeleton width={100} height={16} count={1} borderRadius={14} className="mt-[20px]" />
            <Skeleton height={47} borderRadius={14} className="mt-[8px]" />
            <Skeleton width={100} height={16} count={1} borderRadius={14} className="mt-[20px]" />
            <Skeleton height={47} borderRadius={14} className="mt-[8px]" />
          </div>
        ) : (
          <div className="flex flex-col gap-[20px] pb-[80px]">
            {groupInfoData?.groupAmount && (
              <div className="flex flex-col gap-[8px]">
                <Caption2 text="참가비" />
                <InputBox text={`${groupInfoData?.groupAmount.toLocaleString()} 원`} />
              </div>
            )}
            <div className="flex flex-col gap-[8px]">
              <Caption2 text="모임 설명" />
              <InputBox
                text={groupInfoData?.groupDescription ?? '모임 설명이 없어요'}
                className={`${groupInfoData?.groupDescription === '' ? 'text-[1.4rem] text-darkGray' : ''}`}
              />
            </div>
          </div>
        )}
      </ScrollView>

      <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
        {groupInfoData?.groupAmount ? (
          <Button text="결제하기" onClick={handlePay} />
        ) : (
          <Button text="참가하기" onClick={handleGroupJoin} />
        )}
      </div>
    </div>
  );
};

export default GroupRegisterPage;
