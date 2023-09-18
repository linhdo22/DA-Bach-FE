import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  account: null,
  tokens: {
    accessToken: {},
    refreshToken: {},
  },
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.tokens = action.payload;
    },
    setAccount: (state, action) => {
      state.account = action.payload;
    },
    authLogout: () => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const authActions = authenticationSlice.actions;

export default authenticationSlice.reducer;
