import { Button } from "../ui/button";
import { AccountButton } from "./account-button";
import useStore from "@/lib/useStore";
import { Menu } from "lucide-react";

interface NavbarProps {
  children: React.ReactNode;
}

export const NavbarLayout = ({ children }: NavbarProps) => {
  const { showSidebar, setShowSidebar, navbarTitle } = useStore();
  return (
    <div className="flex flex-col w-full md:ml-64 px-4">
      <header className="flex justify-between items-center mb-4 pt-4 sticky top-0 bg-black">
        <h1 className="text-2xl font-base text-white">{navbarTitle}</h1>
        <AccountButton className="hidden md:flex min-w-[200px]" />
        <Button
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-white md:hidden"
          size="icon"
          variant="ghost"
        >
          <Menu className="min-w-6 min-h-6" />
        </Button>
      </header>
      <div className="flex flex-col w-full py-4">{children}</div>
    </div>
  );
};
