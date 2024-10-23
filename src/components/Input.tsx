import Subtitle from '@components/Subtitle';

type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  type?: 'text' | 'number';
  inputMode?: 'text' | 'numeric';
};

const Input = ({
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  className,
  inputMode = 'text',
}: Readonly<InputProps>) => {
  return (
    <div className="flex flex-col">
      {value && <Subtitle text={label} />}
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border-b border-lightGray py-[9px] font-semiBold leading-[2.2rem] placeholder:font-semiBold placeholder:text-gray ${className}`}
      />
    </div>
  );
};

export default Input;
