declare namespace NodeJS {
  interface ProcessEnv {
    NEXTAUTH_SECRET?: string;
    NEXTAUTH_URL?: string;
    NEXT_PUBLIC_API_BASE_URL?: string;
    SERVICE_API_BASE_URL?: string;
  }
}
