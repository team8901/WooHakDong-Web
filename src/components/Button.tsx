type ButtonProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  fontSize?: string;
  icon?: JSX.Element;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  text,
  textColor = 'white',
  bgColor = 'var(--color-primary)',
  fontSize = '1.8rem',
  icon,
  onClick,
  disabled = false,
}: Readonly<ButtonProps>) => {
  return (
    <button
      className="round-[20px] flex h-[52px] w-full items-center justify-center gap-[11px] rounded-[14px] font-semiBold"
      style={{
        fontSize,
        color: textColor,
        backgroundColor: disabled ? 'var(--color-lightGray)' : bgColor,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
