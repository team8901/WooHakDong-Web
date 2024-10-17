import { TextProps } from "@components/Title1";

const Subtitle = ({ text, className }: Readonly<TextProps>) => {
  return (
    <span
      className={`text-[1.2rem] leading-[1.6rem] text-darkGray ${className}`}
    >
      {text}
    </span>
  );
};

export default Subtitle;
