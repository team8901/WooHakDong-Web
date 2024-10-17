import { TextProps } from "@components/Title1";

const Body4 = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span className={`text-[1.4rem] leading-[2rem] ${className}`}>{text}</span>
  );
};

export default Body4;
