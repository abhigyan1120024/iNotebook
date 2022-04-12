import React, { useContext, useState, useRef } from "react";
import noteContext from "../context/notes/noteContext";

const AdditemCard = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const handleClick = (e) => {
    e.preventDefault();
    ref.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="col-md-4">
        <div className="card my-2">
          <div className="card-body">
            <div
              style={{
                display: "flex",
                marginBottom: "-0.85rem",
                marginTop: "-0.6rem",
                cursor: "pointer",
              }}
            >
              <img
                src="https://drive.google.com/uc?id=1ZiXJhVeg37NJ-0OEf7N34QzuzLKVczuC"
                className="card-img-top add"
                alt="Not Found"
                onClick={handleClick}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="addModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.title}
                    id="title"
                    name="title"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.description}
                    id="description"
                    name="description"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={note.tag}
                    id="tag"
                    name="tag"
                    onChange={onChange}
                    minLength={1}
                    required
                  />
                </div>
                <button
                  disabled={
                    note.title.length < 5 || note.description.length < 5
                  }
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleClick}
                >
                  Add Note
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdditemCard;
