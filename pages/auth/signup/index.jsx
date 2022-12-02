import { useStore } from "client/context";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getValue, findValue } from "utils/common";
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
  // const user = getValue(state, ["user"], null);
  const user = findValue(state, "user");

  console.log(user);
  // if (session) {
  //   return router.replace(`/`);
  // }

  //   if (user && user.authenticating) {
  //     return <Loader />;
  //   }

  const signUpHandler = async (e) => {
    e.preventDefault();
    const payload = form;
  };

  return (
    <main className="form-signin">
      <form
        style={{
          margin: "50px 0",
        }}
      >
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        {errorMessage && (
          <p style={{ textTransform: "capitalize", color: "red" }}>
            {errorMessage}
          </p>
        )}

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm((form) => {
                return {
                  ...form,
                  name: e.target.value,
                };
              })
            }
          />
          <label ht="floatingInput">Name</label>
        </div>

        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={form.email}
            onChange={(e) =>
              setForm((form) => {
                return {
                  ...form,
                  email: e.target.value,
                };
              })
            }
          />
          <label ht="floatingInput">Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((form) => {
                return {
                  ...form,
                  password: e.target.value,
                };
              })
            }
          />
          <label ht="floatingPassword">Password</label>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
    </main>
  );
};

export default index;
