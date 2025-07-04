import React from "react";

function NoteItem(props) {
  const { note } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card px-3 py-3">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
      </div>
    </div>
  );
}

export default NoteItem;
