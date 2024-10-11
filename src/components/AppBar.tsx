import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[56px] px-[20px] flex items-center">
      <button onClick={() => navigate(-1)}>
        <img
          alt="뒤로가기"
          src="/assets/images/chevrons/chevron-left-black.svg"
        />
      </button>
    </div>
  );
};

export default AppBar;
