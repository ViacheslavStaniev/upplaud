import * as ExcelJS from 'exceljs';
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
  { key: HOST_GUEST, value: HOST_GUEST, label: 'JOINT SESSION', text: 'Their Info' },
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
    if (!item?.isConnected) return items;

    const { type, socialId, page, group } = item;

    const getSocialItem = (subType, subTypeId, subTypeName = '', frequency = 4) => {
      return {
        type,
        subType,
        frequency,
        subTypeId,
        subTypeName,
        isActive: false,
        _id: `${type}_${subType}`,
        isConnected: (subTypeId || '').toString().length > 0,
      };
    };

    const getSubTypeName = (item) =>
      item?.accounts.find(({ id }) => id === item?.socialId)?.name || '';

    const newItems = [
      ...items,
      getSocialItem(PROFILE, socialId),
      getSocialItem(PAGE, page?.socialId, getSubTypeName(page)),
    ];

    return type === FACEBOOK
      ? [...newItems, getSocialItem(GROUP, group?.socialId, getSubTypeName(page))]
      : newItems;
  }, []);
};

// download votes
export const downloadVotes = (votes) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Voting Data');

  sheet.columns = [
    { header: 'Selected Topic', key: 'topic' },
    { header: 'Voter', key: 'voter' },
    { header: 'User Suggested', key: 'isSuggestion' },
    { header: 'Suggestion', key: 'suggestion' },
    { header: 'Question 1', key: 'quest1' },
    { header: 'Question 2', key: 'quest2' },
    { header: 'Question 3', key: 'quest3' },
    { header: 'Question 4', key: 'quest4' },
    { header: 'Timestamp', key: 'timestamp' },
  ];

  votes.forEach((vote) => {
    const { selectedTopic, voter, isSuggestion, suggestions, createdAt, questionnaireAnswers } =
      vote;

    const [quest1, quest2, quest3, quest4] = questionnaireAnswers;

    sheet.addRow({
      topic: selectedTopic?.topic || 'Other',
      voter: `Name: ${voter?.name} \nEmail: ${voter?.email} \nCell Phone:${voter?.cell_phone}`,
      isSuggestion: isSuggestion ? 'Yes' : 'No',
      suggestion: `Topic: ${suggestions?.topic} \nSpeaker: ${suggestions?.speaker}`,
      quest1: quest1 ? quest1?.answers || '--' : '--',
      quest2:
        quest2 && quest2?.answers
          ? `Comment: ${quest2?.answers?.comment || '--'}\nReferral 1: ${
              quest2?.answers?.referral1 || '--'
            }\nReferral 2: ${quest2?.answers?.referral2 || '--'}\nName: ${
              quest2?.answers?.name || '--'
            }\nEmail: ${quest2?.answers?.email || '--'}`
          : '--',
      quest3: quest3 ? quest3?.answers?.answer || '--' : '--',
      quest4: quest4 ? `Shared: ${quest4?.doneSharing ? 'Yes' : 'No'}` : '--',
      timestamp: new Date(createdAt).toLocaleString(),
    });
  });

  workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'VotingData.xlsx';
    a.click();
  });
};
