import { useBreakPoints } from "@/lib/useBreakPoints";
import { ReactNode } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ResponsiveDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  description?: string;
  trigger?: ReactNode;
  forceDialog?: boolean;
}

export const ResponsiveDrawer = ({
  isOpen,
  onClose,
  children,
  title,
  description,
  trigger,
  forceDialog,
}: ResponsiveDrawerProps) => {
  const { md } = useBreakPoints();

  if (md || forceDialog) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="bg-neutral-900 border border-neutral-800 text-white">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-neutral-400">
              {description}
            </DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onClose={onClose}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="bg-neutral-900 border border-neutral-800 text-white">
        <DrawerHeader>
          <DrawerTitle className="text-white text-xl">{title}</DrawerTitle>
          <DrawerDescription className="text-neutral-400 text-base">
            {description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6">{children}</div>
      </DrawerContent>
    </Drawer>
  );
};
