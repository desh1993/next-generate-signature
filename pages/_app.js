import "../styles/globals.css";
import { SessionProvider, useSession } from "next-auth/react";
import Composer from "utils/combineProvider";
import { StoreProvider } from "client/context";

// function MyApp({ Component, pageProps: { session, ...pageProps } }) {
//   return (
//     <SessionProvider session={session}>
//       {Component.auth ? (
//         <Auth>
//           <Component {...pageProps} />
//         </Auth>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </SessionProvider>
//   );
// }

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <Composer session={session} components={[SessionProvider, StoreProvider]}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </Composer>
  );
}

export default MyApp;
function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { data: session, status } = useSession({ required: true });
  console.log("MyApp session", session);
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return children;
}
