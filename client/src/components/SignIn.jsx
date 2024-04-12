import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setError,
  setBackgroundIndex,
  setShowPassword,
  setPasswordResetDialog,
  setSendEmail,
  setLoading,
} from "../redux/slices/signinSlice";

import { backgrounds } from "../assets/backgrounds";

function SignIn(props) {
  const { handleSnackBar } = props;
  const formData = useSelector((state) => state.signin.formData);
  const error = useSelector((state) => state.signin.error);
  const backgroundIndex = useSelector((state) => state.signin.backgroundIndex);
  const showPassword = useSelector((state) => state.signin.showPassword);
  const passwordResetDialog = useSelector(
    (state) => state.signin.passwordResetDialog
  );
  const sendEmail = useSelector((state) => state.signin.sendEmail);
  const loading = useSelector((state) => state.signin.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    dispatch(setBackgroundIndex(randomIndex));
  }, []);

  const handleClickShowPassword = () => {
    dispatch(setShowPassword(!showPassword));
  };

  const handleChange = (event) => {
    dispatch(
      setFormData({ ...formData, [event.target.name]: event.target.value })
    );
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEmailValid(formData.email)) {
      dispatch(setLoading(true));
      signInWithEmailAndPassword(auth, formData.email, formData.password)
        .then(() => {
          handleSnackBar(true, "Login successful", "success");
          dispatch(setLoading(false));
          navigate("/notes");
          dispatch(
            setFormData({
              email: "",
              password: "",
            })
          );
        })
        .catch((error) => {
          if (error.message === "Firebase: Error (auth/invalid-credential).") {
            handleSnackBar(true, "Invalid Email or Password", "error");
          }
          dispatch(setLoading(false));
        });
    } else {
      dispatch(setError("Please enter a valid email address"));
    }
  };

  const handlePasswordReset = async () => {
    sendPasswordResetEmail(auth, sendEmail)
      .then(() => {
        handleSnackBar(
          true,
          "Password reset email sent successfully",
          "success"
        );
        setPasswordResetDialog(false);
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgrounds[backgroundIndex]})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "block",
            sm: "none",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "100%" }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {error && (
                <p style={{ fontSize: "12px", color: "red", margin: 0 }}>
                  **{error}**
                </p>
              )}
              {loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled
                  sx={{ mt: 3, mb: 2 }}
                >
                  <CircularProgress size={25} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
              )}
              <Grid container>
                <Grid item xs>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => dispatch(setPasswordResetDialog(true))}
                  >
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Dialog fullWidth maxWidth="sm" open={passwordResetDialog}>
        <h4 style={{ marginLeft: "5%", marginBottom: "5%" }}>Reset password</h4>
        <form
          onSubmit={handlePasswordReset}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "50%",
            marginLeft: "24%",
          }}
        >
          <TextField
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            value={sendEmail}
            style={{ width: "130%", marginBottom: "5%" }}
            onChange={(e) => dispatch(setSendEmail(e.target.value))}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              variant="contained"
              color="error"
              type="button"
              onClick={() => dispatch(setPasswordResetDialog(false))}
              style={{ margin: "1.5vw", width: "10vw", fontSize: "0.8vw" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ margin: "1.5vw", width: "11vw", fontSize: "0.8vw" }}
            >
              Send Reset Email
            </Button>
          </div>
        </form>
      </Dialog>
    </ThemeProvider>
  );
}

export default SignIn;
