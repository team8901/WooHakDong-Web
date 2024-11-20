import Caption2 from '@components/Caption2';
import { TextProps } from '@components/Title1';

const EmptyText = ({ text, className }: Readonly<TextProps>) => {
  return <Caption2 text={text} className={`text-center text-darkGray ${className}`} />;
};

export default EmptyText;
