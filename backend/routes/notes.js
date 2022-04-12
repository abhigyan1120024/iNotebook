const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");
const Note = require("../models/Note");

// ROUTE 1: Fetch all notes using: GET "/api/notes/fetchallnotes". Login reqd.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An Unkown error occured");
  }
});

// ROUTE 2: Add new notes using: POST "/api/notes/addnotes". Login reqd.
router.post(
  "/addnotes",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const newNote = await note.save();
      res.json(newNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("An Unkown error occured");
    }
  }
);

// ROUTE 3: Update an existing note using: PUT "/api/notes/updatenote". Login reqd.
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the note to update and then update it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized Access");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An Unkown error occured");
  }
});

// ROUTE 4: Delete an existing note using: DELETE "/api/notes/deletenote". Login reqd.
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to delete and then delete it
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorized Access");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ "Success": "Note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("An Unkown error occured");
  }
});

module.exports = router;
