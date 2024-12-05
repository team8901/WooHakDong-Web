import Body1 from '@components/Body1';
import { TextProps } from '@components/Title1';
import { ReactNode } from 'react';

interface InputBoxProps extends TextProps {
  icon?: ReactNode;
}

const InputBox = ({ text, className, icon }: Readonly<InputBoxProps>) => {
  return (
    <div
      className={`flex w-full items-center gap-[10px] rounded-[14px] border border-lightGray px-[16px] py-[12px] placeholder:font-semiBold placeholder:text-gray ${className}`}
    >
      {icon}
      <Body1 text={text} />
    </div>
  );
};

export default InputBox;
