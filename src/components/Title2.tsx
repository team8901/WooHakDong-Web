import { TextProps } from "@components/Title1";

const Title2 = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span
      className={`text-[2.2rem] leading-[3rem] font-semiBold whitespace-pre-wrap ${className}`}
    >
      {text}
    </span>
  );
};

export default Title2;
