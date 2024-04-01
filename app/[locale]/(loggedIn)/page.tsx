// import { getServerSession } from "next-auth";
// import { OPTIONS as sessionOptions } from "@/app/api/auth/[...nextauth]/route";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Trunk-Player",
};

export default async function DashboardPage() {
  // const session = await getServerSession(sessionOptions);

  return <></>;
}
