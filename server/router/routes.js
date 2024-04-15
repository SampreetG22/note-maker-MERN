const express = require("express");
const Notes = require("../models/notesModel");

const router = express.Router();

// Create Notes
router.post("/", async (request, response) => {
  const { user, note } = request.body;
  try {
    const existingObject = await Notes.findOne({
      user: user,
    });
    if (existingObject) {
      existingObject.notes.push(note);
      await existingObject.save();
    } else {
      await Notes.create({
        user: user,
        notes: [note],
      });
    }
    response.status(200).json({ message: "Note added successfully" });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Read Notes
router.get("/", async (request, response) => {
  const { user, sortBy } = request.query;
  try {
    const userNotes = await Notes.findOne({ user: user });
    if (userNotes) {
      let sortedNotes = userNotes.notes;
      if (sortBy) {
        sortedNotes.sort((a, b) => {
          if (sortBy === "asc" || sortBy === "") {
            return a.createdAt - b.createdAt;
          } else if (sortBy === "desc") {
            return b.createdAt - a.createdAt;
          } else {
            return a.createdAt - b.createdAt;
          }
        });
      }
      response.status(200).json({
        notes: sortedNotes,
      });
    } else {
      response.status(200).json({
        notes: [],
      });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Update Notes
router.put("/", async (request, response) => {
  const { user, noteId, note } = request.body;
  try {
    const targetObject = await Notes.findOne({ user: user });
    if (targetObject) {
      // Find the index of the note with the given noteId
      const noteIndex = targetObject.notes.findIndex((note) =>
        note._id.equals(noteId)
      );
      if (noteIndex !== -1) {
        // Update the note object at the found index
        targetObject.notes[noteIndex] = note;
        await targetObject.save();
        response.status(200).json({ message: "Note updated successfully" });
      } else {
        response.status(404).json({ message: "Note not found" });
      }
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

// Delete Note
router.delete("/", async (request, response) => {
  const { user, noteId } = request.body;
  try {
    const targetObject = await Notes.findOne({ user: user });
    if (targetObject) {
      const updatedNotes = targetObject.notes.filter(
        (note) => !note._id.equals(noteId)
      );
      targetObject.notes = updatedNotes;
      await targetObject.save();
      response.status(200).json({ message: "Note deleted successfully" });
    } else {
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

module.exports = router;
