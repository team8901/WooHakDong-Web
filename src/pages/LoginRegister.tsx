import Button from "@components/Button";

export function LoginResgisterPage() {
  return (
    <div className="pt-[113px] pb-[40px] px-[20px] flex flex-col justify-between h-full">
      <div className="flex flex-col gap-[4px]">
        <span className="font-semiBold text-[2.4rem] leading-[3.2rem]">
          Doit
          <br />
          <span className="text-primary">우학동</span>
          으로 이용하기
        </span>
        <span className="text-darkGray text-[1.2rem] w-[201px] leading-[1.6rem]">
          우리 동아리 인원, 물품, 회비 그리고 일정을 한 눈에 살펴보고 이용하게
          해드릴게요!
        </span>
      </div>

      <div className="flex flex-col gap-[12px] justify-center items-center">
        <span className="font-semiBold text-[1.4rem] text-primary">
          학교 계정으로 로그인해 주세요
        </span>
        <Button
          text="Google로 시작하기"
          textColor="var(--color-black)"
          bgColor="var(--color-lightGray)"
          fontSize="1.4rem"
          imageUrl="/assets/images/logos/google.svg"
        />
      </div>
    </div>
  );
}
