import axios from '../utils/axios';

export const addUpdateShow = async (info, showId) => {
  try {
    if (showId) {
      const { data } = await axios.put(`show/${showId}`, info);
      return data;
    }

    const { data } = await axios.post('show', info);
    return data;
  } catch (error) {
    return error;
  }
};
