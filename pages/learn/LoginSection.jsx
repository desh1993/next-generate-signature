import React, { useContext } from "react";
import { UserContext } from "./context3";

const LoginSection = () => {
  const [state, dispatch] = useContext(UserContext);
  const handleLogin = () => {
    dispatch({ type: "LOGIN" });
    console.log(state);
  };
  return (
    <div className="loginBtn">
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginSection;
