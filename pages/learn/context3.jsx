import React, {
  useState,
  useContext,
  createContext,
  useReducer,
  Children,
} from "react";
import LoginSection from "./LoginSection";

//create Ref
export const UserContext = createContext("user");

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
      console.log("LOGGING IN");
      return {
        ...state,
        authenticated: true,
        username: "Sudesh1993",
      };
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
  const [state, dispatch] = useContext(UserContext);
  console.log(state);
  return (
    <div>
      <div className="username-section">{state.username}</div>
      <LoginSection />
    </div>
  );
};

const ContextApp = () => {
  return (
    <UserProvider>
      <ContextContent></ContextContent>
    </UserProvider>
  );
};

export default ContextApp;
