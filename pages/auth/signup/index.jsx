import { useStore } from "client/context";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getValue } from "utils/common";
import Loader from "@/components/Loader";

const index = () => {
  const { data: session } = useSession();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state] = useStore();
  const user = getValue(state, ["user"], null);

  console.log(user);
  if (session) {
    return router.replace(`/`);
  }

  //   if (user && user.authenticating) {
  //     return <Loader />;
  //   }

  return <div>Sign Up</div>;
};

export default index;
