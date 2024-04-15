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
    setNotes: (state, action) => {
      state.userNotes = action.payload;
    },
    setFilteredNotes: (state, action) => {
      state.filteredNotes = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setDescription: (state, action) => {
      state.description = action.payload;
    },
    setMediaLink: (state, action) => {
      state.mediaLink = action.payload;
    },
    setLinks: (state, action) => {
      state.links = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSelectedNote: (state, action) => {
      state.selectedNote = action.payload;
    },
    setCurrentSelection: (state, action) => {
      state.currentSelection = action.payload;
    },
    setBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload;
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
