import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  token: {
    accessToken: {},
    refreshToken: {},
  },
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    authLogout: (state) => {
      state.account = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
