import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userNotes: [],
  filteredNotes: [],
  searchText: "",
  title: "",
  sortBy: "",
  description: "",
  mediaLink: "",
  links: [],
  currentUser: {},
  selectedNote: null,
  currentSelection: null,
  backgroundColor: "white",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, { payload }) => {
      state.userNotes = payload;
    },
    setFilteredNotes: (state, { payload }) => {
      state.filteredNotes = payload;
    },
    setSearchText: (state, { payload }) => {
      state.searchText = payload;
    },
    setSortBy: (state, { payload }) => {
      state.sortBy = payload;
    },
    setTitle: (state, { payload }) => {
      state.title = payload;
    },
    setDescription: (state, { payload }) => {
      state.description = payload;
    },
    setMediaLink: (state, { payload }) => {
      state.mediaLink = payload;
    },
    setLinks: (state, { payload }) => {
      state.links = payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setSelectedNote: (state, { payload }) => {
      state.selectedNote = payload;
    },
    setCurrentSelection: (state, { payload }) => {
      state.currentSelection = payload;
    },
    setBackgroundColor: (state, { payload }) => {
      state.backgroundColor = payload;
    },
  },
});

export const {
  setNotes,
  setFilteredNotes,
  setSearchText,
  setSortBy,
  setTitle,
  setDescription,
  setMediaLink,
  setLinks,
  setCurrentUser,
  setSelectedNote,
  setCurrentSelection,
  setBackgroundColor,
} = notesSlice.actions;

export default notesSlice.reducer;
