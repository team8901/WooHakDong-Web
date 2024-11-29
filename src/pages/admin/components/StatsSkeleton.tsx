import Skeleton from 'react-loading-skeleton';

const StatsSkeleton = () => {
  return (
    <div className="px-[40px] py-[40px] md:px-[80px] lg:px-[200px]">
      <div className="flex w-full flex-wrap items-center justify-center gap-[24px] sm:grid sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={`${index}-top`} height={100} borderRadius={14} />
        ))}
      </div>
      <Skeleton height={22} borderRadius={14} className="mt-[30px]" />
      <div className="mt-[12px] grid grid-cols-2 gap-[12px] sm:grid-cols-3 md:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton key={`${index}-body`} height={290} borderRadius={14} />
        ))}
      </div>
    </div>
  );
};

export default StatsSkeleton;
