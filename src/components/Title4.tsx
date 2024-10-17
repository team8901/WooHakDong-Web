import { TextProps } from "@components/Title1";

const Title4 = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span
      className={`text-[1.8rem] leading-[2.4rem] font-semiBold ${className}`}
    >
      {text}
    </span>
  );
};

export default Title4;
