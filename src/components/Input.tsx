type InputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({
  placeholder,
  value,
  onChange,
  className,
}: Readonly<InputProps>) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`py-[9px] placeholder:font-semiBold placeholder:text-gray border-b border-lightGray ${className}`}
    />
  );
};

export default Input;
