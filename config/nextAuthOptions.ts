/* eslint-disable no-console */
// import axios from "axios";
import { AuthOptions, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";

import { User as APIUser } from "@/types/api/User";

export const OPTIONS: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials) {
            return null;
          }

          const tokenRes = await fetch(
            `${process.env.SERVICE_API_BASE_URL}/auth/token/`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          );

          if (!tokenRes.ok) {
            return Promise.resolve(null);
          }

          const apiToken = (await tokenRes.json()) as {
            CSRF_TOKEN: string;
            access_token_expiration: string;
            refresh_token_expiration: string;
            access_token: string;
          };

          const userRes: { data: APIUser } = {
            data: {
              id: 1,
              email: "test@test.com",
              enabled: true,
              first_name: "Test",
              last_name: "User",
              userProfile: {
                site_admin: true,
                UUID: "27641cb7-c472-418b-9ba8-cb6a11947d21",
                description: "Test User",
              },
            },
          };

          const userData = userRes.data;

          const user: User = {
            id: userData.id.toString(),
            name: `${userData.first_name} ${userData.last_name}`,
            email: userData.email,
            apiUser: userData,
            accessToken: apiToken.access_token,
            accessTokenExpiration: Date.parse(apiToken.access_token_expiration),
            refreshTokenExpiration: Date.parse(
              apiToken.refresh_token_expiration
            ),
            apiCookies: tokenRes.headers.getSetCookie(),
          };

          return Promise.resolve(user);
        } catch (err) {
          console.error(err);
          return Promise.resolve(null);
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.accessToken;
        token.accessTokenExpiration = user.accessTokenExpiration;
        token.refreshTokenExpiration = user.refreshTokenExpiration;
        token.apiCookies = user.apiCookies;
        token.apiUser = user.apiUser;
        token.name = user.name;
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.accessToken = token.accessToken;
      session.user.accessTokenExpiration = token.accessTokenExpiration;
      session.user.refreshTokenExpiration = token.refreshTokenExpiration;
      session.user.apiUser = token.apiUser;
      return session;
    },
  },
};
