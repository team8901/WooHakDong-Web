import { TextProps } from '@components/Title1';

const Title4 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`font-semiBold text-[1.8rem] leading-[2.4rem] ${className}`}>{text}</span>;
};

export default Title4;
