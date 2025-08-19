import { BillGroupDetail } from "@/api/baseAppBackendAPI.schemas";
import { Button } from "@/components/ui/button";
import { Card } from "../ui/card";
import { XIcon } from "lucide-react";
import { getInitials } from "@/lib/getInitials";
import { cn } from "@/lib/utils";
import { generateColors } from "@/lib/getColorClassNames";
import { AddBillForm } from "./add-bill-form";
import { useSplitBillsBillsDestroy } from "@/api/split-bills/split-bills";
import { useQueryClient } from "@tanstack/react-query";
import { QUERYKEYS } from "@/queries/queryKeys";
import toast from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useAlert } from "../ui/alert";

interface BillItemProps {
  billGroup: BillGroupDetail;
  bill: BillGroupDetail["bills"][number];
}

const BillItem = ({ billGroup, bill }: BillItemProps) => {
  const { showAlert } = useAlert();
  const queryClient = useQueryClient();
  const { mutateAsync: deleteBill } = useSplitBillsBillsDestroy({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERYKEYS.billGroupDetail],
        });
        toast.success("Bill deleted successfully");
      },
    },
  });
  const { bgColor, borderColor, textColor } = generateColors(
    String(bill?.payed_by.id) || "",
  );

  const handleDelete = () => {
    showAlert({
      title: "Delete Bill",
      subtitle: "Are you sure you want to delete this bill?",
      variant: "destructive",
      onCancel: () => {},
      onSubmit: async () => {
        await deleteBill({
          id: String(bill.id),
        });
      },
      submitText: "Delete",
    });
  };

  return (
    <Card className="flex justify-start items-center gap-4 w-full p-2">
      <div
        className={cn(
          "rounded-full w-10 h-10 min-w-10 min-h-10 flex items-center justify-center",
          bgColor,
          borderColor,
          textColor,
        )}
      >
        {getInitials(bill?.payed_by.name || "")}
      </div>
      <div>
        <p className="line-clamp-1">{bill?.description}</p>
        <p className="text-neutral-400">Payed by: {bill.payed_by.name}</p>
        <Popover>
          <PopoverTrigger>
            <p className="text-neutral-400 line-clamp-1 cursor-pointer hover:underline active:underline active:text-white transition-all text-left">
              For:{" "}
              {bill?.payed_for.length > 0
                ? bill?.payed_for.map((member) => member.name).join(", ")
                : "Everyone"}
            </p>
          </PopoverTrigger>
          <PopoverContent>
            <p className="text-neutral-400">
              <span className="text-white">Payed for: &nbsp;</span>
              {bill?.payed_for.map((member) => member.name).join(", ")}
              {bill?.payed_for_everyone && "Everyone"}
            </p>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex ml-auto items-center gap-2 min-w-fit">
        <p className="text-white min-w-fit">
          {bill?.amount} {billGroup?.currency}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="p-0 size-8 text-red-500 active:bg-red-800/50 hover:bg-red-800/50"
          onClick={handleDelete}
        >
          <XIcon className="min-w-5 min-h-5" />
        </Button>
      </div>
    </Card>
  );
};

interface BillsFormProps {
  billGroup: BillGroupDetail;
}

export const BillsForm = ({ billGroup }: BillsFormProps) => {
  return (
    <div className="flex flex-col gap-6 md:gap-4 w-full">
      <div className="flex justify-between md:justify-start items-center gap-4">
        <h2 className="text-xl font-base text-white">Bills</h2>
      </div>
      <AddBillForm billGroup={billGroup} />
      <div className="flex gap-2 items-start flex-col">
        {billGroup.bills.map((bill) => (
          <BillItem key={bill.id} billGroup={billGroup} bill={bill} />
        ))}
        {billGroup.bills.length === 0 && (
          <p className="text-neutral-400">
            No bills added yet. Add a person to start splitting bills.
          </p>
        )}
      </div>
    </div>
  );
};
