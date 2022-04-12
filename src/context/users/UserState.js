import userContext from "./userContext";
import { useState } from "react";

const UserState = (props) => {
  const host = "http://localhost:5000";
  const userInitial = [];
  const [user, setUser] = useState(userInitial);

  // Get User Details
  const getUser = async () => {
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setUser(json);
  };
  return (
    <userContext.Provider
      value={{ user, getUser }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
