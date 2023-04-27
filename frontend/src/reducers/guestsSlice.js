import axios from '../utils/axios';
import { notification } from 'antd';
import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'guests',
  initialState: { guest: null, guests: [], shows: [], error: null, isLoading: false },
  reducers: {
    // START LOADING
    startLoading(state) {
      return { ...state, isLoading: true };
    },

    // HAS ERROR
    hasError(state, { payload }) {
      return { ...state, isLoading: false, error: payload };
    },

    onUpdateState(state, { payload }) {
      return { ...state, ...payload };
    },

    // FETCH GUEST
    onFetchGuest(state, { payload }) {
      return { ...state, isLoading: false, guest: payload };
    },

    // ADD GUEST
    onAddGuest(state, { payload }) {
      return { ...state, isLoading: false, guests: [...state.guests, payload] };
    },

    // UPDATE GUEST
    onUpdateGuest(state, { payload }) {
      return {
        ...state,
        isLoading: false,
        guests: state.guests.map((guest) => (guest._id === payload._id ? payload : guest)),
      };
    },

    // DELETE GUEST
    onDeleteGuest(state, { payload }) {
      const guests = state.guests.filter((guest) => guest._id !== payload);
      return { ...state, isLoading: false, guests };
    },

    // SAVE GUESTS
    onFetchGuests(state, { payload }) {
      return { ...state, isLoading: false, guests: payload };
    },

    // ON BATCH DELETE
    onDeleteManyGuests(state, { payload }) {
      const guests = state.guests.filter((guest) => !payload.includes(guest._id));
      return { ...state, isLoading: false, guests };
    },
  },
});

export default slice.reducer;

const {
  hasError,
  onAddGuest,
  startLoading,
  onUpdateGuest,
  onDeleteGuest,
  onFetchGuest,
  onFetchGuests,
  onUpdateState,
  onDeleteManyGuests,
} = slice.actions;

export const updateState = (data) => async (dispatch) => dispatch(onUpdateState(data));

// Get Guests list of a Show
export const getGuestsList = (showId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const { data } = await axios.get(`guests/list/${showId}`);
    dispatch(onFetchGuests(data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

// Get list of shows for which i'm (current logged in user) the guest
export const getShowsList = (userId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const { data } = await axios.get(`guests/list/${userId}`);
    dispatch(onUpdateState({ isLoading: false, shows: data }));
  } catch (error) {
    dispatch(hasError(error));
  }
};

// Fetch a guest
export const fetchGuest = (guestId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const { data } = await axios.get(`guests/${guestId}`);
    dispatch(onFetchGuest(data));
  } catch (error) {
    dispatch(hasError(error));
  }
};

// Add a new Guest
export const addGuest = (info) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const { data } = await axios.post('guests', info);

    dispatch(onAddGuest(data));

    notification.success({ message: 'Success', description: 'Automation added successfully.' });
  } catch (error) {
    dispatch(hasError(error));
  }
};

// Update a guest
export const updateGuest = (guestId, info) => async (dispatch) => {
  dispatch(startLoading());

  try {
    const { data } = await axios.put(`guests/${guestId}`, info);
    dispatch(onUpdateGuest(data));
    notification.success({ message: 'Success', description: 'Automation updated successfully.' });
  } catch (error) {
    console.log(error);
    dispatch(hasError(error));
  }
};

// Delete a guest
export const deleteGuest = (guestId) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await axios.delete(`guests/${guestId}`);

    dispatch(onDeleteGuest(guestId));

    notification.success({ message: 'Success', description: 'Automation deleted successfully.' });
  } catch (error) {
    dispatch(hasError(error));
  }
};

// Delete batch guests
export const deleteManyGuests = (ids) => async (dispatch) => {
  dispatch(startLoading());

  try {
    await axios.post(`guests/batch-delete`, { ids });

    dispatch(onDeleteManyGuests(ids));
  } catch (error) {
    dispatch(hasError(error));
  }
};
