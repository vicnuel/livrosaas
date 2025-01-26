import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { findUser } from "./infra/auth/login/findUser";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = findUser({
          email: (credentials.email as string).toLowerCase(),
          password: credentials.password as string,
        });

        return user;
      },
    }),
  ],
});
