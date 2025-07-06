import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = 'http://localhost:8000'
  const notesInitial = []
const [notes, setNotes] = useState(notesInitial);

const getNotes = async ()=>{

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MTc1NDg2MmQ1ZTVjNWJkYTc5NGE1In0sImlhdCI6MTc1MTIxNzQ5Nn0.Ep1PMxbVkXELcO1Eqf9x5D7ntZAmnIHiVnRFg50e8PI'
    }
  });
  const dataJson = await response.json();
  console.log(dataJson)
  setNotes(dataJson);
}

// Add a note
const addNote = async (title, description, tag)=>{
 if(title && description){
    const response = await fetch(`${host}/api/notes/addnote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MTc1NDg2MmQ1ZTVjNWJkYTc5NGE1In0sImlhdCI6MTc1MTIxNzQ5Nn0.Ep1PMxbVkXELcO1Eqf9x5D7ntZAmnIHiVnRFg50e8PI'
    },
    body: JSON.stringify({title, description, tag})
  });

  const dataJson = response.json()
console.log(dataJson)
  //todo api call
  console.log('adding a new notes')
  const note =   {
    "_id": "68674310d2ca2cff86060efcef",
    "user": "6861754862d5e5c5bda794a5",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2025-07-04T02:17:54.122Z",
    "__v": 0
  }
  setNotes(notes.concat(note))
} else{

}
}
//Delete a note
const deleteNote = async (id)=>{
  const response = await  fetch(`${host}/api/notes/deletenote/${id}`, {
    method: 'DELETE',
        headers: {
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MTc1NDg2MmQ1ZTVjNWJkYTc5NGE1In0sImlhdCI6MTc1MTIxNzQ5Nn0.Ep1PMxbVkXELcO1Eqf9x5D7ntZAmnIHiVnRFg50e8PI'
    }
  })
  const dataJson = await response.json();
  console.log(dataJson)

console.log('deletd note ' + id)
const newNotes = notes.filter((note)=>{return note._id !== id })
setNotes(newNotes)
}
// Edit a note

const editNote = async (id, title, description, tag)=>{
  const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'auth-token' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjg2MTc1NDg2MmQ1ZTVjNWJkYTc5NGE1In0sImlhdCI6MTc1MTIxNzQ5Nn0.Ep1PMxbVkXELcO1Eqf9x5D7ntZAmnIHiVnRFg50e8PI'
    },
    body: JSON.stringify({title, description, tag})
  });
  const dataJson = await response.json()
  console.log(dataJson)

  let newNotes = JSON.parse(JSON.stringify(notes))
  for (let i= 0; i<newNotes.length; i++){
    const element = notes[i]
    if(element._id === id){
      newNotes[i].title = title;
      newNotes[i].description = description;
      newNotes[i].tag = tag;
      break;
    }
}
setNotes(newNotes);
}
  return (
  <noteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
    {props.children}
  </noteContext.Provider>
  );
};

export default NoteState;
