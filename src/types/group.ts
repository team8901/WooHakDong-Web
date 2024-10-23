type GroupInfoProps = {
  clubId: number;
};

type GroupInfoResponseData = {
  groupId: number;
  groupName: string;
  groupLink: string;
  groupDescription: string;
  groupAmount: number;
};

export type { GroupInfoProps, GroupInfoResponseData };
