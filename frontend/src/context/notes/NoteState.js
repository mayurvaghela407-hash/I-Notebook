import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://inotebook-backend.onrender.com"
    const notesInitial = []
    const [notes, setnotes] = useState(notesInitial);

    // Get all notes
    const getnotes = async () => {
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'Get',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
    }

    // Add a note
    const Addnote = async (title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'Post',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
         setnotes(notes.concat(note));
    }
    // delete a note
    const deletenote = async (id) => {
        // api call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'Delete',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        await response.json();
   

        const newNotes = notes.filter((note) => { return note._id !== id });
        setnotes(newNotes);
    }

    // edit a note
    const editnotes = async (id, title, description, tag) => {
        //api call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'Put',
            headers: {
                'content-type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }
    const editnote = editnotes;

    return (
        <noteContext.Provider value={{ notes, setnotes, Addnote, deletenote, editnote, editnotes, getnotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;