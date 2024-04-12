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

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    setChecked: (state, action) => {
      state.checked = action.payload;
    },
    setShowPassword: (state, action) => {
      state.showPassword = action.payload;
    },
    setShowConfirmPassword: (state, action) => {
      state.showConfirmPassword = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setShowDialog: (state, action) => {
      state.showDialog = action.payload;
    },
  },
});

export const {
  setFormData,
  setChecked,
  setConfirmPassword,
  setShowPassword,
  setShowConfirmPassword,
  setError,
  setShowDialog,
} = signupSlice.actions;

export default signupSlice.reducer;
