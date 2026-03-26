import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deletenote } = context;
  const { note, updateNote } = props;
  return (
    <div className="card h-100"> {/* Added h-100 for equal height */}
      <div className="card-header align-items-center d-flex">
        <h5 className="card-title mx-2 ">{note.title}</h5>
        <i className="fas fa-edit mx-2 " onClick={() => {
          updateNote(note)
        }}></i>
        <i className="fas fa-trash-alt mx-2" onClick={() => {
          deletenote(note._id); props.showAlert("Note Deleted Successfully", "success")
        }}></i>
      </div>
      <div className="card-body">
        <div className="card-text">{note.description}</div>
      </div>
    </div>
  )
}

export default NoteItem
