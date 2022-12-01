import React, { useState, useContext, createContext } from "react";
//How to combine Providers
const AccountContext = createContext("account");
const ProfileContext = createContext("profile");

const AccountProvider = (props) => {
  const { account, children } = props;
  return (
    <AccountContext.Provider value={{ account }}>
      {children}
    </AccountContext.Provider>
  );
};

const ProfileProvider = (props) => {
  const { profile, children } = props;
  return (
    <ProfileContext.Provider value={{ profile }}>
      {children}
    </ProfileContext.Provider>
  );
};

//Combines all providers
const Composer = (props) => {
  const { components = [], children, ...rest } = props;
  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp {...rest}>{acc}</Comp>;
      }, children)}
    </>
  );
};

const AccessTokenSection = () => {
  const { account } = useContext(AccountContext);

  return (
    <section>
      <div>accessToken {account.accessToken}</div>
      <div>provider {account.provider}</div>
      <div>refreshToken {account.refreshToken}</div>
    </section>
  );
};

const ContextContent = () => {
  return (
    <div>
      <AccessTokenSection></AccessTokenSection>
    </div>
  );
};

const ProfileSection = () => {
  const { profile } = useContext(ProfileContext);
  const { account } = useContext(AccountContext);
  return (
    <section>
      <div>
        username {profile.username} & he is using {account.provider}
      </div>
      <div>role {profile.role}</div>
    </section>
  );
};

const ProfileContent = () => {
  return (
    <div>
      <ProfileSection />
    </div>
  );
};

// const Context = () => {
//   const [account, setaccount] = useState({
//     accessToken: "kadnkandkandkandkladn",
//     provider: "Github",
//     refreshToken: "nakxnkankanknak",
//   });

//   const [profile, setProfile] = useState({
//     username: "desh1993",
//     role: "Admin",
//   });

//   return (
//     <AccountProvider account={account}>
//       <ProfileProvider profile={profile}>
//         <ProfileContent></ProfileContent>
//       </ProfileProvider>
//       <div>
//         <ContextContent></ContextContent>
//       </div>
//     </AccountProvider>
//   );
// };

const Combinecontext = () => {
  const [account, setaccount] = useState({
    accessToken: "kadnkandkandkandkladn",
    provider: "Github",
    refreshToken: "nakxnkankanknak",
  });

  const [profile, setProfile] = useState({
    username: "desh1993",
    role: "Admin",
  });

  return (
    <Composer
      account={account}
      profile={profile}
      components={[ProfileProvider, AccountProvider]}
    >
      <ProfileContent></ProfileContent>
      <div>
        <ContextContent></ContextContent>
      </div>
    </Composer>
  );
};

export default Combinecontext;
