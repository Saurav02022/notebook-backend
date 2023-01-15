const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  title: { type: String, required: true },
  note: { type: String, required: true },
  category: { type: String, required: true },
  userId: { type: String, required: true },
});

const NoteModel = mongoose.model("note", noteSchema);

module.exports = {
  NoteModel,
};
