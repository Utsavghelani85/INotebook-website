import React,{ useContext, useState } from "react";
import NoteContext from '../context/notes/NoteContext';

const AddNote = () => {
    const  context = useContext(NoteContext);
  // eslint-disable-next-line 
  const {addNote} = context;
  const[note,setNote]=useState({title: "",description: "",tag: "defult"})
  const handleClick = (e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
  }
   const onchange =(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <div className="container my-3">
        <h1>Add a Note</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
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
              id="description"
              name="description"
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
              id="tag"
              name="tag"
              onChange={onchange}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            AddNote
          </button>
        </form>
      </div>
      
    </div>
  );
};

export default AddNote;
