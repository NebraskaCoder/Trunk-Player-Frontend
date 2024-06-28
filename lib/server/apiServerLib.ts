import type { AuthFetchHeaders } from "./auth";
import type { PaginatedResponse } from "@/types/api/APIResponses";
import type { System } from "@/types/api/System";

export const getSystems = async (authHeaders: AuthFetchHeaders) => {
  const systemsRes = await fetch(
    `${process.env.SERVICE_API_BASE_URL}/radio/system/list`,
    {
      method: "GET",
      headers: authHeaders,
    }
  );

  if (!systemsRes.ok) {
    return null;
  }

  return (await systemsRes.json()) as PaginatedResponse<System[]>;
};
