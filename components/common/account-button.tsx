import { getInitials } from "@/lib/getInitials";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import useCurrentUser from "@/queries/auth/useCurrentUser";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { EllipsisVertical, LogOut, Settings, User } from "lucide-react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import useLogout from "@/queries/auth/useLogout";
import { cn } from "@/lib/utils";

interface AccountButtonProps {
  className?: string;
}

export const AccountButton = ({ className }: AccountButtonProps) => {
  const { user } = useCurrentUser();
  const initials = getInitials(user?.username || "");
  const { logout } = useLogout();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-2 hover:bg-neutral-800 cursor-pointer rounded-md transition-all p-2 -m-2 active:bg-neutral-900",
            className,
          )}
        >
          <Avatar className="size-10">
            <AvatarImage src={undefined} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium text-white">{user?.username}</p>
            <p className="text-xs text-neutral-400">{user?.email}</p>
          </div>
          <EllipsisVertical className="w-4 h-4 text-neutral-400 ml-auto" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="p-0 w-56">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="justify-start font-normal"
            onClick={() => alert("coming soon")}
          >
            <Settings />
            <span>Settings</span>
          </Button>
          <Separator />
          <Button
            variant="ghost"
            className="justify-start font-normal"
            onClick={() => logout()}
          >
            <LogOut />
            <span>Logout</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
