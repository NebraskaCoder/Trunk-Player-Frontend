export const parseRefreshToken = (cookies: string[] | undefined) => {
  if (!cookies) {
    return undefined;
  }

  for (const cookie of cookies) {
    if (cookie.trim().startsWith("refresh-token")) {
      return cookie;
    }
  }

  return undefined;
};
