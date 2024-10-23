import Subtitle from '@components/Subtitle';

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({ label, placeholder, value, onChange, className }: Readonly<InputProps>) => {
  return (
    <>
      {
        <div className="flex flex-col">
          {value && <Subtitle text={label} />}
          <input
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`border-b border-lightGray py-[9px] font-semiBold leading-[2.2rem] placeholder:font-semiBold placeholder:text-gray ${className}`}
          />
        </div>
      }
    </>
  );
};

export default Input;
