import ChevronBottomBlackIcon from '@assets/images/chevrons/ChevronBottomBlackIcon';
import Body1 from '@components/Body1';
import { useDropDown } from '@contexts/DropDownContext';
import { InquiryCategory } from 'types/inquiry';

type DropdownProps = {
  selectedCategory: InquiryCategory | null;
  setSelectedCategory: (category: InquiryCategory | null) => void;
};

const INQUIRY_CATEGORY: { category: InquiryCategory; content: string }[] = [
  { category: 'INQUIRY', content: '문의' },
  { category: 'DECLARATION', content: '신고' },
  { category: 'SUGGESTION', content: '제안' },
  { category: 'ETC', content: '기타' },
];

const Dropdown = ({ selectedCategory, setSelectedCategory }: Readonly<DropdownProps>) => {
  const { isDropdownOpen, toggleDropdown } = useDropDown();

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex w-full justify-between rounded-[14px] border border-lightGray px-[16px] py-[12px]"
        onClick={toggleDropdown}
      >
        <Body1
          text={INQUIRY_CATEGORY.find((v) => v.category === selectedCategory)?.content ?? '질문 유형을 선택해 주세요'}
          className={`${selectedCategory ? 'text-black' : 'text-darkGray'}`}
        />
        <ChevronBottomBlackIcon className={`transform transition-all ${isDropdownOpen && '-rotate-180'}`} />
      </button>

      <div
        className={`absolute left-0 z-10 mt-2 w-full rounded-[14px] border border-lightGray bg-white shadow-md ${isDropdownOpen ? '' : 'hidden'}`}
      >
        <div className="py-[8px]">
          {INQUIRY_CATEGORY.map(({ content, category }) => (
            <button
              key={category}
              type="button"
              className={`${category === selectedCategory ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'} block w-full px-[16px] py-2 text-left`}
              onClick={() => {
                setSelectedCategory(category);
                toggleDropdown();
              }}
            >
              {content}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
