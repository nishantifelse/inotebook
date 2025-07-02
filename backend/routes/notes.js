const express = require("express");
const router = express.Router();
const Notes = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
const { body, query, validationResult } = require("express-validator");

// Router 1: get all the notes using: GET "/api/notes/fetchallnotes" . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Router 2: ADD  a new notes using: POST "/api/notes/addnote" . Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 5 })
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const notes = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await notes.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// Router 3: ADD  a new notes using: PUT "/api/notes/updatenotes" . Login required
router.post("/updatenote/:id", fetchuser, async (req, res) => {
  const {title, description, tag} = req.body;
  try{
  let newNote = {};
  if(title){
    newNote.title = title;
  }
  if(description){
    newNote.description = description;
  }
  if(tag){
    newNote.tag = tag;
  }

  //find the note to be updated and update it
  let note = await Notes.findById(req.params.id);
  if(!note){
   return res.status(404).send("Not Found");
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note  = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
  res.json({note});
} catch(error){
console.error(error.message);
      res.status(500).send("Internal Server Error");
}
});

// Router 4: ADD  a new notes using: DELETE "/api/notes/deletenotes" . Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
try{
  //find the note to be updated and delete it
  let note = await Notes.findById(req.params.id);
  if(!note){
   return res.status(404).send("Not Found");
  }
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed")
  }

  note  = await Notes.findByIdAndDelete(req.params.id)
  res.json({"Succes" : "Note has been deleted", note: note });
} catch(error){
console.error(error.message);
      res.status(500).send("Internal Server Error");
}
});

module.exports = router;
