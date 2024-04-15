import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  checked: false,
  showPassword: false,
  showConfirmPassword: false,
  error: null,
  showDialog: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setFormData: (state, { payload }) => {
      state.formData = payload;
    },
    setChecked: (state, { payload }) => {
      state.checked = payload;
    },
    setShowPassword: (state, { payload }) => {
      state.showPassword = payload;
    },
    setShowConfirmPassword: (state, { payload }) => {
      state.showConfirmPassword = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
    setShowDialog: (state, { payload }) => {
      state.showDialog = payload;
    },
  },
});

export const {
  setFormData,
  setChecked,
  setShowPassword,
  setShowConfirmPassword,
  setError,
  setShowDialog,
} = signupSlice.actions;

export default signupSlice.reducer;
