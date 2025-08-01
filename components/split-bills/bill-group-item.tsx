import { BillGroup } from "@/api/baseAppBackendAPI.schemas";
import { Card } from "../ui/card";
import { getInitials } from "@/lib/getInitials";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { generateColors } from "@/lib/getColorClassNames";

interface BillGroupItemProps {
  billGroup?: BillGroup;
  isLoading?: boolean;
}

export const BillGroupItem = ({ billGroup, isLoading }: BillGroupItemProps) => {
  const createdAt = dayjs(billGroup?.created_at).format("D MMM YYYY");
  const { bgColor, borderColor, textColor } = generateColors(
    String(billGroup?.id) || "",
  );

  if (isLoading) {
    return <Card className="animate-pulse min-h-20" />;
  }

  return (
    <Link href={`/split-bills/${billGroup?.id}`} className="w-full">
      <Card
        className="text-white p-4 flex gap-4 items-center active:bg-neutral-800 
      transition-colors"
      >
        <div
          className={cn(
            "rounded-full w-10 h-10 flex items-center justify-center",
            bgColor,
            borderColor,
            textColor,
          )}
        >
          {getInitials(billGroup?.name || "")}
        </div>
        <div className="flex flex-col gap-0">
          <p className="text-lg font-semibold">{billGroup?.name}</p>
          <p className="text-sm text-neutral-400">
            {billGroup?.number_of_members || "No"} members
          </p>
        </div>
        <div className="flex flex-col gap-0 ml-auto">
          <p className="text-neutral-400 ml-auto">{createdAt}</p>
          <p className="text-neutral-400 ml-auto">{billGroup?.currency}</p>
        </div>
      </Card>
    </Link>
  );
};
