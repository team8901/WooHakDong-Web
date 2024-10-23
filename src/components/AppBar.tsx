import ChevronLeftBlackIcon from '@assets/images/chevrons/ChevronLeftBlackIcon';
import { useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[56px] w-full items-center px-[20px]">
      <button onClick={() => navigate(-1)}>
        <ChevronLeftBlackIcon />
      </button>
    </div>
  );
};

export default AppBar;
