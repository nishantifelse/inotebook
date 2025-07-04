import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
  {
    "_id": "686739a7ca2cff86060efced",
    "user": "6861754862d5e5c5bda794a5",
    "title": "Nishant firsst note",
    "description": "this is my first note and also i am going to write a second note",
    "tag": "personal",
    "date": "2025-07-04T02:17:11.409Z",
    "__v": 0
  },
  {
    "_id": "686739d2ca2cff86060efcef",
    "user": "6861754862d5e5c5bda794a5",
    "title": "Nishant second note",
    "description": "this is my second note and also i have writeen a first note",
    "tag": "personal",
    "date": "2025-07-04T02:17:54.122Z",
    "__v": 0
  },
    {
    "_id": "686739a7ca2cff86060efced",
    "user": "6861754862d5e5c5bda794a5",
    "title": "Nishant firsst note",
    "description": "this is my first note and also i am going to write a second note",
    "tag": "personal",
    "date": "2025-07-04T02:17:11.409Z",
    "__v": 0
  },
  {
    "_id": "686739d2ca2cff86060efcef",
    "user": "6861754862d5e5c5bda794a5",
    "title": "Nishant second note",
    "description": "this is my second note and also i have writeen a first note",
    "tag": "personal",
    "date": "2025-07-04T02:17:54.122Z",
    "__v": 0
  },
    {
    "_id": "686739a7ca2cff86060efced",
    "user": "6861754862d5e5c5bda794a5",
    "title": "Nishant firsst note",
    "description": "this is my first note and also i am going to write a second note",
    "tag": "personal",
    "date": "2025-07-04T02:17:11.409Z",
    "__v": 0
  },
  {
    "_id": "686739d2ca2cff86060efcef",
    "user": "6861754862d5e5c5bda794a5",
    "title": "Nishant second note",
    "description": "this is my second note and also i have writeen a first note",
    "tag": "personal",
    "date": "2025-07-04T02:17:54.122Z",
    "__v": 0
  }
]
const [notes, setNotes] = useState(notesInitial);
  return (
  <noteContext.Provider value={{notes, setNotes}}>
    {props.children}
  </noteContext.Provider>
  );
};

export default NoteState;
