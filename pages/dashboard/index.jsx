import { useStore } from "client/context";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const store = useStore();
  console.log(session, store);
  // session is always non-null inside this page, all the way down the React tree.
  return "Some super secret dashboard";
}

AdminDashboard.auth = true;
