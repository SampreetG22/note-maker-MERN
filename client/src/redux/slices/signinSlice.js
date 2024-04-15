import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    email: "",
    password: "",
  },
  error: null,
  backgroundIndex: 0,
  showPassword: false,
  passwordResetDialog: false,
  sendEmail: "",
  loading: false,
};

export const signinSlice = createSlice({
  name: "signin",
  initialState,
  reducers: {
    setFormData: (state, { payload }) => {
      state.formData = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setBackgroundIndex: (state, { payload }) => {
      state.backgroundIndex = payload;
    },
    setShowPassword: (state, { payload }) => {
      state.showPassword = payload;
    },
    setPasswordResetDialog: (state, { payload }) => {
      state.passwordResetDialog = payload;
    },
    setSendEmail: (state, { payload }) => {
      state.sendEmail = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const {
  setFormData,
  setError,
  setBackgroundIndex,
  setShowPassword,
  setPasswordResetDialog,
  setSendEmail,
  setLoading,
} = signinSlice.actions;

export default signinSlice.reducer;
