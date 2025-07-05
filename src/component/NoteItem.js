import React, {useContext} from 'react';
import noteContext from '../context/notes/noteContext';

function NoteItem(props) {
  const context = useContext(noteContext);
  const {deleteNote, editNote} = context;

  const { note } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card px-3 py-3">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <div className="d-flex justify-content-start align-items-end">
          <i className="fa-solid fa-trash mx-2" onClick={()=>{
            deleteNote(note._id)
          }}></i>
          <i className="fa-regular fa-keyboard mx-2" onClick={editNote}></i>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
