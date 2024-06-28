import { getAuthFetchHeaders } from "@/lib/server/auth";

import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fetchHeaders = await getAuthFetchHeaders(req);

  if (!fetchHeaders) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const systemsRes = await fetch(
    `${process.env.SERVICE_API_BASE_URL}/radio/system/list`,
    {
      method: "GET",
      headers: fetchHeaders,
    }
  );

  if (!systemsRes.ok) {
    return NextResponse.json(
      { error: systemsRes.statusText },
      { status: systemsRes.status }
    );
  }

  return NextResponse.json(await systemsRes.json());
}
