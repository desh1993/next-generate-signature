import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";
import User from "@/models/User";

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
        const user = {
          id: "1",
          name: "J Smith",
          email: "jsmith@example.com",
          image:
            "https://res.cloudinary.com/desh9012/image/upload/v1669436386/ecommerce/1669436383740.png",
        };

        const { email, password } = credentials;

        if (email === "jsmith@example.com" && password === "1234") {
          // Any object returned will be saved in `user` property of the JWT
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
      console.log("RUNNING JWT", token);
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      console.log("RUNNING SESSION", session, token);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};
export default NextAuth(authOptions);
