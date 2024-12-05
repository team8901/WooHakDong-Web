import AppBar from '@components/AppBar';
import Body2 from '@components/Body2';
import Button from '@components/Button';
import Caption2 from '@components/Caption2';
import ScrollView from '@components/ScrollView';
import { DropDownProvider } from '@contexts/DropDownContext';
import { useToast } from '@contexts/ToastContext';
import useLoading from '@hooks/useLoading';
import { postInquiry } from '@libs/api/inquiry';
import Dropdown from '@pages/setting/components/Dropdown';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { InquiryCategory } from 'types/inquiry';

const InquiryPage = () => {
  const { state } = useLocation();
  const { memberEmail } = state;
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<InquiryCategory | null>(null);
  const [content, setContent] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const { setToastMessage } = useToast();
  const { isLoading, setIsLoading } = useLoading();

  const handleInquirySend = async () => {
    if (!selectedCategory || !content || !isChecked) return;

    setIsLoading(true);
    try {
      await postInquiry({ inquiryCategory: selectedCategory, inquiryContent: content });
      setToastMessage('문의가 성공적으로 전송되었어요');
      navigate(-1);
    } catch (error) {
      console.error(error);
      setToastMessage('문의 전송에 실패했어요');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropDownProvider>
      <div className="relative h-full px-[20px] pt-[56px]">
        <div className="absolute left-0 top-0">
          <AppBar goBackCallback={() => navigate(-1)} title="고객센터" />
        </div>

        <ScrollView className="flex h-full flex-col gap-[20px]">
          <Caption2
            text="휴일을 제외한 평일에는 하루 이내에 답변 드리겠습니다. 혹시 하루가 지나도 답변이 오지 않으면, 스팸 메일함을 확인해주세요."
            className="break-keep text-darkGray"
          />

          <Body2
            text={memberEmail ?? ''}
            className="border-darkGray rounded-[14px] border bg-lightGray px-[16px] py-[12px]"
          />

          <Dropdown selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

          <textarea
            placeholder="내용을 적어 주세요"
            className="h-[250px] rounded-[14px] border border-lightGray px-[16px] py-[12px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>

          <div className="flex flex-col gap-[4px] pb-[80px]">
            <div className="flex items-center gap-[8px]">
              <input
                id="checkbox"
                type="checkbox"
                value={isChecked ? 'checked' : ''}
                onChange={() => setIsChecked((prev) => !prev)}
                className="border-darkGray h-[20px] w-[20px] rounded border checked:bg-primary"
              />
              <label htmlFor="checkbox" className="flex items-center">
                <Caption2 text="이메일 정보 제공 동의" className="text-darkGray" />
              </label>
            </div>
            <Caption2
              text="보내주신 질문에 답변드리기 위해 이메일 정보 제공에 동의해 주시기 바랍니다."
              className="break-keep pl-[28px] text-gray"
            />
          </div>
        </ScrollView>

        <div className="absolute bottom-[20px] left-0 w-full px-[20px]">
          <Button
            text="보내기"
            onClick={handleInquirySend}
            disabled={!selectedCategory || !content || !isChecked}
            isLoading={isLoading}
          />
        </div>
      </div>
    </DropDownProvider>
  );
};

export default InquiryPage;
