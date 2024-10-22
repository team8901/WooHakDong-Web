import { useNavigate } from 'react-router-dom';

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-[56px] w-full items-center px-[20px]">
      <button onClick={() => navigate(-1)}>
        <img alt="뒤로가기" src="/assets/images/chevrons/chevron-left-black.svg" />
      </button>
    </div>
  );
};

export default AppBar;
