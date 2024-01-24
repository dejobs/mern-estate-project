import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInstart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    showListingStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    showListingSucsess: (state) => {
      state.loading = false;
      state.error = false;
    },
    showListingFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    deleteListingStart: (state) => {
      state.error = false;
      state.loading = true;
    },
    deleteListingSucsess: (state) => {
      state.loading = false;
      state.error = false;
    },
    deleteListingFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const {
  signInstart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  showListingFailure,
  showListingStart,
  showListingSucsess,
  deleteListingStart,
  deleteListingSucsess,
  deleteListingFailure,
} = userSlice.actions;

export default userSlice.reducer;
