import BookIcon from '@assets/images/clubMember/BookIcon';
import CallIcon from '@assets/images/clubMember/CallIcon';
import EmailIcon from '@assets/images/clubMember/EmailIcon';
import GenderIcon from '@assets/images/clubMember/GenderIcon';
import IdCardIcon from '@assets/images/clubMember/IdCardIcon';
import AppBar from '@components/AppBar';
import Caption2 from '@components/Caption2';
import IconText from '@components/IconText';
import ScrollView from '@components/ScrollView';
import Title1 from '@components/Title1';
import Title4 from '@components/Title4';
import { CLUB_MEMBER_ROLE } from '@libs/constant/clubMember';
import { GENDER_TYPE } from '@libs/constant/member';
import formatPhoneNumber from '@libs/util/formatPhoneNumber';
import { useLocation, useNavigate } from 'react-router-dom';
import { ClubMemberResponseData } from 'types/clubMember';

const ClubMemberDetailPage = () => {
  const { state } = useLocation();
  const member: ClubMemberResponseData = state.member;
  const navigate = useNavigate();

  const callPhone = (phoneNumber: string) => {
    location.href = `tel:${phoneNumber}`;
  };

  const sendMail = (email: string) => {
    location.href = `mailto:${email}`;
  };

  return (
    <div className="relative h-full pb-[70px] pt-[56px]">
      <div className="absolute left-0 top-0 w-full">
        <AppBar goBackCallback={() => navigate(-1)} />
      </div>

      <ScrollView
        fadeTop
        fadeBottom
        className="flex h-full flex-col gap-[20px] px-[20px]"
        style={{ paddingTop: '40px' }}
      >
        <div className="flex flex-col items-center gap-[8px]">
          <Title1 text={member.memberName} className="text-center" />
          <div className="flex h-[30px] items-center justify-center rounded-[7px] bg-lightPrimary px-[6px] text-primary">
            <Title4 text={CLUB_MEMBER_ROLE[member.clubMemberRole]} />
          </div>
        </div>

        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="기본 정보" className="text-darkGray" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <IconText icon={<GenderIcon />} text={GENDER_TYPE[member.memberGender]} />
              <IconText
                icon={<CallIcon />}
                text={formatPhoneNumber(member.memberPhoneNumber)}
                onClick={() => callPhone(member.memberPhoneNumber)}
              />
              <IconText icon={<EmailIcon />} text={member.memberEmail} onClick={() => sendMail(member.memberEmail)} />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <Caption2 text="학교 정보" className="text-darkGray" />
            <div className="flex flex-col gap-[12px] rounded-[14px] border border-lightGray p-[16px]">
              <IconText icon={<BookIcon />} text={member.memberMajor} />
              <IconText icon={<IdCardIcon />} text={member.memberStudentNumber} />
            </div>
          </div>
        </div>
      </ScrollView>
    </div>
  );
};

export default ClubMemberDetailPage;
