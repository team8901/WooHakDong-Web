type ButtonProps = {
  text: string;
  textColor?: string;
  bgColor?: string;
  fontSize?: string;
  imageUrl?: string;
};

const Button = ({
  text,
  textColor = "white",
  bgColor = "var(--color-primary)",
  fontSize = "1.8rem",
  imageUrl,
}: Readonly<ButtonProps>) => {
  return (
    <button
      className="w-full h-[52px] round-[20px] font-semiBold rounded-[14px] flex items-center justify-center gap-[11px]"
      style={{ fontSize, color: textColor, backgroundColor: bgColor }}
    >
      {imageUrl && <img alt="" src={imageUrl} />}
      {text}
    </button>
  );
};

export default Button;
