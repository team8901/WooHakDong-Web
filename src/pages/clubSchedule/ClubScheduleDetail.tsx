import AppBar from '@components/AppBar';
import Caption2 from '@components/Caption2';
import InputBox from '@components/InputBox';
import ScrollView from '@components/ScrollView';
import convertColor from '@libs/util/convertColor';
import { formatDateDetail } from '@libs/util/formatDate';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClubScheduleResponseData } from 'types/clubSchedule';

export type DatePiece = Date | null;
export type SelectedDate = DatePiece | [DatePiece, DatePiece];

const ClubScheduleDetailPage = () => {
  const { state } = useLocation();
  const initalSchedule: ClubScheduleResponseData = state.schedule;
  const navigate = useNavigate();

  return (
    <div className="relative h-full pb-[100px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar goBackCallback={() => navigate(-1)} />
      </div>

      <ScrollView fadeTop fadeBottom className="flex h-full flex-col gap-[20px] px-[20px]">
        <div className="flex flex-col gap-[12px]">
          <Caption2 text="일정 정보" className="text-darkGray" />
          <div className="flex items-center gap-[12px]">
            <InputBox text={initalSchedule.scheduleTitle} />
            <div
              className="h-[24px] w-[24px] flex-shrink-0 rounded-[7px]"
              style={{ backgroundColor: convertColor(initalSchedule.scheduleColor) }}
            />
          </div>
          <InputBox text={formatDateDetail(initalSchedule.scheduleDateTime)} />
          <InputBox text={initalSchedule.scheduleContent} />
        </div>
      </ScrollView>
    </div>
  );
};

export default ClubScheduleDetailPage;
