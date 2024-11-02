import { TextProps } from '@components/Title1';

const Caption1 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`font-semiBold text-[1.2rem] leading-[1.6rem] ${className}`}>{text}</span>;
};

export default Caption1;
