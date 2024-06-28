import { User as APIUser } from "@/types/api/User";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * The shape of the user object returned in the OAuth providers' `profile` callback,
   * or the second parameter of the `session` callback, when using a database.
   */
  interface User {
    accessToken?: string;
    accessTokenExpiration?: number;
    refreshTokenExpiration?: number;
    apiCookies?: string[];
    apiUser?: APIUser;
  }

  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken?: string;
      accessTokenExpiration?: number;
      refreshTokenExpiration?: number;
      apiUser?: APIUser;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken?: string;
    accessTokenExpiration?: number;
    refreshTokenExpiration?: number;
    apiCookies?: string[];
    apiUser?: APIUser;
  }
}
