import Body1 from '@components/Body1';
import { ReactNode } from 'react';

type IconTextProps = {
  icon: ReactNode;
  text: string;
  onClick?: () => void;
};

const IconText = ({ icon, text, onClick }: Readonly<IconTextProps>) => {
  return (
    <button
      type="button"
      className={`flex items-center gap-[10px] text-start ${onClick ? '' : 'cursor-default'}`}
      onClick={onClick}
    >
      {icon}
      <div style={{ overflowWrap: 'anywhere' }}>
        <Body1 text={text} className={onClick ? 'underline decoration-[#b7b7b7]' : ''} />
      </div>
    </button>
  );
};

export default IconText;
