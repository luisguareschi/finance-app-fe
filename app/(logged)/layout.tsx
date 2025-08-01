"use client";
import useCurrentUser from "@/queries/auth/useCurrentUser";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/common/sidebar";
import { NavbarLayout } from "@/components/common/navbar-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isFetching } = useCurrentUser();

  if (!isFetching && !user) {
    router.replace("/login");
  }

  return (
    <div className="flex h-dvh w-full">
      <Sidebar />
      <NavbarLayout>{children}</NavbarLayout>
    </div>
  );
}
