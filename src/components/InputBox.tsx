import Body1 from '@components/Body1';
import { TextProps } from '@components/Title1';

const InputBox = ({ text, className }: Readonly<TextProps>) => {
  return (
    <Body1
      text={text}
      className={`w-full rounded-[14px] border border-lightGray px-[16px] py-[12px] placeholder:font-semiBold placeholder:text-gray ${className}`}
    />
  );
};

export default InputBox;
