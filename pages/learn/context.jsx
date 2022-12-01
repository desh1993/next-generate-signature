import React, { useState, useContext, createContext } from "react";
const UserContext = createContext("user");
const ProfileContext = createContext("profile");

function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: "Desh",
    account: "Github",
  });
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
}

function ProfileProvider({ children }) {
  const [profile, setProfile] = useState({
    token: "kajdnkandkankadnkndak",
    expiry: "12/12/2022",
  });
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
}

const ContextContent = () => {
  const { user } = useContext(UserContext);
  const { profile } = useContext(ProfileContext);

  return (
    <>
      <div className="userDiv">
        <div>username is {user.name} </div>
        <div>account is {user.account} </div>
      </div>
      <div className="profileDiv">
        <div>Profile Token is {profile.token} </div>
        <div>Profile Expiry date is {profile.expiry} </div>
      </div>
    </>
  );
};

function ContextApp({ children }) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}

//MAIN entry point - ContextContent can still read profile, user prop
const Context = () => {
  return (
    <UserProvider>
      <ProfileProvider>
        <ContextApp>
          <ContextContent />
        </ContextApp>
      </ProfileProvider>
    </UserProvider>
  );
};

export default Context;
