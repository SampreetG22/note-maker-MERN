import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./slices/appSlice";
import signUpReducer from "./slices/signupSlice";
import signinReducer from "./slices/signinSlice";
import notesReducer from "./slices/notesSlice";
import commonReducer from "./slices/commonSlice";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    signup: signUpReducer,
    signin: signinReducer,
    notes: notesReducer,
    common: commonReducer,
  },
});
