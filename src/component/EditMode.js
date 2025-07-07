import React,{ useContext} from "react";
import noteContext from "../context/notes/noteContext";

function EditMode(props) {
  const {setEditModeOff, note, setNote} = props;
    const context = useContext(noteContext);
  const {editNote} = context;

  const handleClick = (e)=>{
    console.log('updating note', note)
    editNote(note.id, note.etitle, note.edescription, note.etag)
    setNote({id: '', etitle: '', edescription: '', etag: ''})
  }

  const onChange = (e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }
  
  return (
    <div>
      <div className="container my-4">
        <h1>Edit Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="etitle"
              name="etitle"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.etitle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="edescription"
              name="edescription"
              onChange={onChange}
              value={note.edescription}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="etag"
              name="etag"
              onChange={onChange}
              value={note.etag}
            />
          </div>
          <div className="mb-3 form-check"></div>
          <button
          disabled={note.etitle.length<5 || note.edescription.length<10}
            type="submit"
            className="btn btn-primary"
            onClick={()=>{
              handleClick()
              setEditModeOff()
            }}
          >
            Update note
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditMode;
