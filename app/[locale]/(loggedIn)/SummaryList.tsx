import { useTranslations } from "next-intl";
import { getAuthFetchHeaders } from "@/lib/server/auth";
import { cookies } from "next/headers";
import * as apiServerLib from "@/lib/server/apiServerLib";

import SummaryItem from "./components/SummaryItem";

import { CardGrid } from "@/components/ui/card-grid";

const SummaryList = async () => {
  const t = useTranslations("dashboard.summary");

  const authHeaders = await getAuthFetchHeaders(cookies());

  if (!authHeaders) {
    return null;
  }

  const systems = await apiServerLib.getSystems(authHeaders);

  if (!systems) {
    return null;
  }

  const stats = {
    totalSystems: systems.count,
    totalScanners: 18,
    totalScanLists: 9,
    totalDepartments: 5,
    totalTransmissions: 943,
  };

  const totalScannersScanLists = `${stats.totalScanners.toString()} / ${stats.totalScanLists.toString()}`;

  return (
    <CardGrid>
      <SummaryItem title={t("totalSystems")}>
        {stats.totalSystems.toString()}
      </SummaryItem>
      <SummaryItem title={t("totalScannersScanLists")}>
        {totalScannersScanLists}
      </SummaryItem>
      <SummaryItem title={t("totalDepartments")}>
        {stats.totalDepartments.toString()}
      </SummaryItem>
      <SummaryItem title={t("totalTransmissions")}>
        {stats.totalTransmissions.toString()}
      </SummaryItem>
    </CardGrid>
  );
};

export default SummaryList;
