import { TextProps } from '@components/Title1';

const Caption2 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`text-[1.2rem] leading-[1.6rem] ${className}`}>{text}</span>;
};

export default Caption2;
