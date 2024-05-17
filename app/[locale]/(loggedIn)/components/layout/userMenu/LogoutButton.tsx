"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import LogoutDialog from "./LogoutDialog";

export interface LogoutButtonProps {
  logoutText: string;
  logoutProgressMessageText: string;
}

const LogoutButton = ({
  logoutText,
  logoutProgressMessageText,
}: LogoutButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSignOut = async () => {
    setIsDialogOpen(true);
    await signOut();
    setIsDialogOpen(false);
  };

  return (
    <>
      <LogoutDialog
        isOpen={isDialogOpen}
        logoutProgressMessageText={logoutProgressMessageText}
      />
      <button
        className="block w-full text-left px-2 py-1.5 text-sm focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50"
        onClick={handleSignOut}
      >
        {logoutText}
      </button>
    </>
  );
};

export default LogoutButton;
