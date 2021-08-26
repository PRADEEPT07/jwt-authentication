import { useState, useEffect } from "react";
import './PrivateScreen.css'

const PrivateScreen = ({history}) => {
  const [msg, setmsg] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    if(!localStorage.getItem("authToken")) {
      history.push("/login")
    }
    
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
        localStorage.removeItem("authToken");
        setmsg("You are Authorized");
    };

    fetchPrivateDate();
  }, [history]);

  const logoutHandler = () => {
      localStorage.removeItem("authToken");
      history.push('/login');
  }

  return  (
    <div>
      <div>{msg}</div>
      <button onClick={logoutHandler}>Logout</button>
    </div>
  );
};

export default PrivateScreen;