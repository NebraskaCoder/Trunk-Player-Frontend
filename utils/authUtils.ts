import { type AuthFetchHeaders, getAuthFetchHeaders } from "@/lib/server/auth";

import type { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

import type { NextRequest } from "next/server";

export const getAuthFetchHeadersOrThrow = async (
  req: NextRequest | ReadonlyRequestCookies
): Promise<AuthFetchHeaders> => {
  const fetchHeaders = await getAuthFetchHeaders(req);

  if (!fetchHeaders) {
    throw new Error("Unauthorized");
  }

  return fetchHeaders;
};
