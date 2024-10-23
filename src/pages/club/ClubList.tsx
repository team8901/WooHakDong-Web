import { useNavigate } from 'react-router-dom';

const ClubListPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-[40px]">
      <h1 className="font-semiBold text-[2.4rem]">우학동에 오신 걸 환영합니다.</h1>
      <div className="flex flex-col items-center gap-[10px]">
        <span>등록된 동아리 목록</span>
        <div className="grid grid-cols-2 gap-[20px]">
          <button
            className="flex h-[150px] w-[150px] items-center justify-center rounded-[20px] bg-lightPrimary shadow-md"
            onClick={() => navigate('/doit')}
          >
            <span className="font-semiBold text-[2rem]">doit</span>
          </button>
          <button
            className="flex h-[150px] w-[150px] items-center justify-center rounded-[20px] bg-lightPrimary shadow-md"
            onClick={() => navigate('/musicclub')}
          >
            <span className="font-semiBold text-[2rem]">음악동아리</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClubListPage;
