import { useEffect, useState } from "react";

const breakPoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Custom React hook to track the current window width and determine if it matches various Tailwind CSS breakpoints.
 *
 * Returns an object containing:
 * - width: The current window width in pixels.
 * - sm, md, lg, xl, 2xl: Booleans indicating if the window width is at least the corresponding breakpoint.
 */

export const useBreakPoints = () => {
  const [width, setWidth] = useState<number>(window?.innerWidth || 0);

  useEffect(() => {
    const handleResize = () => setWidth(window?.innerWidth || 0);
    window?.addEventListener("resize", handleResize);
    return () => window?.removeEventListener("resize", handleResize);
  }, []);

  return {
    width,
    sm: width >= breakPoints.sm,
    md: width >= breakPoints.md,
    lg: width >= breakPoints.lg,
    xl: width >= breakPoints.xl,
    "2xl": width >= breakPoints["2xl"],
  };
};
