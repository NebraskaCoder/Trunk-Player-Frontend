import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { OPTIONS } from "@/config/nextAuthOptions";
import { type JWT, decode, getToken } from "next-auth/jwt";
import { parseRefreshToken } from "@/utils/fetchUtils";

import type { NextRequest } from "next/server";
import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";

export const authSecret = process.env.NEXTAUTH_SECRET!;
export const sessionSecure =
  process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;
export const sessionCookieName = sessionSecure
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

export async function getServerSession(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return await nextAuthGetServerSession(...args, OPTIONS);
}

export async function getServerJWT(
  req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest
) {
  return await getToken({ req, secret: authSecret });
}

const getAuthJWTTokenFromCookies = async (
  cookies: ReadonlyRequestCookies
): Promise<JWT | null> => {
  const jwt = await decode({
    secret: authSecret,
    token: cookies.get(sessionCookieName)?.value,
  });

  return jwt;
};

export type AuthFetchHeaders =
  | { Authorization: string }
  | { Authorization: string; Cookie: string }
  | undefined;

export async function getAuthFetchHeaders(
  req:
    | GetServerSidePropsContext["req"]
    | NextRequest
    | NextApiRequest
    | ReadonlyRequestCookies
): Promise<AuthFetchHeaders> {
  const session = await getServerSession();

  const token =
    "get" in req
      ? await getAuthJWTTokenFromCookies(req)
      : await getServerJWT(req);

  if (!session || !token) {
    return undefined;
  }

  const refreshTokenCookie = parseRefreshToken(token.apiCookies);

  return refreshTokenCookie
    ? {
        Authorization: `Bearer ${session.user.accessToken}`,
        Cookie: refreshTokenCookie,
      }
    : {
        Authorization: `Bearer ${token.accessToken}`,
      };
}
