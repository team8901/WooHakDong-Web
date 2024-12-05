import LocationIcon from '@assets/images/club/LocationIcon';
import Body2 from '@components/Body2';
import Title3 from '@components/Title3';
import { ClubInfoResponseData } from 'types/club';

type ClubCardProps = {
  club: ClubInfoResponseData;
  onClick: () => void;
};

const ClubCard = ({ club, onClick }: Readonly<ClubCardProps>) => {
  return (
    <button
      className="flex h-[245px] flex-col gap-[12px] rounded-[14px] border border-lightGray p-[8px]"
      onClick={onClick}
    >
      <img
        alt=""
        src={club.clubImage ?? '/logo.svg'}
        width={145.5}
        height={137.5}
        className="h-[137.5px] w-full self-center rounded-[6px] object-cover"
      />
      <div className="flex flex-col items-start gap-[8px] px-[4px]">
        <Title3 text={club.clubName} className="line-clamp-1" />
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-[4px]">
            <LocationIcon />
            <Body2
              text={club.clubRoom || '장소가 없어요'}
              className={`line-clamp-2 text-start ${club.clubRoom ? '' : 'text-darkGray'}`}
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ClubCard;
