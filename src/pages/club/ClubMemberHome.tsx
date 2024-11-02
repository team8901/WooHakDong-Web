import AppBar from '@components/AppBar';

const ClubMemberHomePage = () => {
  return (
    <div className="relative pb-[50px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar hasMenu />

        <div className="flex h-full items-center justify-center">동아리 전용 페이지</div>
      </div>
    </div>
  );
};

export default ClubMemberHomePage;
