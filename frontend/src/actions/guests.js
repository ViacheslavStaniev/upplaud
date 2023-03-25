import axios from '../utils/axios';

export const addUpdateGuest = async (info, guestId = null) => {
  try {
    if (guestId) {
      const { data } = await axios.put(`guests/${guestId}`, info);
      return data;
    }

    const { data } = await axios.post('guests', info);
    return data;
  } catch (error) {
    return error;
  }
};
