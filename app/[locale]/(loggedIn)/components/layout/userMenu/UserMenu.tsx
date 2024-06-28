"use client";
import { useSession } from "next-auth/react";
import { useMemo, type ReactNode } from "react";
import { getUserInitials } from "@/utils/userSessionUtils";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface UserMenuProps {
  children?: ReactNode;
}

const UserMenu = ({ children }: UserMenuProps) => {
  const { data: session } = useSession();

  const userName = session?.user?.name;
  const userInitials = useMemo(() => getUserInitials(userName), [userName]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="none"
          size="content"
        >
          <Avatar>
            <AvatarFallback className="text-slate-800">
              {userInitials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-center">
          {userName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
