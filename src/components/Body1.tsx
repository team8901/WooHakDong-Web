import { TextProps } from "@components/Title1";

const Body1 = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span className={`leading-[2.2rem] font-semiBold ${className}`}>
      {text}
    </span>
  );
};

export default Body1;
