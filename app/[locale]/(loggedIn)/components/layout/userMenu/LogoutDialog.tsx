import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface LogoutDialogProps {
  isOpen: boolean;
  logoutProgressMessageText: string;
}

const LogoutDialog = ({
  isOpen,
  logoutProgressMessageText,
}: LogoutDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogContent
        hasCloseButton={false}
        className="DialogContentFit"
      >
        <DialogHeader className="space-y-5 select-none">
          <DialogTitle className="text-center">
            {logoutProgressMessageText}
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
