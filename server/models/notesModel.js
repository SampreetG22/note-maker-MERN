const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesDetailsSchema = new Schema(
  {
    title: String,
    description: String,
    links: Object,
    background: String,
  },
  { timestamps: true }
);

const notesSchema = new Schema(
  {
    user: String,
    notes: [notesDetailsSchema],
  },
  { timestamps: true }
);

const Notes = mongoose.model("Notes", notesSchema);

module.exports = Notes;
