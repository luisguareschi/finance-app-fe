import { cn } from "@/lib/utils";
import BaseBarLoader from "react-spinners/BarLoader";
import { LoaderHeightWidthProps } from "react-spinners/helpers/props";

interface BarLoaderProps extends LoaderHeightWidthProps {}

export const BarLoader = (props: BarLoaderProps) => {
  return <BaseBarLoader color="#ffffff" {...props} />;
};
