import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
  showDialog: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setShowPassword: (state, { payload }) => {
      state.showPassword = payload;
    },
    setShowDialog: (state, { payload }) => {
      state.showDialog = payload;
    },
  },
});

export const { setShowPassword, setShowDialog } = commonSlice.actions;

export default commonSlice.reducer;
