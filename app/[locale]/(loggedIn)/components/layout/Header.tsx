import Image from "next/image";
import { useTranslations } from "next-intl";

import TopNavigationMenu from "./TopNavigationMenu";
import LogoutButton from "./userMenu/LogoutButton";

import { Button } from "@/components/ui/button";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import UserMenu from "./userMenu/UserMenu";

const Header = () => {
  const t = useTranslations("header");
  const tApp = useTranslations("app");

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-slate-800 text-white">
      <div className="flex justify-start items-center gap-x-4">
        <span className="hidden lg:inline">
          <Image
            alt="Trunk-Player NG logo"
            src="/images/logo.svg"
            width={32}
            height={32}
          />
        </span>
        <span className="lg:hidden">
          <Button
            variant="none"
            size="content"
            className="pt-2"
          >
            <HamburgerMenuIcon className="w-6 h-6" />
          </Button>
        </span>
        <h1 className="text-large font-semibold">{tApp("nameDisplay")}</h1>
      </div>
      <TopNavigationMenu />
      <div>
        <UserMenu>
          <LogoutButton
            logoutText={t("logout.logout")}
            logoutProgressMessageText={t("logout.logoutProgressMessage")}
          />
        </UserMenu>
      </div>
    </header>
  );
};

export default Header;
