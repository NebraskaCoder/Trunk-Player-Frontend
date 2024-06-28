import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { availableLanguages } from "./config/i18nProperties";
import { JWT, encode, getToken } from "next-auth/jwt";
import { parseRefreshToken } from "./utils/fetchUtils";

const locales = [...availableLanguages];
const publicPages = ["/login", "/register"];

export const authSecret = process.env.NEXTAUTH_SECRET;
export const signinSubUrl = "/login";
export const sessionTimeout = 60 * 60 * 24 * 30; // 30 days
export const tokenRefreshBufferSeconds = 300; // 5 minutes
export const sessionSecure =
  process.env.NEXTAUTH_URL?.startsWith("https://") ?? false;
export const sessionCookieName = sessionSecure
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

let isRefreshing = false;

const intlMiddleware = createIntlMiddleware({
  locales,
  localePrefix: "as-needed",
  defaultLocale: "en",
});

const requireEnvVars = () => {
  if (process.env.NEXTAUTH_SECRET === undefined) {
    throw new Error("Environmental variable NEXTAUTH_SECRET is not defined!");
  }

  if (process.env.NEXTAUTH_URL === undefined) {
    throw new Error("Environmental variable NEXTAUTH_URL is not defined!");
  }

  if (process.env.NEXT_PUBLIC_API_BASE_URL === undefined) {
    throw new Error(
      "Environmental variable NEXT_PUBLIC_API_BASE_URL is not defined!"
    );
  }

  if (process.env.SERVICE_API_BASE_URL === undefined) {
    throw new Error(
      "Environmental variable SERVICE_API_BASE_URL is not defined!"
    );
  }
};

const shouldUpdateToken = (token: JWT) =>
  !token.accessTokenExpiration || Date.now() >= token.accessTokenExpiration;

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  if (isRefreshing) {
    return token;
  }

  isRefreshing = true;

  try {
    const refreshTokenCookie = parseRefreshToken(token.apiCookies);

    if (
      !token.refreshTokenExpiration ||
      Date.now() >= token.refreshTokenExpiration ||
      !refreshTokenCookie
    ) {
      throw new Error("Access token has expired with no valid refresh token.");
    }

    const tokenRenewalRes = await fetch(
      `${process.env.SERVICE_API_BASE_URL}/auth/token/refresh-token/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          Cookie: refreshTokenCookie,
        },
      }
    );

    if (!tokenRenewalRes.ok) {
      throw new Error(
        `Token refresh failed with status: ${tokenRenewalRes.status}`
      );
    }

    const apiToken = (await tokenRenewalRes.json()) as {
      CSRF_TOKEN: string;
      access_token: string;
      access_token_expiration: string;
    };

    const newToken = {
      ...token,
      accessToken: apiToken.access_token,
      accessTokenExpiration: Date.parse(apiToken.access_token_expiration),
    };

    return newToken;
  } catch {
    // There was an error refreshing the token
  } finally {
    isRefreshing = false;
  }

  return token;
};

const updateCookie = (
  sessionToken: string | null,
  req: NextRequest,
  res: NextResponse
) => {
  if (sessionToken) {
    // Set the session token in the request and response cookies for a valid session
    req.cookies.set(sessionCookieName, sessionToken);
    res.cookies.set(sessionCookieName, sessionToken, {
      httpOnly: true,
      maxAge: sessionTimeout,
      secure: sessionSecure,
      sameSite: "lax",
    });
  } else {
    req.cookies.delete(sessionCookieName);
    return NextResponse.redirect(new URL(signinSubUrl, req.url));
  }

  return res;
};

const authMiddleware = withAuth(
  // Note that this callback is only invoked if
  // the `authorized` callback has returned `true`
  // and not for pages listed in `pages`.
  async function onSuccess(req) {
    const token = await getToken({ req, secret: authSecret });

    if (!token) {
      return NextResponse.redirect(new URL(signinSubUrl, req.url));
    }

    const reponseNext = intlMiddleware(req);

    if (shouldUpdateToken(token)) {
      try {
        const newToken = await refreshAccessToken(token);

        const newSessionToken = await encode({
          secret: authSecret as string,
          token: newToken,
          maxAge: sessionTimeout,
        });

        return updateCookie(newSessionToken, req, reponseNext);
      } catch (error) {
        return updateCookie(null, req, reponseNext);
      }
    }

    return reponseNext;
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
  }
);

export default async function middleware(req: NextRequest) {
  requireEnvVars();

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})/?$`,
    "i"
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
