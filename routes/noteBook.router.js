const { Router } = require("express");
const { autenticate } = require("../middlewares/authenticate");

const noteBook = Router();

const { NoteModel } = require("../models/notes.model");

noteBook.use(autenticate);

noteBook.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).send(notes);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

noteBook.post("/create", async (req, res) => {
  try {
    const newNote = new NoteModel(req.body);
    await newNote.save();
    res.status(201).send({
      message: "Note created successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

noteBook.patch("/update/:id", async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findOne({ _id: id });
  const userId_in_Note = note.userId;
  const userId_who_is_making_request = req.body.userId;
  try {
    if (userId_in_Note !== userId_who_is_making_request) {
      res.send({
        message: "You are not allowed to make this request",
      });
    } else {
      await NoteModel.findByIdAndUpdate(id, req.body);
      res.status(200).send({
        message: "Note updated successfully",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

noteBook.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const note = await NoteModel.findOne({ _id: id });
  const userId_in_Note = note.userId;
  const userId_who_is_making_request = req.body.userId;
  try {
    if (userId_in_Note !== userId_who_is_making_request) {
      res.send({
        message: "You are not allowed to make this request",
      });
    } else {
      await NoteModel.findByIdAndDelete(id);
      res.status(200).send({
        message: "Note delete successfully",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
});

module.exports = {
  noteBook,
};
