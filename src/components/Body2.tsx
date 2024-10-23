import { TextProps } from '@components/Title1';

const Body2 = ({ text, className }: Readonly<TextProps>) => {
  return <span className={`leading-[2.2rem] ${className}`}>{text}</span>;
};

export default Body2;
