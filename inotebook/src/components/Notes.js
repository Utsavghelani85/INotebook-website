import React, { useContext, useEffect, useRef,useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from 'react-router-dom';

const Notes = () => {
  const context = useContext(NoteContext);
  // eslint-disable-next-line
  const { notes, getNote , editNote} = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')){
    getNote();
  }
  else{
    navigate("/login");
  }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null);
  const refClose = useRef(null);
  const[note,setNote]=useState({id : "",etitle: "",edescription: "",etag: "defult"})

  const updateNote = (currentnote) => {
    ref.current.click();
    setNote({id : currentnote._id,etitle : currentnote.title,edescription : currentnote.description,etag :currentnote.tag})
  };
  const handleClick = (e)=>{
    console.log("Updateing the note...",note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
  }
   const onchange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  
  return (
    <>
      <AddNote />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>your Notes</h2>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
