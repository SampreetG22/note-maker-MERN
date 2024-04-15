import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showPassword: false,
  showDialog: false,
};

export const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setShowDialog: (state, action) => {
      state.showDialog = action.payload;
    },
  },
});

export const { setShowPassword, setShowDialog } = commonSlice.actions;

export default commonSlice.reducer;
