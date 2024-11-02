import { GENDER_TYPE } from '@libs/constant/member';
import { Gender } from 'types/member';

type GenderSelectionProps = {
  gender: Gender;
  setGender: (gender: Gender) => void;
};

const GenderSelection = ({ gender, setGender }: Readonly<GenderSelectionProps>) => {
  return (
    <div className="flex items-center gap-[8px]">
      {Object.entries(GENDER_TYPE).map(([type, label]) => (
        <button
          key={type}
          className={`rounded-[12px] border ${
            gender === type ? 'border-primary bg-lightPrimary text-primary' : 'border-lightGray text-gray'
          } px-[16px] py-[4px] font-semiBold`}
          onClick={() => setGender(type as Gender)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default GenderSelection;
