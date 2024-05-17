import { useTranslations } from "next-intl";
import SummaryItem from "./components/SummaryItem";

import { CardGrid } from "@/components/ui/card-grid";

const SummaryList = () => {
  const t = useTranslations("dashboard.summary");

  const stats = {
    totalSystems: 2,
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
