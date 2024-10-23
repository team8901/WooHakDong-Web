import { TextProps } from '@components/Title1';

const Title3 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`font-semiBold text-[2rem] leading-[2.6rem] ${className}`}>{text}</span>;
};

export default Title3;
