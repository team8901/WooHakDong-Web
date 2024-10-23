export type TextProps = {
  text: string;
  className?: string;
};

const Title1 = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span className={`whitespace-pre-wrap font-semiBold text-[2.4rem] leading-[3.2rem] ${className}`}>{text}</span>
  );
};

export default Title1;
