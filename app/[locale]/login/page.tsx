import { useTranslations } from "next-intl";
import Image from "next/image";

import Form from "./components/Form";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const t = useTranslations("loginPage");

  const callbackUrl = Array.isArray(searchParams.callbackUrl)
    ? searchParams.callbackUrl[0]
    : searchParams.callbackUrl;

  return (
    <main>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <Image
              alt="Trunk-Player NG logo"
              src="/images/logo.svg"
              width={192}
              height={192}
              className="mx-auto"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("header")}
            </h2>
          </div>
          <div className="mt-8">
            <Form callbackUrl={callbackUrl} />
          </div>
        </div>
      </div>
    </main>
  );
}
