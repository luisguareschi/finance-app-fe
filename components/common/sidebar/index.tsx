import Link from "next/link";
import { sidebarItems } from "./sidebarItems";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Atom } from "lucide-react";
import { cn } from "@/lib/utils";
import useStore from "@/lib/useStore";
import { AnimatePresence, motion } from "framer-motion";
import { useBreakPoints } from "@/lib/useBreakPoints";
import { useEffect } from "react";
import { AccountButton } from "../account-button";

const ANIMATION_DURATION = 0.2;

export const Sidebar = () => {
  const { showSidebar, setShowSidebar } = useStore();
  const { md } = useBreakPoints();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  // Disable scroll on body when sidebar is open
  useEffect(() => {
    if (showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    // Clean up on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [showSidebar]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: md ? 0 : "-100%" }}
        animate={{ x: showSidebar || md ? 0 : "-100%" }}
        transition={{ duration: ANIMATION_DURATION }}
        exit={{ x: "-100%" }}
        className={cn(
          "h-dvh w-72 md:w-64 p-4 fixed top-0 left-0 flex flex-col bg-black z-20 border-r border-neutral-900 md:border-none",
        )}
      >
        <h1 className="text-white font-semibold text-xl text-center flex items-center gap-2 mb-8 h-[40px]">
          <Atom className="min-w-5 min-h-5" />
          Finance Manager
        </h1>
        <div className="flex flex-col gap-4">
          {sidebarItems.map((item) => (
            <Link href={item.href} key={item.label} className="w-full">
              <Button
                className="w-full rounded-full justify-start text-base py-6"
                variant={isActive(item.href) ? "default" : "ghost"}
              >
                {item.icon}
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
        <AccountButton className="mt-auto md:hidden" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showSidebar ? 1 : 0 }}
        transition={{ duration: ANIMATION_DURATION }}
        exit={{ opacity: 0 }}
        className={cn(
          showSidebar
            ? "fixed top-0 left-0 w-full h-full bg-black/50 z-10"
            : "",
        )}
        onClick={() => setShowSidebar(false)}
      />
    </AnimatePresence>
  );
};
