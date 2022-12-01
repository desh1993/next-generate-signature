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

export default Composer;

/**
 * How to use
 * 
 *     <Composer
      account={account}
      profile={profile}
      components={[ProfileProvider, AccountProvider]}
    >
      <ProfileContent></ProfileContent>
      <div>
        <ContextContent></ContextContent>
      </div>
    </Composer>
 */
