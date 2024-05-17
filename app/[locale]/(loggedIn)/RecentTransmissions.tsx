import { useTranslations } from "next-intl";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RecentTransmissions = () => {
  const t = useTranslations("dashboard.recentTransmissions");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("header")}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{t("tempPlaceholder")}</p>
      </CardContent>
    </Card>
  );
};

export default RecentTransmissions;
