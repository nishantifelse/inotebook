import React, { useContext, useEffect, useState } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import EditMode from "./EditMode";

function Notes() {
  const context = useContext(noteContext);
  const { notes, getNotes } = context;
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState({id: '', etitle: '', edescription: '', etag: ''});

  const handleEditModeOn = (currentNote)=>{

      setEditMode(true);
      setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
  
  }

  const handleEditModeOff = ()=>{
      setEditMode(false);
      console.log('updating note', note)
    
  }

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <AddNote />
      
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <NoteItem key={note._id} setEditModeOn={handleEditModeOn} note={note} />;
        })}
      </div>
      { editMode && <EditMode setEditModeOff={handleEditModeOff} note={note} setNote={setNote}/>}
    </>
  );
}

export default Notes;
