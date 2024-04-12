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
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBackgroundIndex: (state, action) => {
      state.backgroundIndex = action.payload; // Corrected assignment
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setPasswordResetDialog: (state, action) => {
      state.passwordResetDialog = action.payload;
    },
    setSendEmail: (state, action) => {
      state.sendEmail = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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
