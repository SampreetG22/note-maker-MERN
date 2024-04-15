import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@mui/material";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormData,
  setChecked,
  setShowConfirmPassword,
  setError,
} from "../redux/slices/signupSlice";
import { setShowPassword, setShowDialog } from "../redux/slices/commonSlice";

export default function SignUp(props) {
  const { handleSnackBar } = props;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.signup.formData);
  const checked = useSelector((state) => state.signup.checked);
  const showConfirmPassword = useSelector(
    (state) => state.signup.showConfirmPassword
  );
  const error = useSelector((state) => state.signup.error);
  const showPassword = useSelector((state) => state.common.showPassword);
  const showDialog = useSelector((state) => state.common.showDialog);

  const handleChange = (event) => {
    dispatch(
      setFormData({ ...formData, [event.target.name]: event.target.value })
    );
  };

  const handleCheckedChange = (event) => {
    dispatch(setChecked(event.target.checked));
  };

  const handleShowPasswordChange = () => {
    dispatch(setShowPassword(!showPassword));
  };

  const handleShowConfirmPasswordChange = () => {
    dispatch(setShowConfirmPassword(!showConfirmPassword));
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleDialogClose = () => {
    dispatch(setShowDialog(false));
    navigation("/signin");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(formData).every((key) => formData[key])) {
      if (formData.password === formData.confirmPassword) {
        if (isEmailValid(formData.email)) {
          createUserWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          )
            .then(() => {
              sendEmailVerification(auth.currentUser).then(() => {
                console.log("Verification sent");
              });
              handleSnackBar(true, "Registration Successful", "success");
              dispatch(setShowDialog(true));
            })
            .then(() => {
              updateProfile(auth.currentUser, {
                displayName: formData.firstName + " " + formData.lastName,
              }).catch((error) => {
                handleSnackBar(true, error.message, "error");
              });
            })
            .catch((error) => {
              handleSnackBar(true, error.message, "error");
            });
        } else {
          setError("Please enter a valid email address");
        }
      } else {
        setError("Passwords do not match");
      }
    } else {
      setError("Please fill all mandatory fields");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="sm"
      className="shadow-lg rounded-lg bg-white"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem 3rem",
          boxShadow: "0px 0px 10px silver",
          borderRadius: "10px",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up for NOTES!fy...
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                name="username"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordChange} edge="end">
                        {!showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                className="mb-3"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                autoComplete="confirm-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleShowConfirmPasswordChange}
                        edge="end"
                      >
                        {!showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {error && (
              <Typography color="error" className="text-sm ml-3 mt-1">
                **{error}**
              </Typography>
            )}
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              marginTop: "0.8vw",
              marginBottom: "0.8vw",
            }}
          >
            <Checkbox
              id="checkBox"
              value="termsAndConditions"
              color="primary"
              onChange={(event) => handleCheckedChange(event)}
            />
            <label
              htmlFor="checkBox"
              className="text-sm"
              style={{ fontSize: "1vw" }}
            >
              I read all{" "}
              <Link href="#" className="text-blue-500">
                terms and conditions
              </Link>
            </label>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="mt-3 mb-2"
            disabled={!checked}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog
        open={showDialog}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <Box p={2} className="flex flex-col items-center">
          <p className="mb-8 text-center">
            Signup successful. We have sent a verification email to{" "}
            <strong>{formData.email}</strong>
          </p>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDialogClose}
          >
            Okay
          </Button>
        </Box>
      </Dialog>
    </Container>
  );
}
