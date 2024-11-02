import DuesIcon from '@assets/images/club/DuesIcon';
import LocationIcon from '@assets/images/club/LocationIcon';
import PresidentIcon from '@assets/images/club/PresidentIcon';
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
      className="flex h-[291.5px] flex-col gap-[12px] rounded-[14px] border border-lightGray p-[8px]"
      onClick={onClick}
    >
      <img alt="" src="/logo.svg" width={145.5} height={137.5} className="self-center rounded-[6px]" />
      <div className="flex flex-col items-start gap-[8px] px-[4px]">
        <Title3 text={club.clubName} className="line-clamp-1" />
        <div className="flex flex-col gap-[2px]">
          <div className="flex items-center gap-[4px]">
            <PresidentIcon />
            <Body2 text="이재용" className="line-clamp-1" />
          </div>
          <div className="flex items-center gap-[4px]">
            <LocationIcon />
            <Body2 text={club.clubRoom} className="line-clamp-2" />
          </div>
          <div className="flex items-center gap-[4px]">
            <DuesIcon />
            <Body2 text={`${club.clubDues.toLocaleString()}원`} className="line-clamp-1" />
          </div>
        </div>
      </div>
    </button>
  );
};

export default ClubCard;
