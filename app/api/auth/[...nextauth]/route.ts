import NextAuth from "next-auth";
import { OPTIONS } from "@/config/nextAuthOptions";

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
