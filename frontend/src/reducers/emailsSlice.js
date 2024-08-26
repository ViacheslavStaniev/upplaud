// store/emailsSlice.js  

import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'emails',
  initialState: {
    emailForSocialConnect: '',
    emails: [],
    emailsForGuestPage: [],
    totalCount: 0,
    readEmailCount: 0,
    isLoading: false,
    originURL: '',
    originType: 'user',
    error: null,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setEmails: (state, action) => {
      state.emails = action.payload;
      state.isLoading = false;
    },
    setEmailsForGuestPage: (state, action) => {
      state.emailsForGuestPage = action.payload;
      state.isLoading = false;
    },
    setOriginURL: (state, action) => {
      state.originURL = action.payload;
      state.isLoading = false;
    },
    setOriginType: (state, action) => {
      state.originType = action.payload;
      state.isLoading = false;
    },
    setTotalCount: (state, action) => {
      state.totalCount = action.payload;
    },
    setReadEmailCount: (state, action) => {
      state.readEmailCount = action.payload;
    },
    setEmailForSocialConnect: (state, action) => {
      state.emailForSocialConnect = action.payload;
    },
  },
});

export const { startLoading, hasError, setEmails, setTotalCount, setReadEmailCount, setEmailsForGuestPage, setOriginType, setOriginURL, setEmailForSocialConnect } = slice.actions;

export default slice.reducer;