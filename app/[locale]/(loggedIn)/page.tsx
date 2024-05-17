import { useTranslations } from "next-intl";

import SummaryList from "./SummaryList";
import RecentTransmissions from "./RecentTransmissions";

import H1 from "@/components/typography/H1";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Trunk-Player",
};

export default function DashboardPage() {
  const t = useTranslations("dashboard");

  return (
    <div className="flex flex-col gap-y-5">
      <H1>{t("summary.header")}</H1>
      <SummaryList />
      <RecentTransmissions />
    </div>
  );
}
