import { createTheme, ThemeProvider } from "@mui/material/styles";
import Signup from "./components/SignUp";
import SignIn from "./components/SignIn";
import { Alert, Snackbar } from "@mui/material";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NoteList from "./components/NoteList";
import { useSelector, useDispatch } from "react-redux";
import { setSnackBar } from "./redux/slices/appSlice";

const defaultTheme = createTheme();

const App = () => {
  const snackBar = useSelector((state) => state.snackbar.snackBar);
  const dispatch = useDispatch();

  const handleSnackBar = (open, message, color) => {
    dispatch(
      setSnackBar({
        open: open,
        message: message,
        color: color,
      })
    );
  };

  const handleClose = () => {
    dispatch(setSnackBar({ ...snackBar, open: false }));
  };
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/notes" />}
              handleSnackBar={handleSnackBar}
            />
            <Route
              path="/signin"
              element={<SignIn handleSnackBar={handleSnackBar} />}
            />
            <Route
              path="/signup"
              element={<Signup handleSnackBar={handleSnackBar} />}
            />
            <Route
              path="/notes"
              element={<NoteList handleSnackBar={handleSnackBar} />}
            />
          </Routes>
          <Snackbar
            open={snackBar.open}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={snackBar.color}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {snackBar.message}
            </Alert>
          </Snackbar>
        </div>
      </ThemeProvider>
    </Router>
  );
};

export default App;
