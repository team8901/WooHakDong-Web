export type TextProps = {
  text: string;
  className?: string;
};

const Title1 = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span
      className={`text-[2.4rem] leading-[3.2rem] font-semiBold whitespace-pre-wrap ${className}`}
    >
      {text}
    </span>
  );
};

export default Title1;
