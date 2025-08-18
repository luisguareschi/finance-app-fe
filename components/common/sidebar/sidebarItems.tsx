import { WalletIcon, Split, LayoutDashboard } from "lucide-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ICON_SIZE = "min-w-5 min-h-5";

export const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard className={ICON_SIZE} />,
  },
  {
    label: "Assets",
    href: "/assets",
    icon: <WalletIcon className={ICON_SIZE} />,
  },
  {
    label: "Split Bills",
    href: "/split-bills",
    icon: <Split className={ICON_SIZE} />,
  },
];
