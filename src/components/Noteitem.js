import React from "react";
import { useContext } from "react/cjs/react.development";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  const handleClick = () => {
    deleteNote(note._id);
    props.showAlert("Note has been deleted", "primary");
  };
  return (
    <div className="col-md-4">
      <div className="card my-2">
        <div className="card-body">
          <div
            style={{
              display: "flex",
              marginBottom: "0.2rem",
              marginTop: "-0.6rem",
            }}
          >
            <span className="badge rounded-pill bg-secondary">{note.tag}</span>
          </div>

          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="fa-solid fa-pen-to-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
          <i className="fa-solid fa-trash-can mx-2" onClick={handleClick}></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
