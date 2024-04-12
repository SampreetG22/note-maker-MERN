import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { signOut } from "firebase/auth";

const NoteList = (props) => {
  const { handleSnackBar } = props;
  const navigator = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigator("/signin");
    } else {
      console.log(auth.currentUser);
    }
  }, [auth.currentUser]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        handleSnackBar(true, "Logged out successfully", "success");
        navigator("/notes");
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
  };
  return (
    <div>
      <h1>Notes</h1>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default NoteList;
