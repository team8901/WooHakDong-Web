type InputProps = {
  label: string;
  placeholder: string;
  value: string;
  name: string;
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
  name,
  onChange,
  className,
  inputMode = 'text',
}: Readonly<InputProps>) => {
  return (
    <div className="relative">
      <span
        className={`absolute left-[16px] bg-white text-[0.9rem] text-darkGray transition-all duration-200 ease-in-out ${value ? 'top-[-5px] opacity-100' : 'top-[4px] opacity-0'}`}
      >
        {label}
      </span>
      <input
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        aria-label={label}
        className={`w-full rounded-[14px] border border-lightGray px-[16px] py-[12px] font-semiBold leading-[2.2rem] placeholder:font-semiBold placeholder:text-gray ${className}`}
      />
    </div>
  );
};

export default Input;
