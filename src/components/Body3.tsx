import { TextProps } from '@components/Title1';

const Body3 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`font-semiBold text-[1.4rem] leading-[2rem] ${className}`}>{text}</span>;
};

export default Body3;
