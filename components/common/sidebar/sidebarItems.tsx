import { HomeIcon, WalletIcon } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ICON_SIZE = "min-w-5 min-h-5";

export const sidebarItems: SidebarItem[] = [
  {
    label: "Home",
    href: "/home",
    icon: <HomeIcon className={ICON_SIZE} />,
  },
  {
    label: "Assets",
    href: "/assets",
    icon: <WalletIcon className={ICON_SIZE} />,
  },
];
