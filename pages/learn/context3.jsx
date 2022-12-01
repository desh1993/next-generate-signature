import { distDir } from "next.config";
import React, {
  useState,
  useContext,
  createContext,
  useReducer,
  Children,
} from "react";

//create Ref
const UserContext = createContext("user");

//Initial State
const initialUser = {
  authenticated: false,
  authenticating: true,
  error: null,
  username: "desh1993",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      state.authenticated = true;
      return state;
    default:
      return state;
  }
};

const UserProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialUser);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

const ContextContent = () => {
  const userObj = useContext(UserContext);
  console.log(userObj);
  return <div>context3</div>;
};

const ContextApp = () => {
  return (
    <UserProvider>
      <ContextContent></ContextContent>
    </UserProvider>
  );
};

export default ContextApp;
