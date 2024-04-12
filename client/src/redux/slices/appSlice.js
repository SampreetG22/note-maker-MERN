import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  snackBar: {
    open: false,
    message: "",
    color: "",
  },
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.snackBar = action.payload;
    },
  },
});

export const { setSnackBar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
