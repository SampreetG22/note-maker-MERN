import React, { useEffect } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Fab, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Logout from "@mui/icons-material/Logout";
import DeleteIcon from "@mui/icons-material/Delete";
import { signOut } from "firebase/auth";
import "./NoteList.css";
import { Modal } from "./Modal";
import { useSelector, useDispatch } from "react-redux";
import {
  setNotes,
  setFilteredNotes,
  setSearchText,
  setSortBy,
  setTitle,
  setDescription,
  setLinks,
  setCurrentUser,
  setSelectedNote,
  setCurrentSelection,
} from "../redux/slices/notesSlice";
import { setShowDialog } from "../redux/slices/commonSlice";
import axios from "axios";

const NoteList = (props) => {
  const { handleSnackBar } = props;
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.userNotes);
  const filteredNotes = useSelector((state) => state.notes.filteredNotes);
  const searchText = useSelector((state) => state.notes.searchText);
  const sortBy = useSelector((state) => state.notes.sortBy);
  const currentUser = useSelector((state) => state.notes.currentUser);
  const selectedNote = useSelector((state) => state.notes.selectedNote);
  const showDialog = useSelector((state) => state.common.showDialog);

  const navigator = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      navigator("/signin");
    } else {
      getUserNotes();
      dispatch(setCurrentUser(auth.currentUser));
    }
  }, [auth.currentUser, sortBy]);

  useEffect(() => {
    filterNotes();
  }, [searchText, notes]);

  const filterNotes = () => {
    if (!searchText) {
      dispatch(setFilteredNotes(notes));
    } else {
      const filtered = notes.filter((note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase())
      );
      dispatch(setFilteredNotes(filtered));
    }
  };

  const handleDialog = () => {
    dispatch(setShowDialog(!showDialog));
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        handleSnackBar(true, "Logged out successfully", "success");
        navigator("/signin");
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} at ${hours}:${minutes}`;
  };

  const handleNoteAdd = () => {
    dispatch(setTitle(""));
    dispatch(setDescription(""));
    dispatch(setLinks(""));
    dispatch(setCurrentSelection("addNew"));
    handleDialog();
  };

  const handleNoteClick = (note) => {
    dispatch(setTitle(note.title));
    dispatch(setDescription(note.description));
    dispatch(setLinks(note.links));
    dispatch(setSelectedNote(note));
    dispatch(setCurrentSelection("openNote"));
    handleDialog();
  };

  //CRUD Operations
  // Creating a note
  const saveNote = (note) => {
    handleDialog();
    axios
      .post("http://localhost:8000/api/notes", {
        user: currentUser.uid,
        note: note,
      })
      .then(() => {
        getUserNotes();
        handleSnackBar(true, "Note added successfully", "success");
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
  };

  //Reading the notes
  const getUserNotes = () => {
    axios
      .get(
        `http://localhost:8000/api/notes?user=${auth.currentUser.uid}&sortBy=${sortBy}`
      )
      .then((response) => {
        dispatch(setNotes(response.data.notes));
        dispatch(setFilteredNotes(response.data.notes));
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
  };

  //Updating the note
  const updateNote = (updatedNote) => {
    axios
      .put("http://localhost:8000/api/notes", {
        user: currentUser.uid,
        noteId: selectedNote._id,
        note: updatedNote,
      })
      .then(() => {
        getUserNotes();
        handleSnackBar(true, "Note updated successfully", "success");
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
    handleDialog();
  };

  //Deleting a note
  const deleteNote = (note) => {
    axios
      .delete("http://localhost:8000/api/notes", {
        data: { user: currentUser.uid, noteId: note._id },
      })
      .then(() => {
        getUserNotes();
        handleSnackBar(true, "Note deleted successfully", "success");
      })
      .catch((error) => {
        handleSnackBar(true, error.message, "error");
      });
  };

  return (
    <div className="mainNotesContainer">
      <Tooltip title="Add Note" placement="top" arrow>
        <Fab
          color="secondary"
          aria-label="add"
          className="floatingButton"
          onClick={handleNoteAdd}
        >
          <AddIcon className="plusIcon" />
        </Fab>
      </Tooltip>
      <div className="headerContainer">
        <h1 className="mainHeader">NOTES!FY..</h1>
        {currentUser && (
          <Tooltip title="Logout" arrow>
            <IconButton onClick={handleLogout} size="small">
              <Logout color="info" className="logoutIcon" />
            </IconButton>
          </Tooltip>
        )}
      </div>
      {currentUser && (
        <h1 className="welcomeText">Welcome, {currentUser.displayName}</h1>
      )}
      <input
        className="searchBar"
        placeholder="Search your notes"
        value={searchText}
        onChange={(e) => dispatch(setSearchText(e.target.value))}
      />
      <div className="notesContainer">
        <div className="titleAndSortContainer">
          <h2 className="yourNotes">Your notes</h2>
          <select
            name="sort"
            value={sortBy}
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="sortByElement"
          >
            <option value="" defaultValue>
              Sort by
            </option>
            <option value="desc">Latest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </div>
        {filteredNotes.length > 0 ? (
          filteredNotes.map((each, i) => (
            <div className="noteAndDeleteContainer">
              <div
                key={i}
                className="eachNote"
                onClick={() => handleNoteClick(each)}
              >
                <h3 className="eachTitle">{each.title}</h3>
                <p className="eachDate">{formatDate(each.createdAt)}</p>
              </div>
              <IconButton aria-label="delete" onClick={() => deleteNote(each)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))
        ) : (
          <>
            <img src="./no-data.png" className="noNotesImage" alt="noNotes" />
            <p>No notes found. Create one now</p>
          </>
        )}
      </div>
      <Modal
        open={showDialog}
        handleDialog={handleDialog}
        saveNote={saveNote}
        updateNote={updateNote}
      />
    </div>
  );
};

export default NoteList;
