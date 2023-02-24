import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcrypt";

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).exec();
    const isLogin = await bcrypt.compare(password, user.password);
    return { isLogin, user };
  } catch (error) {
    return error;
  }
};

export const authOptions = {
  // Configure one or more authentication providers
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(`credentials:`, credentials);
        //Login logic

        const { email, password } = credentials;
        const { isLogin, user } = await login(email, password);
        if (isLogin === true) {
          //to persist authentication
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("JWT", { token, account, profile });
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("SESSION", { session, token });
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/auth/login",
  // },
};
export default NextAuth(authOptions);
