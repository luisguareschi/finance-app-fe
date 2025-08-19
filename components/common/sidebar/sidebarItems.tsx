import { Split, LayoutDashboard, HandCoins } from "lucide-react";

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
    label: "Debts",
    href: "/debts",
    icon: <HandCoins className={ICON_SIZE} />,
  },
  {
    label: "Split Bills",
    href: "/split-bills",
    icon: <Split className={ICON_SIZE} />,
  },
];
