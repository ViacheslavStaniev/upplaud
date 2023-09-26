import { GUEST_TYPE, SOCIAL_TITLES, SOCIAL_TYPE, SOCIAL_SUB_TYPE } from './types';

const { FACEBOOK } = SOCIAL_TYPE;
const { HOST_GUEST, SOLO_SESSION } = GUEST_TYPE;
const { PROFILE, PAGE, GROUP } = SOCIAL_SUB_TYPE;

const colors = [
  '##E91E63',
  '#673AB7',
  '#2196F3',
  '#00BCD4',
  '#FF9800',
  '#8BC34A',
  '#009688',
  '#FF5722',
  '#607D8B',
  '#F44336',
];
export const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

export const getDateString = (timestamp) => new Date(timestamp).toDateString();

export const pollTypeOptions = [
  { key: HOST_GUEST, value: HOST_GUEST, label: 'HOST A GUEST', text: 'Their Info' },
  { key: SOLO_SESSION, value: SOLO_SESSION, label: 'SOLO SESSION', text: 'Your Info' },
  // { key: GUEST_SPEAKER, value: GUEST_SPEAKER, label: "I'M A GUEST SPEAKER", text: 'Host Info' },
];

export const getPollType = (key = HOST_GUEST) => pollTypeOptions.find((item) => item.key === key);

export const getSocialTitle = (type) => SOCIAL_TITLES[type];

export const getSocialLabel = (type, subType, subTypeName = '') => {
  const title = getSocialTitle(type);

  if (subType === PROFILE) {
    return `YOUR ${title} PROFILE`;
  } else if (subType === PAGE) {
    return `YOUR ${title} PAGE: ${subTypeName}`;
  } else if (subType === GROUP) {
    return `YOUR ${title} GROUP: ${subTypeName}`;
  }

  return '';
};

export const getSocialsItems = (socialAccounts = []) => {
  return socialAccounts.reduce((items, item) => {
    const { type, page, group, profile } = item;

    // Profile
    if (profile?.isConnected) {
      items.push({
        _id: `${type}-profile`,
        type,
        frequency: 4,
        subType: PROFILE,
        isActive: false,
        subTypeId: profile?.socialId,
        subTypeName: '',
      });
    }

    // Page
    if (page?.isConnected) {
      items.push({
        _id: `${type}-page`,
        type,
        frequency: 4,
        subType: PAGE,
        isActive: false,
        subTypeId: page?.socialId,
        subTypeName: page?.accounts?.find((item) => item.id === Number(page?.socialId))?.name,
      });
    }

    // Group
    if (type === FACEBOOK && group?.isConnected) {
      items.push({
        _id: `${type}-group`,
        type,
        frequency: 4,
        subType: GROUP,
        isActive: false,
        subTypeId: group?.socialId,
        subTypeName: group?.accounts?.find((item) => item.id === Number(group?.socialId))?.name,
      });
    }

    return items;
  }, []);
};
