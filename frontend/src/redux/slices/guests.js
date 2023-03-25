import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  guests: [],
  error: null,
  isLoading: false,
};

const slice = createSlice({
  name: 'guests',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // SAVE GUESTS
    getGuestsSuccess(state, action) {
      state.isLoading = false;
      state.guests = action.payload;
    },

    // DELETE GUEST
    deleteGuestSuccess(state, action) {
      const guestId = action.payload;
      state.guests = state.guests.filter((guest) => guest._id !== guestId);
    },

    // ON BATCH DELETE
    onManyGuestsDelete(state, action) {
      const guestIds = action.payload;
      state.guests = state.guests.filter((guest) => !guestIds.includes(guest._id));
    },
  },
});

export default slice.reducer;

export function getGuestsList(showId) {
  const { startLoading, hasError, getGuestsSuccess } = slice.actions;

  return async (dispatch) => {
    dispatch(startLoading());

    try {
      const { data } = await axios.get(`guests/list/${showId}`);
      dispatch(getGuestsSuccess(data));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function deleteGuest(guestId) {
  const { startLoading, hasError, deleteGuestSuccess } = slice.actions;

  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await axios.delete(`guests/${guestId}`);

      dispatch(deleteGuestSuccess(guestId));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}

export function deleteManyGuests(ids) {
  const { startLoading, hasError, onManyGuestsDelete } = slice.actions;

  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await axios.post(`guests/batch-delete`, { ids });

      dispatch(onManyGuestsDelete(ids));
    } catch (error) {
      dispatch(hasError(error));
    }
  };
}
