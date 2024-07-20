import * as ExcelJS from 'exceljs';
import { GUEST_TYPE, SOCIAL_TITLES, SOCIAL_SUB_TYPE } from './types';

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

  if (subType === PROFILE) return `YOUR ${title} PROFILE`;
  if (subType === PAGE) return `YOUR ${title} PAGE: ${subTypeName}`;
  if (subType === GROUP) return `YOUR ${title} GROUP: ${subTypeName}`;

  return '';
};

export const getSocialsItems = (socialAccounts = []) => {
  return socialAccounts.reduce((items, item) => {
    if (!item?.isConnected) return items;

    const { type, socialId, page } = item;

    const getSocialItem = (subType, subTypeId, subTypeName = '', frequency = 4) => {
      const isConnected = (subTypeId || '').toString().length > 0;

      return {
        type,
        subType,
        frequency,
        subTypeId,
        subTypeName,
        isConnected,
        isActive: isConnected,
        _id: `${type}_${subType}`,
      };
    };

    const getSubTypeName = (item) =>
      item?.accounts.find(({ id }) => id === item?.socialId)?.name || '';

    return [
      ...items,
      getSocialItem(PROFILE, socialId),
      getSocialItem(PAGE, page?.socialId, getSubTypeName(page)),
    ];
  }, []);
};

// download votes
export const downloadVotes = (votes) => {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Voting Data');

  const { questionnaireAnswers = [] } = votes[0] || {};
  const [quest1, quest2, quest3, quest4] = questionnaireAnswers;

  sheet.columns = [
    { header: 'Selected Topic', key: 'topic' },
    { header: 'Voter Name', key: 'voter_name' },
    { header: 'Voter Email', key: 'voter_email' },
    { header: 'Voter Cell Phone', key: 'voter_cellphone' },
    { header: 'User Suggested', key: 'isSuggestion' },
    { header: 'Suggested Topic', key: 'suggested_topic' },
    { header: 'Suggested Speaker', key: 'suggested_speaker' },
    { header: `Question 1: ${quest1?.question}`, key: 'quest1' },
    { header: `Question 2: ${quest2?.question}`, key: 'quest2' },
    { header: 'Referral 1', key: 'quest2_referral1' },
    { header: 'Referral 2', key: 'quest2_referral2' },
    { header: 'Name', key: 'quest2_name' },
    { header: 'Email', key: 'quest2_email' },
    { header: `Question 3: ${quest3?.question}`, key: 'quest3' },
    { header: `Question 4: ${quest4?.question}`, key: 'quest4' },
    { header: 'Timestamp', key: 'timestamp' },
  ];

  votes.forEach((vote) => {
    const { selectedTopic, voter, isSuggestion, suggestions, createdAt, questionnaireAnswers } =
      vote;

    const [quest1, quest2, quest3, quest4] = questionnaireAnswers;

    sheet.addRow({
      topic: selectedTopic?.topic || 'Other',
      voter_name: voter?.name || '--',
      voter_email: voter?.email || '--',
      voter_cellphone: voter?.cell_phone || '--',
      isSuggestion: isSuggestion ? 'Yes' : 'No',
      suggested_topic: suggestions?.topic || '--',
      suggested_speaker: suggestions?.speaker || '--',
      quest1: quest1 ? quest1?.answers || '--' : '--',
      quest2: quest2?.answers ? `Comment: ${quest2?.answers?.comment || '--'}` : '--',
      quest2_referral1: quest2?.answers?.referral1 || '--',
      quest2_referral2: quest2?.answers?.referral2 || '--',
      quest2_name: quest2?.answers?.name || '--',
      quest2_email: quest2?.answers?.email || '--',
      quest3: quest3 ? quest3?.answers?.answer || '--' : '--',
      quest4: quest4 ? (quest4?.doneSharing ? 'Yes' : 'No') : '--',
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
