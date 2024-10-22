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
  textColor = "white",
  bgColor = "var(--color-primary)",
  fontSize = "1.8rem",
  icon,
  onClick,
  disabled = false,
}: Readonly<ButtonProps>) => {
  return (
    <button
      className="w-full h-[52px] round-[20px] font-semiBold rounded-[14px] flex items-center justify-center gap-[11px]"
      style={{
        fontSize,
        color: textColor,
        backgroundColor: disabled ? "var(--color-lightGray)" : bgColor,
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
