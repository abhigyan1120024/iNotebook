import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

export const About = () => {
  const a = useContext(noteContext);
  return <div className="my-3">This is About who's in class {a.class}</div>;
};
