"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-dvh text-white gap-4 p-4">
      <h1 className="text-8xl font-bold">404</h1>
      <h1 className="text-2xl font-semibold">Oops! Page not found</h1>
      <p className="text-neutral-400 mb-8">
        The page you are looking for does not exist.
      </p>
      <Link href="/">
        <Button variant="default" size="lg" className="rounded-full">
          Go home
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
