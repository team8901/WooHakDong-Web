import { TextProps } from '@components/Title1';

const Title2 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`whitespace-pre-wrap font-semiBold text-[2.2rem] leading-[3rem] ${className}`}>{text}</span>;
};

export default Title2;
