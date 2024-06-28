"use client";

import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
  navigationSubMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const TopNavigationMenu = () => {
  return (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link
            href="/"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="/reports"
            legacyBehavior
            passHref
          >
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Reports
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenu>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Config</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-40 p-4">
                <NavigationMenuItem>
                  <Link
                    href="/systems"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationSubMenuTriggerStyle()}
                    >
                      Systems
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/systems"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationSubMenuTriggerStyle()}
                    >
                      Scanners
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/systems"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationSubMenuTriggerStyle()}
                    >
                      Scan Lists
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/systems"
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={navigationSubMenuTriggerStyle()}
                    >
                      Talk Groups
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenu>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default TopNavigationMenu;
