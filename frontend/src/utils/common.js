import { GUEST_TYPE } from './types';
const { HOST_GUEST, SOLO_SESSION } = GUEST_TYPE;

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
