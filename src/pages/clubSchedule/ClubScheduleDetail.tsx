import AppBar from '@components/AppBar';
import Caption2 from '@components/Caption2';
import InputBox from '@components/InputBox';
import ScrollView from '@components/ScrollView';
import formatDate from '@libs/util/formatDate';
import { useLocation } from 'react-router-dom';
import { ClubScheduleResponseData } from 'types/clubSchedule';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ClubScheduleDetailPage = () => {
  const { state } = useLocation();
  const initalSchedule: ClubScheduleResponseData = state.schedule;

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar />
      </div>

      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[20px] px-[20px]">
        <div className="flex flex-col gap-[12px]">
          <Caption2 text="일정 정보" className="text-darkGray" />
          <InputBox text={initalSchedule.scheduleTitle} />
          <InputBox text={initalSchedule.scheduleContent} />
        </div>
        <div className="flex flex-col gap-[12px]">
          <Caption2 text="일정 시각" className="text-darkGray" />
          <InputBox text={formatDate(initalSchedule.scheduleDateTime)} />
        </div>
      </ScrollView>
    </div>
  );
};

export default ClubScheduleDetailPage;
