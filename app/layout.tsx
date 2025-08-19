import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/app/providers";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { AlertProvider } from "@/components/ui/alert";

const font = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance Manager",
  description: "A web app for managing your finances",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-black")}>
        <Providers>
          <AlertProvider>{children}</AlertProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
