import React, { useState } from "react";
import NoteContext from "./NoteContext";


const NoteState = (props)=>{
  const host = "http://localhost:5000"
    const notesInitial =[]
      const [notes,setNotes] = useState(notesInitial)

      
      //get all  Note
      const getNote =async ()=>{
        //todo : apicall
        const response = await fetch(`${host}/api/notes/fetchallnote`, {
          method : 'GET',
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });

        const json =await response.json()
        console.log(json)
        setNotes(json)
        
      }


      //Add a Note
      const addNote =async (title,description,tag)=>{
        //todo : apicall
        const response = await fetch(`${host}/api/notes/addnote`, {
         
          method : 'POST',
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({title,description,tag}), 
        });


        console.log("addind a new note")
        const note = {
          "_id": "6654649afbf6e9fc6016031b",
          "user": "66541aefd0fae4cf4b9a426f",
          "title": title,
          "description": description,
          "tag": tag,
          "date": "2024-05-27T10:46:50.753Z",
          "__v": 0
        }
        setNotes(notes.concat(note))
        const json =await response.json()
        console.log(json)
      }

      //Delete a Note
      const deleteNote = async(id)=>{
        //api call

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method : 'DELETE',
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
        });
        const json =await response.json();
        console.log(json)


        console.log("deleteing the note with id"+id)
        const newNotes = notes.filter((note)=>{ return note._id!==id})
        setNotes(newNotes)
      }

      //Edit a Note
      const editNote = async (id,title,description,tag)=>{
        //API call
        // eslint-disable-next-line
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method : 'PUT',
          headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem('token')
          },
          body: JSON.stringify({id,title,description,tag}), 
        });
        const json =await response.json();
        console.log(json)



        let newNotes = JSON.parse(JSON.stringify(notes))
        //Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
          
        }
        setNotes(newNotes);
      }

    return(
        <NoteContext.Provider value={{notes, addNote,deleteNote,editNote,getNote}}>
            {props.children}
        </NoteContext.Provider>
    )

  }

export default NoteState;