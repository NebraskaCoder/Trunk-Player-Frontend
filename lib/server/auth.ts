import { getServerSession as nextAuthGetServerSession } from "next-auth";
import { OPTIONS } from "@/config/nextAuthOptions";
import { getToken } from "next-auth/jwt";
import { parseRefreshToken } from "@/utils/fetchUtils";

import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import type { NextRequest } from "next/server";

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
  return await getToken({ req, secret: process.env.JWT_SECRET });
}

export type AuthFetchHeaders =
  | { Authorization: string }
  | { Authorization: string; Cookie: string }
  | undefined;

export async function getAuthFetchHeaders(
  req: GetServerSidePropsContext["req"] | NextRequest | NextApiRequest
): Promise<AuthFetchHeaders> {
  const session = await getServerSession();
  const token = await getServerJWT(req);

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
