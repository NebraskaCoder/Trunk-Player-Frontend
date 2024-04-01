import Link from "next/link";

import TopNavigationMenu from "./TopNavigationMenu";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { HomeIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";

const Header = () => {
  return (
    <header className="flex items-center justify-between h-16 px-6 bg-slate-800 text-white">
      <div className="flex justify-start items-center gap-x-4">
        <span className="hidden lg:inline">
          <HomeIcon className="w-6 h-6" />
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
        <h1 className="text-large font-semibold">Trunk Player</h1>
      </div>
      <TopNavigationMenu />
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="none"
              size="content"
            >
              <Avatar>
                <AvatarFallback className="text-slate-800">TU</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel className="text-center">
              Trunk Player User
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link
              href="/logout"
              className="block px-2 py-1.5 text-sm focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
            >
              Logout
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
