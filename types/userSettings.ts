export type UserSettingsEntity = {
  avatarImg: string;
  activeIdProject: string;
  thema: string;
};

export const defaultUserSettings: UserSettingsEntity = {
  avatarImg: 'avatar-1.svg',
  activeIdProject: '',
  thema: '',
};
