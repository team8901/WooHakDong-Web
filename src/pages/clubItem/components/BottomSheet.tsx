import CheckCircleIcon from '@assets/images/club/CheckCircleIcon';
import Body2 from '@components/Body2';
import Title3 from '@components/Title3';
import { CLUB_ITEM_SORT_OPTIONS } from '@libs/constant/item';

type BottomSheetProps = {
  isOpen: boolean;
  selectedOption: number;
  bottomSheetRef: React.RefObject<HTMLDivElement>;
  setSelectedOption: (index: number) => void;
};

const BottomSheet = ({ isOpen, selectedOption, bottomSheetRef, setSelectedOption }: Readonly<BottomSheetProps>) => {
  return (
    <div ref={bottomSheetRef} className={`absolute left-0 top-0 z-20 h-full w-full bg-black/30 ${isOpen || 'hidden'}`}>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex flex-col gap-[20px] rounded-t-[14px] bg-white pb-[52px] pt-[20px]">
          <div className="h-[5px] w-[50px] self-center rounded-[14px] bg-lightGray" />
          <div className="flex flex-col gap-[20px] px-[20px]">
            <Title3 text="물품 상태 선택" />
            <div className="flex flex-col gap-[20px]">
              {CLUB_ITEM_SORT_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className="flex items-center justify-between"
                >
                  <Body2 text={option.label} />
                  {selectedOption === option.id && <CheckCircleIcon />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomSheet;
