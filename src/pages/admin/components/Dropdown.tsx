import ChevronBottomGrayIcon from '@assets/images/chevrons/ChevronBottomGrayIcon';
import { useDropDown } from '@contexts/DropDownContext';
import { TERMS_MENU, TERMS_MENU_REVERSE } from '@libs/constant/admin';

type DropdownProps = {
  selectedTermIdx: number;
  setSelectedTermIdx: (idx: number) => void;
};

const Dropdown = ({ selectedTermIdx, setSelectedTermIdx }: Readonly<DropdownProps>) => {
  const { isDropdownOpen, toggleDropdown } = useDropDown();

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="text-gray-900 hover:bg-gray-50 inline-flex w-[90px] items-center justify-between gap-x-1.5 rounded-md bg-white px-4 py-2 font-semiBold shadow-sm ring-1 ring-inset ring-gray-300"
        onClick={toggleDropdown}
      >
        <span>{TERMS_MENU_REVERSE[TERMS_MENU.length - 1 - selectedTermIdx]?.label}</span>
        <ChevronBottomGrayIcon className={`transform transition-all ${isDropdownOpen && '-rotate-180'}`} />
      </button>

      <div
        className={`absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none ${isDropdownOpen ? '' : 'hidden'}`}
      >
        <div className="py-1">
          {TERMS_MENU_REVERSE.map(({ term, label }, index) => (
            <button
              key={term}
              type="button"
              className={`${TERMS_MENU.length - 1 - index === selectedTermIdx ? 'bg-primary text-white' : 'hover:bg-gray-100 text-gray-700'} block w-full px-4 py-2 text-left`}
              onClick={() => {
                setSelectedTermIdx(TERMS_MENU.length - 1 - index);
                toggleDropdown();
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
