import Notes from "./Notes";
import { useState } from "react";

export const Home = (props) => {
  const host = "http://localhost:5000";
  const { showAlert } = props;
  const userInitial = [];
  const [user, setUser] = useState(userInitial);

  // Get User Data
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
    <div className="my-3">
      <Notes showAlert={showAlert} />
    </div>
  );
};
