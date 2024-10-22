type InputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

const Input = ({ placeholder, value, onChange, className }: Readonly<InputProps>) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`border-b border-lightGray py-[9px] placeholder:font-semiBold placeholder:text-gray ${className}`}
    />
  );
};

export default Input;
