import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
const index = ({ user }) => {
  console.log(user);
  return <div>Profile</div>;
};

export default index;

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  console.log("session is", session);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  const { user } = session;
  return {
    props: {
      user,
    },
  };
}
